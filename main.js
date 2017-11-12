/* eslint-disable no-new */
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(VueMaterial);

// eslint-disable-next-line no-undef
document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    components: {
      App,
    },
    render: h => h(App),
  });
});