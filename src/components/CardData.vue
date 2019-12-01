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
                  :label="userErr ? err : 'No. de Tarjeta'"
                  v-model="user"
                  :error="userErr"
                ></v-text-field>
                <h3 class="ml-1 mt-3">Fecha de vencimiento:</h3>
                <div class="row mx-1">
                  <v-text-field
                    @keyup.enter="login"
                    color="indigo"
                    id="fecha"
                    name="fecha"
                    :label="
                    fechaErr
                      ? 'Datos Incorretcos'
                      : 'Mes'
                  "
                    v-model="fecha"
                    :error="fechaErr"
                  ></v-text-field>
                  <h2 class="mx-5 mt-6">/</h2>
                  <v-text-field
                    @keyup.enter="login"
                    color="indigo"
                    id="fecha"
                    name="fecha"
                    :label="
                    fechaErr
                      ? 'Datos Incorretcos'
                      : 'Año'
                  "
                    v-model="fecha"
                    :error="fechaErr"
                  ></v-text-field>
                </div>
                <v-text-field
                  @keyup.enter="login"
                  color="indigo"
                  id="cvv"
                  name="cvv"
                  :label="
                    cvvErr ? 'Datos Incorrectos' : 'CVV (No. de Seguridad)'
                  "
                  v-model="cvv"
                  :error="cvvErr"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success" dark @click="login">Continuar</v-btn>
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
    fecha: "",
    cvv: "",
    err: "",
    fechaErr: false,
    cvvErr: false,
    userErr: false
  }),

  methods: {
    async login() {
      this.$swal("Hello Vue world!!!");
    },
    registrar() {}
  }
};
</script>

<style></style>
