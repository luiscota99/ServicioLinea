<template>
  <div>
    <Navbar />
    <v-content>
      <v-card class="mx-5 my-5">
        <v-form>
          <div class="row">
            <v-text-field class="mx-5" v-model="str" label="Nombre del producto"></v-text-field>
            <v-btn class="mr-5 my-5" color="primary" @click="buscar(str)">buscar</v-btn>
            <v-btn class="mr-5 my-5" outlined color="primary" @click="todo()">mostrar todo</v-btn>
          </div>
          <div class="row">
            <v-btn class="mx-5 mb-5" color="success" @click="comprar()">comprar</v-btn>
            <h3 class="mt-1 mb-5">Total a pagar: ${{ total }}</h3>
          </div>
          <div class="row">
            <v-text-field class="mx-5" label="Nombre del cliente"></v-text-field>
            <v-text-field class="mr-5" label="Sala"></v-text-field>
            <v-text-field class="mr-5" label="Asiento"></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  class="mr-5"
                  v-model="time"
                  label="Hora a partir para entregar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="time"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </div>
          <v-textarea class="mx-3" v-model="comentarios" name="comentarios" label="Comentarios"></v-textarea>
        </v-form>
      </v-card>
      <v-layout row wrap class="mx-5">
        <template>
          <Product
            v-for="(producto, index) in busqueda"
            :producto="producto"
            :image="true"
            :key="index"
            :view="'carrito'"
            @update-total="updateTotal"
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

export default {
  name: "carrito",
  components: {
    Navbar,
    Product
  },
  data: () => ({
    drawer: null,
    productos: [],
    busqueda: [],
    str: "",
    comentarios: "",
    total: 0,
    time: null,
    menu2: false
  }),
  methods: {
    updateTotal(total) {
      this.total = total;
    },
    getProductos() {
      let response = [];
      if (localStorage.getItem("venta")) {
        response = JSON.parse(localStorage.getItem("venta"));
      }
      this.total = response.total;
      this.productos = response.productos;
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
    },
    comprar() {
      this.$router.push("iniciarSesion");
    }
  },
  beforeMount() {
    this.getProductos();
  }
};
</script>
