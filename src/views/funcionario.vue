<template>
  <div class="funcionario-page">

    <header class="top-header">
      <div class="header-title-container">
        <img
          src="../assets/Segurança Elétrica.svg"
          alt="Segurança"
          class="header-icon-img"
        >

        <h1 class="page-title">
          Painel de Funcionários
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

    <section class="funcionario-content">

      <h2 class="funcionario-title">
        {{ editandoId ? 'Editar Colaborador' : 'Registro de Colaborador' }}
      </h2>

      <div class="input-group full">
        <label>Nome Completo:</label>

        <input
         v-model="nome"
         type="text"
         placeholder="Nome Completo"
         :disabled="modoVisualizacao"
        >
      </div>

      <div class="double-fields">

        <div class="input-group">
          <label>CPF:</label>

          <input
            v-model="cpf"
            type="text"
            placeholder="CPF"
            :disabled="modoVisualizacao"
          >
        </div>

        <div class="input-group">
          <label>Matrícula:</label>

          <input
            v-model="matricula"
            type="text"
            placeholder="Matrícula"
            :disabled="modoVisualizacao"
          >
        </div>

      </div>

      <div class="double-fields">

        <div class="input-group">
          <label>Função:</label>

          <input
            v-model="funcao"
            type="text"
            placeholder="Função"
            :disabled="modoVisualizacao"
          >
        </div>

        <div class="input-group">
          <label>Departamento:</label>

          <input
            v-model="departamento"
            type="text"
            placeholder="Departamento"
            :disabled="modoVisualizacao"
          >
        </div>

      </div>

      <div class="buttons-container">

        <button
         class="btn-cancelar"
         @click="cancelar">
          {{ modoVisualizacao ? 'Fechar' : 'Cancelar' }}
        </button>

        <button
          v-if="!modoVisualizacao"
          class="btn-registrar"
          @click="salvarFuncionario"
          :disabled="carregando"
        >
          {{ carregando ? 'Salvando...' : (editandoId ? 'Atualizar' : 'Registrar') }}
        </button>

      </div>

      <hr class="section-divider">

      <div class="lista-container">
        <h3 class="lista-title">Colaboradores Cadastrados</h3>
        
        <div v-if="funcionarios.length === 0" class="sem-dados">
          Nenhum funcionário carregado.
        </div>

        <table v-else class="tabela-funcionarios">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th class="txt-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="func in funcionarios" :key="func.id">
              <td>{{ func.nome }}</td>
              <td>{{ func.funcao }}</td>
              <td class="acoes-cell">
                <button class="btn-acao btn-ver" @click="visualizarFuncionario(func)" title="Visualizar">👁️</button>
                <button class="btn-acao btn-editar" @click="prepararEdicao(func)" title="Editar">✏️</button>
                <button class="btn-acao btn-excluir" @click="excluirFuncionario(func.id)" title="Excluir">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabase } from '../composables/useSupabase'

const { supabase } = useSupabase()

/* CAMPOS */
const nome = ref('')
const cpf = ref('')
const matricula = ref('')
const funcao = ref('')
const departamento = ref('')

const carregando = ref(false)
const funcionarios = ref([]) // Armazena a lista vinda do banco

/* ESTADOS DE CONTROLE */
const editandoId = ref(null)      // Guarda o ID se estiver editando
const modoVisualizacao = ref(false) // Bloqueia os inputs se for apenas para ver

/* BUSCAR FUNCIONÁRIOS DO SUPABASE */
async function buscarFuncionarios() {
  const { data, error } = await supabase
    .from('funcionarios')
    .select('*')
    .order('nome', { ascending: true })
    
  if (!error && data) {
    funcionarios.value = data
  }
}

/* CARREGAR AO ABRIR A TELA */
onMounted(() => {
  buscarFuncionarios()
})

/* LIMPAR CAMPOS / CANCELAR */
function cancelar() {
  nome.value = ''
  cpf.value = ''
  matricula.value = ''
  funcao.value = ''
  departamento.value = ''
  editandoId.value = null
  modoVisualizacao.value = false
}

