<template>
  <div class="home-container">
    <header class="header">
      <div class="header-content">
        <h1>Gestão de EPI:</h1>
        <p class="subtitle">E o Controle de Equipamento de segurança Individual da sua Empresa</p>
        <p class="subtitle">Para um Ambiente de Trabalho Protegido.</p>
      </div>

<router-link to="/login" class="btn-acesso">Acesso</router-link>
    </header>

<div class="hero-banner">
  <img :src="imgTrabalhadores" alt="Trabalhadores" class="img-trabalhadores" />
</div>

    <h2 class="section-title">Um software de gestão ágil de EPIs que maximiza resultados</h2>

<section class="benefits-grid">
  <div class="benefit-item">
    <div class="benefit-text">
      <h3>Ganhe eficiência na gestão de EPIs</h3>
      <p>Ferramenta completa de gestão de EPIs que possibilita cadastrar, consultar e acompanhar as entregas de materiais.</p>
    </div>
    <img src="../assets/relogio.svg" alt="Eficiência" class="benefit-img">
  </div>

  <div class="benefit-item">
    <div class="benefit-text">
      <h3>Otimize seus gastos com equipamentos</h3>
      <p>Controle os custos com EPIs através de relatórios completos que entregam informações detalhadas.</p>
    </div>
    <img src="../assets/dinheiro.svg" alt="Gastos" class="benefit-img">
  </div>

  <div class="benefit-item">
    <div class="benefit-text">
      <h3>Segurança e confiabilidade</h3>
      <p>O uso da biometria oferece maior controle e segurança ao empregador e garante a entrega correta.</p>
    </div>
    <img src="../assets/dedo.svg" alt="Segurança" class="benefit-img">
  </div>

  <div class="benefit-item">
    <div class="benefit-text">
      <h3>Controle o consumo indevido</h3>
      <p>Evite o uso desnecessário entregando o material específico para cada função na quantidade ideal.</p>
    </div>
    <img src="../assets/capacete.svg" alt="Controle" class="benefit-img">
  </div>

  <div class="benefit-item">
    <div class="benefit-text">
      <h3>Reduza o passivo trabalhista</h3>
      <p>Receba alertas inteligentes sobre a periodicidade de troca dos EPIs dos seus funcionários.</p>
    </div>
    <img src="../assets/trabalhador.svg" alt="Passivo" class="benefit-img">
  </div>

  <div class="benefit-item">
    <div class="benefit-text">
      <h3>eSocial</h3>
      <p>O EPIs Control possui todos os registros e informações que o departamento de RH precisa.</p>
    </div>
    <img src="../assets/pasta.svg" alt="eSocial" class="benefit-img">
  </div>

  <div class="benefit-item">
    <div class="benefit-text">
      <h3>Integração com os melhores softwares</h3>
      <p>Módulo de integração muito simples e completo com qualquer software pela nuvem ou Excel.</p>
    </div>
    <img src="../assets/sotfwar.svg" alt="Integração" class="benefit-img">
  </div>

  <div class="benefit-item">
    <div class="benefit-text">
      <h3>Treinamento</h3>
      <p>Controle os treinamentos para uso de EPIs da forma correta através do EPIs Control.</p>
    </div>
    <img src="../assets/treinamento.svg" alt="Treinamento" class="benefit-img">
  </div>

  <div class="benefit-item">
    <div class="benefit-text">
      <h3>Conformidade com as normas</h3>
      <p>Permite que as empresas fiquem de acordo com as normativas regulamentadoras e auditorias.</p>
    </div>
    <img src="../assets/lupa.svg" alt="Conformidade" class="benefit-img">
  </div>

  <div class="benefit-item">
    <div class="benefit-text">
      <h3>Acessibilidade na palma da mão</h3>
      <p>Acesse o EPIs Control de qualquer dispositivo, a qualquer momento e em tempo real.</p>
    </div>
    <img src="../assets/celular.svg" alt="Acessibilidade" class="benefit-img">
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
  <img src="../assets/instagram.svg" alt="Instagram" class="social-icon">
  <img src="../assets/whatsapp.svg" alt="WhatsApp" class="social-icon">
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
  font-family: sans-serif;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 8px 0;
}

.hero-banner {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0; /* Espaçamento em px em cima e embaixo */
}

/* 2. O código que dá "vida" e tamanho real para a imagem */
.img-trabalhadores {
  width: 1100PX;        /* Largura fixa em px conforme o padrão Figma */
  height: 500px;        /* Altura fixa em px */
  object-fit: cover;    /* REGRA: Impede que a imagem fique amassada */
  border-radius: 10px;  /* Bordas arredondadas profissionais */
  border-bottom: 6px solid #0055ff; /* Detalhe azul de destaque */
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5); /* Sombra para profundidade */
  transition: transform 0.4s ease, filter 0.4s ease; 
  cursor: pointer;
}

/* 3. REGRA 4: O efeito Hover Pro (Quando o mouse passa em cima) */
.img-trabalhadores:hover {
  transform: scale(1.03);    /* A imagem cresce 3% suavemente */
  filter: brightness(1.2);   /* Ela ganha um brilho extra */
}

h1 {
  color: #ffff00;
  font-size: 32px;
  margin-bottom: 5px;
}

.subtitle {
  color: white;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 600;
  margin: 2px 0;
}

.btn-acesso { 
background:transparent;
color: white;
border: 2px solid white;
padding: 5px 15px;
cursor: pointer;
border-radius: 45px;
font-size: 16px;
position: absolute;
top: 35px;
right: 30px;
transition: all 0.3s ease;
cursor: pointer;
text-decoration: none;
}

.btn-acesso:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
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

.benefit-text h3 {
  color: white;
  margin-bottom: 10px;
  font-size: 20px;
}

.benefit-text p {
  color: white;
  font-size: 16px;
  line-height: 1.4;
}

.benefit-img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  flex-shrink: 0; 
}

.benefit-item {
 display: flex;
 align-items: center;
 justify-content: space-between;
 padding: 15px 0;
 border-color: #fbc02d;
 border-bottom: 1px solid #1a2333;
 width: 100%;
}

.benefit-text{
  flex: 1;
  padding-right: 20px;
  text-align: left;
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
  gap: 20px;
  align-items: center;
  perspective: 1000px;
}

.social-icon {
  width: 65px;
  height: 45px;
  object-fit: contain;
  cursor: pointer;
  opacity: 0.9;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  backface-visibility: visible;
}

.social-icon:hover {
  opacity: 1;
  transform: translateY(-10px) rotateY(360deg);
}
</style>