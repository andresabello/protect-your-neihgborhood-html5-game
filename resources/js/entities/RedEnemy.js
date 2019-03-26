import MainEntity from './MainEntity.js'

export default class RedEnemy extends MainEntity {
    constructor(scene, x, y) {
        super(scene, x, y, "redEnemy", "RedEnemy");
        this.play("redEnemy");
        this.body.velocity.y = Phaser.Math.Between(50, 100);
    }
}