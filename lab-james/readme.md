# Adventure Game
This is my submission for an app that uses Angular to create a text-based game a client can play. FYI, you can move between rooms A through D in a vertical format. If you try to move in a direction that's not allowed you'll bump into a wall. In each room there is a villain from a Pixar movie where you are given the option to defeat them or move on. It's up to you which path you choose.

## Installation
Clone down this repo and start with `npm i` to install dependencies. Then, run `npm run watch` to start the build. Next, in your browser go to `http://localhost:8080` to access the app.

## Usage
You can choose a direction to move by selecting a choice in the drop-down menu and clicking `move`. A description of what room you moved into will show, including if a monster exists.

If a monster exists you can choose to `attack` them. The monster will always strike you back so be ready to use a `potion` by clicking `use potion`. You only have one but it will restore you to full health so use it wisely.

## Testing
To test run `karma start` to ensure the app is working as it should. You can also `npm run lint` to check for any linter errors.
