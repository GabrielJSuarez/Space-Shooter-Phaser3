![screenshot](./enemiesScreen.png)

##SURVIVING SPACE 🎮️

> Developed & Designed: [Gabriel Suárez](https://github.com/GabrielJSuarez)
 
# Game elements

# 👤 Characters / 📦️ Objects

- Ship
- Ship's engines
- Infinite Tilemap of space
- Planets rendered at random
- 4 types of asteroids.

## 🏆️ Objective

- Survive
- Git Gud Scrub

# Assets

## 🎨 Images Used

- [Images And Effect were acquired from the Phaser 3 Assets Library](https://phaser.io/examples)
- [Buttons by: Kenney Vleugels](https://www.kenney.nl/)


## 🔊 Sound Effects

- [Sound Effects acquired from Phaser 3 Library](https://phaser.io/examples)
- [Music By: Dafunk - Hardcore Power (DMCA FREE)](https://www.youtube.com/watch?v=G_vyNziyf_4);

# Overview

> Create an engaging 2D arcade survival game that has the feel of a 3D game and takes full advantage of the Phaser 3 Physics Engine to give an aura of randomness to the player.

# Story

> A lone survivor is trying to get back to his mothership but gets caught on an asteroid belt, he needs to survive as long as possible waiting for extraction... If it arrives.

# Gameplay

> Navigate space running away from asteroids, which can come from any direction and any angle, destroy them to get a better chance of survival, but beware, the more you destroy, the faster they'll become.

# Level Design

> No levels, No Stages, only the infinite void of space and your ship that will be destroyed if you collide with an asteroid.

# Development process

> After my investigation about the Phaser 3 Library and doing some tutorials to get a feel of the engine, and it's capabilities I decided that I didn't want to go on the regular shooter route, so i started to see what ideas could I implement to make a unique game that doesn't leave the scope of the assigment and can be completed in the strict deadline imposed.

> I Implemented the Basic template of the game following the instructions and then I started the assets hunt, relying on the huge Phaser 3 Assets Library.

> I Started to mutate the code to achieve my core mission and implemented a tilemap that moves when the player moves, using Phaser 3 camera feature, while the camera moves following the ship, the tilemap with the texture will keep rendering, creating a feel of the endless universe.

> Using the assets Library I inserted features like planets and moons to give a more Immersive feeling, some features will be displayed at random through the map 

> I created the Ship using the assets from the Phaser 3 Assets Library, and the "enemies" that will be displayed on the screen, the rendering was achieved by using the Phaser 3 atlas feature, that lets you reference movements and animations of the textures that are defined on a JSON file.

> The Ship's Bullets were created using the same texture packages extending from the Phaser Image Scene and using the Phaser 3 Physics Engine to make then take into Account the direction the Ship is facing and making them disappear after a set amount of time.

> I Created an Emitter feature that lets you see a blue trail left behind by the Ship when it's moving, this will make you feel the speed of the Ship while moving.

> The Ship movement was achieved by rendering the Ship Asset as a Physics image, using again the Phaser 3 Physics engine we could not only move the ship on the screen but accounts for Drag, Momentum and Max Velocity, giving it a real movement feel that adds to the difficulty of avoiding/destroying asteroids.

> The Enemies were created and animated from the same assets Atlas, they will render at random 4 types of asteroids, these asteroids will have their own movement patter and they will spam depending on the ship's (X, Y) position.

> Difficulty Curve was implemented in the game by getting a score for each asteroid destroy, the bigger the score the faster the asteroids will travel through the screen.


## Core Game Mechanic

> Immersive Map: Infinite Map that keeps rendering the further you traverse it, it has depth and renders assets like planets in a randomized fashion.

> Ship Movement: Ship that moves and accounts maximum velocity, drag and angular momentum, it's really easy to lose control if your not careful.

> Camera Displacing: The Camera will follow the ship wherever it goes, creating a 3D feeling in a 2D arcade game.

> Score Tracking: Tracks the score of each asteroid destroyed, the 5 highest scores will be displayed in the hall of fame.

> Asteroids Movements: They will move in different patterns to increase the difficulty. 

> Difficulty Spikes: The bigger your score, the more unforgiving the game will be, ramping up the asteroid's speed.

