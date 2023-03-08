// selectors
const mainCards = document.getElementById('products');
const iconPizza = document.getElementById('pizzas');
const iconEmpanadas = document.getElementById('empanadas');
const iconBebidas = document.getElementById('beverages');
const iconHelados = document.getElementById('iceCreams');


//Cdo el contenido de la pag este cargado se ejecuta la funcion loadData 
window.addEventListener('DOMContentLoaded', () => {
    loadData();
});


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
            filtrarProds(data); //Llama a filtrarProds con la data del json
        })
        .catch(error => {
            // manejar errores
            console.error('Hubo un error al traer los datos:', error);
        });
}

//Funcion para filtrar los prds por categoría
function filtrarProds(arr) {
    let mostrarPizzas = arr.filter((product) => {
        product.category === 'pizzas';
    })
    let mostrarEmpanadas = arr.filter((product) => {
        product.category === 'empandas';
    })
    let mostrarHelados = arr.filter((product) => {
        product.category === 'helados';
    })
    let mostrarBebidas = arr.filter((product) => {
        product.category === 'bebidas';
    })
    let mostrarTodos = arr;
    renderizarProds(mostrarTodos);
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
                    <p class="card-text"> ${product.description}<p>:$${product.price}</p>
                    
                    <button type="button" class="btn btn-danger text-uppercase">Comprar</button>
                </div>
            </div>

        `;

        // mainCards.append(card);

    });
}






// <label class="form-label fw-bold" for="cantidad-p1">Cantidad:</label>
//                             <input class="form-control" type="number" id="cantidad-p1" name="quantity" min="1" max="100"
//                                 oninput="validity.valid||(value='');" value="1"></input>