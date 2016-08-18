'use strict';

const angular = require('angular');
const adventureApp = angular.module('adventureApp');

adventureApp.controller('GameController', ['$log', GameController]);

function GameController() {
  this.history = [
    {
      id: 0,
      message: 'Welcome to the game.'
    }
  ];
  this.direction = ['up', 'down', 'left', 'right'];
  this.room = require('../lib/room.js');

  this.player = {
    name: 'player1',
    location: 'roomA',
    maxHealth: 10,
    health: 10,
    attackPower: 4,
    potionCount: 1,
    alive: true
  };

  this.moveDirection = function(direction) {
    if (!this.player.alive) {
      this.logHistory('You can\'t do anything when you\'re dead...');
      return;
    }
    if (this.room[this.player.location]) {
      let currentLocation = this.room[this.player.location];
      let nextMove = currentLocation[direction];

      if (nextMove !== 'wall') {
        this.player.location = nextMove;
        this.logHistory(this.player.name + ' moved to ' + nextMove);
        currentLocation = this.room[nextMove];

        if (!currentLocation.monster || !currentLocation.monster.alive) {
          this.logHistory('There are no monsters in this room.');
        }
        if (currentLocation.monster.alive) {
          this.logHistory('Monster: ' + currentLocation.monster.name + ' appears!');
        }
        return;
      }
      this.logHistory('Lol you hit a wall.');
    }
  };

  this.attackMonster = function() {
    let playerDamage = 0;
    let monsterDamage = 0;
    let player = this.player;
    let monster = this.room[this.player.location].monster;

    if (!player.alive) {
      this.logHistory('You can\'t do anything when you\'re dead...');
      return;
    }
    if (monster.alive && player.alive) {
      playerDamage = Math.floor(Math.random() * player.attackPower);
      monsterDamage = Math.floor(Math.random() * monster.attackPower);
      monster.health = monster.health - playerDamage;
      this.logHistory(player.name + ' hits ' + monster.name + ' for ' + playerDamage + ' dmg!');
      if (monster.health > 0) {
        this.logHistory(monster.name + ' has ' + monster.health + ' health remaining.');
      }
      if (monster.health <= 0) {
        this.logHistory(monster.name + ' has been defeated!');
        monster.alive = false;
      }
      player.health = player.health - monsterDamage;
      this.logHistory(monster.name + ' hits ' + player.name + ' for ' + monsterDamage + ' dmg!');
      if (player.health > 0) {
        this.logHistory(player.name + ' has ' + player.health + ' health remaining.');
      }
      if (player.health <= 0) {
        this.logHistory('GG you\'re dead. Better luck next time.');
        player.alive = false;
      }
      return;
    }
    this.logHistory('No monster to attack.');
  };

  this.usePotion = function() {
    if (!this.player.alive) {
      this.logHistory('You can\'t do anything when you\'re dead...');
      return;
    }
    if (this.player.potionCount === 0) {
      this.logHistory('You have no more potions to use. GG.');
      return;
    }
    if (this.player.potionCount > 0) {
      this.player.health = this.player.maxHealth;
      this.player.potionCount--;
      this.logHistory('You drink a potion. You now have ' + this.player.health + ' health!');
    }
  };

  this.logHistory = function(whatHappened) {
    this.history.push({id: this.history.length, message: `${whatHappened}`});
  };
}
