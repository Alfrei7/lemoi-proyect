// Función para abrir y cerrar el contenido del carrito
function toggleCarrito() {
    var dropdown = document.getElementById("carrito-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Agregar un listener de evento para abrir y cerrar el carrito al hacer clic en el ícono del carrito
document.getElementById("carrito").addEventListener("click", function(event) {
    toggleCarrito();
    event.stopPropagation(); // Evitar que se cierre el carrito al hacer clic en él
});

// Agregar un listener de evento para cerrar el carrito al hacer clic fuera de él
document.addEventListener("click", function(event) {
    var dropdown = document.getElementById("carrito-dropdown");
    if (event.target !== dropdown && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

// Lista de productos
const productos = [
    { id: 1, nombre: 'Camiseta', precio: 20, imagen: 'camiseta.jpg' },
    { id: 2, nombre: 'Pantalón', precio: 30, imagen: 'pantalon.jpg' },
    // Agrega más productos según sea necesario
];

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    // Obtener el producto seleccionado por su ID (puedes obtenerlos de una lista o base de datos)
    const producto = obtenerProductoPorId(id);
    
    // Obtener el carrito del almacenamiento local del navegador
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
    if (productoExistente) {
        // Incrementar la cantidad si el producto ya está en el carrito
        productoExistente.cantidad++;
    } else {
        // Agregar el producto al carrito con una cantidad de 1
        carrito.push({ ...producto, cantidad: 1 });
    }

    // Guardar el carrito actualizado en el almacenamiento local del navegador
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar el carrito actualizado
    mostrarCarrito(carrito);
}

// Función para mostrar el carrito
function mostrarCarrito(carrito) {
    const carritoElemento = document.getElementById('carrito-dropdown');
    carritoElemento.innerHTML = ''; // Limpiar el contenido anterior del carrito

    // Recorrer todos los productos en el carrito y crear un elemento para cada uno
    carrito.forEach(producto => {
        const productoElemento = document.createElement('div');
        productoElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <div>
                <p>${producto.nombre}</p>
                <p>Cantidad: ${producto.cantidad}</p>
            </div>
        `;
        carritoElemento.appendChild(productoElemento);
    });
}

// Llamar a la función mostrarCarrito al cargar la página para mostrar los productos guardados
document.addEventListener('DOMContentLoaded', function() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    mostrarCarrito(carritoGuardado);
});