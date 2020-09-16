<template>
  <section :class="'hero is-small' + (ismobile ? ' mx-0 px-0' : '')">
    <div :class="'hero-body' + (ismobile ? ' mx-0 px-0' : '')">
      <div class="content">
        <div class="columns is-multiline is-desktop is-centered">
          <div class="column is-two-thirds">
            <div class="columns is-multiline is-desktop is-centered">
              <div class="column is-full">
                <v-img :src="googleLogo" aspect-ratio="7" contain></v-img>
              </div>
            </div>
          </div>
          <v-snackbar v-model="snackbar">
            Loading it !!
            <template v-slot:action="{ attrs }">
              <v-btn
                color="green"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <div :class="ismobile ? 'column is-full' : 'column is-three-fifths'">
            <v-expand-transition>
              <v-skeleton-loader
                v-if="!showSearchBar"
                class="mx-auto"
                type="card"
              ></v-skeleton-loader>
            </v-expand-transition>
            <v-expand-transition>
              <div
                v-if="showSearchBar"
                class="columns is-multiline is-desktop is-centered"
              >
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
                      <v-card-title class="headline"> Ahhh! 🤔 </v-card-title>
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
                <div class="column is-full">
                  <v-sheet elevation="9" shaped class="px-2">
                    <div
                      class="columns is-multiline is-mobile is-centered is-vcentered"
                    >
                      <div class="column is-full">
                        <p class="text has-text-centered">
                          Filter Down Your Search
                        </p>
                      </div>
                      <div class="column is-half">
                        <v-text-field
                          dense
                          outlined
                          :persistent-hint="true"
                          rounded
                          elevation="6"
                          hint="Terms That Should be Definetely there in the Same Order in the Results"
                          label="Must Include Terms"
                        ></v-text-field>
                      </div>
                      <div class="column is-half">
                        <v-text-field
                          dense
                          outlined
                          rounded
                          :persistent-hint="true"
                          elevation="6"
                          hint="Words That Should Not be there in the Results"
                          label="Must Exclude Terms"
                        ></v-text-field>
                      </div>
                      <div class="column is-full">
                        <v-slider
                          v-model="slider"
                          class="align-center"
                          :max="100"
                          :min="10"
                          label="No. of Results"
                          hide-details
                        >
                          <template v-slot:append>
                            <v-text-field
                              v-model="slider"
                              class="mt-0 pt-0"
                              hide-details
                              single-line
                              type="number"
                            ></v-text-field>
                          </template>
                        </v-slider>
                      </div>
                      <div class="column is-half">
                        <v-text-field
                          dense
                          outlined
                          rounded
                          :persistent-hint="true"
                          elevation="6"
                          hint="Filter Your Results Based on File Extensions"
                          label="File Extension"
                        ></v-text-field>
                      </div>
                      <div class="column is-half">
                        <v-text-field
                          dense
                          outlined
                          rounded
                          :persistent-hint="true"
                          elevation="6"
                          hint="Filter Your Results Based on a Particular Website"
                          label="Filter Websites"
                        ></v-text-field>
                      </div>
                    </div>
                  </v-sheet>
                </div>
                <div class="column is-full">
                  <div class="columns is-mobile is-centered is-vcentered">
                    <div class="column has-text-centered is-full">
                      <v-btn @click="searchQ(searchMod)">
                        Advanced Search
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-expand-transition>
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
      showSearchBar: false,
      assisDiag: false,
      snackbar: true,
      searchValidation: function (text) {
        if (text.length > 0) {
          return true
        } else {
          return false
        }
      },
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
    showSearch() {
      setTimeout(() => {
        this.showSearchBar = true
      }, 3000)
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
  mounted() {
    this.showSearch()
  },
}
</script>
