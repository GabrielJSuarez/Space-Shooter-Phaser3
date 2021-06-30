import Entity from "./Entities";

export default class Asteroid1 extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "asteroid4-anim", "Asteroid4");
        this.play("asteroid4-anim");

        this.body.velocity.x = Phaser.Math.Between(100, 200);
        this.body.velocity.y = Phaser.Math.Between(-50, 100);
    }
}