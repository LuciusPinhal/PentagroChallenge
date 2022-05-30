<template>
<!-- realizar Cadastro  -->

<div>
    <fieldset>
        <div id="main-banner">
             <h1 id="titulo"> Gestão de Usuario</h1>
                <button @click="sair()" class="botao" >Sair</button>
        </div> 
    </fieldset>
    
<form>
  <div class="Corpo">
    <fieldset class="grupo">
       <div class="campo"> 
            <!-- v-model="login" -->
             <input type="login" id="userName" name="userName" v-model= "UsuarioSelecionado.userName" required >
                <label>login</label>
        </div>

        <div class="campo">
            <select name="unidade" v-model="UsuarioSelecionado.unitId">
                <option disabled value="null" >Selecione a Unidade</option>
                <option v-for="unidade in listaUnidades" :key="unidade.name" :value="unidade.id" :selected="UsuarioSelecionado.unitId == unidade.id">
                    {{ unidade.name }}
                </option>
            </select> 
        </div>

    </fieldset>

    <fieldset class="grupo">
        <div class="campo">
            <input type="Text" id="name" name="name" v-model= "UsuarioSelecionado.name" required>
                <label>Nome Completo</label>
        </div>

        <div class="campo">
            <input type="email" id="email" name="email" v-model= "UsuarioSelecionado.email"  required >
                <label>Email</label>
        </div>
    </fieldset>

    <fieldset class="grupo">
        <div class="campo">
            <input type="password" id="userPassword" name="userPassword" v-model= "UsuarioSelecionado.userPassword" required >
                <label>Senha</label>
        </div>

        <div class="campo"> <!--SENHAS IGUAIS FAZER  <input type="password" id="confirm" name="confirm"> <label>Confirmar senha</label-->
            <input type="password" id="userPassword" name="userPassword" v-model ="UsuarioSelecionado.confirmarSenha" required >
                <label>Confirmar senha</label>
        </div>
                       
    </fieldset>
                 <Messagem :msg="msg" v-show="msg"/>

    <fieldset class="grupo">
        <span class="switch-altert">Tempo de Token</span>
            <div class="Tela">
                <div class="wrapper" >
                    <button class="plusminus" @click.stop.prevent="botaoMenos()">-</button>
                    <input type="number" class="num"  v-model="UsuarioSelecionado.loginExpiration" />
                    <button class="plusminus" @click.stop.prevent="botaoMais()">+</button>
                </div>

            <!-- Botão 1 -->
            <div clas="container">
                <label class="switch">
                    <div class="switch-wrapper">
                        <input type="checkbox" v-model="UsuarioSelecionado.receiveAutonomousWarning"> 
                             <span class="switch-button"></span>

                    </div>
                    <span class="switch-text">Receber Alertas</span>
                </label>
            </div>

                <div clas="container">
                    <label class="switch"> 
                        <div class="switch-wrapper">
                            <input type="checkbox" v-model="UsuarioSelecionado.supervisor" > 
                                <span class="switch-button"></span>

                        </div>
                        <span class="switch-text">Tratar Ocorrencias</span>
                    </label>
                </div> 

                <div clas="container">
                    <label class="switch">
                        <div class="switch-wrapper">
                            <input type="checkbox" v-model="UsuarioSelecionado.disabled"> 
                                <span class="switch-button"></span>

                        </div>
                        <span class="switch-text">Desabilitar Usuários</span>
                    </label>

                </div>

            </div>

            

        </fieldset> 

    </div>

</form>


    <div class="salvar">
     
        <button @click="salvar()" class="botao">Salvar</button>
    </div>
 
        

<!-- ///3 parte -->
    <form>
        <div class="Corpo">
            <div id="Cadastro-table">
            <div>
                <div id="Cadastro-table-heading">
                    <div class="order-id">Cód:</div>
                    <div>Nome:</div>
                    <div>E-mail</div>
                    <div>Status</div>
                    <div>Ações:</div>
                </div>
            </div>

            <div id="Cadastro-table-rows">
                <div class="Cadastro-table-row" v-for="usuario in listaUsuarios" :key="usuario.id">
                        <div class="order-number">{{ usuario.id }}</div>
                        <div>{{ usuario.userName}}</div>
                        <div>{{ usuario.email }}</div>
                        <div>{{ usuario.disabled?"Inativo":"Ativo" }}</div>
                        
                        <div>
                            <button class="botao1" @click.stop.prevent="SelecioneUsuario(usuario.id)">Selecione</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
  
</template>

