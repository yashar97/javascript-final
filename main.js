let carritoDeCompras = [];

let contenedorProductos = document.getElementById("contenedor-productos");
let contenedorCarrito = document.getElementById("modal-body");
let contadorCarrito = document.getElementById("contadorCarrito");
let total = document.getElementById("total");



















function mostrarProductos() {

    raquetas.forEach(item => {
        let div = document.createElement("div");
        div.className = "card";
        div.innerHTML += `
        <img src="${item.img}"
        class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${item.nombre}</h5>
        <p class="card-text">${item.precio}</p>
        <a id="agregar-${item.id}" href="#" class="btn btn-primary">Agregar al Carrito</a>
    </div>`
        contenedorProductos.appendChild(div);

        let btnAgregar = document.getElementById(`agregar-${item.id}`);
        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(item.id);
        })


    });
}


mostrarProductos();



function agregarAlCarrito(id) {

    let verificar = carritoDeCompras.find(item => item.id == id);

    if (verificar) {
        verificar.cantidad = verificar.cantidad + 1;
        document.getElementById(`und${verificar.id}`).innerHTML = `<p id="und${verificar.id}">Und: ${verificar.cantidad}</p>`;
        actualizarCarrito();
    } else {

        let productoAgregar = raquetas.find(element => id == element.id);

        productoAgregar.cantidad = 1;

        carritoDeCompras.push(productoAgregar);

        actualizarCarrito();
        mostrarCarrito(productoAgregar);

    }

    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));



}





function mostrarCarrito(productoAgregar) {

    let div = document.createElement("div");
    // div.className = "modal-body";
    div.innerHTML = `
                        <p>${productoAgregar.nombre}</p>
                        <p>${productoAgregar.precio}</p>
                        <p id="und${productoAgregar.id}">Und: ${productoAgregar.cantidad}</p>
                        <button id="eliminar${productoAgregar.id}" class="btn btn-secondary">Eliminar</button>`;

    contenedorCarrito.appendChild(div);



    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`);
    btnEliminar.addEventListener("click", () => {

        if (productoAgregar.cantidad == 1) {

            btnEliminar.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(item => item.id != productoAgregar.id);
            actualizarCarrito();
            localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));

        } else {
            productoAgregar.cantidad = productoAgregar.cantidad - 1;
            document.getElementById(`und${productoAgregar.id}`).innerHTML = `<p id="und${productoAgregar.id}">Und: ${productoAgregar.cantidad}</p>`;
            actualizarCarrito();
            localStorage.setItem("carrito", JSON.stringify(carritoDeCompras));
        }





    })








}



function actualizarCarrito() {

    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0);

    total.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);





}


function recuperar() {

    let recuperarLS = JSON.parse(localStorage.getItem("carrito"));

    if(recuperarLS){
        recuperarLS.forEach(el => {
            mostrarCarrito(el);
            carritoDeCompras.push(el);
            actualizarCarrito();
        })
    }

}

recuperar();