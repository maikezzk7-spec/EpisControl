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
  padding: 20px;
  font-family: sans-serif;
}

.header { 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  position: relative;
  text-align: center;
}

h1 { color: #ffff00; margin-bottom: 5px; }

.subtitle {
  margin: 2px 0;
  font-size: 0.9rem;
}

.btn-acesso { 
  position: absolute; 
  right: 0; 
  top: 20px; 
  border: 1px solid white; 
  background: none; 
  color: white; 
  padding: 5px 15px; 
  cursor: pointer; 
  border-radius: 4px;
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

.card-content h3 {
  margin: 0;
  font-size: 1.1rem;
}

.card-content p {
  color: #b0b0b0;
  font-size: 0.85rem;
}

.card-icon { 
  font-size: 2.5rem; 
  margin-left: 15px;
}
</style>