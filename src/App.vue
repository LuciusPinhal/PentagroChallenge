<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
   
    <router-link to="/login">Login</router-link> |

    <router-link to="/About">Gestão de Usuaris</router-link> 
    
  </nav> -->
  <router-view/>
</template>
<script>
export default {

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 20px;
  margin: auto;
  margin-left: 0;
  
  border: 1px solid #d3d3d3;
  border-radius: 5px;
     
  margin: 40px auto;  

}

nav a {
  color: #2c3e50;
  text-decoration: none;
  margin: 12px;
  transition: .5s;
}
#nav a:hover {
    color: #fff;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>


