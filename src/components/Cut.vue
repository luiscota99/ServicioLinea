<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-row>
        <v-col>
          <v-card class="elevation-12">
            <v-toolbar dark color="indigo">
              <v-toolbar-title>Realizar Corte</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form autocomplete="off">
                <v-text-field
                  @keyup.enter="login"
                  color="indigo"
                  prepend-icon="mdi-account"
                  name="login"
                  :label="userErr ? 'Usuario Incorrecto' : 'Usuario'"
                  v-model="user"
                  :error="userErr"
                ></v-text-field>
                <v-text-field
                  @keyup.enter="login"
                  color="indigo"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  :label="passErr ? 'Contraseña incorrecta' : 'Contraseña'"
                  :type="show ? 'text' : 'password'"
                  v-model="pass"
                  :error="passErr"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" dark @click="corte()">Realizar Corte</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import VentaService from "@/services/BackEnd/VentaService";
import EnviarVentas from "@/services/Finanzas/EnviarVentas";

export default {
  data: () => ({
    show: false,
    user: "",
    pass: "",
    userErr: false,
    passErr: false
  }),

  methods: {
    async login() {},

    async corte() {
      if (this.checkUser() && this.checkPass()) {
        //let fecha = { fecha: "2019-02-10" };
        let res = await VentaService.getVentas();
        let fecha = new Date(res.data.date);
        let day = "";
        let month = "";

        if (fecha.getDate() < 10) {
          day = "0" + fecha.getDate();
        } else {
          day = "" + fecha.getDate();
        }

        if (fecha.getMonth() < 9) {
          month = "0" + (fecha.getMonth() + 1);
        } else {
          month = "" + (fecha.getMonth() + 1);
        }

        fecha = fecha.getFullYear() + "-" + month + "-" + day + "T00:00:00";

        let venta = {
          date: fecha,
          departmentKey: res.data.departmentKey,
          productList: res.data.productList,
          total: res.data.total
        };

        console.log(venta);

        /*let venta = {
          departmentKey: 4,
          date: "2019-11-12T00:00:00",
          productList: [
            {
              productId: 32,
              name: "Palomitas",
              quantity: 3,
              amount: 230
            },
            {
              productId: 48,
              name: "Gomitas",
              quantity: 3,
              amount: 100
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
          total: 720
        };*/

        //console.log(venta);

        let response = await EnviarVentas.addVentas(venta);
        console.log(response);
        if (res.status === 200) {
          this.$swal("Se realizo el corte correctamente", "", "success");
        } else {
          this.$swal(
            "Algo salio mal favor de volverlo a intentar",
            "",
            "warning"
          );
        }
      }
    },

    checkUser() {
      this.userErr = false;
      if (this.user !== "admin") {
        this.userErr = true;
        return false;
      } else {
        return true;
      }
    },

    checkPass() {
      this.passErr = false;
      if (this.pass !== "12345") {
        this.passErr = true;
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style>
</style>
