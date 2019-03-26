import Player from '../entities/Player.js'
import RedEnemy from '../entities/RedEnemy.js'
import GreenEnemy from '../entities/GreenEnemy.js'
import YellowEnemy from '../entities/YellowEnemy.js'

export default class SceneMain extends Phaser.Scene {
    constructor () {
        super({
            key: 'SceneMain',
        })
    }

    preload () {
        this.load.image('player', './../../images/player.png')
        this.load.image('bullet', './../../images/bullet.png')
        this.load.image('enemyParticle',
            './../../images/enemyParticle.png')

        this.load.spritesheet(
            'yellowEnemy',
            './../../images/yellow_enemy.png',
            {
                frameWidth: 50,
                frameHeight: 46,
            },
        )

        this.load.spritesheet(
            'redEnemy',
            './../../images/red_enemy.png',
            {
                frameWidth: 50,
                frameHeight: 46,
            },
        )

        this.load.spritesheet(
            'greenEnemy',
            './../../images/green_enemy.png',
            {
                frameWidth: 50,
                frameHeight: 46,
            },
        )
    }

    create () {

        this.anims.create({
            key: 'greenEnemy',
            frames: [
                {
                    key: 'greenEnemy',
                    frame: 0,
                },
            ],
            frameRate: 20,
            repeat: -1,
        })

        this.anims.create({
            key: 'redEnemy',
            frames: [
                {
                    key: 'redEnemy',
                    frame: 0,
                },
            ],
            frameRate: 20,
            repeat: -1,
        })

        this.anims.create({
            key: 'yellowEnemy',
            frames: [
                {
                    key: 'yellowEnemy',
                    frame: 0,
                },
            ],
            frameRate: 20,
            repeat: -1,
        })

        this.cursors = this.input.keyboard.createCursorKeys()

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height - 50,
            'player',
        )

        this.enemies = this.add.group()
        this.playerLasers = this.add.group()
        this.enemyLasers = this.add.group()

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                let enemy = null

                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GreenEnemy(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0,
                    )
                } else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType('YellowEnemy').length < 5) {
                        enemy = new YellowEnemy(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0,
                        )
                    }
                } else {
                    enemy = new RedEnemy(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0,
                    )
                }

                if (enemy !== null) {
                    enemy.setScale(Phaser.Math.Between(10, 20) * 0.1)
                    this.enemies.add(enemy)
                }
            },
            callbackScope: this,
            loop: true,
        })

        this.physics.add.collider(
            this.playerLasers,
            this.enemies,
            (playerLaser, enemy) => {
                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy()
                    }
                    enemy.explode(true)
                    playerLaser.destroy()
                }
            },
        )

        this.physics.add.overlap(
            this.player,
            this.enemies,
            (player, enemy) => {
                if (!player.getData('isDead') &&
                    !enemy.getData('isDead')) {
                    player.explode(false)
                    player.onDestroy()
                    enemy.explode(true)
                }
            },
        )

        this.physics.add.overlap(
            this.player,
            this.enemyLasers,
            (player, laser) => {
                if (!player.getData('isDead') &&
                    !laser.getData('isDead')) {
                    player.explode(false)
                    player.onDestroy()
                    laser.destroy()
                }
            },
        )
    }

    update () {
        if (!this.player.getData('isDead')) {
            this.player.update()
            if (this.cursors.left.isDown) {
                this.player.moveLeft()
            }

            if (this.cursors.right.isDown) {
                this.player.moveRight()
            }

            if (this.cursors.space.isDown) {
                this.player.setData('isShooting', true)
            } else {
                this.player.setData(
                    'timerShootTick',
                    this.player.getData('timerShootDelay') - 1,
                )
                this.player.setData('isShooting', false)
            }
        }

        for (let i = 0; i < this.enemyLasers.getChildren().length; i++) {
            let laser = this.enemyLasers.getChildren()[i]
            laser.update()
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy()
                }
            }
        }

        for (let i = 0; i < this.playerLasers.getChildren().length; i++) {
            let laser = this.playerLasers.getChildren()[i]
            laser.update()

            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy()
                }
            }
        }
    }

    getEnemiesByType (type) {
        let arr = []
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            let enemy = this.enemies.getChildren()[i]
            if (enemy.getData('type') === type) {
                arr.push(enemy)
            }
        }
        return arr
    }
}