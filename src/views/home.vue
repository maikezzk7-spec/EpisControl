<template>
  <div class="home-container">
    <header class="header">
      <div class="header-content">
        <h1>Gestão de EPI:</h1>
        <p class="subtitle">E o Controle de Equipamento de segurança Individual da sua Empresa</p>
        <p class="subtitle">Para um Ambiente de Trabalho Protegido.</p>
      </div>
      <button class="btn-acesso">Acesso</button>
    </header>

<div class="hero-banner">
  <img :src="imgTrabalhadores" alt="Trabalhadores" />
</div>

    <h2 class="section-title">Um software de gestão ágil de EPIs que maximiza resultados</h2>

    <section class="benefits-grid">
      <div class="benefit-item">
        <div class="benefit-text">
          <h3>Ganhe eficiência na gestão de EPIs</h3>
          <p>Ferramenta completa de gestão de EPIs que possibilita cadastrar, consultar e acompanhar as entregas  de materiais e reúne funcionalidades incríveis para ganho de performance.</p>
        </div>
        <span class="benefit-icon">🕒</span>
      </div>

      <div class="benefit-item">
        <div class="benefit-text">
          <h3>Otimize seus gastos com equipamentos</h3>
          <p>Controle os custos com EPIs através de relatórios completos que entregam informações detalhadas sobre a durabilidade dos produtos, o tempo de uso, os gastos por setor e muito mais!</p>
        </div>
        <span class="benefit-icon">💰</span>
      </div>

      <div class="benefit-item">
        <div class="benefit-text">
          <h3>Segurança e confiabilidade</h3>
          <p>O uso da biometria oferece maior controle e segurança ao empregador e garante a entrega do equipamento de proteção adequado ao trabalhador certo.</p>
        </div>
        <span class="benefit-icon">☝️</span>
      </div>

      <div class="benefit-item">
        <div class="benefit-text">
          <h3>Controle o consumo indevido</h3>
          <p>Evite o uso desnecessário de equipamentos de proteção individual entregando o material específico para cada função, na quantidade ideal e com o certificado de aprovação (CA) válido.</p>
        </div>
        <span class="benefit-icon">⛑️</span>
      </div>

      <div class="benefit-item">
        <div class="benefit-text">
          <h3>Reduza o passivo trabalhista</h3>
          <p>Receba alertas inteligentes sobre a periodicidade de troca dos EPIs dos seus funcionários, controlando a validade dos equipamentos, data de entrega, próxima troca e prazo de validade.</p>
        </div>
        <span class="benefit-icon">📊</span>
      </div>

      <div class="benefit-item">
        <div class="benefit-text">
          <h3>eSocial</h3>
          <p>O EPIs Control possui todos os registros e informações que o departamento de RH precisa para transmitir ao eSocial.</p>
        </div>
        <span class="benefit-icon">📄</span>
      </div>
    <div class="benefit-item">
        <div class="benefit-text">
          <h3>Integração com os melhores softwares do mercado</h3>
          <p>O EPIs Control é um módulo de integração muito simples e completo com possibilidade de integração com qualquer software pela nuvem ou até mesmo por planilhas de Excel.</p>
        </div>
        <span class="benefit-icon">🌐</span>
      </div>

      <div class="benefit-item">
        <div class="benefit-text">
          <h3>Treinamento</h3>
          <p>Controle os treinamentos para uso de EPIs da forma correta através do EPIs Control. Registre os treinamentos ministrados pela empresa e comprove que os funcionários realmente participaram.</p>
        </div>
        <span class="benefit-icon">👨‍🏫</span>
      </div>

      <div class="benefit-item">
        <div class="benefit-text">
          <h3>Conformidade com as normas e auditorias</h3>
          <p>O EPIs Control permite que as empresas fiquem de acordo com as normativas regulamentadoras e auditorias além do sistema estar sempre atualizado de acordo com as leis vigentes.</p>
        </div>
        <span class="benefit-icon">🔍</span>
      </div>

      <div class="benefit-item">
        <div class="benefit-text">
          <h3>Acessibilidade na palma da sua mão</h3>
          <p>Acesse o EPIs Control de qualquer dispositivo, a qualquer momento e em tempo real.</p>
        </div>
        <span class="benefit-icon">📱</span>
      </div>

    </section>
