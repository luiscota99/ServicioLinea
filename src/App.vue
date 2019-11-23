<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import EnviarVentas from "@/services/Finanzas/EnviarVentas";
import ObtenerProductos from "@/services/Cafeteria/ObtenerProductos";

export default {
  name: "App",
  components: {},
  methods: {
    async hola() {
      let data = {
        departmentKey: 1125,
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
        total: 701.0
      };
      /*let response = await EnviarVentas.addVentas(data);
      console.log(response.data);*/
    }
  },

  data: () => ({
    //
  })
};
</script>
