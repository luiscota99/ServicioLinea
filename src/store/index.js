import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carrito: []

  },
  getters: {
    // Here we will create a getter
    getProductos: state => {
      return state.carrito;
    },
    getProductosCount: (state, getters) => {
      return getters.getProductos.length;
    }
  },
  mutations: {
    GETPRODUCTOS(state, item) {
      state.carrito.push(item);
    }
  },
  actions: {
    addProduct(context, item) {
      context.commit("GETPRODUCTOS", item);
    }
  },
  modules: {
  }
})
