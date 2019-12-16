<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-row>
        <v-col>
          <v-card class="elevation-12">
            <v-toolbar dark color="indigo">
              <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form autocomplete="off">
                <v-text-field
                  @keyup.enter="login"
                  color="indigo"
                  prepend-icon="mdi-account"
                  name="login"
                  :label="userErr ? err : 'No. de Membresia'"
                  v-model="user"
                  :error="userErr"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined color="primary" dark @click="saltar()">Saltar</v-btn>
              <v-btn color="primary" dark @click="login()">Acceder</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import ObtenerMembresia from "../services/Membresia/ObtenerMembresia";

export default {
  data: () => ({
    show: false,
    user: "",
    pass: "",
    err: "",
    userErr: false,
    passErr: false
  }),

  methods: {
    async login() {
      let res = await ObtenerMembresia.getMembresia({ id: Number(this.user) });
      console.log(res.data);
      if (res.data.statusCode === 500) {
        this.$swal(res.data.mensaje, "", "warning");
      } else {
        localStorage.setItem("sesion", JSON.stringify(res.data));
        this.$router.push("puntos");
      }
    },
    saltar() {
      this.$router.push("pago");
    }
  }
};
</script>

<style>
</style>
