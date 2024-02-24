document.addEventListener("DOMContentLoaded", function() {
    var carritoDropdown = document.getElementById('carrito-dropdown');
    var carritoIcono = document.getElementById('carrito-icono');
    var total = 0;

    // Función para mostrar/ocultar el contenido del carrito
    function toggleCarritoDropdown() {
        carritoDropdown.classList.toggle('mostrar');
    }

    // Agregar evento de clic al icono del carrito para mostrar/ocultar el contenido
    carritoIcono.addEventListener('click', toggleCarritoDropdown);

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        var existeProducto = false;

        var cartItems = carritoDropdown.querySelectorAll('.cart-item');
        cartItems.forEach(function(item) {
            var nombreProducto = item.querySelector('span').textContent;
            if (nombreProducto === producto.name) {
                existeProducto = true;
                var cantidadElement = item.querySelector('.cantidad');
                var cantidad = parseInt(cantidadElement.textContent);
                cantidad++;
                cantidadElement.textContent = cantidad;
                total += producto.price;
            }
        });

        if (!existeProducto) {
            var cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>
                    <img src="${producto.image}" alt="Product Image">
                    <span>${producto.name}</span>
                </div>
                <span class="cantidad">1</span>
                <button class="eliminar-producto">×</button>
            `;
            carritoDropdown.appendChild(cartItem);
            total += producto.price;
        }

        actualizarTotal();
    }

    // Ejemplo de cómo agregar un producto al carrito cuando se hace clic en el botón "Agregar al carrito"
var addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
addToCartButtons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        var productBox = event.target.closest('.product-box');
        var productId = productBox.getAttribute('data-product-id');
        var productName = productBox.querySelector('.product-details h3').textContent;
        var productImageSrc = productBox.querySelector('.carousel img').getAttribute('src');
        var productPrice = parseFloat(productBox.querySelector('.product-details p').textContent.substr(1)); // Obtener precio como número
        agregarAlCarrito({ id: productId, name: productName, image: productImageSrc, price: productPrice });
        animateCart();
    });
});


    // Función para eliminar un producto del carrito
    function eliminarProducto(event) {
        var cartItem = event.target.closest('.cart-item');
        var cantidadElement = cartItem.querySelector('.cantidad');
        var cantidad = parseInt(cantidadElement.textContent);
        if (cantidad > 1) {
            cantidad--;
            cantidadElement.textContent = cantidad;
        } else {
            cartItem.remove();
        }
        var nombreProducto = cartItem.querySelector('span').textContent;
        var productBox = document.querySelector('.product-box .product-details h3');
        if (nombreProducto === productBox.textContent) {
            total -= parseFloat(productBox.nextElementSibling.textContent.substr(1));
        }
        actualizarTotal();
    }

    // Agregar evento de clic a todos los botones de eliminar producto
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('eliminar-producto')) {
            eliminarProducto(event);
        }
    });

    // Función para actualizar el precio total
    function actualizarTotal() {
        var totalElement = document.getElementById('total');
        totalElement.textContent = '$' + total.toFixed(2);
    }

    // Función para animar el carrito al agregar productos
    function animateCart() {
        carritoIcono.classList.add('animacion-carrito');
        setTimeout(function() {
            carritoIcono.classList.remove('animacion-carrito');
        }, 300);
    }
});
 // Datos de ejemplo (puedes sustituirlos por tus propios datos)
const productsData = [
    { category: 'hombres', name: 'Remera para Hombre 1', price: '$20', images: ['image1.jpg', 'image2.jpg'] },
    { category: 'mujeres', name: 'Remera para Mujer 1', price: '$25', images: ['image3.jpg', 'image4.jpg'] },
    { category: 'ninos', name: 'Remera para Niño 1', price: '$15', images: ['image5.jpg', 'image6.jpg'] }
  ];
  
  // Función para generar las cajas de productos
  function generateProductBoxes(products) {
    const container = document.getElementById(`${products[0].category}-products`);
    products.forEach(product => {
      const productBox = document.createElement('div');
      productBox.classList.add('product-box');
      productBox.innerHTML = `
        <div id="${product.name}" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            ${product.images.map((image, index) => `
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${image}" class="d-block w-100" alt="${product.name}">
              </div>
            `).join('')}
          </div>
          <a class="carousel-control-prev" href="#${product.name}" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#${product.name}" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      `;
      container.appendChild(productBox);
    });
  }
  
  // Llamada a la función para generar las cajas de productos
  generateProductBoxes(productsData);