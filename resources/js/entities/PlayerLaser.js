import MainEntity from './MainEntity'

export default class PlayerLaser extends MainEntity{
    constructor(scene, x, y) {
        super(scene, x, y, "bullet");
        this.body.velocity.y = -400;
    }
}