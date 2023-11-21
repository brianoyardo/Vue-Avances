<script setup>
import { store } from "./store";
import { ref, computed, watch } from "vue";

const handleSale = () => {
  const uniqueProducts = [...new Set(store.count.map((p) => p.producto_Id))];
  const totalWithIVA = calculateTotalPriceWithIVA();

  const data = ref({
    fecha: new Date().toLocaleString(),
    detalles: store.count,
    total: totalWithIVA,
  });

  fetch("http://localhost:3000/ventas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data.value),
  });
};

const remove = (item) => {
  const index = store.count.indexOf(item);
  if (index !== -1) {
    store.count.splice(index, 1);
  }
};

const applyDiscount = (product) => {
  const totalQuantity = totalCantidad;
  if (totalCantidad >= 10) {
    product.precioConDescuento = (product.precio * 0.9).toFixed(2);
  } else if (totalCantidad >= 20) {
    product.precioConDescuento = (product.precio * 0.7).toFixed(2);
  } else if (totalCantidad >= 50) {
    product.precioConDescuento = (product.precio * 0.5).toFixed(2);
  } else {
    product.precioConDescuento = product.precio.toFixed(2);
  }
};

const calculateTotalPrice = (product) => {
  const totalPrice = product.cantidad * product.precioConDescuento;
  return totalPrice.toFixed(2);
};

const totalCantidad = computed(() => {
  return store.count.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
});

watch(
  () => store.count,
  (newCount, oldCount) => {
    for (const product of newCount) {
      applyDiscount(product);
    }
  },
  { deep: true }
);

const calculateTotalPriceWithoutIVA = () => {
  const totalWithoutIVA = store.count.reduce((total, product) => {
    return total + product.cantidad * product.precioConDescuento;
  }, 0);
  return totalWithoutIVA.toFixed(2);
};

const calculateTotalwithoutIVAS = () => {
  const menos = calculateDiscount();
  const Totale = calculateTotalPriceWithoutIVA();
  const totals = (Totale - menos).toFixed(2);
  return totals;
};

const calculateTotalPriceWithIVA = () => {
  const totalWithoutIVA = calculateTotalwithoutIVAS();
  const totalWithIVA = (totalWithoutIVA * 1.13).toFixed(2);
  return totalWithIVA;
};

const calculateDiscount = () => {
  const total = totalCantidad.value;
  const priceDes = calculateTotalPriceWithoutIVA();
  let discountMessage = "";
  if (total >= 50) {
    return (priceDes * 0.5).toFixed(2);
  } else if (total >= 20) {
    return (priceDes * 0.3).toFixed(2);
  } else if (total >= 10) {
    return (priceDes * 0.1).toFixed(2);
  } else {
    return 0;
  }
};
</script>

<template>
  <div class="about">
    <h1>Registro de salida de productos</h1>

    <section>
      <form action="" @submit.prevent="handleSale">
        <table class="m-4">
          <thead>
            <tr>
              <th class="p-3">ID</th>
              <th class="p-3">Cantidad</th>
              <th class="p-3">Precio</th>
              <th class="p-3">Total</th>
              <th class="p-3">Eliminar</th>
            </tr>
          </thead>
          <tbody v-if="store.count.length">
            <tr v-for="p in store.count" :key="p.producto_Id">
              <td class="p-3">{{ p.producto_Id }}</td>
              <td class="p-3 text-slate-950">
                <input type="number" v-model="p.cantidad" />
              </td>
              <td class="p-3">{{ p.precio }} Bs</td>
              <td class="p-3">{{ calculateTotalPrice(p) }} Bs</td>
              <td class="p-3">
                <button @click="remove(p)" class="bg-red-700 p-1">
                  Quitar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p>Total de cantidad: {{ totalCantidad }}</p>
        <p>Total Descuento: {{ calculateDiscount(), calculateDiscount().discountMessage }} Bs</p>
        <p>Total: {{ calculateTotalPriceWithoutIVA() }} Bs</p>

        <p>Total a pagar con Descuento (sin IVA): {{ calculateTotalwithoutIVAS() }} Bs</p>
        <p>Total a pagar con Descuento (con IVA): {{ calculateTotalPriceWithIVA() }} Bs</p>
        <input type="submit" value="Enviar" class="btn btn-primary" />
      </form>
    </section>
  </div>
</template>

<style scoped>
.about {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px;
  text-align: center;
}

th {
  background-color: #333;
  color: #fff;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

input[type="number"] {
  width: 60px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}

p {
  margin-bottom: 10px;
  font-size: 16px;
}

.btn-primary {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.btn-primary:hover {
  background-color: #2980b9;
}
</style>