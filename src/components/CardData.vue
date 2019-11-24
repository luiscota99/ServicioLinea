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
                  prepend-icon="mdi-counter"
                  name="login"
                  :label="userErr ? err : 'No. de Tarjeta'"
                  v-model="user"
                  :error="userErr"
                ></v-text-field>
                <v-text-field
                  @keyup.enter="login"
                  color="indigo"
                  id="name"
                  prepend-icon="mdi-alphabetical"
                  name="name"
                  :label="nameErr ? 'Datos Incorretcos' : 'Nombre completo del propietario'"
                  v-model="name"
                  :error="nameErr"
                ></v-text-field>
                <v-text-field
                  @keyup.enter="login"
                  color="indigo"
                  id="cvv"
                  prepend-icon="mdi-barcode"
                  name="cvv"
                  :label="cvvErr ? 'Datos Incorrectos' : 'CVV (No. de Seguridad)'"
                  v-model="cvv"
                  :error="cvvErr"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="indigo" dark @click="login">Continuar</v-btn>
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
    name: "",
    cvv: "",
    err: "",
    userErr: false,
    nameErr: false,
    csvErr: false
  }),

  methods: {
    async login() {},
    registrar() {}
  }
};
</script>

<style>
</style>
