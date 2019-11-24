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
              <v-btn outlined color="indigo" dark @click="registrar">Saltar</v-btn>
              <v-btn color="indigo" dark @click="login">Acceder</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
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
    async login() {},
    registrar() {}
  }
};
</script>

<style>
</style>
