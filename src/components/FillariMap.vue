<template>
  <div id="map">
    <v-map :zoom=13 :center="[60.192059, 24.945831]">
      <v-tilelayer url="http://api.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png"></v-tilelayer>
      <v-marker v-on:l-click="selectStation(station)" v-for="station in stations" :key="station.stationId" :lat-lng="[station.lat, station.lon]"></v-marker>
    </v-map>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet'

export default {
  name: 'fillarimap',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker
  },
  data () {
    return {
      stations: []
    }
  },
  methods: {
    fetchStations () {
      this.$http.get('http://127.0.0.1:3000/api/stations').then((data) => {
        this.stations = data.body
      })
    },
    selectStation (station) {
      alert(station.name)
    }
  },
  mounted () {
    this.fetchStations()
  }
}
</script>

<style scoped>
  #map {
    height: 100%;
  }
</style>
