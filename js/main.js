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


// btn comprar
function agregarCarrito(id) {
    let producto = productos.find((product) => {//productos es la data que viene de JSON
        return product.id == id; // agrega el prod que tiene el id que viene por param
    })

    let found = carrito.find((elemento) => elemento.id == id);//recorre el carrito y devuelve el primer elem que concide con la condicion

    if (found) { // si ya existe el prod en el carrito
        alert('ya agregaste ese producto a carrito')
    } else {
        carrito.push(producto)// sin no existe el prod en el carrito, lo agrega y crea la card 
        renderizarCarrito()
        alert('Producto agregado con éxito')

    }
}

function renderizarCarrito() {
    pedido.innerHTML = "";
    carrito.forEach(product => {
        pedido.innerHTML += `
            <div class="card">
                <img src="${product.img}" alt="${product.name}" class="card-img-top img-fluid">
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold">${product.name}</h5>
                    <p>Precio:$${product.price}</p>
                    <label class="form-label" for="${product.id}">Cant.</label>
                    <input class="form-control" id="qty-${product.id}" type="number" name="quantity" min="1" max="30" oninput="validity.valid||(value='');" value="1">
                    <button onclick="borrarProd(${product.id})" type="button" class="btn btn-success text-uppercase id="borrar-${product.id}">Eliminar producto</button>

                    <button onclick="calcSub(${product.id},${product.price})" type="button" class="btn btn-danger text-uppercase id=actualizarCantidad-${product.id}">Confirmar cantidad</button>
                    <p id="sub-${product.id}">Subtotal</p>
                </div>
            </div>
        `;
        calcSub(product.id, product.price);
    });
}


function calcSub(id, price) {
    // selectores
    let cantidad = document.getElementById(`qty-${id}`)
    let sub = document.getElementById(`sub-${id}`)

    let producto = productos.find((product) => {//productos es la data que viene de JSON
        return product.id == id; // agrega el prod que tiene el id que viene por param
    })
    let found = producto.price;
    const subTotal = parseInt(cantidad.value) * found

    sub.innerHTML = `Subtotal:$ ${subTotal}`
}

function borrarProd(id) {
    carrito = carrito.filter((product) => { //reasigna el valor de carrito 
        return product.id != id;
    })
    renderizarCarrito()
    alert('Producto borrado con éxito')
}

function vaciarCarrito() {
    pedido.innerHTML = ""
    carrito = [];
    alert('Carrito vaciado con éxito')

}

//ver tema cantidades 

//Crear funcion que calcule el total de la compra






