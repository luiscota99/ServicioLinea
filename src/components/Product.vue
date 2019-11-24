<template>
<div class="row">
  <v-card  max-width="400" class="mx-auto" v-for="producto in this.productos" :key="producto._id"> <div >{{producto.nombre}} </div> </v-card>
</div>
</template>

<script>
import ObtenerProductos from "@/services/Cafeteria/ObtenerProductos";

export default {
  name: "Product",

  data: () => ({
    productos :[], 
  }),
    
  methods: {
   async getProductos(){
      let response = await ObtenerProductos.getProductos();
      this.productos = response.data;
      console.log("Los productos disponibles son: ");
      console.log(this.productos);
    }
  },
  beforeMount(){
    this.getProductos();
  }
};
</script>
