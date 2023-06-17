let productos;
const contenedorCarrito = document.getElementById("carritoContenedor")
const listaProductos = document.getElementById("listaProductos");
const carrito = [];
fetch("../data.json")
    .then((response) => response.json())
    .then((data => {
        productos = data;
        data.forEach((producto) => {
            let sectionProducto = document.createElement('section');
            sectionProducto.classList.add('card', 'col-xl-3', 'col-md-10', 'col-sm-12');
            sectionProducto.innerHTML = `
<section>
<img src="${producto.imagen}"class="img-fluid rounded-start" alt="...">
</div>
<div class="col-md-8">
<div class="card-body text-center">
    <h5 class="card-title"> ${producto.nombre} </h5>
    <p class="card-text"> ${producto.descripcion} </p>
    <p class="card-text"><medium class="text-muted"> ${producto.precio}</medium></p>
    <button id="boton${producto.id}" type="button" class="btn btn-dark">Agregar<i class="fas fa-shopping-cart"></i></button>
                <section />`;
            listaProductos.appendChild(sectionProducto);

            const boton = document.getElementById(`boton${producto.id}`);
            boton.addEventListener('click', () => {
                agregarAlCarrito(producto.id);
            });
        });
    }));
const agregarAlCarrito = (id) => {
    const producto = productos.find(producto => producto.id === id);
    carrito.push(producto);
    nuevoCarrito();
    console.log(carrito);
}

const nuevoCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((productos) => {
        const div = document.createElement('div')
        div.innerHTML = `
        <h3>${productos.nombre}<h3/>
        <p>${productos.precio}<p/>
        <hr />
        `
        contenedorCarrito.appendChild(div)
    })
    calcularTotalCompra();
}
const totalCompra = document.getElementById('totalCompra');

const calcularTotalCompra = () => {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio * producto.cantidad;
    });
    totalCompra.innerHTML = total;
};


const idFormulario = document.getElementById('formulario');

idFormulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;

    let usuario;
    let usuarioStorage = sessionStorage.getItem("nombre");

    if (usuarioStorage) {
        usuario = usuarioStorage;
        Swal.fire(`Bienvenid@ ${nombre} nuevamente`)
    } else {
        usuario =
            Swal.fire(`Gracias ${nombre} por unirte`);
        sessionStorage.setItem("nombre", nombre);
    }
    idFormulario.reset();
})
