<template>
    <div class="game-wrapper">
        <div id="protect-the-house"></div>
        <gm-map></gm-map>
    </div>
</template>

<script>

    import Phaser from 'phaser'
    import GoogleMapsMap from './GoogleMapsMap'
    import SceneMain from './../states/GameState.js'

    export default {
        name: 'protect-your-house-game',
        data () {
            return {
                config: {
                    type: Phaser.AUTO,
                    parent: 'protect-the-house',
                    width: 400,
                    height: 400,
                    physics: {
                        default: 'arcade',
                        arcade: {
                            gravity: {
                                x: 0, y: 0,
                            },
                            debug: false,
                        },
                    },
                    scene: [
                        SceneMain,
                    ],
                    pixelArt: true,
                    roundPixels: true,
                    transparent: true,
                    'input.keyboard': true,
                },
                game: null,
            }
        },
        mounted () {
            this.game = new Phaser.Game(this.config)
        },
        methods: {},
        components: {
            'gm-map': GoogleMapsMap,
        },
    }
</script>

<style scoped lang="scss">
    .game-wrapper {
        position: relative;

        #protect-the-house {
            position: absolute;
            z-index: 2000;
        }

        .google-map-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            height: 400px;
            width: 400px;
            z-index: 1000;
        }
    }
</style>