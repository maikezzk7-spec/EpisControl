<template>
  <div class="funcionario-page">

    <!-- TOPO -->
    <header class="top-header">
      <div class="header-title-container">
        <img
          src="../assets/Segurança Elétrica.svg"
          alt="Segurança"
          class="header-icon-img"
        >

        <h1 class="page-title">
          Painel de Controle de EPIs
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
    <section class="funcionario-content">

      <h2 class="funcionario-title">
        Registro de Colaborador
      </h2>

      <!-- NOME -->
      <div class="input-group full">
        <label>Nome Completo:</label>

        <input
         v-model="nome"
         type="text"
         placeholder="Nome Completo"
        >
      </div>

      <!-- LINHA -->
      <div class="double-fields">

        <div class="input-group">
          <label>CPF:</label>

          <input
            v-model="cpf"
            type="text"
            placeholder="CPF"
          >
        </div>

        <div class="input-group">
          <label>Matrícula:</label>

          <input
            v-model="matricula"
            type="text"
            placeholder="Matrícula"
          >
        </div>

      </div>

      <!-- LINHA -->
      <div class="double-fields">

        <div class="input-group">
          <label>Função:</label>

          <input
            v-model="funcao"
            type="text"
            placeholder="Função"
          >
        </div>

        <div class="input-group">
          <label>Departamento:</label>

          <input
            v-model="departamento"
            type="text"
            placeholder="Departamento"
          >
        </div>

      </div>

      <!-- BOTÕES -->
      <div class="buttons-container">

        <button
         class="btn-cancelar"
         @click="cancelar">
          Cancelar
        </button>

        <button
          class="btn-registrar"
          @click="registrarFuncionario"
        >
          Registrar
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
const nome = ref('')
const cpf = ref('')
const matricula = ref('')
const funcao = ref('')
const departamento = ref('')

/* LIMPAR CAMPOS */
function cancelar() {
  nome.value = ''
  cpf.value = ''
  matricula.value = ''
  funcao.value = ''
  departamento.value = ''
}

/* REGISTRAR FUNCIONÁRIO */
async function registrarFuncionario() {

  if (
    !nome.value ||
    !cpf.value ||
    !matricula.value ||
    !funcao.value ||
    !departamento.value
  ) {
    alert('Preencha todos os campos')
    return
  }

  const { error } = await supabase
    .from('funcionarios')
    .insert([
      {
        nome: nome.value,
        cpf: cpf.value,
        matricula: matricula.value,
        funcao: funcao.value,
        departamento: departamento.value
      }
    ])

  if (error) {
    console.error(error)
    alert('Erro ao registrar funcionário')
    return
  }

  alert('Funcionário registrado com sucesso!')

  cancelar()
}

</script>

<style scoped>

/* PÁGINA */
.funcionario-page {
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
.funcionario-content {
  max-width: 980px;
}

/* TÍTULO */
.funcionario-title {
  font-size: 30px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 28px;
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
  margin-bottom: 20px;
}

/* LINHAS */
.double-fields {
  display: flex;
  gap: 36px;
  margin-bottom: 20px;
}

/* BOTÕES */
.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 60px;
}

.funcionario-page {
  min-height: 100vh;
  overflow: hidden;
}

/* CANCELAR */
.btn-cancelar {
  width: 180px;
  height: 58px;
  border: none;
  border-radius: 12px;
  background: #0f172a;
  color: white;
  font-size: 20px;
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
  width: 180px;
  height: 58px;
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
}

.header-icon-img:hover {
  transform: scale(1.08);
  filter: brightness(1.1);
}

.user-avatar-img {
  width: 68px;
  height: 60px;
  object-fit: contain;
}

.user-avatar-img:hover {
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;
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