<footer class="main-footer">
  <div class="footer-container">
    <div class="footer-column">
      <h4>Empresa</h4>
      <p>EPIs Control</p>
    </div>

    <div class="footer-column">
      <h4>Soluções</h4>
      <p>EPIs Control ERP</p>
      <p>EPIs Control EPI</p>
    </div>

    <div class="footer-column">
      <h4>Suporte</h4>
      <p>Atendimento Online</p>
    </div>

    <div class="footer-social">
      <span class="social-icon">📸</span>
      <span class="social-icon">💬</span>
    </div>
   </div>
  </footer>
  </div>
</template>

<script>
// Aqui a gente avisa ao sistema que a imagem existe e onde ela está
import imagemTrabalhadores from '../assets/trabalhadores.png';

export default {
  name: 'HomeView',
  data() {
    return {
      // Aqui a gente cria uma "variável" que o HTML vai conseguir ler
      imgTrabalhadores: imagemTrabalhadores
    }
  }
}
</script>

<style scoped>

.home-container {
  background-color: #050a18;
  color: white;
  min-height: 100vh;
  padding: 20px;
  font-family: sans-serif;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.hero-banner {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px 0; /* 40px de respiro em cima e embaixo */
}

.img-trabalhadores {
  width: 1770px;       /* Largura fixa para manter o padrão Figma */
  height: 596px;       /* Altura fixa em px */
  object-fit: cover;   /* Não deixa a imagem esticar nem amassar */
  border-radius: 9px; /* Bordas arredondadas profissionais */
  border-bottom: 6px solid #0055ff; /* Aquele detalhe azul de destaque */
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 0.4); /* Sombra para dar profundidade */
  transition: transform 0.4s ease, filter 0.4s ease; /* Preparo para o Hover Pro */
}

/* REGRA 4: HOVER PRO SUGERIDO */
.img-trabalhadores:hover {
  transform: scale(1.02); /* Sobe de leve, vindo na direção do usuário */
  filter: brightness(1.1) saturate(1.1); /* Dá um brilho e destaca a cor dos EPIs */
  cursor: pointer;
}

h1 {
  color: #ffff00;
  font-size: 38px;
  margin-bottom: 10px;
}

.subtitle {
  color: white;
  font-size: 24px;
  line-height: 1.4;
  font-weight: 600;
  margin: 5px 0;
}

.btn-acesso { 
background:transparent;
color: white;
border: 3.3px solid white;
padding: 8px 20px;
cursor: pointer;
border-radius: 45px;
font-size: 20px;
position: absolute;
top: 68px;
right: 45px;
transition: transform 0.3s ease-in-out;
}

.btn-acesso:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}

.placeholder-img { 
  background: #1a2333; 
  height: 300px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin: 20px 0; 
  border-bottom: 3px solid #0055ff; 
  font-weight: bold;
}

.section-title { 
  color: #ffff00; 
  text-align: center; 
  margin: 40px 0; 
  font-size: 1.5rem;
}

.benefits-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 30px; 
  padding: 0 5%;
}

.card { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 15px;
  border-bottom: 1px solid #1a2333;
}

.benefit-text h3 {
  color: white;
  margin-bottom: 10px;
  font-size: 24px;
}

.benefit-text p {
  color: white;
  font-size: 19px;
  line-height: 1.4;
}

.card-icon { 
  font-size: 2.5rem; 
  margin-left: 15px;
}

.main-footer {
  width: 100%;
  background-color: #050a18;
  border-top: 1px solid #1a2333;
  margin-top: 50px;
  padding: 60px 0;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-column h4 {
  color: #ffff00;
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.footer-column p {
  color: white;
  margin: 0;
  font-size: 16px;
}

.footer-social {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.social-icon {
  width: 35px;
  height: 35px
}
</style>