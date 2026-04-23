<template>
  <div class="login-page">
    <div class="side-brand"> 
      <h1>Epis Control</h1>
    </div>

    <div class="glass-card">
      <h1 class="login-title">CADASTRO</h1>

      <form @submit.prevent="fazerCadastro">
        
        <div class="input-wrapper">
          <label>E-mail</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="seu@email.com" 
            class="neon-input" 
            required
          >
        </div>

        <div class="input-wrapper">
          <label>Senha (6 a 12 caracteres)</label>
          <div class="password-container">
            <input 
              v-model="senha" 
              :type="mostrarSenha ? 'text' : 'password'" 
              placeholder="Crie uma senha" 
              class="neon-input" 
              maxlength="12"
              required
            >
            <span class="toggle-eye" @click="mostrarSenha = !mostrarSenha">
              <i :class="mostrarSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
        </div>

        <div class="input-wrapper">
          <label>Confirmar Senha</label>
          <div class="password-container">
            <input 
              v-model="confirmarSenha" 
              :type="mostrarSenhaConfirmar ? 'text' : 'password'" 
              placeholder="Repita a senha" 
              class="neon-input" 
              maxlength="12"
              required
            >
            <span class="toggle-eye" @click="mostrarSenhaConfirmar = !mostrarSenhaConfirmar">
              <i :class="mostrarSenhaConfirmar ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
        </div>

        <div v-if="erro" class="error-message">
          {{ erro }}
        </div>

        <button type="submit" class="btn-neon" :disabled="carregando">
          <span v-if="carregando">CADASTRANDO...</span>
          <span v-else>CRIAR CONTA</span>
        </button>

      </form>

      <div class="footer-links">
        <router-link to="/" class="signup-link">Já tem uma conta? Faça Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'

const { supabase } = useSupabase()
const router = useRouter()

const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')
const erro = ref('')
const carregando = ref(false)

// Estados para os dois olhos
const mostrarSenha = ref(false)
const mostrarSenhaConfirmar = ref(false)

async function fazerCadastro() {
  erro.value = ''
  
  if (senha.value !== confirmarSenha.value) {
    erro.value = 'As senhas não coincidem!'
    return
  }

  // Validação de 6 a 12 caracteres
  if (senha.value.length < 6 || senha.value.length > 12) {
    erro.value = 'A senha deve ter entre 6 e 12 caracteres.'
    return
  }

  carregando.value = true

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: senha.value,
    })

    if (error) {
      erro.value = 'Erro: ' + error.message
      return
    }

    if (data) {
      alert('Cadastro realizado com sucesso!')
      router.push('/')
    }
  } catch (err) {
    erro.value = 'Erro ao conectar ao servidor.'
  } finally {
    carregando.value = false
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #0f172a 0%, #020617 100%);
  font-family: 'Inter', sans-serif;
  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.45)), 
                    url('../assets/worker.svg'); 
  background-size: cover;
  background-position: center;
}

.side-brand {
  position: absolute;
  left: 8px;
  top: 3%;
  color: #F7FF00;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.glass-card {
  background: rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(12px);
  padding: 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.login-title {
  color: #fff;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 4px;
  margin-bottom: 40px;
}

.input-wrapper {
  text-align: left;
  margin-bottom: 15px;
}

.input-wrapper label {
  color: #94a3b8;
  font-size: 13px;
  margin-bottom: 8px;
  display: block;
}

.password-container {
  position: relative;
  width: 100%;
}

.neon-input {
  width: 100%;
  box-sizing: border-box;
  padding: 14px 45px 14px 14px; 
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #334155;
  border-radius: 12px;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
}

.neon-input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
}

.toggle-eye {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #38bdf8;
  z-index: 10;
}

.btn-neon {
  width: 100%;
  padding: 16px;
  background: #38bdf8;
  color: #000;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.btn-neon:hover:not(:disabled) {
  filter: brightness(1.1);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
}

.error-message {
  color: #ff4d4d;
  font-size: 13px;
  margin-bottom: 15px;
  text-align: left;
}

.signup-link {
  display: block;
  margin-top: 20px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
}

.signup-link:hover {
  color: #38bdf8;
}
</style>