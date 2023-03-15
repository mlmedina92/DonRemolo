// selectors
const mainCards = document.getElementById("menu-products");
const iconPizza = document.getElementById("pizzas");
const iconEmpanadas = document.getElementById("empanadas");
const iconBebidas = document.getElementById("beverages");
const iconHelados = document.getElementById("iceCreams");
const carritoContador = document.getElementById("contadorCarrito");
carritoContador.classList.add("carritoContador");
const pedido = document.getElementById("pedido"); //modal body carrito
const divTotal = document.getElementById("comprar");
let btnFinalizar = document.getElementById(`btn-finalizar`);


// variables globales
let total 
let cantidadTotal
// Cargar el JSON
const url = "./data/pizza.json";
let productos = [];

loadProducts();

let carrito = JSON.parse(localStorage.getItem("pedido")) ?? []
renderizarCarrito()


//trae los prods
function loadProducts() {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("No hay productos cargados");
            }
            return response.json();
        })
        .then((data) => {
            // procesar los datos de la respuesta
            productos = data; //el json en objetos

            filtrarProds(productos); //Llama a filtrarProds con la data del json
        })
        .catch((error) => {
            // manejar errores
            console.error("Hubo un error al traer los datos:", error);
        });
}

//Funcion para filtrar los prds por categoría
function filtrarProds(productos) {
    let mostrarPizzas = productos.filter((product) => {
        return product.category == "pizzas";
    });
    let mostrarEmpanadas = productos.filter((product) => {
        return product.category == "empanadas";
    });
    let mostrarHelados = productos.filter((product) => {
        return product.category == "helados";
    });
    let mostrarBebidas = productos.filter((product) => {
        return product.category == "bebidas";
    });

    renderizarProds(mostrarPizzas); //renderizado por default

    iconBebidas.addEventListener("click", () => {
        limpiarHtml();
        renderizarProds(mostrarBebidas);
    });
    iconPizza.addEventListener("click", () => {
        limpiarHtml();
        renderizarProds(mostrarPizzas);
    });
    iconEmpanadas.addEventListener("click", () => {
        limpiarHtml();
        renderizarProds(mostrarEmpanadas);
    });
    iconHelados.addEventListener("click", () => {
        limpiarHtml();
        renderizarProds(mostrarHelados);
    });
}

//funcion que crea las cards dinamicamente
function renderizarProds(arr) {
    arr.forEach((product) => {
        const card = document.getElementById("menu-products");

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
        mainCards.removeChild(mainCards.firstChild);
    }
}

// funcionalidad carrito


// btn comprar
function agregarCarrito(id) {
    let producto = productos.find((product) => {
        //productos es la data que viene de JSON
        return product.id == id; // agrega el prod que tiene el id que viene por param
    });

    let found = carrito.find((elemento) => elemento.id == id); //recorre el carrito y devuelve el primer elem que concide con la condicion

    if (found) {
        // si ya existe el prod en el carrito
        alert("ya agregaste ese producto a carrito");
    } else {
        carrito.push({ ...producto, quantity: 1 }); // sin no existe el prod en el carrito, lo agrega y crea la card

        renderizarCarrito();
    }
}


function renderizarCarrito() {

    total = 0
    cantidadTotal = 0

    pedido.innerHTML = "";
    carrito.forEach((product) => {
        const subtotal = product.price * product.quantity;
        cantidadTotal += product.quantity
        total += subtotal
        pedido.innerHTML += `
            <div class="card">
                <img src="${product.img}" alt="${product.name}" class="card-img-top img-fluid">
                <div class="card-body">
                    <h5 class="card-title text-center fw-bold">${product.name}</h5>
                    <p>Precio:$${product.price}</p>
                    <label class="form-label" for="${product.id}">Cant.</label>
                    <input class="form-control" id="qty-${product.id}" type="number" name="quantity" min="1" max="30" oninput="validity.valid||(value='');" value="${product.quantity}" onchange="sumQuantity(${product.id})">
                    <button onclick="borrarProd(${product.id})" type="button" class="btn btn-danger text-uppercase id="borrar-${product.id}">Eliminar producto</button>
                    <p>Subtotal: $${subtotal}</p>
                </div>
            </div>
        `;
    });


    divTotal.innerHTML = `
                        <p>Total:$ ${total}</p>
                        <p>Cantidad de productos: ${cantidadTotal}</p>

                        `
    carritoContador.innerHTML = `
                                    ${cantidadTotal}
                                `


    localStorage.setItem("pedido", JSON.stringify(carrito));

}

function sumQuantity(id) {
    const producto = carrito.find((product) => product.id == id);
    const cantidad = document.getElementById(`qty-${id}`);
    producto.quantity = Number(cantidad.value);
    renderizarCarrito()
}

function borrarProd(id) {
    carrito = carrito.filter((product) => {
        //reasigna el valor de carrito
        return product.id != id;
    });
    renderizarCarrito();
    alert("Producto borrado con éxito");
}

function vaciarCarrito() {
    pedido.innerHTML = "";
    carrito = [];
    alert("Carrito vaciado con éxito");
}

btnFinalizar.addEventListener("click", () => {
    let txt = `Hola Don Remolo! Me gustaría hacer un pedido de lo siguiente: \n;`
    carrito.forEach(function (itemPedido) {
        txt +=`*${itemPedido.name}* x ${itemPedido.quantity} unidades= $${itemPedido.price * itemPedido.quantity} \n`
    });

    //  txt += `${-----------------\n}`;
    // `  txt +=${totalWhatsapp} Total $" + total`;

    let url = "https://wa.me/2494545017?text=" + encodeURIComponent(txt); //encodeURIComponent reemplaza espacios y caracteres especiales para ser enviados por parámetro en la url.whatsapp.
    window.open(url, "_blank"); // abrir nueva pestaña con la url
});
