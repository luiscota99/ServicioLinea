<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
        <v-list dense>
          <v-list-item @click="hola()">
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Corte de Ventas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-contact-mail</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Obtener Productos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="indigo" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>

      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex text-xs-center></v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import SolicitarTransferencia from "@/services/Banco/SolicitarTransferencia";
import EnviarVentas from "@/services/Finanzas/EnviarVentas";
import ObtenerProductos from "@/services/Cafeteria/ObtenerProductos";
import EnviarPedido from "@/services/ServicioSalas/EnviarPedido";

export default {
  name: "HelloWorld",

  methods: {
    async hola() {
      let data = {
        tarjeta_origen: "4050",
        tarjeta_destino: "5566",
        monto: 55
      };
      let response = await SolicitarTransferencia.postTransferencia(data);
      console.log(response.data);
      console.log(data);
    },

    async hola2() {
      let data = {
        departmentKey: 4,
        date: "2019-11-12T00:00:00",
        productList: [
          {
            productId: 32,
            name: "Palomitas",
            quantity: 3,
            amount: 230.0
          },
          {
            productId: 48,
            name: "Gomitas",
            quantity: 3,
            amount: 100.5
          },
          {
            productId: 69,
            name: "BoletoA1",
            quantity: 1,
            amount: 20.0
          },
          {
            productId: 31,
            name: "Cafreeze",
            quantity: 3,
            amount: 230.0
          },
          {
            productId: 48,
            name: "Chocolates",
            quantity: 3,
            amount: 100.5
          },
          {
            productId: 69,
            name: "BoletoA3",
            quantity: 1,
            amount: 20.0
          }
        ],
        total: 720.0
      };
      let response = await EnviarVentas.addVentas(data);
      console.log("Datos del Cierre: ");
      console.log(data);
      console.log("Respuesta: ");
      console.log(response.data);
    },

    async hola3() {
      let response = await ObtenerProductos.getProductos();
      console.log("Los productos disponibles son: ");
      console.log(response.data);
    },

    async hola3() {
      let response = await EnviarPedido.postPedido();
      console.log("Los productos disponibles son: ");
      console.log(response.data);
    }
  },

  data: () => ({
    drawer: null
  })
};
</script>
