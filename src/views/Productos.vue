<template>
  <div>
    <Navbar />
    <v-content>
    <v-layout row wrap>
      <template v-for="producto in productos" >
          <Product :producto="producto"  :image="true" :key="producto._id"/>  
      </template></v-layout>  </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import ObtenerProductos from "@/services/Cafeteria/ObtenerProductos";
import Navbar from "@/components/Navbar.vue";
import Product from "@/components/Product.vue";

export default {
  name: "home",
  components: {
    Navbar,
    Product
  },
  data: () => ({
    drawer: null,
    productos: []
  }),
  methods: {
    async getProductos() {
      let response = await ObtenerProductos.getProductos();
      this.productos = response.data;
    }
  },
  beforeMount() {
    this.getProductos();
  }
};
</script>
