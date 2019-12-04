<template>
  <div>
    <Navbar />
    <v-content>
      <v-card class="mx-5 my-5">
        <v-form>
          <div class="row">
            <v-text-field
              class="mx-5"
              v-model="str"
              label="¿Que desea?"
            ></v-text-field>
            <v-btn class="mr-5 my-5" color="primary" @click="buscar(str)"
              >buscar</v-btn
            >
            <v-btn class="mr-5 my-5" outlined color="primary" @click="todo()"
              >mostrar todo</v-btn
            >
          </div>
        </v-form>
      </v-card>
      <v-layout row wrap class="mx-5" v-if="loadedProductos == 1">
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
      <v-layout row wrap class="mx-5" v-else>
        <template>
          <v-flex xs3 pa-1 v-bind:key="i" v-for="(n, i) in repeat">
            <v-hover>
              <v-card class="mx-auto" color="gray lighten-4">
                <v-img contain src="" :aspect-ratio="16 / 9"></v-img>

                <v-card-text class="pt-4" style="position: relative;">
                  <a href="#" class="botUnit standardbot">
                    <div class="preloadCardText"></div>
                    <div class="preloadCardTextSub"></div>
                  </a>

                  <a href="#" class="botUnit standardbot">
                    <div class="preloadCardText"></div>
                    <div class="preloadCardTextSub"></div>
                  </a>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-flex>
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
  name: "productos",
  components: {
    Navbar,
    Product
  },
  data: () => ({
    drawer: null,
    productos: [],
    busqueda: [],
    str: "",
    repeat: 4,
    loadedProductos: 0
  }),
  methods: {
    async getProductos() {
      let response = await ObtenerProductos.getProductos();
      this.productos = response.data;
      let venta = JSON.parse(localStorage.getItem("venta"));
      this.productos.forEach(producto => {
        if (venta && venta.productos.length > 0) {
          let itemVenta = venta.productos.filter(
            item => item.idProducto == producto.productId
          );
          if (itemVenta.length > 0) {
            producto.quantity = itemVenta[0].quantity;
          } else {
            producto.quantity = 0;
          }
        } else {
          producto.quantity = 0;
        }
      });
      this.busqueda = Object.assign([], this.productos);
      this.loadedProductos = 1;
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
<style scoped>
@keyframes loading {
  0% {
    background-position: -100px;
  }

  100% {
    background-position: 200px;
  }
}

.preloadCardTextSub {
  position: relative;
  height: 15px;
  border-radius: 25px;
  margin-top: 50px;
  width: 100%;
  animation: loading 1s infinite linear;
  background: #dedfe1;
  background-image: -webkit-linear-gradient(
    to right,
    #dedfe1 0%,
    #f2f3f5 20%,
    #dedfe1 40%,
    #dedfe1 100%
  );
  background-image: linear-gradient(
    to right,
    #dedfe1 0%,
    #f2f3f5 20%,
    #dedfe1 40%,
    #dedfe1 100%
  );
  background-repeat: no-repeat;
}
</style>
