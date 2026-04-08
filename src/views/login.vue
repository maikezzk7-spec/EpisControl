<template>
  <div class="login-page">
    <div class="side-brand">
      <h1>Epis Control</h1>
    </div>
    <div class="glass-card">
      <h1 class="login-title">LOGIN</h1>

      <div class="input-wrapper">
        <label>Usuário</label>
        <input type="text" placeholder="Seu usuário" class="neon-input">
      </div>

      <div class="input-wrapper">
        <label>Senha</label>
        <input type="password" placeholder="Sua senha" class="neon-input">
      </div>

      <button class="btn-neon">ENTRAR</button>

      <div class="footer-links">
        <router-link to="/cadastro" class="signup-link">Não tem conta? Cadastre-se</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* O fundo exato da sua imagem */
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #0f172a 0%, #020617 100%);
  font-family: 'Inter', sans-serif;
}

.side-brand {
  position: absolute;
  left: 20px; /* Distância da borda esquerda */
  top: 8%; /* Centraliza verticalmente */
  transform: translateY(-50%); /* Ajuste de precisão do centro */
  color: #F7FF00; /* A cor que você pediu */
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  pointer-events: none; /* Pro usuário não clicar sem querer */
}
/* O Card estilo Vidro (Glassmorphism) */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  padding: 50px 40px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
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

/* Input com o traço azul neon da sua imagem */
.neon-input {
  width: 100%;
  padding: 14px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid #334155;
  border-radius: 12px;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
}

.neon-input:focus {
  border-color: #38bdf8; /* Azul claro neon */
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
}

/* O Botão de destaque da sua foto */
.btn-neon {
  width: 100%;
  padding: 16px;
  background: #38bdf8;
  color: #000;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.btn-neon:hover {
  filter: brightness(1.1);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
  transform: translateY(-2px);
}

/* Tirando o traço debaixo do link como você pediu */
.signup-link {
  display: block;
  margin-top: 25px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.signup-link:hover {
  color: #38bdf8;
}
</style>