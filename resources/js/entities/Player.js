import MainEntity from './MainEntity.js'
import PlayerLaser from './PlayerLaser'

export default class Player extends MainEntity {
    constructor (scene, x, y, key) {
        super(scene, x, y, key, 'player')
        this.setData('speed', 200)
        this.setData('isShooting', false)
        this.setData('timerShootDelay', 10)
        this.setData('timerShootTick', this.getData('timerShootDelay') - 1)
    }

    moveLeft () {
        this.body.velocity.x = -this.getData('speed')
    }

    moveRight () {
        this.body.velocity.x = this.getData('speed')
    }

    onDestroy () {
        console.log('Game Over')
        //TODO add the game over scene
        // this.scene.time.addEvent({
        //     delay: 1000,
        //     // callback: function() {
        //     //     this.scene.scene.start("SceneGameOver");
        //     // },
        //     callbackScope: this,
        //     loop: false,
        // })
    }

    update () {
        //TODO add sound effects
        this.body.setVelocity(0, 0)
        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width)
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height)

        if (this.getData('isShooting')) {
            if (this.getData('timerShootTick') <
                this.getData('timerShootDelay')) {
                this.setData(
                    'timerShootTick',
                    this.getData('timerShootTick') + 1,
                )
            } else {
                let laser = new PlayerLaser(this.scene, this.x, this.y)
                this.scene.playerLasers.add(laser)
                // this.scene.sfx.laser.play()
                this.setData('timerShootTick', 0)
            }
        }
    }
}