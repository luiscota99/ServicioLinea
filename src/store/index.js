import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    carrito: []
  },
  getters: {
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
    },
    AGREGARCARRITO(state, obj) {
      state.carrito = Object.assign([], obj);
    }
  },
  actions: {
    addProduct(context, item) {
      if (
        this.state.carrito.filter(producto => producto.nombre == item.nombre)
          .length > 0
      ) {
        this.state.carrito = this.state.carrito.filter(
          producto => producto.nombre !== item.nombre
        );
        context.commit("AGREGARPRODUCTOS", item);
      } else {
        context.commit("AGREGARPRODUCTOS", item);
      }
      localStorage.setItem("carrito", JSON.stringify(this.state.carrito));
      console.log(JSON.parse(localStorage.getItem("carrito")));
    },
    setCarrito(context, obj) {
      context.commit("AGREGARCARRITO", obj);
    }
  },
  modules: {}
});
