<template>
<div class="message-container">
   <p> {{ msg }} </p>
</div>
</template>

<script>
export default {
    name: "Message",
    props: {
        msg: String 
    }

}
</script>
<style scoped>
    .message-container {
        
        color: #ff3b1f;;
        background-color: #0000;
        border: 1px solid #ff3b1f;
        border-radius: 10px;
        padding: 8px;
        max-width: 400px;
        margin: 10px auto;
        text-align: center;
        height: 45px;
        transition: 1s;
    }
</style>