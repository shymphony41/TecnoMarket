const products = [
    { id: 1, name: 'DOTS 3 PRO', price: 45000, image: 'img/dots 3pro.png', description: 'Lleva tu estilo al siguiente nivel con las icónicas zapatillas OFF-WHITE en blanco y negro. Con su diseño audaz y los detalles distintivos de la marca, estas zapatillas combinan lo urbano con lo sofisticado. Fabricadas con materiales premium, ofrecen comodidad y durabilidad sin sacrificar el estilo.' },
    { id: 2, name: 'BUDS 3', price: 55000, image: 'img/buds 3.png', description: 'Multifuncionalidad -Cancelación de Ruido passiva en tus llamadas - Modo Ambiente para que escuches todo lo que ocurre a tu alrededor y puedas interactuar con tu entorno.'},
    { id: 3, name: 'BUDS 3 LITE', price: 50000, image: 'img/buds 3 lite.png', description: 'Multifuncionalidad -Cancelación de Ruido passiva en tus llamadas -Modo Ambiente para que escuches todo lo que ocurre a tu alrededor y puedas interactuar con tu entorno.'},
    { id: 4, name: 'Audifonos M32', price: 45000, image: 'img/audifonos m32.png', description: 'Audífonos Inalámbricos M32 Con Power Bank. Compatibles para IOS & Android. Son geniales para salir de viaje ya que la bateria puede durar 5 Horas enteros en la cabina'},
    { id: 5, name: 'Audifonos P9', price: 60000, image: 'img/audifonos P9.png', description: 'Redescubre el estilo y la comodidad con las JORDAN Air 3 Retro, un ícono del calzado que combina a la perfección el legado del baloncesto con un diseño contemporáneo. Estas zapatillas destacan por su elegante silueta y su innovadora tecnología, garantizando un rendimiento excepcional tanto en la cancha como en la vida diaria.' },
    { id: 6, name: 'Audifonos BT-12', price: 80000, image: 'img/audifonos BT-12.png', description: 'Redescubre el estilo y la comodidad con las JORDAN Air 3 Retro, un ícono del calzado que combina a la perfección el legado del baloncesto con un diseño contemporáneo. Estas zapatillas destacan por su elegante silueta y su innovadora tecnología, garantizando un rendimiento excepcional tanto en la cancha como en la vida diaria.' },
    { id: 7, name: 'Audifonos Q10', price: 40000, image: 'img/audifonos Q10.png', description: 'Redescubre el estilo y la comodidad con las JORDAN Air 3 Retro, un ícono del calzado que combina a la perfección el legado del baloncesto con un diseño contemporáneo. Estas zapatillas destacan por su elegante silueta y su innovadora tecnología, garantizando un rendimiento excepcional tanto en la cancha como en la vida diaria.' },
    { id: 8, name: 'Audifonos BL13', price: 43000, image: 'img/BL13.png', description: 'Redescubre el estilo y la comodidad con las JORDAN Air 3 Retro, un ícono del calzado que combina a la perfección el legado del baloncesto con un diseño contemporáneo. Estas zapatillas destacan por su elegante silueta y su innovadora tecnología, garantizando un rendimiento excepcional tanto en la cancha como en la vida diaria.' },
];


const navbar = document.querySelector('.navbar');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');
let isMenuOpen = false;

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle mobile menu
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    mobileNavToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

mobileNavToggle.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) toggleMenu();
});

// Prevent scroll when menu is open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
    }
});

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
