<script setup>
import { onMounted, ref } from 'vue';
import {store} from './store.js';
const prods = ref([])
onMounted(
  () =>{
    fetch("http://localhost:3000/productos")
    .then((res)=> res.json())
    .then((data)=> prods.value = data)
    .catch((err)=> console.log(err.message))
  }
)

const handleAdd = (o)=>{
  store.increment(o)
}

</script>

<template>
  <h1>Catalogo de Productos</h1>

  <p>Nro de productos: {{ store.count.length }}</p>

  <section class="container">
    <article class="card" v-for="p in prods" :key="p.id">
      <img :src="p.img" alt="" class="card-img">
      <div class="card-body">
        <h3 class="title">{{ p.nombre }}</h3>
        <p class="text">{{ p.stock }}</p>
      </div>
      <div class="card-footer">
        <div class="price">{{ p.precio }}Bs</div>
        <button class="button"
         @click="handleAdd({producto_Id: p.id, precio: p.precio, cantidad: 1})">comprar</button>
      </div>
    </article>
  </section>
</template>

<style scoped>
.container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
}
.card{
  width: 100%;
  background: white;
  padding: 0.4;
  border-radius: 6px;
}
.card-img{
  width: 100%;
  border-radius: 6px 6px 0 0;
}
.card-img:hover{
  transform: scale(0.98);
}
.card-footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
