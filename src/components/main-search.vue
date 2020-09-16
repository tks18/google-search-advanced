<template>
  <section :class="'hero is-small' + (ismobile ? ' mx-0 px-0' : '')">
    <div :class="'hero-body' + (ismobile ? ' mx-0 px-0' : '')">
      <div class="content">
        <div class="columns is-multiline is-desktop is-centered">
          <div class="column is-two-thirds">
            <div class="columns is-multiline is-desktop is-centered">
              <div class="column is-full">
                <v-img :src="googleLogo" aspect-ratio="4.5" contain></v-img>
              </div>
            </div>
          </div>
          <div :class="ismobile ? 'column is-full' : 'column is-three-fifths'">
            <div class="columns is-multiline is-desktop is-centered">
              <div class="column is-full">
                <v-text-field
                  prepend-inner-icon="mdi-magnify"
                  append-icon="mdi-google-assistant"
                  dense
                  outlined
                  rounded
                  elevation="6"
                  v-model="searchMod"
                  :success="searchValidation(searchMod)"
                  :clearable="true"
                  @keyup.enter="searchQ(searchMod)"
                  @click:append="assisDiag = !assisDiag"
                  hint="Try Entering a Query and Maybe Results will Come"
                  placeholder="Enter Your Query"
                ></v-text-field>
                <v-dialog v-model="assisDiag" max-width="290">
                  <v-card>
                    <v-card-title class="headline"> Ahhh ! </v-card-title>
                    <v-card-text>
                      This is Not Google.<br />
                      Maybe We will Try in Future! LOL!!
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        @click="assisDiag = !assisDiag"
                        text
                        class="subtitle text-bold"
                        color="green"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <div v-if="!ismobile" class="column is-full">
                <div class="columns is-mobile is-centered is-vcentered">
                  <div class="column has-text-right is-half">
                    <v-btn @click="searchQ(searchMod)"> Google Search </v-btn>
                  </div>
                  <div class="column has-text-left is-half">
                    <v-btn @click="luckyButton()"> I'm Feeling Lucky </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="
              ismobile
                ? 'column has-text-centered is-full'
                : 'column has-text-centered is-two-thirds'
            "
          >
            Google Offered in: <br v-if="ismobile" />
            <v-chip
              class="ma-2"
              color="info"
              small
              @click="luckyButton"
              v-for="(lang, index) in langs"
              v-bind:key="index"
              >{{ lang }}</v-chip
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data: function () {
    return {
      googleLogo:
        'https://i.ibb.co/7yjJ0mT/png-transparent-google-logo-google-search-google-account-redes-search-engine-optimization-text-servi.png',
      searchMod: '',
      assisDiag: false,
      searchValidation: function (text) {
        if (text.length > 0) {
          return true
        } else {
          return false
        }
      },
      langs: ['हिन्दी', 'বাংলা', 'తెలుగు', 'मराठी', 'தமிழ்', 'ગુજરાતી'],
    }
  },
  methods: {
    searchQ(sq) {
      if (sq.length > 0) {
        let query = sq.replace(' ', '+')
        let queryUrl = `http://www.google.com/search?q=${query}`
        window.open(queryUrl)
        return
      }
    },
    luckyButton() {
      window.open('https://www.google.com/doodles/')
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
