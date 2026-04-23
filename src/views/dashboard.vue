<template>
  <div class="dashboard-container">
    <aside class="sidebar">
      <div class="logo-section">
        <h2 class="brand-name">EPIS<span>Control</span></h2>
      </div>

      <nav class="menu">
        <router-link to="/dashboard" class="menu-item active">
          <i class="icon-dashboard"></i> Dashboard
        </router-link>
        <router-link to="/funcionarios" class="menu-item">
          <i class="icon-users"></i> Funcionários
        </router-link>
        <router-link to="/estoque" class="menu-item">
          <i class="icon-box"></i> Estoque de EPIs
        </router-link>
        <router-link to="/entregas" class="menu-item">
          <i class="icon-truck"></i> Gestão de Entregas
        </router-link>
      </nav>

      <footer class="sidebar-footer">
        <button class="btn-logout">Encerrar Sessão</button>
      </footer>
    </aside>

    <main class="main-content">
      <header class="content-header">
        <div class="title-group">
          <h1>Painel de Controle</h1>
          <p>Visão geral da segurança e estoque de EPIs</p>
        </div>
        <div class="user-badge">
          <span class="status-dot"></span> Administrador
        </div>
      </header>

      <section class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue">👤</div>
          <div class="stat-info">
            <span>FUNCIONÁRIOS</span>
            <strong>3</strong>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">⛑️</div>
          <div class="stat-info">
            <span>ESTOQUE TOTAL</span>
            <strong>8</strong>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">✅</div>
          <div class="stat-info">
            <span>ENTREGAS REALIZADAS</span>
            <strong>3</strong>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon red">⚠️</div>
          <div class="stat-info">
            <span>ALERTAS DE VALIDADE</span>
            <strong>0</strong>
          </div>
        </div>
      </section>

      <section class="table-container">
        <div class="table-header">
          <h3>Movimentações Recentes</h3>
          <button class="btn-action">Nova Entrega</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>COLABORADOR</th>
              <th>EQUIPAMENTO</th>
              <th>DATA</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>José</td>
              <td>Luva</td>
              <td>08/04/2026</td>
              <td><span class="badge-status">ATIVO</span></td>
            </tr>
            <tr>
              <td>Carlos</td>
              <td>Luva</td>
              <td>08/04/2026</td>
              <td><span class="badge-status">ATIVO</span></td>
            </tr>
            <tr>
              <td>Eu</td>
              <td>Luva</td>
              <td>08/04/2026</td>
              <td><span class="badge-status">ATIVO</span></td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  background-color: #f8fafc;
}

/* SIDEBAR */
.sidebar {
  width: 260px;
  background-color: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.brand-name {
  color: #38bdf8;
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 40px;
}

.brand-name span { color: #F7FF00; }

.menu { flex: 1; }

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #94a3b8;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: 0.3s;
}

.menu-item.active, .menu-item:hover {
  background-color: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
}

.btn-logout {
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

/* CONTEÚDO PRINCIPAL */
.main-content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}

.title-group h1 { font-size: 24px; color: #1e293b; }
.title-group p { color: #64748b; font-size: 14px; }

.user-badge {
  background: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; }

/* GRID DE CARDS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.blue { background: #e0f2fe; }
.orange { background: #ffedd5; }
.green { background: #dcfce7; }
.red { background: #fee2e2; }

.stat-info span { font-size: 11px; color: #64748b; font-weight: 700; }
.stat-info strong { display: block; font-size: 20px; color: #1e293b; }

/* TABELA */
.table-container {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-action {
  background: #0f172a;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

table { width: 100%; border-collapse: collapse; }
th { text-align: left; padding: 12px; font-size: 12px; color: #64748b; border-bottom: 1px solid #f1f5f9; }
td { padding: 16px 12px; font-size: 14px; color: #1e293b; border-bottom: 1px solid #f1f5f9; }

.badge-status {
  background: #dcfce7;
  color: #166534;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
}
</style>