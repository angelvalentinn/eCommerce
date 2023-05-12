//Obtención de elementos del DOM
let cardsContainer = document.querySelector(".contenedorDeCards");
let catLi = document.querySelectorAll(".cat__li"); //Nodelist
let seccionCarrito = document.getElementById("seccion-carrito");
let carrito = document.getElementById("icono-carrito");
let botonesAgregar = document.querySelectorAll(".card__btn");
let seccionProductosElegidos = document.getElementById("seccion-productosElegidos");
let numerito = document.getElementById("num");
let vaciarCarrito = document.getElementById("vaciar-carrito");
let productosElegidosContenedor = document.querySelector(".productosElegidos__content");
let botonesEliminarProducto = document.querySelectorAll(".trash");
let total  = document.querySelector(".productosElegidos__total");
let btnFinalizarCompra = document.querySelector(".finalizar-compra");
let compraFinalizada = document.querySelector(".compra-finalizada");
let btnOkCompraFinalizada = document.querySelector(".compra-finalizada__btn");
let btnAbrir = document.querySelector(".btn-abrir");
let btnCerrar = document.querySelector(".btn-cerrar");

//Array de objetos con los productos
const productos = [ 
    { nombre: "Especial - Joao Cancelo", precio: "400" , img: "./assets/especial-cancelo.webp",cat: "especiales"},
    { nombre: "Centurion - Alexander Arnold", precio: "2500" , img: "./assets/centurion-arnold.webp",cat: "centuriones"},
    { nombre: "Futura Estrella - Gavi", precio: "2100" , img: "./assets/futureStar-gavi.png", cat: "futurasEstrellas"},
    { nombre: "Especial - Kevin De Bruyne", precio: "500" , img: "./assets/especial-debruyne.webp",cat: "especiales"},
    { nombre: "FlashBack - Balotelli", precio: "2200" , img: "./assets/flashback-balotelli.webp", cat: "flashbacks"},
    { nombre: "Futura Estrella - Alvarez", precio: "2400" , img: "./assets/futureStar-alvarez.png", cat: "futurasEstrellas"},
    { nombre: "FlashBack - Jorginho", precio: "2700" , img: "./assets/flashback-jorginho.webp", cat: "flashbacks"},
    { nombre: "Especial - Mohamed Salah", precio: "900" , img: "./assets/especial-salah.webp",cat: "especiales"},
    { nombre: "FlashBack - Leo Messi", precio: "7000" , img: "./assets/flashback-messi.webp", cat: "flashbacks"},
    { nombre: "Centurion - Pellegrini", precio: "2100" , img: "./assets/centurion-pellegrini.webp",cat: "centuriones"},
    { nombre: "Futura Estrella - Adeyemi", precio: "1800" , img: "./assets/futureStar-adeyemi.png", cat: "futurasEstrellas"},
    { nombre: "Centurion - Kimpembe", precio: "2400" , img: "./assets/centurion-kimpembe.webp",cat: "centuriones"},
    { nombre: "Especial - Cristiano Ronaldo", precio: "800" , img: "../assets/especial-cr7.webp",cat: "especiales"},
    { nombre: "Centurion - Neymar Jr", precio: "3200" , img: "./assets/centurion-neymar.webp",cat: "centuriones"},
    { nombre: "FlashBack - Pogba", precio: "4000" , img: "./assets/flashback-pogba.webp", cat: "flashbacks"},
    { nombre: "Futura Estrella - Vitinha", precio: "2000" , img: "./assets/futureStar-vitinha.png", cat: "futurasEstrellas"},
    { nombre: "Futura Estrella - Mudrik", precio: "2300" , img: "./assets/futureStar-mudrik.png", cat: "futurasEstrellas"},
];

//Función que carga los productos en el dom y se envía por parametro el array con la información de los productos
function cargarProductos (productosElegidos) {
        cardsContainer.innerHTML = "";
        
        productosElegidos.forEach((producto) => {
            let cardContainer = document.createElement("div");
            cardContainer.classList.add("card__container"); 
            cardContainer.innerHTML = `
                <div class="card__img__container"> <img src="${producto.img}" alt="${producto.nombre}" class="card__img"> </div>
                <h4 class="card__nick">${producto.nombre}</h4>
                <p class="card__precio">$${producto.precio}</p>
                <button class="card__btn" id="${producto.nombre}">AGREGAR AL CARRITO</button>
            `;
            cardsContainer.append(cardContainer);
        })
    actualizarBotonesAgregar(); //Cuando carga la página y se cargan todos los productos el DOM obtiene la nodelist con todos los elementos
                                //Y cada vez que cambiemos de categoría suecede lo mismo, se cargan nuevas cards y luego el documento las obtiene
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
    })
})

//Para abrir y cerrar el carrito
btnAbrir.addEventListener("click", () => {
    carrito.classList.add("disabled");
    seccionProductosElegidos.classList.remove("disabled");

    btnCerrar.addEventListener("click", () => {
    carrito.classList.remove("disabled");
    seccionProductosElegidos.classList.add("disabled");
    })
})

//Función que obtiene del dom los botones para agregar al carrito y le añade a cada boton un evento click
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".card__btn");

    botonesAgregar.forEach(btn => {
        btn.addEventListener("click", agregarAlCarrito);
    })
}

//Evento al boton vaciar carrito resetea numerito a 0 y lo borra del storage, lo mismo a los productos agregados
vaciarCarrito.addEventListener("click", accionesVaciarCarrito);

btnFinalizarCompra.addEventListener("click", () => {
    compraFinalizada.classList.remove("disabled");
    seccionProductosElegidos.classList.add("disabled");
    
    btnOkCompraFinalizada.addEventListener("click",  () => {
        compraFinalizada.classList.add("disabled");
        accionesVaciarCarrito();
    });
})



