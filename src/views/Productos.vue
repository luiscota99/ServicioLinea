<template>
  <div>
    <Navbar />
    <v-content>
      <v-card class="mx-5 my-5">
        <v-form>
          <div class="row">
            <v-text-field class="mx-5" v-model="str" label="¿Que desea?"></v-text-field>
            <v-btn class="mr-5 my-5" color="primary" @click="buscar(str)">buscar</v-btn>
            <v-btn class="mr-5 my-5" outlined color="primary" @click="todo()">mostrar todo</v-btn>
          </div>
        </v-form>
      </v-card>
      <v-layout row wrap class="mx-5">
        <template>
          <Product
            v-for="(producto, index) in busqueda"
            :producto="producto"
            :image="true"
            :key="index"
            :view="'productos'"
          />
        </template>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import ObtenerProductos from "@/services/Cafeteria/ObtenerProductos";
import Navbar from "@/components/Navbar.vue";
import Product from "@/components/Product.vue";
import { log } from "util";

export default {
  name: "productos",
  components: {
    Navbar,
    Product
  },
  data: () => ({
    drawer: null,
    productos: [],
    busqueda: [],
    str: ""
  }),
  methods: {
    async getProductos() {
      let response = await ObtenerProductos.getProductos();
      this.productos = response.data;
      let venta = [];
      if (localStorage.getItem("venta")) {
        venta = Object.assign(
          [],
          JSON.parse(localStorage.getItem("venta")).productos
        );
      }
      this.productos.forEach(producto => {
        producto.quantity = 0;
        venta.forEach(item => {
          if (item.idProducto === producto.productId)
            producto.quantity = item.quantity;
        });
      });
      this.busqueda = Object.assign([], this.productos);
    },
    buscar(str) {
      str = str.toLowerCase();
      this.busqueda = [];
      this.productos.forEach(producto => {
        if (producto.nombre.toLowerCase().includes(str))
          this.busqueda.push(producto);
      });
    },
    todo() {
      this.busqueda = Object.assign([], this.productos);
    }
  },
  beforeMount() {
    this.getProductos();
  }
};
</script>
