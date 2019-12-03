import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Productos from "../views/Productos.vue";
import Carrito from "../views/Carrito.vue";
import Sesion from "../views/Sesion.vue";
import Pago from "../views/Pago.vue";
import Peliculas from "../views/Peliculas.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
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
  },{
    path : "/peliculas",
    name : "peliculas",
    component : Peliculas
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
