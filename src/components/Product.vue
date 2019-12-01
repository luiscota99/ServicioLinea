<template>
  <v-flex xs3 pa-1>
    <v-hover>
      <v-card class="mx-auto" color="gray lighten-4">
        <v-img
          v-if="image"
          src="https://picsum.photos/id/11/500/300"
          :aspect-ratio="16 / 9"
        ></v-img>

        <v-card-text class="pt-4" style="position: relative;">
          <v-btn
            :class="{ red: view == 'carrito', primary: view == 'productos' }"
            v-on:click="addProduct()"
            title="Agregar al Carrito"
            absolute
            class="white--text"
            fab
            medium
            right
            top
          >
            <v-icon v-if="view == 'productos'">mdi-plus</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </v-btn>
          <div class="subtitle-2 mb-2">{{ producto.nombre }}</div>
          <div class="caption">${{ producto.amount }}</div>
          <v-row no-gutters>
            <v-col sm="8" class="caption">
              Cantidad:
              <span class="ml-2">{{ producto.quantity }}</span>
            </v-col>

            <v-col sm="4" class="text-right">
              <span class="mouseOver" @click="restartCantidad">
                <v-icon>mdi-minus</v-icon>
              </span>
              <span class="mouseOver" @click="agregarCantidad">
                <v-icon>mdi-plus</v-icon>
              </span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-flex>
</template>

<script>
export default {
  name: "Product",

  data: () => ({}),
  methods: {
    async agregarCantidad() {
      this.producto.quantity++;
      if (this.view == "carrito") {
        let item = {
          nombre: this.producto.nombre,
          amount: this.producto.amount,
          quantity: this.producto.quantity
        };
        await this.removeLocalStorage(item);
        await this.addLocalStorage(item);
        await this.updateTotal();
      }
    },
    async restartCantidad() {
      if (this.producto.quantity > 0) {
        this.producto.quantity--;
      }
      if (this.view == "carrito") {
        let item = {
          nombre: this.producto.nombre,
          amount: this.producto.amount,
          quantity: this.producto.quantity
        };
        await this.removeLocalStorage(item);
        if (this.producto.quantity != 0) {
          await this.addLocalStorage(item);
        }
        await this.updateTotal();
      }
    },
    async addProduct() {
      let item = {
        nombre: this.producto.nombre,
        amount: this.producto.amount,
        quantity: this.producto.quantity
      };
      if (this.view == "productos") {
        if (this.producto.quantity > 0) {
          this.$store.dispatch("addProduct", item);
        }
      } else {
        await this.removeLocalStorage(item);
        await this.updateTotal();
        this.$el.parentNode.removeChild(this.$el);
      }
    },
    async addLocalStorage(item) {
      this.$store.dispatch("addProduct", item);
    },
    async removeLocalStorage(item) {
      this.$store.dispatch("removeProduct", item);
    },
    async updateTotal() {
      let venta = JSON.parse(localStorage.getItem("venta"));
      let newtotal = 0;
      if (venta.productos) {
        venta.productos.forEach(producto => {
          newtotal += Number(producto.quantity) * Number(producto.amount);
        });
      } else {
        newtotal = 0;
      }
      this.$emit("update-total", newtotal);
    }
  },
  props: {
    producto: Object,
    image: Boolean,
    view: String
  }
};
</script>

<style>
.mouseOver {
  cursor: pointer;
}
</style>
