<template>
  <div class="epis-page">

    <!-- TOPO -->
    <header class="top-header">

      <div class="header-title-container">
        <img
          src="../assets/Segurança Elétrica.svg"
          alt="Segurança"
          class="header-icon-img"
        >

        <h1 class="page-title">
          Painel de EPIs
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
    <section class="epis-content">

      <h2 class="epis-title">
        Registro de EPIs
      </h2>

      <!-- NOME -->
      <div class="input-group full">
        <label>Nome do Equipamento:</label>

        <input
          v-model="nomeEquipamento"
          type="text"
          placeholder="Nome do Equipamento"
        >
      </div>

      <!-- LINHA -->
      <div class="double-fields">

        <div class="input-group">
          <label>Categoria do Item:</label>

          <input
            v-model="categoria"
            type="text"
            placeholder="Categoria do Item"
          >
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
          <label>Qtd em Estoque:</label>

          <input
            v-model="quantidade"
            type="number"
            placeholder="Qtd em estoque"
          >
        </div>

        <div class="input-group">
          <label>Estoque Mínimo:</label>

          <input
            v-model="estoqueMinimo"
            type="number"
            placeholder="Estoque mínimo"
          >
        </div>

        <div class="input-group">
          <label>Validade (dias):</label>

          <input
            v-model="validadeDias"
            type="number"
            placeholder="Validade"
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
          @click="registrarEpi"
          :disabled="carregando"
        >

          {{ carregando ? 'Registrando...' : 'Registrar' }}

        </button>

      </div>

    </section>

  </div>
</template>

<script setup>

import { ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

/* CAMPOS */
const nomeEquipamento = ref('')
const categoria = ref('')
const numeroCA = ref('')
const quantidade = ref('')
const estoqueMinimo = ref('')
const validadeDias = ref('')

const carregando = ref(false)

/* LIMPAR CAMPOS */
function cancelar() {

  nomeEquipamento.value = ''
  categoria.value = ''
  numeroCA.value = ''
  quantidade.value = ''
  estoqueMinimo.value = ''
  validadeDias.value = ''

}

/* REGISTRAR EPI */
async function registrarEpi() {

  carregando.value = true

  const camposObrigatorios = [
    nomeEquipamento.value,
    categoria.value,
    quantidade.value,
    estoqueMinimo.value,
    validadeDias.value
  ]

  if (camposObrigatorios.some(campo => !campo)) {

    alert('Preencha os campos obrigatórios')

    carregando.value = false
    return

  }

  const { error } = await supabase
    .from('epis')
    .insert([
      {
        nome: nomeEquipamento.value,
        categoria: categoria.value,
        numero_ca: numeroCA.value,
        quantidade: quantidade.value,
        estoque_minimo: estoqueMinimo.value,
        validade_dias: validadeDias.value
      }
    ])

  if (error) {

    console.error(error)

    alert('Erro ao registrar EPI')

    carregando.value = false
    return

  }

  alert('EPI registrado com sucesso!')

  cancelar()

  carregando.value = false

}

</script>

<style scoped>

/* PÁGINA */
.epis-page {
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
.epis-content {
  max-width: 980px;
}

/* TÍTULO */
.epis-title {
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

.input-group input {
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

.input-group input:focus {
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