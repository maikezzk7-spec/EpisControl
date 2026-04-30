import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import cadastro from '../views/cadastro.vue'
import entrega_epis from '../views/entrega_epis.vue'
import historico_epis from '../views/historico_epis.vue'
import dashboard from '../views/dashboard.vue'
import epis from '../views/epis.vue'
import funcionario from '../views/funcionario.vue'
import { useSupabase } from '../composables/useSupabase'

const routes = [
  { 
    path: '/', 
    component: home 
  },
  { 
    path: '/login', 
    component: login 
  },
  { 
    path: '/cadastro', 
    component: cadastro 
  },

  {
    path: '/dashboard',
    component: dashboard,
    meta: { requiresAuth: true },
    children: [
      { path: 'entrega_epis', component: entrega_epis },
      { path: 'historico_epis', component: historico_epis },
      { path: 'epis', component: epis },
      { path: 'funcionario', component: funcionario }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router