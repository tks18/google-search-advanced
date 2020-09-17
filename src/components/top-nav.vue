<template>
  <v-app-bar app flat dense collapse-on-scroll>
    <v-app-bar-nav-icon v-if="ismobile" />
    <v-toolbar-title v-if="!ismobile"
      >Advanced Google Search Tool</v-toolbar-title
    >
    <v-spacer />
    <v-btn v-if="!ismobile" icon rounded small>
      <v-icon> mdi-github </v-icon>
    </v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon rounded @click="changeTheme()" v-on="on" v-bind="attrs">
          <v-icon>mdi-water</v-icon>
        </v-btn>
      </template>
      <span>Change theme</span>
    </v-tooltip>
    <v-btn icon>
      <v-avatar color="red" size="35">
        <span class="white--text headline">S</span>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data: function () {
    return {}
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    gotoPage(url) {
      window.open(url)
      return
    },
  },
  computed: {
    ismobile() {
      var width = window.innerWidth > 0 ? window.innerWidth : screen.width
      if (width > 966) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>
