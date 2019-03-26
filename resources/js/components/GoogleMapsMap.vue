<template>
    <div class="google-map-wrapper" ref="map"></div>
</template>

<script>

    export default {
        name: 'gm-map',
        props: {
            map: {
                type: Object,
                default () {
                    return {
                        center: {
                            lat: 0,
                            lng: 0,
                        },
                        zoom: 12,
                    }
                },
            },
            label: {
                type: String,
                default: 'Location found',
            },
        },
        data () {
            return {
                infoWindow: null,
                renderedMap: null,
                browserHasLocation: null,
            }
        },
        mounted () {
            this.renderedMap = new google.maps.Map(this.$refs.map, this.map)
            this.infoWindow = new google.maps.InfoWindow()

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    this.infoWindow.setPosition(pos)
                    this.infoWindow.setContent(this.label)
                    this.infoWindow.open(this.renderedMap)
                    this.renderedMap.setCenter(pos)
                }, () => {
                    this.browserHasLocation = true
                    this.handleLocationError(this.renderedMap.getCenter())
                })
                return
            }

            this.browserHasLocation = false
            this.handleLocationError(this.renderedMap.getCenter())
        },
        methods: {
            handleLocationError (pos) {
                this.infoWindow.setPosition(pos)
                this.infoWindow.setContent(this.browserHasLocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.')
                this.infoWindow.open(this.renderedMap)
            },

        }
    }
</script>

<style scoped lang="scss">
    .google-map-wrapper {
        height: 100%;
        width: 100%;
    }
</style>