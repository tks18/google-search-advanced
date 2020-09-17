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
                    @keyup.enter="
                      searchQ(
                        searchMod,
                        mustInc,
                        mustExc,
                        itSelec,
                        curQFilt,
                        curSearchLim,
                        res,
                        fileExt,
                        mustUrl,
                        safeSearch,
                        adTest,
                        persTest,
                      )
                    "
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
              </div>
            </v-expand-transition>
          </div>
          <v-expand-transition>
            <div class="column is-full mx-0 px-0">
              <v-skeleton-loader
                v-if="!showSearchBar"
                class="mx-auto"
                type="card"
              ></v-skeleton-loader>
              <v-expansion-panels v-if="showSearchBar" popout>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Filter Down Your Search
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="columns is-multiline is-centered is-vcentered">
                      <div class="column is-half">
                        <v-combobox
                          v-model="itSelec"
                          small-chips
                          prepend-inner-icon="mdi-book-plus-multiple"
                          label="Filter Using Multiple 'OR' Keywords"
                          :persistent-hint="true"
                          hint="Press TAB or ENTER after Typing Each Filter for Seperating"
                          multiple
                          rounded
                          dense
                          outlined
                        ></v-combobox>
                      </div>
                      <div class="column is-half">
                        <v-select
                          v-model="curSearchLim"
                          :items="searchLims"
                          item-text="display"
                          item-value="value"
                          prepend-inner-icon="mdi-clock"
                          menu-props="auto"
                          outlined
                          rounded
                          dense
                          :persistent-hint="true"
                          hint="Filter Based on Time Limit like past day or Month"
                          label="Time Limit of Results"
                          single-line
                        ></v-select>
                      </div>
                      <div class="column is-full">
                        <v-radio-group
                          v-model="curQFilt"
                          label="Search the Keywords in"
                          row
                        >
                          <v-radio
                            v-for="(filt, index) in qFilters"
                            :key="index"
                            :label="filt.display"
                            :value="filt.value"
                          ></v-radio>
                        </v-radio-group>
                      </div>
                      <div class="column is-half">
                        <v-text-field
                          dense
                          outlined
                          :persistent-hint="true"
                          rounded
                          elevation="6"
                          v-model="mustInc"
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
                          v-model="mustExc"
                          hint="Words That Should Not be there in the Results"
                          label="Must Exclude Terms"
                        ></v-text-field>
                      </div>
                      <div class="column is-half">
                        <v-slider
                          v-model="res"
                          class="align-center"
                          :max="100"
                          :min="10"
                          label="No. of Results"
                          hide-details
                        >
                          <template v-slot:append>
                            <v-text-field
                              v-model="res"
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
                          v-model="fileExt"
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
                          v-model="mustUrl"
                          hint="Filter Your Results Based on a Particular Website"
                          label="Filter Websites"
                        ></v-text-field>
                      </div>
                      <div class="column is-quarter">
                        <v-switch
                          v-model="safeSearch"
                          hint="Turn On/Off Safe Search"
                          :label="'SafeSearch ' + (safeSearch ? 'On' : 'Off')"
                        ></v-switch>
                      </div>
                      <div class="column is-quarter">
                        <v-switch
                          v-model="adTest"
                          hint="Turn On/Off Adwords Test"
                          :label="'Ad-Test ' + (adTest ? 'On' : 'Off')"
                        ></v-switch>
                      </div>
                      <div class="column is-quarter">
                        <v-switch
                          v-model="persTest"
                          hint="Turn On/Off Personalised Search"
                          :label="
                            'Personalised Search ' + (persTest ? 'On' : 'Off')
                          "
                        ></v-switch>
                      </div>
                    </div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-expand-transition>
          <div class="column is-full">
            <v-skeleton-loader
              v-if="!showSearchBar"
              class="has-text-centered"
              type="button"
            ></v-skeleton-loader>
            <div
              v-if="showSearchBar"
              class="columns is-mobile is-centered is-vcentered"
            >
              <div class="column has-text-centered is-full">
                <v-btn
                  @click="
                    searchQ(
                      searchMod,
                      mustInc,
                      mustExc,
                      itSelec,
                      curQFilt,
                      curSearchLim,
                      res,
                      fileExt,
                      mustUrl,
                      safeSearch,
                      adTest,
                      persTest,
                    )
                  "
                >
                  Advanced Search
                </v-btn>
              </div>
            </div>
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
      mustInc: '',
      mustExc: '',
      mustUrl: '',
      fileExt: '',
      searchLims: [
        {
          display: 'Past Day',
          value: 'd',
        },
        {
          display: 'Past Week',
          value: 'w',
        },
        {
          display: 'Past Month',
          value: 'm',
        },
        {
          display: 'Past Year',
          value: 'y',
        },
        {
          display: 'None',
          value: ' ',
        },
      ],
      curSearchLim: '',
      itSelec: [],
      qFilters: [
        {
          display: 'Title',
          value: 'title',
        },
        {
          display: 'Body',
          value: 'body',
        },
        {
          display: 'Links',
          value: 'links',
        },
        {
          display: 'Defintions',
          value: 'definition',
        },
        {
          display: 'Synonyms',
          value: 'synonyms',
        },
      ],
      curQFilt: '',
      safeSearch: false,
      persTest: false,
      res: 10,
      snackbar: true,
      adTest: false,
      searchValidation: function (text) {
        if (text.length > 0) {
          return true;
        } else {
          return false;
        }
      },
    };
  },
  methods: {
    searchQ(
      sq,
      must,
      exc,
      orsFilt,
      qfilters,
      range,
      num,
      ext,
      sites,
      safety,
      adst,
      personal,
    ) {
      if (sq.length > 0) {
        let query = sq.replace(' ', '+');
        let qwithFilt = '';
        if (qfilters == 'title') {
          qwithFilt = 'allintitle%3A' + query;
        } else if (qfilters == 'body') {
          qwithFilt = 'allintext%3A' + query;
        } else if (qfilters == 'links') {
          qwithFilt = 'allinurl%3A' + query;
        } else if (qfilters == 'definition') {
          qwithFilt = 'define%3A' + query;
        } else if (qfilters == 'synonyms') {
          qwithFilt = query + '+~term';
        } else {
          qwithFilt = query;
        }
        console.log(qwithFilt);
        let mustInclude = must.replace(' ', '+');
        let mustExclude = exc.replace(' ', '-');
        let orFilters = orsFilt.join('+');
        let numberRes = num < 10 ? 10 : num > 100 ? 100 : num;
        let fileExtension = ext;
        let siteSearch = sites;
        let sRange = range;
        let safeSearching = safety ? 'active' : 'images';
        let adsTest = adst ? 'on' : 'off';
        let personalisedSearch = personal ? 1 : 0;
        let queryUrl = `http://www.google.com/search?q=${qwithFilt}&as_epq=${mustInclude}&as_eq=${mustExclude}&as_oq=${orFilters}&num=${numberRes}&as_qdr=${sRange}&as_filetype=${fileExtension}&as_sitesearch=${siteSearch}&safe=${safeSearching}&pws=${personalisedSearch}&adtest=${adsTest}`;
        window.open(queryUrl);
        return;
      }
    },
    luckyButton() {
      window.open('https://www.google.com/doodles/');
      return;
    },
    showSearch() {
      setTimeout(() => {
        this.showSearchBar = true;
      }, 3000);
    },
  },
  computed: {
    ismobile() {
      var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (width > 966) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.showSearch();
  },
};
</script>
