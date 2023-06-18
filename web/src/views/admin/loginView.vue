<template>
    <adminLayout>
        <main>
            <div id="loader" v-if="isLoading">
                <span class="loader" ></span>
            </div>
            <form @submit="login" v-if="!isLoading">
                
                <h1>Login</h1>
                <div class="inputs">
                    <input type="text" placeholder="Username" v-model="EUID">
                    <div class="password">
                        <input type="password" placeholder="Password" v-model="password">
                    </div>
                    <p style="color: rgb(255, 255, 255); background-color: red; padding: .3rem 1rem; border-radius: .2rem;" v-if="error">{{ error }}</p>
                    <input type="submit" value="Login">
                </div>
            </form>
        </main>
        
    </adminLayout>
</template>

<script setup>
import adminLayout from '../../layout/adminLayout.vue';
import store from '../../store/index'
import {inject,ref} from 'vue'
const route=inject('router')
const EUID=ref("")
const password=ref("")
const error=ref()
const isLoading=ref(false)
const login=(e)=>{
    e.preventDefault();
    isLoading.value=true
    fetch(`${store.state.apiUrl}/user/login`,{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            EUID:EUID.value,
            password:password.value,
        })
    })
    .then(res=>{
        if(res.status<200 || res.status>=300){
            res.json().then(err=>{
                console.log(err);
                error.value=err.message
            })
        }else{
            res.json().then(data=>{
                localStorage.setItem("token",data.token)
                route.push("/cp")
            })
            .catch(err=>{
                // console.log(err);
                error.value=err.message
            })
        }
        isLoading.value=false
    })
    
}

</script>

<style lang="scss" scoped>

#loader{
    width: 100%;
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .loader {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        border: 3px solid;
        border-color:rgb(0, 255, 208) rgb(0, 255, 208)  transparent transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
    .loader::after,
    .loader::before {
        content: '';  
        box-sizing: border-box;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border: 3px solid;
        border-color: transparent transparent #000000 #000000;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        box-sizing: border-box;
        animation: rotationBack 0.5s linear infinite;
        transform-origin: center center;
    }
    .loader::before {
        width: 32px;
        height: 32px;
        border-color: rgb(0, 255, 208) rgb(0, 255, 208) transparent transparent;
        animation: rotation 1.5s linear infinite;
    }
    
    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    } 
    @keyframes rotationBack {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(-360deg);
        }
    }
}

main{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Siemreap',cursive; 
    form{
        min-width: 20rem;
        border-radius: .2rem;
        padding: 2rem 1rem;
        border: 3px solid rgb(255, 255, 255);
        box-shadow: 0 0 10px 2px rgb(0, 255, 208),
        inset 0 0 10px 2px rgb(0, 255, 208);
        display: flex;
        flex-direction: column;
        padding-top: .5rem;
        gap: 2rem;
        h1{
            text-align: center;
            font-size:2rem;
            // background-color: white;
            // padding: 0 1rem;
        }
        .inputs{
            display: flex;
            flex-direction: column;
            gap: 2rem;
            
            input{
                font-size: 1.2rem;
                padding: .3rem;
                border: none;
                outline: none;
                box-shadow: 0 0 0 1px  black;
                border-radius: .1rem;
                transition: 250ms;
                font-family: 'Siemreap',cursive; 
                &:focus{
                    box-shadow: 0 0 0 2px  rgb(0, 255, 208);
                }
                &[type=submit]{
                    box-shadow: unset;
                    outline: none;
                    background-color: #000000;
                    color: white;
                    border-radius: .2rem;
                    transition: 300ms;
                    cursor: pointer;
                    &:hover{
                        background-color: rgb(0, 255, 208);
                    }
                }
            }
            .password{
                width: 100%;
                input{
                    width: 100%;
                }
            }
        }
    }
}
</style>