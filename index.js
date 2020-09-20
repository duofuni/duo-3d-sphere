import sphere from './src/index.vue'

const duo3DSphere = {
  install: Vue => {
    Vue.component('duo-3d-sphere', sphere)
  }
}

export default duo3DSphere