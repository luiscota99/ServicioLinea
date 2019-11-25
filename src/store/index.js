import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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
    AGREGARPRODUCTOS(state, item) {
      state.carrito.push(item);
    }
  },
  actions: {
    addProduct(context, item) {
      if (
        this.state.carrito.filter(producto => producto.name == item.name).length > 0
      ) {
        this.state.carrito = this.state.carrito.filter(
          producto => producto.name !== item.name
        );
        context.commit("AGREGARPRODUCTOS", item);
      } else {
        context.commit("AGREGARPRODUCTOS", item);
      }
    }
  },
  modules: {}
});
