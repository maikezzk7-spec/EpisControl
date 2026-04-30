<template>
  <div class="dashboard-shell">
    <aside class="sidebar-premium">
      <div class="brand-container">
        <h2 class="brand-logo">EPIS<span>CONTROL</span></h2>
      </div>

      <nav class="navigation-menu">
        <router-link to="/dashboard/epis" class="nav-item">
          <i class="fas fa-hard-hat"></i> <span>Gestão de EPIs</span>
        </router-link>
        
        <router-link to="/dashboard/funcionario" class="nav-item">
          <i class="fas fa-users-cog"></i> <span>Colaboradores</span>
        </router-link>
        
        <router-link to="/dashboard/historico_epis" class="nav-item">
          <i class="fas fa-warehouse"></i> <span>Inventário</span>
        </router-link>
        
        <router-link to="/dashboard/entrega_epis" class="nav-item">
          <i class="fas fa-shuttle-van"></i> <span>Logística de Entrega</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button @click="sair" class="logout-trigger">
          <i class="fas fa-door-open"></i>
          <span>Sair</span>
        </button>
      </div>
    </aside>

    <main class="main-viewport">
      <div class="page-container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useSupabase } from '../composables/useSupabase'
import { useRouter, RouterLink, RouterView } from 'vue-router'

const { supabase } = useSupabase()
const router = useRouter()

async function sair() {
  try {
    await supabase.auth.signOut()
    router.push('/login')
  } catch (err) {
    console.error('Erro ao encerrar sessão:', err)
  }
}
</script>

<style scoped>
/* Reset de layout */
.dashboard-shell {
  display: flex;
  height: 100vh;
  background-color: #f1f5f9;
  font-family: 'Inter', sans-serif;
}

/* SIDEBAR PREMIUM */
.sidebar-premium {
  width: 280px;
  background-color: #0f172a;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  position: fixed;
  height: 100vh;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 100;
  box-sizing: border-box; /* Garante que o padding não quebre a altura */
}

/* Branding */
.brand-container {
  margin-bottom: 14px;
  text-align: center;
}

.brand-logo {
  color: #fff;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: 3px;
}

.brand-logo span {
  color: #f7ff00;
}

/* Menu de Navegação */
.navigation-menu {/* Faz o menu ocupar o espaço disponível, empurrando o footer para baixo */
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 14px 20px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-item i {
  font-size: 18px;
  width: 25px;
}

/* Estado Ativo e Hover */
.nav-item:hover, .router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.router-link-active {
  background-color: #fff !important;
  color: #0f172a !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Rodapé e Botão Sair */
.sidebar-footer {
  margin-top: auto; /* Garante que o container fique na base da sidebar */
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Linha divisória sutil */
}

.logout-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  transition: nome;
}

.logout-trigger:hover {
  background: #38bdf8;
  color: #fff;
}

/* ÁREA DE CONTEÚDO */
.main-viewport {
  flex-grow: 1;
  margin-left: 280px;
  padding: 40px;
  overflow-y: auto;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsividade */
@media (max-width: 1024px) {
  .sidebar-premium { width: 80px; padding: 40px 10px; }
  .nav-item span, .brand-logo, .logout-trigger span { display: none; }
  .main-viewport { margin-left: 80px; }
}
</style>