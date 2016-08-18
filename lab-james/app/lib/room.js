'use strict';

const monsters = require('./monster');

module.exports = {
  roomA: {
    up: 'wall',
    down: 'roomB',
    left: 'wall',
    right: 'wall',
    monster: undefined
  },
  roomB: {
    up: 'roomA',
    down: 'roomC',
    left: 'wall',
    right: 'wall',
    monster: monsters.farqwat
  },
  roomC: {
    up: 'roomB',
    down: 'roomD',
    left: 'wall',
    right: 'roomF',
    monster: monsters.sid
  },
  roomD: {
    up: 'roomC',
    down: 'wall',
    left: 'wall',
    right: 'wall',
    monster: monsters.lotso
  }
};
