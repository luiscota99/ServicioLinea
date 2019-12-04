<template>
  <v-flex xs3 pa-1>
    <v-hover>
      <v-card class="mx-auto" color="gray lighten-4">
        <v-img contain src="" :aspect-ratio="16 / 9"></v-img>

        <v-card-text class="pt-4" style="position: relative;">
          <a href="#" class="botUnit standardbot">
            <div class="preloadCardText"></div>
            <div class="preloadCardTextSub"></div>
          </a>

          <a href="#" class="botUnit standardbot">
            <div class="preloadCardText"></div>
            <div class="preloadCardTextSub"></div>
          </a>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-flex>
</template>
<style scoped>
@keyframes loading {
  0% {
    background-position: -100px;
  }

  100% {
    background-position: 200px;
  }
}

.preloadCardTextSub {
  position: relative;
  height: 15px;
  border-radius: 25px;
  margin-top: 50px;
  width: 100%;
  animation: loading 1s infinite linear;
  background: #dedfe1;
  background-image: -webkit-linear-gradient(
    to right,
    #dedfe1 0%,
    #f2f3f5 20%,
    #dedfe1 40%,
    #dedfe1 100%
  );
  background-image: linear-gradient(
    to right,
    #dedfe1 0%,
    #f2f3f5 20%,
    #dedfe1 40%,
    #dedfe1 100%
  );
  background-repeat: no-repeat;
}
</style>
