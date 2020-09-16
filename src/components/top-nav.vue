<template>
  <v-app-bar app flat light>
    <v-app-bar-nav-icon />
    <v-toolbar-title>Google Mock</v-toolbar-title>
    <v-spacer />
    <v-btn icon rounded>
      <v-icon> mdi-github </v-icon>
    </v-btn>
    <v-btn text small rounded> Gmail </v-btn>
    <v-btn text small rounded> Images </v-btn>
    <v-btn text small rounded>
      <v-icon> mdi-apps </v-icon>
    </v-btn>
    <v-btn icon>
      <v-avatar color="red" size="40">
        <span class="white--text headline">CJ</span>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data: function () {
    return {}
  },
}
</script>
