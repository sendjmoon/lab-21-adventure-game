'use strict';

describe('testing adventure controller', function() {
  beforeEach(() => {
    angular.mock.module('adventureApp');
    angular.mock.inject(($controller) => {
      this.gameControl = $controller('GameController');
    });
  });
  beforeEach(() => {
    this.gameControl.history = [];
    this.gameControl.player = {
      name: 'shrek',
      location: 'roomA',
      maxHealth: 10,
      health: 10,
      attackPower: 4,
      potionCount: 1,
      alive: true
    };
  });
  it('the player should hit a wall', () => {
    this.gameControl.moveDirection('up');
    expect(this.gameControl.history.length).toBe(1);
  });
  it('the player should change locations', () => {
    this.gameControl.moveDirection('down');
    expect(this.gameControl.player.location).toBe('roomB');
    expect(this.gameControl.room[this.gameControl.player.location].monster.name).toBe('Lord Farquuad');
    expect(this.gameControl.history.length).toBe(2);
  });
  it('the player should have full health when using a potion', () => {
    this.gameControl.usePotion();
    expect(this.gameControl.player.health).toBe(10);
  });
  it('the player should be attacked by the monster', () => {
    this.gameControl.moveDirection('down');
    this.gameControl.attackMonster();
    expect(this.gameControl.history.length).toBeGreaterThan(4);
  });
});
