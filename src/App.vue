<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-container>
          <div class="columns is-multiline is-desktop is-centered is-vcentered">
            <div class="column is-full">
              <top-nav />
            </div>
            <div class="column is-full">
              <mainSearch />
            </div>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import topNav from './components/top-nav.vue'
import mainSearch from './components/main-search'
export default {
  name: 'App',
  components: {
    topNav,
    mainSearch,
  },
}
</script>
