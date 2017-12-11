import Vue from 'vue';
import ObserveVisibility from 'vue-observe-visibility';
import Link from '~/components/Link';
import FontAwesome from '~/components/FontAwesome';
import OptimizedImage from '~/components/OptimizedImage';

Vue.use(ObserveVisibility);
Vue.component('Link', Link);
Vue.component('FontAwesome', FontAwesome);
Vue.component('OptimizedImage', OptimizedImage);
