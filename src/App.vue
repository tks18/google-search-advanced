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
            <div class="column is-full">
              <foot />
            </div>
          </div>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import topNav from './components/top-nav'
import mainSearch from './components/main-search'
import foot from './components/footer'
export default {
  name: 'App',
  components: {
    topNav,
    mainSearch,
    foot,
  },
}
</script>
