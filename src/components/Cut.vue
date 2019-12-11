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
        let fecha = { fecha: "2019-02-10" };
        let res = await VentaService.getVentas(fecha);
        console.log(res.data);
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
