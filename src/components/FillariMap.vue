<template>
  <div id="map">
    <v-map :zoom=13 :center="[60.192059, 24.945831]">
      <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
      <v-marker :lat-lng="[60.192059, 24.945831]"></v-marker>
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
  }
}
</script>

<style scoped>
  #map {
    height: 100%;
  }
</style>
