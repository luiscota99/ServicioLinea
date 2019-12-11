<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-row>
        <v-col>
          <v-card class="elevation-12">
            <v-toolbar dark color="indigo">
              <v-toolbar-title>Informacion de la Tarjeta</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form autocomplete="off">
                <v-text-field
                  @keyup.enter="login"
                  color="indigo"
                  name="login"
                  :label="userErr ? 'Datos no validos' : 'No. de Tarjeta'"
                  v-model="user"
                  :error="userErr"
                ></v-text-field>
                <h3 class="ml-1 mt-3">Fecha de vencimiento:</h3>
                <div class="row mx-1">
                  <v-text-field
                    @keyup.enter="login"
                    color="indigo"
                    id="mes"
                    name="mes"
                    :label="
                    fecha1Err
                      ? 'Mes no valido'
                      : 'Mes'
                    "
                    v-model="mes"
                    :error="fecha1Err"
                  ></v-text-field>
                  <h2 class="mx-5 mt-6">/</h2>
                  <v-text-field
                    @keyup.enter="login"
                    color="indigo"
                    id="anio"
                    name="anio"
                    :label="
                    fecha2Err
                      ? 'Año no valido'
                      : 'Año'
                  "
                    v-model="anio"
                    :error="fecha2Err"
                  ></v-text-field>
                </div>
                <v-text-field
                  @keyup.enter="login"
                  color="indigo"
                  id="cvv"
                  name="cvv"
                  :label="
                    cvvErr ? 'Datos no validos' : 'CVV (No. de Seguridad)'
                  "
                  v-model="cvv"
                  :error="cvvErr"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" dark @click="transferencia()">Continuar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import SolicitarTransferencia from "@/services/Banco/SolicitarTransferencia";
import EnviarPedido from "@/services/ServicioSalas/EnviarPedido";

export default {
  data: () => ({
    cuentaCine: "5050136422510762",
    show: false,
    user: "",
    mes: "",
    anio: "",
    cvv: "",
    fecha1Err: false,
    fecha2Err: false,
    cvvErr: false,
    userErr: false
  }),

  methods: {
    async login() {
      this.$swal("Hello Vue world!!!");
    },
    async transferencia() {
      if (
        this.checkUser() &&
        this.checkMes() &&
        this.checkAnio() &&
        this.checkCvv()
      ) {
        if (JSON.parse(localStorage.getItem("venta"))) {
          let venta = JSON.parse(localStorage.getItem("venta"));
          let trans = {
            tarjeta_origen: this.user,
            fecha_vencimiento: this.mes + "/" + this.anio,
            cvv: this.cvv,
            tarjeta_destino: this.cuentaCine,
            monto: venta.total
          };
          try {
            let res = await SolicitarTransferencia.postTransferencia(trans);
            if (res.status === 200) {
              venta.numero_transaccion = res.data.data.id;
              this.$swal("Transaccion realizada exitosamente", "", "success");
              localStorage.setItem("ventaPagada", JSON.stringify(venta));
              localStorage.removeItem("venta");
              this.enviarPedido();
            } else {
              this.$swal(
                "Algo salio mal favor de volverlo a intentar",
                "",
                "warning"
              );
            }
          } catch {
            this.$swal(
              "Algo salio mal favor de volverlo a intentar",
              "",
              "warning"
            );
          }
        }
      }
    },
    async enviarPedido() {
      if (JSON.parse(localStorage.getItem("ventaPagada"))) {
        let res = await EnviarPedido.postPedido(
          JSON.parse(localStorage.getItem("ventaPagada"))
        );
        console.log(res);
      }
    },

    checkMes() {
      this.fecha1Err = false;
      let numero = /^\d*$/;
      if (
        this.mes.length > 2 ||
        this.mes.length < 2 ||
        !numero.test(this.mes)
      ) {
        this.fecha1Err = true;
        return false;
      } else {
        return true;
      }
    },

    checkAnio(fecha, err) {
      this.fecha2Err = false;
      let numero = /^\d*$/;
      if (
        this.anio.length > 2 ||
        this.anio.length < 2 ||
        !numero.test(this.anio)
      ) {
        this.fecha2Err = true;
        return false;
      } else {
        return true;
      }
    },

    checkUser() {
      this.userErr = false;
      let numero = /^\d*$/;
      if (
        this.user.length > 16 ||
        this.user.length < 16 ||
        !numero.test(this.user)
      ) {
        this.userErr = true;
        return false;
      } else {
        return true;
      }
    },

    checkCvv() {
      this.cvvErr = false;
      let numero = /^\d*$/;
      if (
        this.cvv.length > 3 ||
        this.cvv.length < 3 ||
        !numero.test(this.cvv)
      ) {
        this.cvvErr = true;
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style></style>