function accionesVaciarCarrito () {
    seccionProductosElegidos.classList.add("disabled"); //Le añadimos la clase disabled al carrito y a la seccion de productos elegidos
    carrito.classList.add("disabled");  //Para que no se muestre el carrito cuando no haya productos
    localStorage.removeItem("productosEnCarrito");
    localStorage.removeItem("numerito");    //Vaciamos el local del total, numerito y el array y seteamos el DOM
    localStorage.removeItem("total");
    numerito.innerText = "0";
    productosElegidosContenedor.innerHTML = "";
    total.innerText = "0";
}

//Declaramos un array en el que se van a guardar los productos que elijamos
let productosEnCarrito;

//Declaramos esta constante en donde si en productos en carrito hay algo almacenado lo asignamos y si no hay nada es vacio
const productosEnCarritoLS = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

productosEnCarrito = productosEnCarritoLS;//Asignamos lo que haya en productosencarritols en el array principal
actualizarBotonesEliminar();
cargarProductosCarrito();           //Cada vez que se actualice la pagina queremos que se actualicen el total, numerito botones
actualizarNumerito();              //a eliminar y que se carguen los productos en el dom que haya
actualizarTotal();
productosEnCarrito.length == 0 ? carrito.classList.add("disabled") : carrito.classList.remove("disabled");
//Si no hay productos en carrito el carrito no se muestra y si hay se muestra

//Funcion que carga productos en carrito
function cargarProductosCarrito() {
        productosElegidosContenedor.innerHTML = ""; //Si hay algo en el dom lo seteamos para que no se sobreescriba

        productosEnCarrito.forEach(producto => {
            //Recorremos lo que se haya agregado y lo mostramos en el dom
            productosElegidosContenedor = document.querySelector(".productosElegidos__content");
            const div = document.createElement("div");
            div.classList.add("productoElegido__container");
            div.innerHTML = `
            <div class="img-producto"><img src="${producto.img}" alt=""></div>
            <p class="precio">Total: $${producto.precio}</p>
            <div class="trash" id="${producto.nombre}"><i class="fa-solid fa-trash"></i></div>
            `;
            productosElegidosContenedor.append(div);
        })
    actualizarBotonesEliminar(); /* Cada vez que agreguemos un producto al carrito se actualizan los botones, es decir,
    el dom vuelve a obtener los botones eliminar y les añade un evento eliminar del carrito*/ 
}

//Función que se va a ejecutar cuando le demos click a cada boton de agregar al carrito
function agregarAlCarrito (e) {
    productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

    let idBoton = e.currentTarget.id; //Esta propiedad captura al elemento al que se le dio click y toma su id
    let productoAgregado = productos.find(producto => producto.nombre === idBoton); //Buscamos en el array de productos si a lo que le dimos click existe en el array
    
    //Aca buscamos si ya existe en el array de carrito lo que queremos añadir, si es existe incrementamos la cantidad y si no, le declaramos la cantidad en 0 y pusheamos en el carrito el producto
    
    productosEnCarrito.push(productoAgregado);
    
    guardarEnLocal();
    cargarProductosCarrito();
    actualizarNumerito();   //Cada vez que se agregue algo carrito queremos que se actualice, el numerito, el total
    actualizarTotal();     // los botones eliminar que se guarde en el storage y que se vuelva a cargar en el dom
    actualizarBotonesEliminar();

    carrito.classList.remove("disabled");

    if( !seccionProductosElegidos.classList.contains("disabled")) carrito.classList.add("disabled");
    //En el caso de que este la seccion de los productos añadidos al carrito no queremos que se vea el icono del carrito
}

//Funcion para actualizar el numerito cuando necesitemos
function actualizarNumerito() {
    numerito.classList.remove("disabled");
    let nuevoNumerito = productosEnCarrito.length;
    /* nuevo numerito va a ser la longitud de lo que haya en el carrito, lo almacenamos en el local
    y usamos innerText para poner el valor del numerito de lo que haya en el storage */
    localStorage.setItem("numerito", JSON.stringify(nuevoNumerito));
    numerito.innerText = JSON.parse(localStorage.getItem("numerito"));
}


function actualizarTotal () {
    let totalDeProductos = productosEnCarrito.reduce((acum,producto) => acum + parseInt(producto.precio), 0);
    total.innerText = ""; 
    localStorage.setItem("total",JSON.stringify(totalDeProductos));
    /* Reduce de todos los precios de los productos que se hayan agregado, seteamos el total  */
    total.innerText = JSON.parse(localStorage.getItem("total"));
}

function guardarEnLocal () {
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito) );
}

function actualizarBotonesEliminar() {
    botonesEliminarProducto = document.querySelectorAll(".trash");

    botonesEliminarProducto.forEach(btn => {
        btn.addEventListener("click", eliminarDelCarrito);
    })
}

function eliminarDelCarrito (e) {  
    let idBoton = e.currentTarget.id;
    let i = productosEnCarrito.findIndex(producto => idBoton === producto.nombre);
    productosEnCarrito.splice(i,1);
    localStorage.setItem("productosEnCarrito",JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
    actualizarTotal();      //Queremos que cuando se elimine que se vuelvan a cargar los productos en el dom, asi se elimina el elegido
    actualizarNumerito();   //Y que se actualice el total y el numerito
    if ( productosEnCarrito.length == 0 ) {
        carrito.classList.add("disabled");
        seccionProductosElegidos.classList.add("disabled"); 
    //Si cuando eliminamos productos uno por uno ya no queda nada, es decir, estamos por eliminar el ultimo producto, 
    //Desaparece el carrito
    }
}

