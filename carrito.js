function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContador() {
  const contador = document.getElementById("contador");
  if (contador) {
    const carrito = obtenerCarrito();
    contador.textContent = carrito.length;
  }
}

function agregarProducto(nombre, precio) {
  const carrito = obtenerCarrito();
  carrito.push({ nombre, precio });
  guardarCarrito(carrito);
  actualizarContador();
}

function eliminarDelCarrito(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  renderizarCarrito();
  actualizarContador();
}

function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total-carrito");
  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.innerHTML = "<li>Tu carrito está vacío.</li>";
    total.textContent = "";
    return;
  }

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - C$${item.precio}
      <button class="eliminar-btn" onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
    lista.appendChild(li);
  });

  const suma = carrito.reduce((acc, p) => acc + p.precio, 0);
  total.textContent = `Total: C$${suma}`;
}

function mostrarCarrito() {
  renderizarCarrito();
  document.getElementById("carrito-modal").style.display = "block";
}

function cerrarCarrito() {
  document.getElementById("carrito-modal").style.display = "none";
}

function procesarPago() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) return alert("Tu carrito está vacío.");
  const total = carrito.reduce((sum, p) => sum + p.precio, 0);
  alert(`Procesando pago por C$${total}...\n¡Gracias por tu compra!`);
  guardarCarrito([]);
  renderizarCarrito();
  actualizarContador();
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar-carrito")) {
      const nombre = e.target.dataset.nombre;
      const precio = parseFloat(e.target.dataset.precio);
      agregarProducto(nombre, precio);
    }

    if (e.target.id === "ver-carrito") {
      mostrarCarrito();
    }

    if (e.target.id === "pagar") {
      procesarPago();
    }
  });
});
