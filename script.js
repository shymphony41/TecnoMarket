const products = [
    { id: 1, name: 'Airpods 4', price: 100, image: 'img/Airpods.png', description: 'Descripción detallada del producto 1' },
    { id: 2, name: 'Nike Air Force One', price: 200, image: 'img/nike-air-force-one.png', description: 'Descripción detallada del producto 2' },
    { id: 3, name: 'Samsung galaxy s23', price: 300, image: 'img/samsung.png', description: 'Descripción detallada del producto 3' },
    { id: 4, name: 'Nike TN Air max plus white', price: 300, image: 'img/nike tn.png', description: 'Descripción detallada del producto 3' },
    { id: 5, name: 'Bocina bluetooth', price: 300, image: 'img/bocina.png', description: 'Descripción detallada del producto 3' },
];

function closePromoBanner() {
    const banner = document.getElementById('promoBanner');
    banner.style.display = 'none'; // Oculta el banner al hacer clic en el botón
}





let cart = []; // Array para almacenar los productos seleccionados

// Cargar los productos en el catálogo
function loadProducts() {
    const catalog = document.getElementById('productCatalog');
    catalog.innerHTML = '';  // Limpiar el catálogo antes de agregar productos

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Precio: $${product.price}</p>
            <button onclick="openProductModal(${product.id})">Ver más detalles</button>
        `;

        catalog.appendChild(productDiv);
    });
}



// Filtrar productos según la barra de búsqueda
function filterProducts() {
    const searchInput = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput)
    );

    const catalog = document.getElementById('productCatalog');
    catalog.innerHTML = '';

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Precio: $${product.price}</p>
            <button onclick="openProductModal(${product.id})">Ver más detalles</button>
        `;

        catalog.appendChild(productDiv);
    });
}

// Añadir un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product); // Añadir el producto al carrito
    document.getElementById('cart-count').innerText = cart.length;
    alert(`Añadiste ${product.name} al carrito.`);
}

function updateCartProgress() {
    const maxItems = 10; // Número máximo de productos
    const progress = (cart.length / maxItems) * 100;
    document.getElementById('cart-progress-bar').style.width = progress + '%';
}


// Abrir el modal con los detalles del producto
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalDetails = document.getElementById('modalDetails');

    modalDetails.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>Precio: $${product.price}</strong></p>
        <button onclick="addToCart(${product.id})">Añadir al carrito</button>
    `;

    modal.style.display = 'flex';
}

// Cerrar el modal
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Ver el contenido del carrito
function viewCart() {
    const cartModal = document.getElementById('cartModal');
    const cartDetails = document.getElementById('cartDetails');
    cartDetails.innerHTML = '';

    if (cart.length === 0) {
        cartDetails.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach((item, index) => {
            cartDetails.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h2>${item.name}</h2>
                        <p><strong>Precio: $${item.price}</strong></p>
                        <button onclick="removeFromCart(${index})">Eliminar</button>
                    </div>
                </div>
            `;
        });
        
        // Calcular el total del carrito
        const totalPrice = cart.reduce((total, item) => total + item.price, 0);
        cartDetails.innerHTML += `<h3>Total: $${totalPrice}</h3>`;
    }

    cartModal.style.display = 'flex';
}

// Cerrar el carrito modal
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto del array
    document.getElementById('cart-count').innerText = cart.length;
    viewCart(); // Actualizar el carrito
}

// Detectar clic fuera del modal para cerrarlo
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    const cartModal = document.getElementById('cartModal');
    if (event.target === modal) {
        closeProductModal();
    }
    if (event.target === cartModal) {
        closeCartModal();
    }
}

// Asignar el evento al botón de cerrar el modal
document.querySelector('.close-btn').addEventListener('click', closeProductModal);

// Asignar el evento al botón de cerrar el carrito modal
document.querySelector('.close-cart-btn').addEventListener('click', closeCartModal);

// Cargar los productos al cargar la página
window.onload = loadProducts;

