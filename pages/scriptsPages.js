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
    { id: 1, nombre: 'Remera Adidas', precio: 20, imagen: 'camiseta.jpg' },
    { id: 2, nombre: 'Pantalón Nike', precio: 30, imagen: 'pantalon.jpg' },
    // Agrega más productos según sea necesario
];

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    // Obtener el producto seleccionado por su ID
    const producto = productos.find(producto => producto.id === id);
    
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

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    // Obtener el carrito del almacenamiento local del navegador
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Encontrar el índice del producto en el carrito
    const index = carrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
        // Reducir la cantidad del producto en 1 o eliminarlo si la cantidad es 1
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
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
        productoElemento.classList.add('carrito-item');
        productoElemento.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <div class="producto-info">
                <p>${producto.nombre}</p>
                <p>Cantidad: ${producto.cantidad}</p>
            </div>
            <button class="eliminar-producto" data-product-id="${producto.id}">Eliminar</button>
        `;
        carritoElemento.appendChild(productoElemento);
    });

    // Agregar un escuchador de eventos para los botones de eliminar
    const eliminarBotones = document.querySelectorAll('.eliminar-producto');
    eliminarBotones.forEach(button => {
        button.addEventListener('click', function(event) {
            const productId = button.dataset.productId;
            event.stopPropagation(); // Evitar que se cierre el carrito al hacer clic en el botón
            eliminarDelCarrito(parseInt(productId));
        });
    });
}

// Llamar a la función mostrarCarrito al cargar la página para mostrar los productos guardados
document.addEventListener('DOMContentLoaded', function() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    mostrarCarrito(carritoGuardado);
});

// Evento click para los botones "Añadir al Carrito"
document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log(addToCartButtons);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = button.dataset.productId;
            agregarAlCarrito(parseInt(productId));
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelector('.slides');
        const slideCount = slides.querySelectorAll('.slide').length;
        let currentIndex = 0;

        const showSlide = (index) => {
            if (index < 0) {
                index = slideCount - 1;
            } else if (index >= slideCount) {
                index = 0;
            }
            const slideWidth = slides.querySelector('.slide').clientWidth;
            slides.style.transform = `translateX(-${index * slideWidth}px)`;
            currentIndex = index;
        };

        const prevSlide = () => {
            showSlide(currentIndex - 1);
        };

        const nextSlide = () => {
            showSlide(currentIndex + 1);
        };

        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Mostrar la primera imagen al cargar la página
        showSlide(currentIndex);
    });
});