// Products menu

// selectors
const mainCards = document.getElementById('menu-products');
const iconPizza = document.getElementById('pizzas');
const iconEmpanadas = document.getElementById('empanadas');
const iconBebidas = document.getElementById('beverages');
const iconHelados = document.getElementById('iceCreams');


//Cdo el contenido de la pag este cargado se ejecuta la funcion loadData 
window.addEventListener('DOMContentLoaded', () => {
    loadData();
});

let productos = []

// Cargar el JSON
const url = '../data/pizza.json';

//trae los prods 
function loadData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No hay productos cargados');
            }
            return response.json();
        })
        .then(data => {
            // procesar los datos de la respuesta
            productos = data;
            filtrarProds(); //Llama a filtrarProds con la data del json
        })
        .catch(error => {
            // manejar errores
            console.error('Hubo un error al traer los datos:', error);
        });
}

//Funcion para filtrar los prds por categoría
function filtrarProds() {
    let mostrarPizzas = productos.filter((product) => {
        return product.category === 'pizzas';
    })
    let mostrarEmpanadas = productos.filter((product) => {
        return product.category === 'empanadas';
    })
    let mostrarHelados = productos.filter((product) => {
        return product.category === 'helados';
    })
    let mostrarBebidas = productos.filter((product) => {
        return product.category === 'bebidas';
    })

    renderizarProds(mostrarPizzas);//renderizado por default

    iconBebidas.addEventListener('click', () => {
        limpiarHtml();
        renderizarProds(mostrarBebidas);

    });
    iconPizza.addEventListener('click', () => {
        limpiarHtml();
        renderizarProds(mostrarPizzas);
    });
    iconEmpanadas.addEventListener('click', () => {
        limpiarHtml();
        renderizarProds(mostrarEmpanadas);
    });
    iconHelados.addEventListener('click', () => {
        limpiarHtml();
        renderizarProds(mostrarHelados);
    });
}

//funcion que crea las cards dinamicamente
function renderizarProds(arr) {
    arr.forEach(product => {
        const card = document.getElementById('menu-products');

        card.innerHTML += `
            <div class="card">
                <img src="${product.img}" alt="${product.name}" class="card-img-top img-fluid">
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold">${product.name}</h5>
                    <button onclick="agregarCarrito(${product.id})" type="button" class="btn btn-danger text-uppercase id=btnComprar-${product.id}">Comprar</button>
                </div>
            </div>
        `;
    });
}

function limpiarHtml() {
    while (mainCards.firstChild) {
        mainCards.removeChild(mainCards.firstChild)
    }
}

// funcionalidad carrito
const pedido = document.getElementById('pedido')//modal body carrito

let carrito = []

function agregarCarrito(id) {
    let producto = productos.find((product) => {
        return product.id == id;
        
    })
console.log(carrito.push(producto))

}

// btnComprar = getElementById()


//capturar el btn comprar del menu con la inf de c/ producto

//Funcion agregarAlCarrito : La inf de cada prod la enviamos al modal ,renderizamos las cards dentro del carrito y a c/u le agregamos un input para escoger la cant de c/ prod.

//Crear un btn que elimine el producto seleccionado

//Crear funcion que multiplique precio por cant del prod (subtototal)

//Crear funcionn que calcule el total de la compra

//Crear btn que vacie el carrito totalmente





