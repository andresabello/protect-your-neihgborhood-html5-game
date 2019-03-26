import MainEntity from './MainEntity.js'
import EnemyLaser from './EnemyLaser.js'

export default class GreenEnemy extends MainEntity {
    constructor (scene, x, y) {
        super(scene, x, y, 'greenEnemy', 'GreenEnemy')
        this.play('greenEnemy')
        this.body.velocity.y = Phaser.Math.Between(50, 100)

        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function () {
                let bullet = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y,
                )
                bullet.setScale(this.scaleX)
                this.scene.enemyLasers.add(bullet)
            },
            callbackScope: this,
            loop: true,
        })
    }

    onDestroy () {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false)
            }
        }
    }
}