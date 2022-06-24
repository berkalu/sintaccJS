
// array

let arrayTortas = [
{
    id: 1,
    img: "img/marquise.jpg",
    nombre: "Marquise",
    precio: 2600,
    stock: 3
},
{
    id: 2,
    img: "img/tfrutilla.jpg", 
    nombre: "Tarta de frutillas",
    precio: 2900,
    stock: 4
},
{
    id: 3,
    img: "img/tcoco.jpg",
    nombre: "Tarta de Coco",
    precio: 2400,
    stock: 2
},
{
    id: 4,
    img: "img/tborracha.jpg",
    nombre: "Torta Borracha",
    precio: 3100,
    stock: 1
},
{
    id: 5,
    img: "img/echocolate.jpg",
    nombre: "Explosion de Chocolate",
    precio: 3300,
    stock: 2
},
{
    id: 6,
    img: "img/thelada.jpg",
    nombre: "Torta Helada",
    precio: 2750,
    stock: 3
},
{
    id: 7,
    img: "img/cabsha.jpg",
    nombre: "Tarta Cabsha",
    precio: 2500,
    stock: 4
},
{
    id: 8,
    img: "img/hpascua.jpg",
    nombre: "Huevos de Pascua",
    precio: 1600,
    stock: 0
}
];

const contenedorCarrito = document.getElementById('carrito-contenedor');
const productosSection = document.getElementById('mainProductos');
const precioTotal = document.getElementById('precioTotal'); 

let carrito = []

// guardamos el carrito en storage
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        productoCarrito()
    }
})

arrayTortas.forEach((productos) => {
    const div = document.createElement("div")
    div.innerHTML += `
    <div class="productos__1">
        <div class="productos__img">
            <img src="${productos.img}">
        </div>
        <article class="cardtxt">
            <p>${productos.nombre}</p>
        </article>
        <div class="cardbtn">
            <button id="agregar${productos.id}" class="boton_precio">COMPRAR ${productos.precio}</button>
        </div>
    </div>   
    `
    productosSection.appendChild(div)

// Funcion boton
    const botonComprar = document.getElementById(`agregar${productos.id}`)

    botonComprar.addEventListener('click', () => {
        agregarCarrito(productos.id)
    })
})

// funcion agregar
const agregarCarrito = (agregarId) => {
    const item = arrayTortas.find((prod) => prod.id === agregarId)
    carrito.push(item)
    productoCarrito()
    Swal.fire({
        icon: 'success',
        title: 'AGREGADO AL CARRITO !',
        imageUrl: item.img,
        imageWidth: 300,
        imageHeight: 300,
        text: 'Producto: '+item.nombre,
    });
    console.log(carrito)
}


// eliminar item

const eliminarDelCarrito = (borrarId) => {
    const item = carrito.find((prod) => prod.id === borrarId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1) 
    productoCarrito()
    console.log(carrito)
}

//imprimir en el carrito
const productoCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="botonEliminar">ELMINAR PRODUCTO</button>
        `

        contenedorCarrito.appendChild(div)
        //convertimos a JSON string
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    //sumar total
    precioTotal.innerText = carrito.reduce((acum, prod) => acum + prod.precio, 0)
}