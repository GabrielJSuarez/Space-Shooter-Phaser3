import Phaser from 'phaser';
import asyncData from '../Objects/asyncScores';

let bg;
let stars;
let ship;
let bullets;
let lastFired = 0;
let cursors;
let fire;
let score = 0;
let scoreText;

/* eslint no-underscore-dangle: 0 */
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const Bullet = new Phaser.Class({
      Extends: Phaser.Physics.Arcade.Image,

      initialize:
          function Bullet(scene) {
            Phaser.Physics.Arcade.Image.call(this, scene, 0, 0, 'space', 'blaster');

            this.setBlendMode(1);
            this.setDepth(1);

            this.speed = 1000;
            this.lifespan = 1000;

            this._temp = new Phaser.Math.Vector2();
          },

      fire(ship) {
        this.lifespan = 800;
        this.setActive(true);
        this.setVisible(true);
        this.setAngle(ship.body.rotation);
        this.setPosition(ship.x, ship.y);
        this.body.reset(ship.x, ship.y);
        const angle = Phaser.Math.DegToRad(ship.body.rotation);
        this.scene.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
        this.body.velocity.x *= 2;
        this.body.velocity.y *= 2;
      },

      update(time, delta) {
        this.lifespan -= delta;
        if (this.lifespan <= 0) {
          this.setActive(false);
          this.setVisible(false);
          this.body.stop();
        }
      },

    });

    // Sounds
    this.sfx = {
      explosions: [
        this.sound.add('explosion'),
      ],
      laser: this.sound.add('blaster'),
    };

    //  World size is 8000 x 6000
    bg = this.add.tileSprite(400, 300, 1440, 980, 'background').setScrollFactor(0);

    //  Add our planets, etc
    this.add.image(512, 680, 'space', 'blue-planet').setOrigin(0).setScrollFactor(0.6);
    this.add.image(2833, 1246, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6);
    this.add.image(3875, 531, 'space', 'sun').setOrigin(0).setScrollFactor(0.6);
    this.add.image(908, 3922, 'space', 'gas-giant').setOrigin(0).setScrollFactor(0.6);
    this.add.image(3140, 2974, 'space', 'brown-planet').setOrigin(0).setScrollFactor(0.6).setScale(0.8)
      .setTint(0x882d2d);
    this.add.image(6052, 4280, 'space', 'purple-planet').setOrigin(0).setScrollFactor(0.6);

    // Galaxy
    const galaxy = this.add.image(5345 + 1024, 327 + 1024, 'space', 'galaxy').setBlendMode(1).setScrollFactor(0.6);

    // Extras
    for (let i = 0; i < 8; i += 1) {
      this.add.image(Phaser.Math.Between(-6000, 6000), Phaser.Math.Between(-8000, 8000), 'space', 'green-orb').setOrigin(0).setScrollFactor(0.6);
      this.add.image(Phaser.Math.Between(-6000, 6000), Phaser.Math.Between(-8000, 8000), 'space', 'eyes').setBlendMode(1).setScrollFactor(0.8);
      this.add.image(Phaser.Math.Between(-6000, 6000), Phaser.Math.Between(-8000, 8000), 'space', 'sun').setOrigin(0).setScrollFactor(0.6);
    }

    stars = this.add.tileSprite(400, 300, 800, 600, 'stars').setScrollFactor(0);

    const particles = this.add.particles('space');

    // Ship emitter
    const emitter = particles.createEmitter({
      frame: 'blue',
      speed: 100,
      lifespan: {
        onEmit() {
          return Phaser.Math.Percent(ship.body.speed, 0, 300) * 2000;
        },
      },
      alpha: {
        onEmit() {
          return Phaser.Math.Percent(ship.body.speed, 0, 300);
        },
      },
      angle: {
        onEmit() {
          const v = Phaser.Math.Between(-10, 10);
          return (ship.angle - 180) + v;
        },
      },
      scale: { start: 0.6, end: 0 },
      blendMode: 'ADD',
    });

    bullets = this.physics.add.group({
      classType: Bullet,
      maxSize: 30,
      runChildUpdate: true,
    });

    // Ship's Physics
    ship = this.physics.add.image(400, 300, 'space', 'ship').setDepth(2);
    ship.setDrag(300);
    ship.setAngularDrag(400);
    ship.setMaxVelocity(600);

    // Camera Behaviour
    emitter.startFollow(ship);
    this.cameras.main.startFollow(ship);

    // Inputs
    cursors = this.input.keyboard.createCursorKeys();
    fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Galaxy movement
    this.tweens.add({
      targets: galaxy,
      angle: 360,
      duration: 100000,
      ease: 'Linear',
      loop: -1,
    });

    // Enemies Group
    this.enemies = this.physics.add.group();

    // Initialize score text
    scoreText = this.add.text(ship.x - 380, ship.y - 280, 'score: ', {
      fontFamily: 'monospace',
      fontSize: 28,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    scoreText.setOrigin(0);
    scoreText.setDepth(3);

    // Collision/Overlap calls
    this.physics.add.collider(bullets, this.enemies, this.destroyAsteroids, null, this);
    this.physics.add.collider(ship, this.enemies, this.hitByAsteroid, null, this);
    this.physics.add.collider(this.enemies, this.enemies, this.asteroidSelfCollision, null, this);
  }

  // Generate Particles for destruction physics
  particleEmitter(texture, object) {
    return this.add.particles(texture).createEmitter({
      x: object.x,
      y: object.y,
      speed: { min: -800, max: 800 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 0 },
      blendMode: 'SCREEN',
      lifespan: 600,
      gravityY: 800,
    });
  }

  // Callback Function for being hit
  hitByAsteroid(ship) {
    // Send final score to the Leaderboard API

    localStorage.setItem('score', score);

    asyncData.postGameScore({
      user: localStorage.getItem('user'),
      score,
    });

    // Set the score back to 0
    score = 0;

    // Stop Movement
    this.physics.pause();
    ship.disableBody(true, true);

    // PLay effects
    this.particleEmitter('spark0', ship);
    this.particleEmitter('spark1', ship);
    this.sfx.explosions[Phaser.Math.Between(0, this.sfx.explosions.length - 1)].play();

    // go to game over scene
    this.time.addEvent({
      delay: 2000,
      callback() {
        this.scene.start('SceneGameOver');
      },
      callbackScope: this,
      loop: false,
    });
  }

  // Callback Function for hitting an asteroid
  destroyAsteroids(ship, asteroid) {
    score += 10;
    scoreText.setText(`Score: ${score}`);

    const emitter0 = this.particleEmitter('spark0', asteroid);
    const emitter1 = this.particleEmitter('spark1', asteroid);

    this.sfx.explosions[Phaser.Math.Between(0, this.sfx.explosions.length - 1)].play();
    asteroid.destroy();

    // Make particles disappear
    this.time.addEvent({
      delay: 1000,
      callback() {
        emitter0.explode();
        emitter1.explode();
      },
      callbackScope: this,
      loop: false,
    });
  }

  // Callback Function for asteroids colliding with eachother
  asteroidSelfCollision(asteroid1, asteroid2) {
    const emitter0 = this.particleEmitter('spark0', asteroid1);
    const emitter1 = this.particleEmitter('spark1', asteroid1);
    const emitter3 = this.particleEmitter('spark0', asteroid2);
    const emitter4 = this.particleEmitter('spark1', asteroid2);

    asteroid1.destroy();
    asteroid2.destroy();

    // Make particles disappear
    this.time.addEvent({
      delay: 1000,
      callback() {
        emitter0.explode();
        emitter1.explode();
        emitter3.explode();
        emitter4.explode();
      },
      callbackScope: this,
      loop: false,
    });
  }

  /* eslint no-unused-vars: ["error", { "args": "after-used" }] */
  update(time) {
    // Add enemies based on ship's position
    this.time.addEvent({
      // Adds a difficulty curve that cuts the spam time in half when the score is greater than 500
      delay: 8000,
      callback() {
        if (Phaser.Math.Between(0, 10) >= 2) {
          this.enemies.create((ship.x * 2) + Phaser.Math.Between(-5000, 5000), (ship.y * 2) + Phaser.Math.Between(-5000, 5000), 'asteroid1').play('asteroid1-anim');
        } else if (Phaser.Math.Between(0, 10) >= 4) {
          this.enemies.create((ship.x * 2) + Phaser.Math.Between(-5000, 5000), (ship.y * 2) + Phaser.Math.Between(-5000, 5000), 'asteroid2').play('asteroid2-anim');
        } else if (Phaser.Math.Between(0, 10) >= 6) {
          this.enemies.create((ship.x * 2) + Phaser.Math.Between(-5000, 5000), (ship.y * 2) + Phaser.Math.Between(-5000, 5000), 'asteroid3').play('asteroid3-anim');
        } else if (Phaser.Math.Between(0, 10) >= 8) {
          this.enemies.create((ship.x * 2) + Phaser.Math.Between(-5000, 5000), (ship.y * 2) + Phaser.Math.Between(-5000, 5000), 'asteroid4').play('asteroid4-anim');
        }
      },
      callbackScope: this,
      loop: true,
    });

    // Asteroid Movement, bounds
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      // Add movement with difficulty spike depending on the score
      if (enemy.texture.key === 'asteroid1-sheet') {
        enemy.setVelocityX(200 + (score * 0.1));
      } else if (enemy.texture.key === 'asteroid2-sheet') {
        enemy.setVelocityX(-200 - (score * 0.1));
      } else if (enemy.texture.key === 'asteroid3-sheet') {
        enemy.setVelocityY(200 + (score * 0.1));
      } else if (enemy.texture.key === 'asteroid5-sheet') {
        enemy.setVelocityY(-200 - (score * 0.1));
      }

      if (enemy.x > 6000 + ship.x || enemy.x < -6000 - ship.x) {
        enemy.destroy();
      }

      if (enemy.y > 8000 + ship.y || enemy.y < -8000 - ship.y) {
        enemy.destroy();
      }
    }

    // Ship movement
    if (cursors.left.isDown) {
      ship.setAngularVelocity(-150);
    } else if (cursors.right.isDown) {
      ship.setAngularVelocity(150);
    } else {
      ship.setAngularVelocity(0);
    }

    if (cursors.up.isDown) {
      this.physics.velocityFromRotation(ship.rotation, 600, ship.body.acceleration);
    } else {
      ship.setAcceleration(0);
    }

    // Ship fire
    if (fire.isDown && time > lastFired) {
      const bullet = bullets.get();

      if (bullet) {
        bullet.fire(ship);
        this.sfx.laser.play();
        lastFired = time + 100;
      }
    }

    // Update tile position
    bg.tilePositionX += ship.body.deltaX() * 0.5;
    bg.tilePositionY += ship.body.deltaY() * 0.5;

    stars.tilePositionX += ship.body.deltaX() * 2;
    stars.tilePositionY += ship.body.deltaY() * 2;

    // Updates the position of the score to let it stay always on the top left corner
    scoreText.x = ship.x - 380;
    scoreText.y = ship.y - 280;
  }
}
