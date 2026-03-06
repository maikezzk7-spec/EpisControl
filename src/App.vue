<template>
<div>
</- Menu de navegação >
<nav>
<<router-link to="/"> home</router-link> 
<router-link to="/login">login</router-link> 
<router-link to="/cadastro">cadastro</router-link> 
<router-link to="/relatorio">relatorio</router-link>
</nav>
</- Aqui aparece o conteúdo da página >
<router-view />
</div>
</template>