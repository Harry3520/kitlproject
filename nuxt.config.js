import build from './config/build';
import buildModules from './config/buildModules';
import head from './config/head';
import css from './config/css';
import plugins from './config/plugins';
import modules from './config/modules';
import axios from './config/axios';
import toast from './config/toast';
import env from './config/env';
import proxy from './config/proxy';

export default {
  ssr: true,
  loading: false,
  components: false,
  parallel: true,
  cache: true,
  hardSource: true,
  target: 'server',
  /**
   ** Global Env Varialbes
   */
  env,
  /*
   ** Headers of the page
   */
  head,
  /*
   ** Global CSS
   */
  css,
  /*
   ** Plugins to load before mounting the App
   */
  plugins,
  /*
   ** Nuxt.js dev-modules
   */
  // Doc: https://github.com/nuxt-community/eslint-module
  buildModules,
  /*
   ** Nuxt.js modules
   */
  // Doc: https://axios.nuxtjs.org/usage
  modules: ['@nuxtjs/axios'],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:3000',
    headers: {
      common: {
        'Authorization': 'Token 34282c5240d79fc1ff5015e4d805914b144681fc'
      }
    }
  },
  /*
   ** Build configuration
   */
  build,
  toast,
  proxy,

};
