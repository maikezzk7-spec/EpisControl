<template>
  <div class="home-container">
    <header class="header">
      <div class="header-info">
        <h1>Gestão de EPI:</h1>
        <p class="subtitle">E o Controle de Equipamento de segurança Individual da sua Empresa</p>
        <p class="subtitle">Para um Ambiente de Trabalho Protegido.</p>
      </div>
      <div class="nav-button-container">
        <button class="btn-acesso">Acesso</button>
      </div>
    </header>

    <div class="hero-banner">
      <div class="placeholder-img">IMAGEM DOS TRABALHADORES</div>
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
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home-container {
  background-color: #050a18;
  color: white;
  min-height: 100vh;
  padding: 0 0 40px 0;
  font-family: sans-serif;
}

/* Header e Botão Acesso */
.header { 
  display: flex; 
  justify-content: center; 
  align-items: center;
  position: relative; 
  padding: 40px 20px;
}

.nav-button-container {
  position: absolute;
  right: 40px;
  top: 40px;
}

.btn-acesso { 
  border: 1.5px solid white; 
  background: none; 
  color: white; 
  padding: 8px 30px; 
  cursor: pointer; 
  border-radius: 20px; /* Botão estilo pílula do Figma */
  font-size: 16px;
  font-weight: 500;
  transition: 0.3s;
}

.btn-acesso:hover {
  background: white;
  color: #050a18;
}

/* Títulos principais */
h1 { color: #ffff00; font-size: 32px; margin-bottom: 10px; }
.subtitle { margin: 5px 0; font-size: 18px; opacity: 0.9; }

.section-title { 
  color: #ffff00; 
  text-align: center; 
  margin: 60px 0 40px 0; 
  font-size: 28px;
}

/* Grade de Benefícios com Títulos 24px */
.benefits-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 30px; 
  padding: 20px 5%;
}

.benefit-item { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start; 
  padding: 25px;
  border-bottom: 1px solid #1a2333;
}

.benefit-text h3 {
  font-size: 24px; /* Tamanho 24 que você notou */
  font-weight: bold;
  margin-bottom: 12px;
  color: white;
}

.benefit-text p {
  font-size: 16px;
  color: #d1d1d1;
  line-height: 1.5;
}

.benefit-icon { 
  font-size: 40px; 
  color: #ffff00;
  margin-left: 20px;
}

/* Banner Principal e Linha Azul */
.hero-banner {
  width: 100%;
  border-bottom: 4px solid #0055ff; /* A linha azul do Figma */
}

.hero-img, .placeholder-img { 
  width: 100%;
  height: 450px;
  background: #1a2333;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
}

/* Rodapé */
.main-footer {
  display: flex;
  justify-content: space-around;
  margin-top: 80px;
  padding: 40px 5%;
  border-top: 1px solid #1a2333;
}

.footer-column h4 { color: #ffff00; margin-bottom: 15px; }
.footer-social { display: flex; gap: 15px; align-items: center; font-size: 24px; }
</style>