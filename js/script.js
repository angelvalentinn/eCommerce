//Obtención de elementos del DOM
const cardsContainer = document.querySelector(".contenedorDeCards");
const catLi = document.querySelectorAll(".cat__li"); //Nodelist
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

let productos = [];

//Traemos los productos con fetch async y await de un json local
const productosFetch = async () => {
    try {
        //Usamos una funcion asincronica para que nos devuelva los datos que pedimos con fetch
        //y esperamos esa respuesta
        let productosEnFetch = await fetch("./js/productos.json"); //await desencapsula la promesa y espera a la respuesta
        productosEnFetch = await productosEnFetch.json(); //aca desencapsulamos y convertimos la respuesta en json
        productos = productosEnFetch; //Asignamos lo que obtuvimos del json a productos
        cargarProductos(productos); //y cargamos
    } catch(e) {
        console.log(e); //Usamos catch en caso de que haya un error 
    }
}
productosFetch();

//Otra forma de traer los productos de un json local
/* 
    fetch("./js/productos.json")
        .then(response => response.json())
        .then(data => {         
            productos = data;  
            cargarProductos(productos); 
    })
 */

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
vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'warning',    //Sweet alert
        title: '¿Estás seguro?',
        text: `Tenes ${productosEnCarrito.length} productos en el carrito`,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
    })
    .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                icon: 'success',    //Sweet alert
                html:`<p style="font-size:1rem; font-weight:500;">Carrito con ${productosEnCarrito.length} productos vaciado correctamente.</p>`,
                showConfirmButton: true,
            })
            accionesVaciarCarrito(); 
        }
    })
});

btnFinalizarCompra.addEventListener("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',    //Sweet alert
        html: `<p style="font-size: 1.3rem; font-weight:500;">Su compra se realizó con exito!</p>`,
        showConfirmButton: true,
    })
    accionesVaciarCarrito();
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
            <p class="cant"><button class="icon-menos" id="${producto.nombre}">-</button> ${producto.cant} <button class="icon-mas" id="${producto.nombre}">+</button></p>
            <p class="precio">$${producto.precio * producto.cant}</p>
            <div class="trash" id="${producto.nombre}"><i class="fa-solid fa-trash"></i></div>
            `;
            productosElegidosContenedor.append(div);
        })

    restarProducto();   //Queremos que los botones de añadir y restar productos se busquen en el dom y se ejecuten cada vez que se carguen los productos en el carrito
    sumarProducto();
    actualizarBotonesEliminar(); /* Cada vez que agreguemos un producto al carrito se actualizan los botones, es decir,
    el dom vuelve a obtener los botones eliminar y les añade un evento eliminar del carrito*/ 
}

//Función que se va a ejecutar cuando le demos click a cada boton de agregar al carrito
function agregarAlCarrito (e) {
    Toastify({
        text: "Producto agregado",
        duration: 1800,
        close: true,
        style: {
            background: `#ffcc02`,
            fontSize: "0.8rem",
        }
        }).showToast();

    productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito")) || [];

    let idBoton = e.currentTarget.id; //Esta propiedad captura al elemento al que se le dio click y toma su id
    let productoAgregado = productos.find(producto => producto.nombre === idBoton); //Buscamos en el array de productos si a lo que le dimos click existe en el array
    
    //Aca buscamos si ya existe en el array de carrito lo que queremos añadir, si es existe incrementamos la cantidad y si no, le declaramos la cantidad en 0 y pusheamos en el carrito el producto
    if (productosEnCarrito.some(producto => idBoton == producto.nombre)) {
        let i = productosEnCarrito.findIndex(producto => idBoton == producto.nombre);
        productosEnCarrito[i].cant++;
    } else {
        productoAgregado.cant = 1;
        productosEnCarrito.push(productoAgregado);
    }

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
    let nuevoNumerito = productosEnCarrito.reduce( (acc,producto) => acc + producto.cant, 0);
    /* nuevo numerito va a ser la longitud de lo que haya en el carrito, lo almacenamos en el local
    y usamos innerText para poner el valor del numerito de lo que haya en el storage */
    localStorage.setItem("numerito", JSON.stringify(nuevoNumerito));
    numerito.innerText = JSON.parse(localStorage.getItem("numerito"));
}

function actualizarTotal () {
    let totalDeProductos = productosEnCarrito.reduce((acum,producto) => acum + parseFloat(producto.precio * producto.cant), 0);
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
    Toastify({
        text: "Producto eliminado",
        duration: 1500,
        close: true,
        style: {
            background: `#ffcc02`,
            fontSize: "0.8rem",
        }
        }).showToast();

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

function restarProducto() {
    let decresed = document.querySelectorAll(".icon-menos");
    decresed.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let idBoton = e.currentTarget.id;
            let productoARestar = productosEnCarrito.find(producto => idBoton === producto.nombre);
            
            if( productoARestar.cant > 1 ) {
                productoARestar.cant--;
                cargarProductosCarrito();
                guardarEnLocal();
                actualizarTotal();
                actualizarNumerito();
            }
        })
    })
}

function sumarProducto() {
    let increse = document.querySelectorAll(".icon-mas");
    increse.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let idBoton = e.currentTarget.id;
            let productoASumar = productosEnCarrito.find(producto => idBoton === producto.nombre);

            productoASumar.cant++;
            cargarProductosCarrito();
            guardarEnLocal();
            actualizarTotal();
            actualizarNumerito();

        })
    })
}

