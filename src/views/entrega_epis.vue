<template>
  <div class="entregas-page">

    <!-- TOPO -->
    <header class="top-header">

      <div class="header-title-container">
        <img
          src="../assets/Segurança Elétrica.svg"
          alt="Segurança"
          class="header-icon-img"
        >

        <h1 class="page-title">
          Painel de Entregas
        </h1>
      </div>

      <div class="user-profile">
        <img
          src="../assets/Usuário.svg"
          alt="Usuário"
          class="user-avatar-img"
        >
      </div>

    </header>

    <hr class="view-divider">

    <!-- CONTEÚDO -->
    <section class="entregas-content">

      <h2 class="entregas-title">
        Lançamento de EPIs
      </h2>

      <!-- FUNCIONÁRIO -->
      <div class="input-group full">

        <label>Funcionário:</label>

        <select v-model="funcionarioSelecionado">

          <option value="">
            Selecione um funcionário
          </option>

          <option
            v-for="funcionario in funcionarios"
            :key="funcionario.id"
            :value="funcionario.id"
          >
            {{ funcionario.nome }}
          </option>

        </select>

      </div>

      <!-- LINHA -->
      <div class="double-fields">

        <div class="input-group">

          <label>Equipamento:</label>

          <select
            v-model="epiSelecionado"
            @change="selecionarEpi"
          >

            <option value="">
              Selecione um EPI
            </option>

            <option
              v-for="epi in epis"
              :key="epi.id"
              :value="epi.id"
            >
              {{ epi.nome }}
            </option>

          </select>

        </div>

        <div class="input-group">

          <label>Número do CA:</label>

          <input
            v-model="numeroCA"
            type="text"
            placeholder="Número do CA"
          >

        </div>

      </div>

      <!-- LINHA -->
      <div class="triple-fields">

        <div class="input-group">

          <label>Data Entrega:</label>

          <input
            v-model="dataEntrega"
            type="date"
          >

        </div>

        <div class="input-group">

          <label>Quantidade:</label>

          <input
            v-model="quantidade"
            type="number"
            placeholder="Quantidade"
          >

        </div>

        <div class="input-group">

          <label>Data Devolução:</label>

          <input
            v-model="dataDevolucao"
            type="date"
          >

        </div>

      </div>

      <!-- BOTÕES -->
      <div class="buttons-container">

        <button
          class="btn-cancelar"
          @click="cancelar"
        >
          Cancelar
        </button>

        <button
          class="btn-registrar"
          @click="registrarEntrega"
          :disabled="carregando"
        >

          {{ carregando ? 'Registrando...' : 'Registrar' }}

        </button>

      </div>

    </section>

  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

const funcionarios = ref([])
const epis = ref([])

const funcionarioSelecionado = ref('')
const epiSelecionado = ref('')

const numeroCA = ref('')
const quantidade = ref('')
const dataEntrega = ref('')
const dataDevolucao = ref('')

const carregando = ref(false)

onMounted(() => {

  carregarFuncionarios()
  carregarEpis()

})

async function carregarFuncionarios() {

  const { data } = await supabase
    .from('funcionarios')
    .select('*')
    .order('nome')

  funcionarios.value = data || []

}

async function carregarEpis() {

  const { data } = await supabase
    .from('epis')
    .select('*')
    .order('nome')

  epis.value = data || []

}

function selecionarEpi() {

  const epi = epis.value.find(
    item => item.id === epiSelecionado.value
  )

  if (epi) {

    numeroCA.value = epi.numero_ca || ''

  }

}

function cancelar() {

  funcionarioSelecionado.value = ''
  epiSelecionado.value = ''
  numeroCA.value = ''
  quantidade.value = ''
  dataEntrega.value = ''
  dataDevolucao.value = ''

}

async function registrarEntrega() {

  carregando.value = true

  if (
    !funcionarioSelecionado.value ||
    !epiSelecionado.value ||
    !quantidade.value ||
    !dataEntrega.value
  ) {

    alert('Preencha os campos obrigatórios')

    carregando.value = false
    return

  }

  const { error } = await supabase
    .from('entrega_epis')
    .insert([
      {
        funcionario_id: funcionarioSelecionado.value,
        epi_id: epiSelecionado.value,
        quantidade: Number(quantidade.value),
        data_entrega: dataEntrega.value,
        data_devolucao: dataDevolucao.value || null
      }
    ])

  if (error) {

    console.error(error)

    alert('Erro ao registrar entrega')

    carregando.value = false
    return

  }

  alert('Entrega registrada com sucesso!')

  cancelar()

  carregando.value = false

}

</script>

<style scoped>

/* PÁGINA */
.entregas-page {
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
.entregas-content {
  max-width: 980px;
}

/* TÍTULO */
.entregas-title {
  font-size: 30px;
  font-weight: 700;
  color: #111827;
  margin-top: -18px;
  margin-bottom: 20px;
}

/* CAMPOS */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
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

.input-group input::placeholder {
  color: #9ca3af;
}

/* CAMPO GRANDE */
.full {
  margin-bottom: 18px;
}

/* LINHAS */
.double-fields {
  display: flex;
  gap: 36px;
  margin-bottom: 18px;
}

.triple-fields {
  display: flex;
  gap: 28px;
  margin-bottom: 20px;
}

/* BOTÕES */
.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 90px;
}

/* CANCELAR */
.btn-cancelar {
  width: 110px;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #0f172a;
  color: white;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: 0.2s ease;
}

.btn-cancelar:hover {
  transform: translateY(-2px);
}

/* REGISTRAR */
.btn-registrar {
  width: 130px;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #f7ff00;
  color: #111827;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: 0.2s ease;
}

.btn-registrar:hover {
  transform: translateY(-2px);
}

.btn-registrar:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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