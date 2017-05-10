<template>
  <div id="map-container">
    <div id="map-canvas" :class="{ 'state-sidebar-open' : hasActiveItem() }">
      <v-map :zoom=13 :center="center">
        <v-tilelayer url="http://api.digitransit.fi/map/v1/hsl-map/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker v-on:l-click="selectStation(station)" v-for="station in stations" :key="station.stationId" :lat-lng="[station.lat, station.lon]"></v-marker>
      </v-map>
    </div>
    <transition name="slide-fade">
      <div id="sidebar" v-if="hasActiveItem()">
        <div class="content">
          <h1 v-html="activeItem.name"></h1>
        </div>
      </div>
    </transition>
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
      stations: [],
      center: [60.1639305, 24.9001882], // helsinki
      activeItem: null
    }
  },
  methods: {
    hasActiveItem () {
      return this.activeItem && this.activeItem != null
    },
    fetchStations () {
      this.$http.get('http://127.0.0.1:3000/api/stations').then((data) => {
        this.stations = data.body
      }, (ex) => {
        console.error('Failed to connect to stations api', ex)

        // TODO: test station for developing without api, remove at some point.
        this.stations = [
          { name: 'Test Station', lat: 60.1639305, lon: 24.9001882, stationId: 0 }
        ]
      })
    },
    selectStation (station) {
      if (station === this.activeItem) {
        this.activeItem = null
      } else {
        this.activeItem = station
      }
    }
  },
  mounted () {
    this.fetchStations()
  }
}
</script>

<style scoped>
  #map-container {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
  }

  #map-container, #map-canvas {
    height: 100%;
    width: 100%;
  }

  #map-canvas.state-sidebar-open {
    width: 70%;
  }

  #sidebar {
    width: 30%;
    height: 100vh;
  }

  .content {
    padding: 20px;
  }

  #sidebar.content {
    overflow-x: hidden;
    overflow-y: scroll;
  }

</style>
