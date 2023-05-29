productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"));

const tusProductos = document.querySelector(".tus-productos");
const tusDetallesSection = document.querySelector(".tus-detalles");
const formSection = document.querySelector(".form-container")
const tuCompraTotal = document.getElementById("tu-compra__total");
const detallesNombre = document.querySelector(".nombre");
const detallesEmail = document.querySelector(".email");
const detallesDirec = document.querySelector(".direc");
const btnEnviar = document.getElementById("btn-enviar");
const formulario = document.querySelector(".form");
const inputNombre = document.getElementById("input-nombre");
const inputEmail = document.getElementById("input-email");
const inputDirec = document.getElementById("input-direccion");
const backIndex = document.querySelector(".back-index");
const ordenRandom = document.querySelector("#orden-random");

productosEnCarrito.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("tu-producto");
    div.innerHTML = `
    <div class="img-producto"><img src="${producto.img}" alt="${producto.nombre}"></div>
    <p class="cant"> ${producto.cant} </p>
    <p class="precio">$${producto.precio}</p>
    `;
    tusProductos.append(div);
})

tuCompraTotal.innerText = "$" + JSON.parse(localStorage.getItem("total"));

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    tusDetallesSection.style.display = "block";
    formulario.style.display = "none";
    formSection.style.border = "none";
    formSection.style.boxShadow = "none";
    backIndex.style.display = "flex";
    detallesNombre.innerText = inputNombre.value;
    detallesEmail.innerText = inputEmail.value;
    detallesDirec.innerText = inputDirec.value;

    let array = [];

    for( let i = 0; i < 20; i++) {
        array[i] = generarLetraRandom();
    }

    ordenRandom.innerText = array.join("");

    Swal.fire({
        position: 'center',
        icon: 'success',    //Sweet alert
        html: `<p style="font-size: 1.3rem; font-weight:500;">Su compra se realizó con exito!</p>`,
        showConfirmButton: true,
    })
    localStorage.removeItem("productosEnCarrito");
    localStorage.removeItem("numerito");    //Vaciamos el local del total, numerito y el array y seteamos el DOM
    localStorage.removeItem("total");
})



function generarLetraRandom() {
    let codigoLetra = Math.floor( 65 + Math.random() * (122 - 65));
    
    while(codigoLetra >= 91 && codigoLetra <=96) {
        codigoLetra = Math.floor( 65 + Math.random() * (122 - 65));
    }

    let letra = String.fromCharCode(codigoLetra); 
    
    return letra;
}