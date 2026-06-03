<template>
  <div class="dashboard-shell">
    <aside class="sidebar-premium">
      <div class="brand-container">
        <h2 class="brand-logo">EPIS<span>CONTROL</span></h2>
      </div>

      <nav class="navigation-menu">
        <router-link to="/dashboard" exact-active-class="active-link-premium" class="nav-item">
          <i class="fas fa-chart-pie"></i> <span>Dashboard</span>
        </router-link>

        <router-link to="/dashboard/funcionario" active-class="active-link-premium" class="nav-item">
          <i class="fas fa-hard-hat"></i> <span>Funcionários</span>
        </router-link>
        
        <router-link to="/dashboard/epis" class="nav-item" active-class="active-link-premium">
          <i class="fas fa-users-cog"></i> <span>EPIs</span>
        </router-link>
        
        <router-link to="/dashboard/entrega_epis" class="nav-item" active-class="active-link-premium">
          <i class="fas fa-warehouse"></i> <span>Entregas</span>
        </router-link>
        
        <router-link to="/dashboard/historico_epis" class="nav-item" active-class="active-link-premium">
          <i class="fas fa-shuttle-van"></i> <span>Relatórios</span>
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
        
        <div v-if="$route.path === '/dashboard'" class="dashboard-welcome-page">
          
          <header class="top-header">
            <div class="header-title-container">
              <img src="../assets/Segurança Elétrica.svg" alt="Segurança" class="header-icon-img">
              <h1 class="page-title">Painel de Dashboard</h1>
            </div>
            <div class="user-profile">
              <img src="../assets/Usuário.svg" alt="Usuário" class="user-avatar-img">
            </div>
          </header>

          <hr class="view-divider">
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="card-top">
                <img src="../assets/Funcionários.svg" alt="Funcionários" class="card-icon-img">
                <span class="card-name">Funcionários</span>
              </div>
              <div class="card-bottom">
                <span class="card-dots">...</span>
                <span class="card-qty">{{ totalFuncionarios }}</span>
              </div>
            </div>

            <div class="metric-card">
              <div class="card-top">
                <img src="../assets/Capacete Azul.svg" alt="Capacete Azul" class="card-icon-img">
                <span class="card-name">Estoque</span>
              </div>
              <div class="card-bottom">
                <span class="card-dots">...</span>
                <span class="card-qty">{{ totalEpis }}</span>
              </div>
            </div>

            <div class="metric-card">
              <div class="card-top">
                <img src="../assets/Prancheta.svg" alt="Prancheta" class="card-icon-img">
                <span class="card-name text-green">Entregas</span>
              </div>
              <div class="card-bottom">
                <span class="card-dots">...</span>
                <span class="card-qty text-green">{{ totalEntregas }}</span>
              </div>
            </div>

            <div class="metric-card">
              <div class="card-top">
                <img src="../assets/Vencendo.svg" alt="Vencendo" class="card-icon-img">
                <span class="card-name text-orange">Vencendo</span>
              </div>
              <div class="card-bottom">
                <span class="card-dots">...</span>
                <span class="card-qty text-orange">{{ totalVencendo }}</span>
              </div>
            </div>
          </div>

          <section class="results-table-section">
            <h2 class="table-section-title">Entregas</h2>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Funcionário</th>
                    <th>EPIs</th>
                    <th>Data</th>
                    <th>Quantidade</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="entrega in entregasValidas"
                    :key="entrega.id"
                    >
                    <td>{{ entrega.funcionarios?.nome }}</td>
                    <td>{{ entrega.epis?.nome }}</td>
                    <td>{{entrega.data_entrega
                          ? new Date(entrega.data_entrega).toLocaleDateString('pt-BR')
                          : '-' }}</td>
                    <td>{{ entrega.quantidade }}</td>
                    <td>
                      <span 
                      class="status-pill"
                      :class="{
                        'status-boa': entrega.status === 'Boa',
                        'status-regular': entrega.status === 'Regular',
                        'status-descartar': entrega.status === 'Descartar'
                      }">
                        {{ entrega.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

        <RouterView v-else />

      </div>
    </main>
  </div>
</template>

 <script setup>
 import { ref, onMounted } from 'vue'
 import { useSupabase } from '../composables/useSupabase'
 import { useRouter, RouterLink, RouterView } from 'vue-router'

 const { supabase } = useSupabase()
 const router = useRouter()

/* CARDS */
 const totalFuncionarios = ref(0)
 const totalEpis = ref(0)
 const totalEntregas = ref(0)
 const totalVencendo = ref(0)
 const entregasValidas = ref([])

  /* FUNÇÃO DA TABELA */
 async function carregarEntregas() {

  const { data, error } = await supabase
    .from('entrega_epis')
    .select(`
      *,
      epis (
        nome,
       validade_dias
     ),
     funcionarios (
     nome
    )
 `)

  if (error) {
    console.error(error)
    return
  }

   const entregasProcessadas = (data || []).map(entrega => {

    let status = 'Boa'

   const validadeDias = entrega.epis?.validade_dias || 0

   const dataEntrega = entrega.data_entrega
   ? new Date(entrega.data_entrega)
   : new Date()

   const hoje = new Date()

   const diasPassados = Math.floor(
   (hoje - dataEntrega) / (1000 * 60 * 60 * 24)
 )

   const diasRestantes = validadeDias - diasPassados

    if (diasRestantes > 30) {
      status = 'Boa'
    } else if (diasRestantes > 7) {
      status = 'Regular'
    } else {
      status = 'Descartar'
    }

    return {
      ...entrega,
      status
    }
  })

  entregasValidas.value = entregasProcessadas.filter(
    entrega => entrega.funcionario_id && entrega.epi_id
 )
 }

/* FUNÇÃO DOS CARDS */
async function carregarCards() {

  // Funcionários
  const { count: funcionarios } = await supabase
    .from('funcionarios')
    .select('*', { count: 'exact', head: true })

  totalFuncionarios.value = funcionarios || 0

  // EPIs
  const { count: epis } = await supabase
    .from('epis')
    .select('*', { count: 'exact', head: true })

  totalEpis.value = epis || 0

  // Entregas
  const { count: totalEntregasCount } = await supabase
    .from('entrega_epis')
    .select('*', { count: 'exact', head: true })

  totalEntregas.value = totalEntregasCount || 0

  // Vencendo
  const { count: vencendo } = await supabase
    .from('epis')
    .select('*', { count: 'exact', head: true })
    .lte('validade_dias', 90)

  totalVencendo.value = vencendo || 0
}

/* EXECUTA AUTOMATICAMENTE */
  onMounted(() => {
  carregarCards()
  carregarEntregas()
})

async function sair() {
  router.push('/login')
  try {
    await supabase.auth.signOut()
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
  background-color: #eef2f7;
  font-family: 'Inter', sans-serif;
}

/* SIDEBAR PREMIUM (Combinando estética e comportamento do segundo código) */
.sidebar-premium {
  width: 280px;
  background-color: #0f172a; /* Alterado para o azul escuro desejado */
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  height: 100vh;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 100;
  box-sizing: border-box;
}

/* Branding */
.brand-container {
  margin-bottom: 8px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  text-align: center;
}

.brand-logo {
  color: #fff;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: 3px;
  margin: 0;
}

.brand-logo span {
  color: #f7ff00;
}

/* Menu de Navegação */
.navigation-menu {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 18x;
  padding-top: 0px;
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
  text-align: center;
}

/* Efeito de passar o mouse por cima */
.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
}

/* 🌟 Estado Ativo Premium Unificado (Fundo Branco Arredondado) */
.active-link-premium {
  background-color: #fff !important;
  color: #0f172a !important;
  font-weight: 700 !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Rodapé e Botão Sair extraídos fielmente do seu segundo código */
.sidebar-footer {
  margin-top: auto; /* Empurra o container para a base absoluta de forma perfeita */
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1); 
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
  transition: all 0.3s ease;
}

.logout-trigger:hover {
  background: #38bdf8;
  color: #fff;
  border-color: #38bdf8;
}

/* ÁREA DE CONTEÚDO PRINCIPAL (Protegida contra quebras com scroll independente) */
.main-viewport {
  flex-grow: 1;
  margin-left: 280px;
  padding: 24px 40px 40px 40px;
  overflow-y: auto;
  box-sizing: border-box;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

/* Estilização Interna do Dashboard */
.top-header { display: flex; justify-content: space-between; align-items: center; margin-top: -18px; }
.header-title-container { display: flex; align-items: center; gap: 22px; }
.page-title { font-size: 28px; font-weight: 800; letter-spacing: -1px; }
.view-divider { border: none; height: 2px; background-color: #a7abb1; opacity: 0.30; margin: 18px 0 38px 0; border-radius: 999px; }

/* FILTROS */
.filter-row { display: grid; grid-template-columns: 1fr 1fr 1.2fr auto; gap: 20px; align-items: flex-end; margin-bottom: 35px; }
.filter-field { display: flex; flex-direction: column; gap: 6px; }
.filter-field label { font-size: 13px; font-weight: 700; color: #334155; }
.filter-field input, .filter-field select { padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff; font-size: 14px; width: 100%; box-sizing: border-box; }
.date-range-container { display: flex; align-items: center; gap: 8px; }
.date-range-container input { flex: 1; }
.btn-submit-filter { background: #0f172a; color: white; border: none; padding: 0 30px; height: 41px; border-radius: 8px; font-weight: 700; cursor: pointer; }

/* LAYOUT DOS CARDS */
.metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 40px; }
.metric-card { background: #ffffff; border-radius: 18px; padding: 8px; border: 1px solid #d7dee7; box-shadow: 0 9px 18px rgba(15, 23, 42, 0.04); transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
.metric-card:hover { transform: translateY(-4px); border-color: #94a3b8; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08); }
.card-top { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 28px; }
.card-name { font-size: 18px; font-weight: 700; color: #334155; line-height: 1.3; flex: 1; margin-top: 8px; }
.card-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
.card-qty { font-size: 38px; font-weight: 800; color: #0f172a; line-height: 1; margin-right: 7px; }
.card-dots { color: #cbd5e1; font-size: 20px; font-weight: 800; }
.text-green { color: #16a34a !important; }
.text-orange { color: #ea580c !important; }

/* TABELA */
.table-section-title { font-size: 20px; color: #0f172a; margin-bottom: 18px; font-weight: 700; }
.table-container { background: white; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.02); }
 table { width: 100%; border-collapse: collapse; text-align: left; }
 th { font-size: 14px; font-weight: 700; padding: 16px 20px; color: #475569; background: #fafafa; border-bottom: 1px solid #e2e8f0; }
 td { padding: 16px 20px; font-size: 14px; color: #334155; border-bottom: 1px solid #f1f5f9; }

.status-pill { padding: 5px 14px; border-radius: 6px; font-size: 12px; font-weight: 700; }
.status-boa { background: #dcfce7; color: #15803d; }
.status-regular { background: #fef3c7; color: #b45309; }
.status-descartar { background: #fee2e2; color: #dc2626;}

/* ÍCONE DO TOPO */
.header-icon-img {
  width: 92px;
  height: 78px;
  object-fit: contain;
  transition: transform 0.4s ease, filter 0.4s ease;
  cursor: pointer;
}

.header-icon-img:hover {
  transform: scale(1.08);
  filter: brightness(1.1);
}

/* ÍCONES DOS CARDS */
.card-icon-img {
  width: 68px;
  height: 68px;
  object-fit: contain;
  transition: transform 0.4s ease, filter 0.4s ease;
  cursor: pointer;
}

.card-icon-img:hover {
  transform: scale(1.08);
  filter: brightness(1.1);
}

.user-avatar-img {
  width: 68px;
  height: 60px;
  object-fit: contain;
  transition: transform 0.4s ease;
  cursor: pointer;
}

.user-avatar-img:hover {
  transform: scale(1.08);
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
  .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  .filter-row { grid-template-columns: 1fr; }
}
</style>