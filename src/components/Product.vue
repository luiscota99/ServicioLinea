<template>
  <v-flex xs3 pa-1>
    <v-hover>
      <v-card class="mx-auto" color="gray lighten-4">
        <v-img v-if="image" src="https://picsum.photos/id/11/500/300" :aspect-ratio="16 / 9"></v-img>

        <v-card-text class="pt-4" style="position: relative;">
          <v-btn
            v-on:click="addProduct()"
            title="Agregar al Carrito"
            absolute
            color="primary"
            class="white--text"
            fab
            medium
            right
            top
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <div class="subtitle-2 mb-2">{{ producto.nombre }}</div>
          <div class="caption">${{ producto.amount }}</div>
          <v-row no-gutters>
            <v-col sm="8" class="caption">
              Cantidad:
              <span class="ml-2">{{ quantity }}</span>
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

  data: () => ({
    quantity: 0
  }),
  methods: {
    agregarCantidad() {
      this.quantity++;
    },
    restartCantidad() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    },
    addProduct() {
      if (this.quantity > 0) {
        let item = {
          nombre: this.producto.nombre,
          amount: this.producto.amount,
          quantity: this.quantity
        };
        this.$store.dispatch("addProduct", item);
      }
    }
  },
  props: {
    producto: Object,
    image: Boolean
  }
};
</script>

<style>
.mouseOver {
  cursor: pointer;
}
</style>
