<template>
  <div class="login-page">
    <header class="main-header">
      <h1 class="logo-text">EPIS <span class="highlight">CONTROL</span></h1>
    </header>

    <div class="glass-card">
      <h1 class="login-title">LOGIN</h1>

      <form @submit.prevent="fazerLogin">
        <div class="input-wrapper">
          <label>E-mail</label>
          <input v-model="email" type="email" placeholder="seu@email.com" class="neon-input" required>
        </div>

        <div class="input-wrapper">
          <label>Senha</label>
          <div class="password-container">
            <input 
              v-model="senha"  
              :type="mostrarSenha ? 'text': 'password'"
              placeholder="Sua senha" 
              class="neon-input"
              required
            >
            <span class="toggle-eye" @click="mostrarSenha = !mostrarSenha">
              <i :class="mostrarSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
        </div>

        <div v-if="erro" class="error-message">{{ erro }}</div>

        <button type="submit" class="btn-neon" :disabled="carregando">
          <span v-if="carregando">ENTRANDO...</span>
          <span v-else>ENTRAR</span>
        </button>
      </form>

      <div class="footer-links">
        <router-link to="/cadastro" class="signup-link">Não tem conta? Cadastre-se</router-link>
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
const erro = ref('')
const carregando = ref(false)
const mostrarSenha = ref(false)

async function fazerLogin() {
  erro.value = ''
  if (!email.value || !senha.value) return
  carregando.value = true

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: senha.value
    })

    if (error) {
      erro.value = 'E-mail ou senha incorretos.'
      return
    }
    router.push('/dashboard')
  } catch (err) {
    erro.value = 'Erro ao conectar ao sistema.'
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
  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.45)), url('../assets/worker.svg'); 
  background-size: cover;
  background-position: center;
}

.main-header {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  margin: 0;
  padding: 0;
}

.logo-text {
  color: #ffffff;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 6px;
  text-transform: uppercase;
  margin: 0;
  text-align: center;
}

.logo-text .highlight {
  color: #F7FF00;
  font-weight: 900;
  text-shadow: 0 0 12px rgba(247, 255, 0, 0.4);
  margin-left: 8px;
}

.glass-card {
  background: rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(12px);
  padding: 50px 40px;
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
  margin-bottom: 25px;
}

.input-wrapper label {
  color: #94a3b8;
  font-size: 13px;
  margin-left: 5px;
  margin-bottom: 8px;
  display: block;
}

.password-container {
  position: relative;
}

.neon-input {
  width: 100%;
  box-sizing: border-box; 
  padding: 14px 45px 14px 14px; /* Unificado: o 45px protege o texto do ícone */
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
  transform: translateY(-2px);
}

.error-message {
  color: #ff4d4d;
  font-size: 13px;
  margin-bottom: 15px;
  text-align: left;
}

.signup-link {
  display: block;
  margin-top: 25px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
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
</style>