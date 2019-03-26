import MainEntity from './MainEntity.js'

export default class EnemyLaser extends MainEntity {
    constructor(scene, x, y) {
        super(scene, x, y, "bullet");
        this.body.velocity.y = 200;
    }
}