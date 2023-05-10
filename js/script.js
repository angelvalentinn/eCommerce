//Obtención de elementos del DOM
let cardsContainer = document.querySelector(".contenedorDeCards");
let catLi = document.querySelectorAll(".cat__li"); //Nodelist
let seccionCarrito = document.getElementById("seccion-carrito");
let carrito = document.getElementById("icono-carrito");
let botonesAgregar = document.querySelectorAll(".card__btn");
let seccionProductosElegidos = document.getElementById("seccion-productosElegidos");
let btnAYC = document.querySelectorAll(".btn-a-c");
let numerito = document.getElementById("num");
let vaciarCarrito = document.getElementById("vaciar-carrito");
let productosElegidosContenedor = document.querySelector(".productosElegidos__content");
let botonesEliminarProducto = document.querySelectorAll(".trash");
//Array de objetos con los productos
const productos = [ 
    { nombre: "Especial - Joao Cancelo", precio: "$400" , img: "./assets/especial-cancelo.webp",cat: "especiales"},
    { nombre: "Centurion - Alexander Arnold", precio: "$2500" , img: "./assets/centurion-arnold.webp",cat: "centuriones"},
    { nombre: "Futura Estrella - Gavi", precio: "$2100" , img: "./assets/futureStar-Gavi.png", cat: "futurasEstrellas"},
    { nombre: "Especial - Kevin De Bruyne", precio: "$500" , img: "./assets/especial-debruyne.webp",cat: "especiales"},
    { nombre: "FlashBack - Balotelli", precio: "$2200" , img: "./assets/flashback-balotelli.webp", cat: "flashbacks"},
    { nombre: "Futura Estrella - Alvarez", precio: "$2400" , img: "./assets/futureStar-alvarez.png", cat: "futurasEstrellas"},
    { nombre: "FlashBack - Jorginho", precio: "$2700" , img: "./assets/flashback-jorginho.webp", cat: "flashbacks"},
    { nombre: "Especial - Mohamed Salah", precio: "$900" , img: "./assets/especial-salah.webp",cat: "especiales"},
    { nombre: "FlashBack - Leo Messi", precio: "$7000" , img: "./assets/flashback-messi.webp", cat: "flashbacks"},
    { nombre: "Centurion - Pellegrini", precio: "$2100" , img: "./assets/centurion-pellegrini.webp",cat: "centuriones"},
    { nombre: "Futura Estrella - Adeyemi", precio: "$1800" , img: "./assets/futureStar-adeyemi.png", cat: "futurasEstrellas"},
    { nombre: "Centurion - Kimpembe", precio: "$2400" , img: "./assets/centurion-kimpembe.webp",cat: "centuriones"},
    { nombre: "Especial - Cristiano Ronaldo", precio: "$800" , img: "./assets/especial-cr7.webp",cat: "especiales"},
    { nombre: "Centurion - Neymar Jr", precio: "$3200" , img: "./assets/centurion-neymar.webp",cat: "centuriones"},
    { nombre: "FlashBack - Pogba", precio: "$4000" , img: "./assets/flashback-pogba.webp", cat: "flashbacks"},
    { nombre: "Futura Estrella - Vitinha", precio: "$2000" , img: "./assets/futureStar-vitinha.png", cat: "futurasEstrellas"},
    { nombre: "Futura Estrella - Mudrik", precio: "$2300" , img: "./assets/futureStar-mudrik.png", cat: "futurasEstrellas"},
];

//Función que cargar los productos en el dom y se envía por parametro el array con la información de los productos
function cargarProductos (productosElegidos) {
        cardsContainer.innerHTML = "";
        
        productosElegidos.forEach((producto) => {
            let cardContainer = document.createElement("div");
            cardContainer.classList.add("card__container"); 
            cardContainer.innerHTML = `
                <div class="card__img__container"> <img src="${producto.img}" alt="${producto.nombre}" class="card__img"> </div>
                <h4 class="card__nick">${producto.nombre}</h4>
                <p class="card__precio">${producto.precio}</p>
                <button class="card__btn" id="${producto.nombre}">AGREGAR AL CARRITO</button>
            `;
            cardsContainer.append(cardContainer);
        })
    
    actualizarBotonesAgregar(); //Cuando carga la página y se cargan todos los productos el DOM obtiene la nodelist con todos los elementos
                                //Y cada vez que cambiemos de categoría suecede lo mismo, se cargan nuevas cards y luego el documente las obtiene
}

//Llamamos a la funcion  para cargar en el dom los productos
cargarProductos(productos);

//Recorremos la  nodelist de los li y les agregamos un evento en el que dependiendo de su categoría se muestren 
catLi.forEach(li => {
    li.addEventListener("click", (e) => {
        
        let arrayFiltrado = [];

        if ( e.currentTarget.id != "todos" ) {
            arrayFiltrado = productos.filter((producto) => e.currentTarget.id === producto.cat)
            cargarProductos(arrayFiltrado);
        } else cargarProductos(productos);
        
        /* if ( li.innerText == "Especiales" ) {
            
            arrayFiltrado = productos.filter((producto) => producto.nombre.includes("Especial"))
            cargarProductos(arrayFiltrado);

        } else if ( li.innerText == "Centuriones" ) {

            arrayFiltrado = productos.filter((producto) => producto.nombre.includes("Centurion"))
            cargarProductos(arrayFiltrado);

        } else if ( li.innerText == "Flashbacks" ) {

            arrayFiltrado = productos.filter((producto) => producto.nombre.includes("FlashBack"))
            cargarProductos(arrayFiltrado);

        } else if ( li.innerText == "Futuras Estrellas" ) {

            arrayFiltrado = productos.filter((producto) => producto.nombre.includes("Futura Estrella"))
            cargarProductos(arrayFiltrado);

        } else {
            cargarProductos(productos);
        }
 */
    })
})