<script>
import Messagem from "../components/Messagem.vue"
import axios from 'axios';
import md5 from 'md5'

  export default {
      data() {
        return {
             msg: null,
            listaUsuarios: [],
            listaUnidades: [],
            UsuarioSelecionado: {
                loginExpiration: 0, 
                unitId: null,
                userPassword: "",
                confirmarSenha:"",

            },
        };
      },
    
    name: "Banner",

    mounted () {
        const token =  localStorage.getItem('token')
        this.listarUsuarios(token);      
        axios
         .get("http://186.237.58.167:65129/api/user/getproductionunitlist", { headers: { "Authorization": `Bearer ${token}` } })
         .then(response => {
            this.listaUnidades = response.data.productionUnitList 
        })                         
    },

    methods: {
        sair(){
            localStorage.removeItem('token')
            window.location.href ='http://localhost:8080/' 
        },
        salvar(){
            const token =  localStorage.getItem('token')
                if(this.UsuarioSelecionado.userPassword == this.UsuarioSelecionado.confirmarSenha){
                 const params = {
                    "id":this.UsuarioSelecionado.id,
                    "userName":this.UsuarioSelecionado.userName,
                    "name":this.UsuarioSelecionado.name,
                    "UserPassword":btoa(md5(this.UsuarioSelecionado.userPassword || '')),
                    "email":this.UsuarioSelecionado.email,
                    "improveTeamMember":!!this.UsuarioSelecionado.improveTeamMember,
                    "supervisor":!!this.UsuarioSelecionado.supervisor,
                    "receiveAutonomousWarning":!!this.UsuarioSelecionado.receiveAutonomousWarning,
                    "loginExpiration":this.UsuarioSelecionado.loginExpiration,
                    "disabled":!!this.UsuarioSelecionado.disabled,  
                    "system":this.UsuarioSelecionado.system || "G",
                    "unitId":this.UsuarioSelecionado.unitId,
            };

            console.log(params)
            axios
             .post("http://186.237.58.167:65129/api/user/saveuser", params, { headers: { "Authorization": `Bearer ${token}` } })
             .then((response) => {
            //recarregar page
                this.UsuarioSelecionado.userName = null;
                this.UsuarioSelecionado.name = null;
                this.UsuarioSelecionado.email = null;
                this.UsuarioSelecionado.userPassword = "";
                this.UsuarioSelecionado.loginExpiration = 0;
                this.UsuarioSelecionado.unitId = null;
                this.UsuarioSelecionado.receiveAutonomousWarning = null;
                this.UsuarioSelecionado.supervisor = null;
                this.UsuarioSelecionado.disabled = null;
                this.UsuarioSelecionado.confirmarSenha = "";
            
                this.listarUsuarios(token);   
            
            });
            
            } else {

                this.msg = `As Senhas não Conferem `
                //limpar a mensagem
                setTimeout(() => this.msg = "", 2500);

            }
        },

        listarUsuarios(token){

            axios
            .get("http://186.237.58.167:65129/api/user/getusers", { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                this.listaUsuarios = response.data.sort((a,b) => a.id<b.id?-1:a.id>b.id?1:0);

             })
        },

        botaoMenos() {
            if ( this.UsuarioSelecionado.loginExpiration>0){
                 this.UsuarioSelecionado.loginExpiration --; 
            }
        },

        botaoMais() {
            this.UsuarioSelecionado.loginExpiration ++;
        },

            async SelecioneUsuario(idUsuario) {
                let usuario = this.listaUsuarios.filter(x => x.id ==  idUsuario) [0] 
                this.UsuarioSelecionado.userName = usuario.userName;
                this.UsuarioSelecionado.name = usuario.name;
                this.UsuarioSelecionado.email = usuario.email;
                this.UsuarioSelecionado.userPassword = usuario.userPassword;
                this.UsuarioSelecionado.loginExpiration = usuario.loginExpiration;
                this.UsuarioSelecionado.unitId = usuario.unitId;
                this.UsuarioSelecionado.receiveAutonomousWarning = usuario.receiveAutonomousWarning;
                this.UsuarioSelecionado.supervisor = usuario.supervisor;
                this.UsuarioSelecionado.disabled = usuario.disabled;
                this.UsuarioSelecionado.id = usuario.id;

                this.UsuarioSelecionado.improveTeamMember = usuario.improveTeamMember;
                this.UsuarioSelecionado.system = usuario.system;

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            },
        
        },

         components: { Messagem },

    }

            if(localStorage.getItem('token') == null){
                    alert('Você Precisa estar logado para acessar esta pagina')
                    window.location.href ='http://localhost:8080/'
                    
            }


            
</script>

<style scoped>

*{
    margin:0;
    padding: 0;
}

#main-banner {
    background-image: url('C:\programaçao\Login\public\img\Logo-P.jpeg');
    background-position: center;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-repeat: no-repeat;
    margin-top:1%;
  
  }
