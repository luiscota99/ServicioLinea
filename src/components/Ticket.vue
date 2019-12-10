<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-row>
        <v-col>
          <v-card class="elevation-12">
            <v-toolbar dark color="indigo">
              <v-toolbar-title>Ticket 12345</v-toolbar-title>
            </v-toolbar>
            <v-list-item>
              <v-list-item-title>Para entregar el {{ticket.fecha}} a partir de las {{ticket.hora}}</v-list-item-title>
            </v-list-item>
            <v-list-item v-for="(producto, index) in this.productos" :key="index">
              <v-list-item-title>{{producto.quantity}} {{producto.nombre}}</v-list-item-title>
              <v-list-item-subtitle>{{producto.quantity * producto.amount}}$</v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Total pagado: {{ticket.total}}$</v-list-item-title>
              <v-list-item-subtitle>Estado: {{ticket.estado}}</v-list-item-subtitle>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    ticket: {},
    productos: []
  }),

  methods: {
    async login() {
      this.$swal("Hello Vue world!!!");
    },
    cargarDatos() {
      if (JSON.parse(localStorage.getItem("ventaPagada"))) {
        this.ticket = JSON.parse(localStorage.getItem("ventaPagada"));
        this.productos = JSON.parse(
          localStorage.getItem("ventaPagada")
        ).productos;
      }
    }
  },
  beforeMount() {
    this.cargarDatos();
  }
};
</script>

<style></style>
