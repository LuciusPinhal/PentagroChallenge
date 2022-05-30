<template>
<!-- realizar login  -->
    <div class="bordas"> 
        <main>

            <section class="section">

                <div class="about" id="main-banner"></div>
                    <form @submit.stop.prevent="login">
                        <h1 class="titulo">Realizar Login</h1>

                        <fieldset>
                            <div class="container">
                                <input type="text" required name="name" id="name" v-model="username" autofocus>
                                <label id="userLabel">Nome do Usuario</label>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div class="container">
                                <input type="password" required name="password" id="senha" v-model="password" autofocus>
                                <label id="senhaLabel">senha</label>
                            </div>  
                        </fieldset>

                        <fieldset>
                            <button type="submit" class="submit-btn">Login</button>
                        </fieldset>

                        <Messagem :msg="msg" v-show="msg"/>

                    </form>
            </section>

        </main>
   
    </div>
    
</template>

<script>

import axios from 'axios';
import Messagem from "../components/Messagem.vue"
import md5 from 'md5';
export default {
    name: "Banner",
    
    data() {
        return {
            username: "",
            password: "",
            msg: null
        };
         
    },
    methods: {
        async login(e) {
            // let senha = "admin"
            // let senhaMd5 = md5(senha)
            // let senhaMd5Base64 = btoa(senhaMd5)
            // console.log(senhaMd5Base64)
       
           
              const params = {
                "Username": btoa(this.username),
                "UserPassword": btoa(md5(this.password)),
                // "Username": "YWRtaW4=",
                // "UserPassword": "MjEyMzJmMjk3YTU3YTVhNzQzODk0YTBlNGE4MDFmYzM="
            };
            axios
            //metodo de login 
                .post("http://186.237.58.167:65129/api/user/login", params)
                .then((response) => {
                const token = response.data; 
                console.log(token);
                localStorage.setItem('token', response.data)

                    window.location.href ='http://localhost:8080/About'
                    axios.defaults.baseURL ='http://186.237.58.167:65129/api/user/login'
                    axios.headers.common ['Authorization'] = `bearer ${localStorage.getItem('token')}`
                    .catch(error => {
                    this.errorMessage = error.message;
                    console.error("There was an error! 11", error);
                }); 

            })
                .catch(error => {
                this.errorMessage = error.message;
                console.error("There was an error!", error);
                setTimeout(() => this.msg = `Usuário ou Senha incorretos`, 500);
                //limpar a mensagem
                setTimeout(() => this.msg = "", 1800);
            });
            
            this.username = "";
            this.password = "";
        },

   
    },
    
    components: { Messagem },

       
    
}



</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');

.bordas {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
   
}

    
.section {
    background: #fff;
    padding: 30px 5px;
    border-radius: 10px;
    box-shadow: 5px 5px 15px;
    max-width: 70vw;

}

fieldset {
    border: none;
    display: flex;
    width: 100%;
    margin-top: 10px;
    padding: 0px 100px;
}

fieldset:nth-child(4) {
    display: flex;
    padding-top: 10px;
} 

.titulo {
    text-align: center;
    font-size: 30px;
    margin: 10px;
    color: #08A696;
    text-align: center;
    padding: 15px 10px;
}



.container input {

    margin: 10px 10px;
    width: calc(100%);
    height: 70px;
    border: none;
    background-color: #ededed;
    border-radius: 4px;
    color: #333;
    font-size: 18px;
    font-weight: 700;
    padding: 10px 10px 0px 10px;
}
.container{
    position: relative;
}
.container label{
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
.container input:focus ~ label,
.container input:valid ~ label {
    left: 30px;
    top: -10px;
    color: #08A696;
}

button {
    margin: 10px 0;
    margin-left:5%;
    width: calc(100% - 0px);
    height: 70px;
    background-color: #08A696;
    color: #fff;
    font-size: 20px;
    border:none;
    border-radius:20px;
    cursor:pointer;
    transition: 0.3s linear;
    
    
}
button:hover {
	/* Altera a transparência do elemento. */
	opacity: 0.7;
}
form a {
    text-decoration: none;
    font-size: 16px;
    color: #555;
    font-weight: 20px;
    text-transform: uppercase;
    text-align: center;
    display: block;
}
form a:hover {
    color: #08A696;


}

#main-banner {
    background-image: url('C:\programaçao\Login\public\img\Logo-P.jpeg');
    background-position: center;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-repeat: no-repeat;
  
  }



 
</style> 
