import GameState from '../states/GameState'

let ProtectYourHouse = GameState || {}
ProtectYourHouse.PlayerBullet = ((game, x, y) => {
    Phaser.Sprite.call(this, game, x, y, 'bullet')
    this.anchor.setTo(0.5)
    this.setCollideWorldBounds(true)
    this.body.onWorldBounds = true
    this.body.world.on('worldBounds', (body) => {
        if (body.gameObject === this) {
            this.setActive(false)
            this.setVisible(false)
        }
    }, this)
})
ProtectYourHouse.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype)
ProtectYourHouse.PlayerBullet.prototype.constructor = ProtectYourHouse.PlayerBullet
