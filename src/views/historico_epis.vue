<template>
  <div class="historico-page">

    <header class="top-header">
      <div class="header-title-container">

        <!-- TROCAR PELO SVG DE RELATÓRIOS -->
        <img src="../assets/Segurança Elétrica.svg" alt="Segurança" class="header-icon-img">

        <h1 class="page-title">
          Painel de Relatórios
        </h1>

      </div>

      <div class="user-profile">

        <!-- TROCAR PELO SVG DE USUÁRIO -->
        <img src="../assets/Usuário.svg" alt="Usuário" class="user-avatar-img">

      </div>
    </header>

    <hr class="view-divider">

    <section class="historico-content">

      <h2 class="historico-title">
        Histórico de Entregas
      </h2>

      <div class="filter-row">

        <div class="input-group">
          <label>Funcionário</label>

          <select v-model="filtroFuncionario">
            <option value="">Todos</option>

            <option
              v-for="funcionario in funcionarios"
              :key="funcionario.id"
              :value="funcionario.nome"
            >
              {{ funcionario.nome }}
            </option>

          </select>
        </div>

        <div class="input-group">
          <label>EPI</label>

          <select v-model="filtroEpi">
            <option value="">Todos</option>

            <option
              v-for="epi in epis"
              :key="epi.id"
              :value="epi.nome"
            >
              {{ epi.nome }}
            </option>

          </select>
        </div>

        <div class="input-group">
          <label>Data Inicial</label>

          <input
            v-model="filtroData"
            type="date"
          >
        </div>

      </div>

      <div class="metrics-grid">

        <div class="metric-card">
          <div class="card-top">
            <img src="../assets/entrega.svg" alt="entrega" class="card-icon-img">
            <span class="card-name">Total Entregas</span>
          </div>

          <div class="card-bottom">
            <span class="card-qty">
              {{ entregasFiltradas.length }}
            </span>
          </div>
        </div>

        <div class="metric-card">
          <div class="card-top">
            <img src="../assets/Vencendo.svg" alt="Vencendo" class="card-icon-img">
            <span class="card-name text-orange">
              EPIs Vencidos
            </span>
          </div>

          <div class="card-bottom">
            <span class="card-qty text-orange">
              {{ vencidos }}
            </span>
          </div>
        </div>

        <div class="metric-card">
          <div class="card-top">
            <img src="../assets/dashboard.svg" alt="dashboard" class="card-icon-img">
            <span class="card-name text-green">
              Total do Mês
            </span>
          </div>

          <div class="card-bottom">
            <span class="card-qty text-green">
              {{ totalMes }}
            </span>
          </div>
        </div>

      </div>

      <div class="table-container">

        <table>

          <thead>
            <tr>
              <th>Funcionário</th>
              <th>EPI</th>
              <th>Data Entrega</th>
              <th>Quantidade</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="item in entregasFiltradas"
              :key="item.id"
            >

              <td>{{ item.funcionarios?.nome }}</td>

              <td>{{ item.epis?.nome }}</td>

              <td>
                {{ new Date(item.data_entrega).toLocaleDateString('pt-BR') }}
              </td>

              <td>{{ item.quantidade }}</td>

              <td>

                <span
                  class="status-pill"
                  :class="{
                    'status-boa': item.status === 'Boa',
                    'status-regular': item.status === 'Regular',
                    'status-descartar': item.status === 'Descartar'
                  }"
                >
                  {{ item.status }}
                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </section>

  </div>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

const entregas = ref([])
const funcionarios = ref([])
const epis = ref([])

const filtroFuncionario = ref('')
const filtroEpi = ref('')
const filtroData = ref('')

onMounted(() => {
  carregarDados()
})

async function carregarDados() {

  const { data } = await supabase
    .from('entrega_epis')
    .select(`
      *,
      funcionarios(nome),
      epis(nome, validade_dias)
    `)

  entregas.value = (data || []).map(item => {

    let status = 'Boa'

    const validade = item.epis?.validade_dias || 99999

    const diasPassados = Math.floor(
      (new Date() - new Date(item.data_entrega))
      / (1000 * 60 * 60 * 24)
    )

    const restante = validade - diasPassados

    if (restante > 30) status = 'Boa'
    else if (restante > 7) status = 'Regular'
    else status = 'Descartar'

    return {
      ...item,
      status
    }

  })

  funcionarios.value = [
    ...new Map(
      entregas.value.map(i => [
        i.funcionarios?.nome,
        i.funcionarios
      ])
    ).values()
  ]

  epis.value = [
    ...new Map(
      entregas.value.map(i => [
        i.epis?.nome,
        i.epis
      ])
    ).values()
  ]

}