//Recorrer la node list de los botones para abrir el carrito y cerrar el carrito
btnAYC.forEach(btn => {
    btn.addEventListener("click", abrirYCerrarCarrito );
})

//Función para abrir y cerrar el carrito, sencillo con toggle, ya que obtenemos nodelist de los botones abrir y cerrar y le asignamos esta función
function abrirYCerrarCarrito () {
    carrito.classList.toggle("disabled");
    seccionProductosElegidos.classList.toggle("disabled");
}


//Función que obtiene del dom los botones para agregar al carrito y le añade a cada boton un evento click
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".card__btn");

    botonesAgregar.forEach(btn => {
        btn.addEventListener("click", agregarAlCarrito);
    })

}

vaciarCarrito.addEventListener("click", () => {
    localStorage.removeItem("productosEnCarrito");
    localStorage.removeItem("numerito");
    numerito.innerText = "0";
    const productosElegidosContenedor = document.querySelector(".productosElegidos__content");
    productosElegidosContenedor.innerHTML = "";
})

//Declaramos un array en el que se van a guardar los productos que elijamos
let productosEnCarrito;
const productosEnCarritoLS = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

function cargarProductosCarrito() {
    if ( productosEnCarritoLS ) {
    
        productosEnCarrito = productosEnCarritoLS;
        actualizarNumerito();

        productosEnCarrito.forEach(producto => {
    
            productosElegidosContenedor = document.querySelector(".productosElegidos__content");
            const div = document.createElement("div");
            div.classList.add("productoElegido__container");
            div.innerHTML = `
            <div class="img-producto"><img src="${producto.img}" alt=""></div>
            <p class="cant"><button class="icon-menos" id="${producto.nombre}">-</button> ${producto.cantidad} <button class="icon-mas" id="${producto.nombre}">+</button></p>
            <p class="precio">${producto.precio}</p>
            <div class="trash" id="${producto.nombre}"><i class="fa-solid fa-trash"></i></div>
            `;
            productosElegidosContenedor.append(div);
    
        })
    
    } else {
        productosEnCarrito = [];
    }
}
cargarProductosCarrito();

//Función que se va a ejecutar cuando le demos click a cada boton de agregar al carrito
function agregarAlCarrito (e) {
    productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

    let idBoton = e.currentTarget.id; //Esta propiedad captura al elemento al que se le dio click y toma su id
    let productoAgregado = productos.find(producto => producto.nombre === idBoton); //Buscamos en el array de productos si a lo que le dimos click existe en el array
    
    //Aca buscamos si ya existe en el array de carrito lo que queremos añadir, si es existe incrementamos la cantidad y si no, le declaramos la cantidad en 0 y pusheamos en el carrito el producto
     productosElegidosContenedor = document.querySelector(".productosElegidos__content");
    
    if ( productosEnCarrito.some(producto => idBoton == producto.nombre) ) {
        let i = productosEnCarrito.findIndex(producto => idBoton == producto.nombre);
        productosEnCarrito[i].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    const div = document.createElement("div");
        div.classList.add("productoElegido__container");
        div.innerHTML = `
        <div class="img-producto"><img src="${productoAgregado.img}" alt=""></div>
        <p class="cant"><button class="icon-menos" id="${productoAgregado.nombre}">-</button> ${productoAgregado.cantidad} <button class="icon-mas" id="${productoAgregado.nombre}">+</button></p>
        <p class="precio">${productoAgregado.precio}</p>
        <div class="trash" id="${productoAgregado.nombre}"><i class="fa-solid fa-trash"></i></div>
        `;
        productosElegidosContenedor.append(div);
    
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito) );
    guardarEnLocal();
    actualizarNumerito();

}


function actualizarNumerito() {
    numerito.classList.remove("disabled");
    let actualizarNumerito = productosEnCarrito.reduce((acum,producto) => acum + producto.cantidad, 0 );
    
    localStorage.setItem("numerito", JSON.stringify(actualizarNumerito));
    numerito.innerText = JSON.parse(localStorage.getItem("numerito"));
}
actualizarNumerito();

function guardarEnLocal () {
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito) );
}

/* function actualizarBotonesEliminar() {
    botonesEliminarProducto = document.querySelectorAll(".trash");

    botonesEliminarProducto.forEach(btn => {
        btn.addEventListener("click", eliminarDelCarrito);
    })
}
function eliminarDelCarrito (e) {
    let idBoton = e.currentTarget.id;
    let i = productosEnCarrito.findIndex(producto => idBoton === producto.id)
    productosEnCarrito.splice(i,1);
    cargarProductosCarrito();
    localStorage.setItem("productosEnCarrito",JSON.stringify(productosEnCarrito))
} */


