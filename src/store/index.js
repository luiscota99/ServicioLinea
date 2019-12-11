import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    venta: {
      fecha: "",
      nombre_cliente: "",
      observaciones: "",
      codigo_cliente: "0",
      numero_transaccion: 0,
      puntos: 0,
      sala: "",
      asiento: "",
      hora: "",
      estado: "Pendiente",
      productos: [],
      total: 0
    }
  },
  getters: {
    getProductos: state => {
      return state.venta.productos;
    },
    getProductosCount: (state, getters) => {
      return getters.getProductos.length;
    }
  },
  mutations: {
    AGREGARPRODUCTOS(state, item) {
      state.venta.productos.push(item);
    },
    AGREGARCARRITO(state, obj) {
      state.venta = Object.assign({}, obj);
    }
  },
  actions: {
    addProduct(context, item) {
      if (
        this.state.venta.productos.filter(
          producto => producto.nombre == item.nombre
        ).length > 0
      ) {
        this.state.venta.productos = this.state.venta.productos.filter(
          producto => producto.nombre !== item.nombre
        );
        context.commit("AGREGARPRODUCTOS", item);
      } else {
        context.commit("AGREGARPRODUCTOS", item);
      }
      let total = 0;
      this.state.venta.productos.forEach(producto => {
        total += Number(producto.quantity) * Number(producto.amount);
      });
      this.state.venta.total = total;
      localStorage.setItem("venta", JSON.stringify(this.state.venta));
    },
    removeProduct(context, item) {
      this.state.venta.productos = this.state.venta.productos.filter(
        producto => producto.nombre !== item.nombre
      );
      let total = 0;
      this.state.venta.productos.forEach(producto => {
        total += Number(producto.quantity) * Number(producto.amount);
      });
      this.state.venta.total = total;
      //console.log(this.state.venta.productos.length);
      localStorage.setItem("venta", JSON.stringify(this.state.venta));
    },

    setCarrito(context, obj) {
      context.commit("AGREGARCARRITO", obj);
    }
  },
  modules: {}
});
