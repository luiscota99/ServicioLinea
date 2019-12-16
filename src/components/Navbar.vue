<template>
  <nav>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item to="/productos">
          <v-list-item-action>
            <v-icon>mdi-popcorn</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Comprar Productos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/peliculas">
          <v-list-item-action>
            <v-icon>mdi-ticket</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Funciones Disponibles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/boletos">
          <v-list-item-action>
            <v-icon>mdi-ticket-confirmation</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Boletos Comprados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/recibo">
          <v-list-item-action>
            <v-icon>mdi-ticket-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Recibo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Venta en Linea</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-badge color="red" overlap class="align-self-center">
        <template v-slot:badge>
          <span v-if="getProductos > 0">{{ getProductos }}</span>
        </template>
        <v-btn
          title="Proceder con la compra"
          fab
          dark
          small
          color="primary"
          @click="compra()"
        >
          <v-icon dark>mdi-cart</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>
  </nav>
</template>

<script>
import SolicitarTransferencia from "@/services/Banco/SolicitarTransferencia";
import EnviarVentas from "@/services/Finanzas/EnviarVentas";
import ObtenerProductos from "@/services/Cafeteria/ObtenerProductos";
import EnviarPedido from "@/services/ServicioSalas/EnviarPedido";
import VentaService from "@/services/BackEnd/VentaService";
import Asientos from "@/services/Taquilla/Asientos";
import Peliculas from "@/services/Taquilla/Peliculas";

export default {
  name: "Navbar",
  computed: {
    getProductos() {
      return this.$store.getters.getProductosCount;
    }
  },

  methods: {
    compra() {
      if (JSON.parse(localStorage.getItem("venta"))) {
        this.$router.push("/carrito").catch(err => {});
      } else {
        this.$swal("No hay productos en el carrito", "", "warning");
      }
    },

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

    async hola5() {
      let data = {
        fecha: "2019-11-04",
        nombre_cliente: "Omar",
        observaciones: "Ninguna",
        sala: "a2",
        asiento: "h22",
        hora: "10:00:00",
        estado: "Entregado",
        productos: [
          {
            producto_id: 1,
            nombre: "Coca cola",
            cantidad: 4
          },
          {
            pedido_id: 2,
            nombre: "Roco",
            cantidad: 1
          }
        ]
      };
      let response = await EnviarPedido.postPedido(data);
      console.log("el pedido es: ");
      console.log(response.data);
    },
    async hola4() {
      let response = await VentaService.getVentas();
      console.log("Ventas: ");
      console.log(response.data);
    },
    async hola6() {
      let response = await Asientos.getAsientos();
      console.log("Ventas: ");
      console.log(response.data);
    }
  },

  data: () => ({
    drawer: null,
    cuantity: 0
  })
};
</script>
