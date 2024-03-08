// Obtener referencia al icono del carrito
const cartIcon = document.querySelector('.cart');

// Obtener referencia al contenedor de productos del carrito
const cartProducts = document.querySelector('.cart-products');

// Agregar un controlador de eventos al icono del carrito
cartIcon.addEventListener('click', function() {
    // Mostrar el contenedor de productos del carrito al hacer clic en el icono del carrito
    cartProducts.style.display = 'block';
});

function closeBtn() {
    var cartProducts = document.querySelector('.cart-products');
    cartProducts.style.display = 'none'; // Oculta el contenedor del carrito
}
// Variables
let allContainerCart = document.querySelector('.product'); // Cambiado de '.products' a '.product'
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total');
let amountProduct = document.querySelector('.count-product');

let buyThings = [];
let totalCard = 0;
let countProduct = 0;




// Funciones
loadEventListeners();

function loadEventListeners() {
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', addProduct);
    });
    containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e) {
    e.preventDefault();
    const selectProduct = e.target.closest('.product');
    readTheContent(selectProduct);
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');
        const deletedProductIndex = buyThings.findIndex(product => product.id === deleteId);

        if (deletedProductIndex !== -1) {
            const deletedProduct = buyThings[deletedProductIndex];
            totalCard -= deletedProduct.price; // Restar solo el precio del producto eliminado
            countProduct -= deletedProduct.amount; // Reducir la cantidad total de productos en el carrito
            if (deletedProduct.amount > 1) {
                deletedProduct.amount--; // Reducir la cantidad del producto en 1 si hay más de uno en el carrito
            } else {
                buyThings.splice(deletedProductIndex, 1); // Eliminar el producto del carrito si solo hay uno
            }
            loadHtml(); // Actualizar el HTML del carrito después de eliminar un producto
        }
    }
}

function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('.carousel .active').getAttribute('src'),
        title: product.querySelector('h3').textContent,
        price: parseFloat(product.querySelector('p').textContent.replace(/[^\d.]/g, '')), // Extraer solo los números y el punto
        id: product.querySelector('.btn-add-cart').getAttribute('data-id'),
        amount: 1
    };

    totalCard += infoProduct.price; // Sumar al precio total el precio del nuevo producto

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        buyThings.forEach(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
            }
        });
    } else {
        buyThings.push(infoProduct);
        countProduct++;
    }

    loadHtml();
}

    totalCard += infoProduct.price; // Sumar al precio total el precio del nuevo producto

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        buyThings.forEach(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
            }
        });
    } else {
        buyThings.push(infoProduct);
        countProduct++;
    }

    loadHtml();


function loadHtml() {
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price.toFixed(2)}$</h5> <!-- Formatear el precio a 2 decimales -->
                <h6>Amount: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);
    });

    priceTotal.innerHTML = totalCard.toFixed(2); // Actualizar el precio total con 2 decimales
    amountProduct.innerHTML = countProduct;
}

function clearHtml() {
    containerBuyCart.innerHTML = '';
}


document.querySelector('.btn-whatsapp').addEventListener('click', function() {
    let message = "¡Hola! Quiero realizar la compra de:\n";
    buyThings.forEach(product => {
        message += `${product.title} - ${product.amount}x - $${product.price.toFixed(2)} cada uno\n`;
    });
    message += `\nTotal: $${totalCard.toFixed(2)}`;
    const phoneNumber = "5491152291799"; // Reemplaza con tu número de teléfono de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});