const entregasFiltradas = computed(() => {

  return entregas.value.filter(item => {

    const funcionarioOk =
      !filtroFuncionario.value ||
      item.funcionarios?.nome === filtroFuncionario.value

    const epiOk =
      !filtroEpi.value ||
      item.epis?.nome === filtroEpi.value

    const dataOk =
      !filtroData.value ||
      item.data_entrega >= filtroData.value

    return funcionarioOk && epiOk && dataOk

  })

})

const vencidos = computed(() =>
  entregas.value.filter(
    item => item.status === 'Descartar'
  ).length
)

const totalMes = computed(() => {

  const mes = new Date().getMonth()
  const ano = new Date().getFullYear()

  return entregas.value.filter(item => {

    const data = new Date(item.data_entrega)

    return (
      data.getMonth() === mes &&
      data.getFullYear() === ano
    )

  }).length

})

</script>

<style scoped>

/* PÁGINA */
.relatorios-page {
  animation: fadeIn 0.4s ease;
}

/* HEADER */
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -18px;
}

.header-title-container {
  display: flex;
  align-items: center;
  gap: 22px;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -1px;
}

.view-divider {
  border: none;
  height: 2px;
  background-color: #a7abb1;
  opacity: 0.30;
  margin: 18px 0 38px 0;
  border-radius: 999px;
}

/* CONTEÚDO */
.relatorios-content {
  width: 100%;
}

/* TÍTULO */
.relatorios-title {
  font-size: 30px;
  font-weight: 700;
  color: #111827;
  margin-top: -18px;
  margin-bottom: 24px;
}

/* FILTROS */
.filter-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 20px;
  margin-bottom: 30px;
  align-items: end;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 15px;
  color: #111827;
  font-weight: 600;
}

.input-group input,
.input-group select {
  height: 48px;
  border-radius: 12px;
  border: 1px solid #4b5563;
  background: #ffffff;
  padding: 0 18px;
  font-size: 16px;
  color: #111827;
  outline: none;
  box-shadow: 0 3px 8px rgba(0,0,0,0.10);
  transition: 0.2s ease;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #0f172a;
  box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.08);
}

.btn-filtrar {
  width: 130px;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #0f172a;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: 0.2s ease;
}

.btn-filtrar:hover {
  transform: translateY(-2px);
}

/* CARDS */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 35px;
}

.metric-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 12px;
  border: 1px solid #d7dee7;
  box-shadow: 0 9px 18px rgba(15,23,42,0.04);
  transition: 0.25s ease;
}

.metric-card:hover {
  transform: translateY(-4px);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
}

.card-icon {
  font-size: 38px;
}

.card-name {
  font-size: 18px;
  font-weight: 700;
  color: #334155;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-dots {
  color: #cbd5e1;
  font-size: 20px;
  font-weight: 800;
}

.card-qty {
  font-size: 36px;
  font-weight: 800;
  color: #0f172a;
}

.text-green {
  color: #16a34a !important;
}

.text-orange {
  color: #ea580c !important;
}

.text-blue {
  color: #2563eb !important;
}

.text-red {
  color: #dc2626 !important;
}

/* TABELA */
.table-section-title {
  font-size: 20px;
  color: #0f172a;
  margin-bottom: 18px;
  font-weight: 700;
}

.table-container {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.02);
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  font-size: 14px;
  font-weight: 700;
  padding: 16px 20px;
  color: #475569;
  background: #fafafa;
  border-bottom: 1px solid #e2e8f0;
}

td {
  padding: 16px 20px;
  font-size: 14px;
  color: #334155;
  border-bottom: 1px solid #f1f5f9;
}

/* STATUS */
.status-pill {
  padding: 5px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
}

.status-boa {
  background: #dcfce7;
  color: #15803d;
}

.status-regular {
  background: #fef3c7;
  color: #b45309;
}

.status-descartar {
  background: #fee2e2;
  color: #dc2626;
}

/* ÍCONES */
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

/* RESPONSIVO */
@media (max-width: 1024px) {

  .filter-row {
    grid-template-columns: 1fr;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 768px) {

  .metrics-grid {
    grid-template-columns: 1fr;
  }

}

/* ANIMAÇÃO */
@keyframes fadeIn {

  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }

}

</style>