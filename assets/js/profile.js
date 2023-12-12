// Obtener botones y contenedores
const productsButton = document.getElementById('option-products-button');
const ordersButton = document.getElementById('option-orders-button');
const commentsButton = document.getElementById('option-comments-button');

const productsButtonLateralMenu = document.getElementById('option-products-button-lg');
const ordersButtonLateralMenu = document.getElementById('option-orders-button-lg');
const commentsButtonLateralMenu = document.getElementById('option-comments-button-lg');

const productsContainer = document.getElementById('container-products');
const ordersContainer = document.getElementById('container-orders');
const commentsContainer = document.getElementById('container-comments');

// Mostrar por defecto el contenedor de productos
productsContainer.style.display = 'flex';
ordersContainer.style.display = 'none';
commentsContainer.style.display = 'none';

// Función para ocultar todos los contenedores
function hideAllContainers() {
    productsContainer.style.display = 'none';
    ordersContainer.style.display = 'none';
    commentsContainer.style.display = 'none';
}

// Agregar eventos de clic a los botones
productsButton.addEventListener('click', () => {
    hideAllContainers();
    productsContainer.style.display = 'flex';
});

ordersButton.addEventListener('click', () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
});

commentsButton.addEventListener('click', () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
});

// Agregar eventos de clic a los botones del menu lateral
productsButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    productsContainer.style.display = 'flex';
});

ordersButtonLateralMenu.addEventListener('click', () => {
    hideAllContainers();
    ordersContainer.style.display = 'flex';
});

commentsButtonLateralMenu.addEventListener('click', () =>{
    hideAllContainers();
    commentsContainer.style.display = 'flex';
});

/* Deshabilitar/Habilitar inputs */
// Obtén una referencia al botón de edición y a todos los elementos de entrada del formulario
const editButton = document.getElementById('edit-product-button');
const inputElements = document.querySelectorAll('#product-form input, #product-form textarea');

// Agrega un evento al botón de edición para manejar el cambio de estado de los elementos de entrada
editButton.addEventListener('click', function (event) {
    // Previene el comportamiento predeterminado del botón (enviar el formulario)
    event.preventDefault();
    // Itera sobre todos los elementos de entrada y cambia su estado de deshabilitado según el estado actual
    inputElements.forEach(function (input) {
        input.disabled = !input.disabled;
    });
});


const searchProductButton = document.getElementById('search-product-button');
searchProductButton.addEventListener('click', event => {
    event.preventDefault();
    const productId = document.getElementById('product-ID').value;

    if (!productId) {
        console.error('Ingrese un ID de producto válido.');
        return;
    }

    fetchProduct(productId);
});

const nextProductButton = document.getElementById('next-product-button');
nextProductButton.addEventListener('click', event => {
    event.preventDefault();
    const productId = parseInt(document.getElementById('product-ID').value) + 1;
    fetchProduct(productId);
});

const previousProductButton = document.getElementById('previous-product-button');
previousProductButton.addEventListener('click', event => {
    event.preventDefault();
    const productId = parseInt(document.getElementById('product-ID').value) - 1;
    if(productId != 0){
        fetchProduct(productId);
    }
    else{
        fetchProduct(1);
    }
});

/* Al cargar la página se mostrará el producto con ID 1 */
fetchProduct(1);
/* -------------------- Codigo obtencion de productos API  ------------------- */
function fetchProduct(productId) {
    // Obtener el ID del producto
    var productsURL = "../../productos-menu.json";

    // Hacer una solicitud a la API con el ID del producto
    fetch(productsURL)
        .then(response => response.json())
        .then(menu => {
            for (const categoria in menu) {
                const productosDeCategoria = menu[categoria];

                // Buscar el producto por su ID dentro de la categoría
                const productoEncontrado = productosDeCategoria.find(producto => producto.id === parseInt(productId));

                if (productoEncontrado) {
                    // Aquí puedes hacer algo con el producto encontrado
                    console.log("Categoría:", categoria);
                    console.log("Producto encontrado:", productoEncontrado);
                    // También puedes actualizar tu formulario con la información del producto
                    actualizarFormulario(productoEncontrado);
                }
            }
        })
        .catch(error => console.error('Error fetching product:', error));
}

function actualizarFormulario(producto) {
    // Aquí puedes actualizar los campos del formulario con la información del producto
    document.getElementById('product-name').value = producto.nombre;
    document.getElementById('product-category').value = producto.categoria;
    document.getElementById('product-price').value = producto.precio;
    document.getElementById('product-description').value = producto.descripcion;
    document.getElementById('product-ID').value = producto.id;
    
    // Cambiar la imagen del producto si está disponible
    if (producto.imagen) {
        document.getElementById('product-img').src = producto.imagen;
    }
}
