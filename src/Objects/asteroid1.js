import Entity from "./Entities";

export default class Asteroid1 extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "asteroid1-anim", "Asteroid1");
        this.play("asteroid1-anim");
        this.body.velocity.x = Phaser.Math.Between(100, 200);

        this.body.velocity.y = Phaser.Math.Between(-50, 100);
    }
}