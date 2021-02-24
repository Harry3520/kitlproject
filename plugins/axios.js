 import { checkApiAccessPermission } from '~/utils/permission';

 export default ({ app, $axios ,store, dispatch }) => {

  $axios.interceptors.request.use((config) => {
    store.dispatch('carts/set_loader', true, { root: true });
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  $axios.interceptors.response.use((response) => {
    store.dispatch('carts/set_loader', false, { root: true });
    return response;
  }, (error) => {
    return Promise.reject(error);
  })
}
