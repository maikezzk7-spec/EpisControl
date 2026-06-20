<template>
  <div class="epis-page">

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

    <section class="epis-content">

      <h2 class="epis-title">
        {{ editandoId ? 'Editar EPI' : 'Registro de EPIs' }}
      </h2>

      <div class="input-group full">
        <label>Nome do Equipamento:</label>

        <input
          v-model="Equipamento"
          type="text"
          placeholder="Nome do Equipamento"
          :disabled="modoVisualizacao"
        >
      </div>

      <div class="double-fields">

        <div class="input-group">
          <label>Categoria do Item:</label>

          <input
            v-model="categoria"
            type="text"
            placeholder="Categoria do Item"
            :disabled="modoVisualizacao"
          >
        </div>

        <div class="input-group">
          <label>Número do CA:</label>

          <input
            v-model="numeroCA"
            type="text"
            placeholder="Número do CA"
            :disabled="modoVisualizacao"
          >
        </div>

      </div>

      <div class="triple-fields">

        <div class="input-group">
          <label>Qtd em Estoque:</label>

          <input
            v-model="quantidade"
            type="number"
            placeholder="Qtd em estoque"
            :disabled="modoVisualizacao"
          >
        </div>

        <div class="input-group">
          <label>Estoque Mínimo:</label>

          <input
            v-model="estoqueMinimo"
            type="number"
            placeholder="Estoque mínimo"
            :disabled="modoVisualizacao"
          >
        </div>

        <div class="input-group">
          <label>Validade (dias):</label>

          <input
            v-model="validadeDias"
            type="number"
            placeholder="Validade"
            :disabled="modoVisualizacao"
          >
        </div>

      </div>

      <div class="buttons-container">

        <button
          class="btn-cancelar"
          @click="cancelar"
        >
          {{ modoVisualizacao ? 'Fechar' : 'Cancelar' }}
        </button>

        <button
          v-if="!modoVisualizacao"
          class="btn-registrar"
          @click="salvarEpi"
          :disabled="carregando"
        >
          {{ carregando ? 'Salvando...' : (editandoId ? 'Atualizar' : 'Registrar') }}
        </button>

      </div>

      <hr class="section-divider">

      <div class="lista-container">
        <h3 class="lista-title">EPIs Cadastrados</h3>
        
        <div v-if="epis.length === 0" class="sem-dados">
          Nenhum EPI carregado.
        </div>

        <table v-else class="tabela-epis">
          <thead>
            <tr>
              <th>Equipamento</th>
              <th>Categoria</th>
              <th>Estoque</th>
              <th class="txt-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in epis" :key="item.id">
              <td>{{ item.nome }}</td>
              <td>{{ item.categoria }}</td>
              <td>{{ item.quantidade }} un</td>
              <td class="acoes-cell">
                <button class="btn-acao btn-ver" @click="visualizarEpi(item)" title="Visualizar">👁️</button>
                <button class="btn-acao btn-editar" @click="prepararEdicao(item)" title="Editar">✏️</button>
                <button class="btn-acao btn-excluir" @click="excluirEpi(item.id)" title="Excluir">🗑️</button>
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
const Equipamento = ref('')
const categoria = ref('')
const numeroCA = ref('')
const quantidade = ref('')
const estoqueMinimo = ref('')
const validadeDias = ref('')

const carregando = ref(false)
const epis = ref([]) // Armazena a lista vinda do banco

/* ESTADOS DE CONTROLE */
const editandoId = ref(null)       // Guarda o ID se estiver editando
const modoVisualizacao = ref(false)  // Bloqueia os inputs se for apenas para ver

/* BUSCAR EPIs DO SUPABASE */
async function buscarEpis() {
  const { data, error } = await supabase
    .from('epis')
    .select('*')
    .order('nome', { ascending: true })
    
  if (!error && data) {
    epis.value = data
  }
}

/* CARREGAR AO ABRIR A TELA */
onMounted(() => {
  buscarEpis()
})

/* LIMPAR CAMPOS / CANCELAR */
function cancelar() {
  Equipamento.value = ''
  categoria.value = ''
  numeroCA.value = ''
  quantidade.value = ''
  estoqueMinimo.value = ''
  validadeDias.value = ''
  editandoId.value = null
  modoVisualizacao.value = false
}

/* VISUALIZAR */
function visualizarEpi(item) {
  modoVisualizacao.value = true
  editandoId.value = null
  
  Equipamento.value = item.nome
  categoria.value = item.categoria
  numeroCA.value = item.numero_ca
  quantidade.value = item.quantidade
  estoqueMinimo.value = item.estoque_minimo
  validadeDias.value = item.validade_dias
  
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* PREPARAR EDIÇÃO */
function prepararEdicao(item) {
  modoVisualizacao.value = false
  editandoId.value = item.id // Salva o ID para sabermos qual atualizar
  
  Equipamento.value = item.nome
  categoria.value = item.categoria
  numeroCA.value = item.numero_ca
  quantidade.value = item.quantidade
  estoqueMinimo.value = item.estoque_minimo
  validadeDias.value = item.validade_dias
  
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* EXCLUIR EPI NO SUPABASE */
async function excluirEpi(id) {
  if (!confirm('Tem certeza que deseja excluir este EPI?')) return

  const { error } = await supabase
    .from('epis')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    alert('Erro ao excluir EPI')
    return
  }

  alert('EPI excluído com sucesso!')
  buscarEpis() // Atualiza a lista na tabela
  if (editandoId.value === id) cancelar()
}

/* SALVAR (UNIFICA INSERÇÃO E ATUALIZAÇÃO) */
async function salvarEpi() {
  carregando.value = true

  const camposObrigatorios = [
    Equipamento.value,
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

  const dados = {
    nome: Equipamento.value,
    categoria: categoria.value,
    numero_ca: numeroCA.value,
    quantidade: Number(quantidade.value),
    estoque_minimo: Number(estoqueMinimo.value),
    validade_dias: Number(validadeDias.value)
  }

  let erroBanco = null

  if (editandoId.value) {
    // Se tem ID ativo, faz o UPDATE
    const { error } = await supabase
      .from('epis')
      .update(dados)
      .eq('id', editandoId.value)
    erroBanco = error
  } else {
    // Se não tem ID ativo, faz o INSERT
    const { error } = await supabase
      .from('epis')
      .insert([dados])
    erroBanco = error
  }

  if (erroBanco) {
    console.error(erroBanco)
    alert('Erro ao salvar informações do EPI')
    carregando.value = false
    return
  }

  alert(editandoId.value ? 'EPI atualizado com sucesso!' : 'EPI registrado com sucesso!')
  
  cancelar()
  buscarEpis() // Atualiza a tabela com os novos dados
  carregando.value = false
}
</script>

<style scoped>
/* [MANTIDOS SEUS ESTILOS ORIGINAIS] */

.epis-page {
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

.epis-content {
  max-width: 980px;
}

.epis-title {
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

.triple-fields {
  display: flex;
  gap: 28px;
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  margin-top: 40px; /* Reduzido para dar respiro à nova listagem */
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

/* --- NOVOS ESTILOS ADICIONADOS PARA A TABELA DE EPIs --- */

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

.tabela-epis {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.tabela-epis th {
  background-color: #0f172a;
  color: #ffffff;
  text-align: left;
  padding: 14px 18px;
  font-weight: 600;
  font-size: 15px;
}

.tabela-epis td {
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