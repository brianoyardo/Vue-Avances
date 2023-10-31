<template>
  <div class="about">
    <h1>Registro de Salida de Productos</h1>
    <p>Items a registrar = {{ store.count.length }}</p>
    <section>
      <form action="" @submit.prevent="handleSale()">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody v-if="store.count.length">
            <tr v-for="p in store.count">
              <td>{{ p.producto_Id }}</td>
              <td><input type="number" v-model="p.cantidad"></td>
              <td>{{ p.precio }}</td>
              <td><button @click="remove(p)">Quitar de la lista</button></td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Enviar">
      </form>
    </section>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { store } from "./store"
const handleSale = () => {
  // console.log(store.count)
  const data = ref({
    fecha: new Date().toLocaleString(),
    detalles: store.count
  })
  // console.log(JSON.stringify(data.value));
  fetch("http://localhost:3000/ventas", {
    method: "POST", 
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data.value) // En caso de que se haya hecho el data en modo reactivo, se hace un .value para reflejar los datos 
  })
}
const remove = (item) => {
  store.count.splice(store.count.indexOf(item),1)
}

</script>
<style>

</style>