/*botao*/ 
.salvar {
    display: flex;
    margin-bottom: 5%;
   
}
.botao {
    position:absolute;
    margin: auto;
    margin-top:1%;
    right: 45px;
    width:8%;
    height: 55px;
    background-color: #08A696;
    color: #fff;
    font-size: 20px;
    border:none;
    border-radius:10px;
    cursor:pointer;
    transition: 0.5s linear;
    margin-left:99vh;
  
    
}
.botao:hover {
	/* Altera a transparência do elemento. */
	opacity: 0.5;
    color: #08A696;
    background-color:rgb(225, 224, 224);
    transition: 0.1s
    
}
.botao1 {
    background-color: #08A696;
    color: #fff;
    font-weight: bold;
    border:none;
    border-radius:10px;
    padding: 10px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    transition: .5s;
}
.botao1:hover {
  	opacity: 0.5;
    color: #08A696;
    background-color:rgb(225, 224, 224);
    transition: 0.5s
}
.Tela{
     display: flex;
     padding-left: 6%;
}
.bordas {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
   
}
#titulo {
    text-align: left;
    font-size: 30px;
    color: #08A696;
   margin-left: 3%;
   margin-top:2%;
   
}

.Corpo {
    font-family: sans-serif;
    font-size: 1em;
    margin-left: 2%;
    margin-top: 2%;
    justify-content:center;
    background: #fff;
    padding: 30px 5px;
    border-radius: 10px;
    box-shadow:5px 5px 15px #9d9d9d;
    margin-right: 2%;
    
}

input, select, textarea, botton{
    border-radius: 5px;    
}
.campo{
   
    position: relative;
     margin-bottom: 2em;
     margin-left: 5em;
}

.campo input, .campo select{
    text-align: left;
    margin: 10px 10px;
    width: 80vh;
    height: 70px;
    border: none;
    background-color: #ededed;
    border-radius: 4px;
    color: #333;
    font-size: 18px;
    font-weight: 700;
    padding: 10px 10px 0px 20px;
}
 .campo select{
   text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color:#9d9d9d;
    position: absolute;
    line-height: 70px;
    user-select: none;
    transition: .3s;
    
  
} 
.campo label{
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color:#9d9d9d;
    position: absolute;
    line-height: 70px;
    top: 10px;
    left: 30px;
    user-select: none;
    pointer-events: none;
    transition: .3s;
}
.campo input:focus ~ label,
.campo input:valid ~ label {
    left: 30px;
    top: -10px;
    color: #08A696;
}

fieldset.grupo .campo {
float: left;
margin-right: 1em;


}


.campo section option {
  padding-right: 1em;
}
/* campo input:focus, .campo select:focus, .campo textarea:focus  */
  
/*Botão */
.container{
   
    margin: 0 auto;
    padding-top: 10%;
  
     
}
.switch .switch-text {
    display: flex;
    align-items: center;
    padding-right:2vh;
    font-size: 1.2rem;
    margin: 2px;
}
.switch {
    display: flex;
    cursor:pointer;
}
.switch-altert{
    display: flex;
    margin-left: 13.8%;
    margin-bottom: 10px;
    font-size: 1.2rem;
    
 
}
.switch .switch-wrapper {
    display: block;
    width: 60px;
    height: 34px;
    position: relative;

}
.switch .switch-wrapper .switch-button {
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 40px;
    background-color: #475569;
}
.switch .switch-wrapper input {
    opacity: 0;
    width: 0;
    height: 0;
}

.switch .switch-wrapper .switch-button::before {
     background-color:aliceblue;
    content: "";
    width: 26px;
    height: 26px;
    position:absolute;
    left: 4px;
    bottom: 4px;
    border-radius: 50%;
    transition: .4s all ease;
  
}

.switch .switch-wrapper input:checked + .switch-button{
    background-color:  #08A696;
}
.switch .switch-wrapper input:checked + .switch-button::before{
    transform: translate(26px);
}

/* bagui do hamburge */

#Cadastro-table {
    max-width: 150vh;
    margin: 0 auto;
}

#Cadastro-table-heading,
#Cadastro-table-rows,
.Cadastro-table-row {
    display: flex;
    flex-wrap: wrap;
}

#Cadastro-table-heading {
    font-weight: bold;
    padding: 20px;
    border-bottom: 3px solid #333;
     
}

  
.Cadastro-table-row {
    width: 100%;
    padding: 12px;
    border-bottom: 1px solid #CCC;
}

#Cadastro-table-heading div,
.Cadastro-table-row div {
    width: 23.7%;
}


#Cadastro-table-heading .order-id,
.Cadastro-table-row .order-number {
    width: 5%;
}

select {
    padding: 12px 6px;
    margin-right: 12px;
}



/*css botao ++ */

input {
 align-items: center;
  text-align: center;
  border: 1px solid #6C757D;
} 

input[type="number"] {
  -webkit-appearance: textfield !important;
  -moz-appearance: textfield !important;
  appearance: textfield !important;
  }

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

.wrapper {
  margin-right: 20px;
  border: 2px #dcd3d3 solid;
  width: 20vw;
  height: 50px;
  padding: 4px;
  display: flex;
  border-radius: 15px;
  align-items: center;
  
}

.plusminus {
  height: 80px;
  width: 50%;
  background: #0000;
  border: none;
  font-size: 40px;
  color:  #08A696;
  align-items: center;
  
}

.num {
  height: 100%;
  width: 39%;
  border: none;
  font-size: 30px;
}
</style>