import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors' // （自定义主题）Vuetify 内置可选的色彩包

Vue.use(Vuetify)


export default new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: colors.brown

      },
    },
  },
})