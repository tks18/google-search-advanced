import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
    options: {
      themeCache: {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
      },
    },
    themes: {
      light:  {
        primary: '#3f51b5',
        secondary: '#f44336',
        accent: '#00bcd4',
        error: '#ff9800',
        warning: '#ffeb3b',
        info: '#03a9f4',
        success: '#4caf50'
        }
    },
    }
});
