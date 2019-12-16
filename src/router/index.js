import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Productos from "../views/Productos.vue";
import Carrito from "../views/Carrito.vue";
import Sesion from "../views/Sesion.vue";
import Pago from "../views/Pago.vue";
import Peliculas from "../views/Peliculas.vue";
import Asientos from "../views/Asientos.vue";
import Corte from "../views/Corte.vue";
import Boletos from "../views/Boletos.vue";
import Recibo from "../views/Recibo.vue";
import Puntos from "../views/Puntos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Peliculas
  },
  {
    path: "/productos",
    name: "productos",
    component: Productos
  },
  {
    path: "/carrito",
    name: "carrito",
    component: Carrito
  },
  {
    path: "/iniciarSesion",
    name: "iniciarSesion",
    component: Sesion
  },
  {
    path: "/pago",
    name: "pago",
    component: Pago
  },
  {
    path: "/peliculas",
    name: "peliculas",
    component: Peliculas
  },
  {
    path:
      "/sala/:sala/horario/:horario/pelicula/:pelicula/precio/:precio/tipo/:tipo",
    name: "asientos",
    component: Asientos
  },
  {
    path: "/corte",
    name: "corte",
    component: Corte
  },
  {
    path: "/boletos",
    name: "boletos",
    component: Boletos
  },
  {
    path: "/recibo",
    name: "recibo",
    component: Recibo
  },
  {
    path: "/puntos",
    name: "puntos",
    component: Puntos
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