/* VISUALIZAR (Preenche os campos e bloqueia a edição) */
function visualizarFuncionario(func) {
  modoVisualizacao.value = true
  editandoId.value = null
  
  nome.value = func.nome
  cpf.value = func.cpf
  matricula.value = func.matricula
  funcao.value = func.funcao
  departamento.value = func.departamento
  
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* PREPARAR EDIÇÃO (Preenche os campos liberados para alterar) */
function prepararEdicao(func) {
  modoVisualizacao.value = false
  editandoId.value = func.id // Ativa o modo de edição salvando o ID
  
  nome.value = func.nome
  cpf.value = func.cpf
  matricula.value = func.matricula
  funcao.value = func.funcao
  departamento.value = func.departamento
  
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* EXCLUIR FUNCIONÁRIO NO SUPABASE */
async function excluirFuncionario(id) {
  if (!confirm('Tem certeza que deseja excluir este colaborador?')) return

  const { error } = await supabase
    .from('funcionarios')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    alert('Erro ao excluir funcionário')
    return
  }

  alert('Funcionário excluído com sucesso!')
  buscarFuncionarios() // Atualiza a lista
  if (editandoId.value === id) cancelar()
}

/* SALVAR (UNIFICA REGISTRO E ATUALIZAÇÃO) */
async function salvarFuncionario() {
  carregando.value = true

  const camposObrigatorios = [
    nome.value,
    funcao.value,
    departamento.value
  ]

  if (camposObrigatorios.some(campo => !campo)) {
    alert('Preencha os campos obrigatórios')
    carregando.value = false
    return
  }

  const dados = {
    nome: nome.value,
    cpf: cpf.value,
    matricula: matricula.value,
    funcao: funcao.value,
    departamento: departamento.value
  }

  let erroBanco = null

  if (editandoId.value) {
    // Se tem ID, atualiza (UPDATE)
    const { error } = await supabase
      .from('funcionarios')
      .update(dados)
      .eq('id', editandoId.value)
    erroBanco = error
  } else {
    // Se não tem ID, cria novo (INSERT)
    const { error } = await supabase
      .from('funcionarios')
      .insert([dados])
    erroBanco = error
  }

  if (erroBanco) {
    console.error(erroBanco)
    alert('Erro ao salvar informações do funcionário')
    carregando.value = false
    return
  }

  alert(editandoId.value ? 'Dados atualizados com sucesso!' : 'Funcionário registrado com sucesso!')
  
  cancelar()
  buscarFuncionarios() // Atualiza a tabela
  carregando.value = false
}
</script>

<style scoped>
/* [MANTIDOS TODOS OS SEUS ESTILOS ORIGINAIS] */

.funcionario-page {
  animation: fadeIn 0.4s ease;
}

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

.funcionario-content {
  max-width: 980px;
}

.funcionario-title {
  font-size: 30px;
  font-weight: 700;
  color: #111827;
  margin-top: -18px;
  margin-bottom: 20px;
}

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

.input-group input:focus:not(:disabled) {
  border-color: #0f172a;
  box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.08);
}

.input-group input:disabled {
  background: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
}

.input-group input::placeholder {
  color: #9ca3af;
}

.full {
  margin-bottom: 18px;
}

.double-fields {
  display: flex;
  gap: 36px;
  margin-bottom: 18px;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 40px; /* Reduzido de 90px para acomodar a tabela melhor */
}

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

.btn-registrar:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-registrar:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

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

/* --- NOVOS ESTILOS ADICIONADOS PARA A TABELA E COMPORTAMENTO --- */

.section-divider {
  border: none;
  height: 1px;
  background-color: #e5e7eb;
  margin: 40px 0;
}

.lista-container {
  margin-bottom: 60px;
}

.lista-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 20px;
}

.sem-dados {
  color: #6b7280;
  font-style: italic;
}

.tabela-funcionarios {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.tabela-funcionarios th {
  background-color: #0f172a;
  color: #ffffff;
  text-align: left;
  padding: 14px 18px;
  font-weight: 600;
  font-size: 15px;
}

.tabela-funcionarios td {
  padding: 14px 18px;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  font-size: 15px;
}

.txt-center {
  text-align: center !important;
}

.acoes-cell {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.btn-acao {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background 0.2s, transform 0.1s;
}

.btn-acao:active {
  transform: scale(0.95);
}

.btn-ver:hover { background-color: #f3f4f6; }
.btn-editar:hover { background-color: #fef08a; }
.btn-excluir:hover { background-color: #fee2e2; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>