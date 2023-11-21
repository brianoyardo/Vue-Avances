<script setup>
import { onMounted, ref } from 'vue';
import { store } from './store.js';

const prods = ref([]);

onMounted(() => {
  fetch("http://localhost:3000/productos")
    .then((res) => res.json())
    .then((data) => (prods.value = data))
    .catch((err) => console.log(err.message));
});

const handleAdd = (o) => {
  const existingProduct = store.count.find((p) => p.producto_Id === o.producto_Id);

  if (existingProduct) {
    existingProduct.cantidad += 1;
  } else {
    store.increment(o);
  }
};
</script>

<template>
  <h1>Catalogo de Productos</h1>

  <section class="container">
    <article class="card" v-for="p in prods" :key="p.id">
      <img :src="p.img" alt="" class="card-img">
      <div class="card-body">
        <h3 class="title">{{ p.nombre }}</h3>
        <p class="text">Cantidad en Stock: {{ p.stock }}</p>
      </div>
      <div class="card-footer">
        <div class="price">{{ p.precio }}Bs</div>
        <button class="button" @click="handleAdd({ producto_Id: p.id, precio: p.precio, cantidad: 1 })">comprar</button>
      </div>
    </article>
  </section>
</template>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  width: 300px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.02);
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-body {
  padding: 10px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text {
  font-size: 16px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.price {
  font-size: 20px;
  font-weight: bold;
}

.button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #2980b9;
}
</style>