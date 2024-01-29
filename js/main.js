let listaCompras = [];
// agregar un producto a la lista
function agregarProducto() {
    let nombreProducto = document.getElementById("producto").value.trim();
    let precioProducto = parseFloat(document.getElementById("precio").value.trim());
    if (nombreProducto === "" || isNaN(precioProducto) || precioProducto <= 0) {
        alert("Por favor, ingrese un nombre de producto válido y un precio numérico mayor que cero.");
        return;
    }
    //identificador a producto
    let idProducto = Date.now();
    listaCompras.push({ id: idProducto, nombre: nombreProducto, precio: precioProducto });
    actualizarLista();
    limpiarCampos();
}
// eliminar un producto
function eliminarProducto(idProducto) {
    listaCompras = listaCompras.filter(producto => producto.id !== idProducto);
    actualizarLista();
}
// buscar productos
function buscarProducto() {
    let textoBusqueda = document.getElementById("buscar").value.trim().toLowerCase();

    let productosFiltrados = listaCompras.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );

    actualizarLista(productosFiltrados, "resultados-busqueda");
}
//editar un producto
function editarProducto(idProducto) {
    let producto = listaCompras.find(producto => producto.id === idProducto);
    let nuevoNombre = prompt("Ingrese el nuevo nombre del producto:", producto.nombre);
    let nuevoPrecio = parseFloat(prompt("Ingrese el nuevo precio del producto:", producto.precio));

    if (nuevoNombre && !isNaN(nuevoPrecio) && nuevoPrecio > 0) {
        producto.nombre = nuevoNombre;
        producto.precio = nuevoPrecio;
        actualizarLista();
    } else {
        alert("Por favor, ingrese un nombre de producto válido y un precio numérico mayor que cero.");
    }
}
//actualizar la lista de compras
function actualizarLista(productos = listaCompras, contenedorId = "lista-compras") {
    let listaHTML = "";
    let totalPrecio = 0;

    productos.forEach((producto) => {
        listaHTML += `
            <div>
                <span>${producto.nombre}</span>
                <span>$${producto.precio.toFixed(2)}</span>
                <button class="interno" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                <button class="interno" onclick="editarProducto(${producto.id})">Editar</button>
            </div>
        `;
        totalPrecio += producto.precio;
    });

    document.getElementById(contenedorId).innerHTML = listaHTML;
    if (contenedorId === "lista-compras") {
        document.getElementById("total").textContent = `Total: $${totalPrecio.toFixed(2)}`;
    }
}
//vaciar campos de entrada
function limpiarCampos() {
    document.getElementById("producto").value = "";
    document.getElementById("precio").value = "";
}
//ordena la lista de compras
function ordenarLista() {
    let orden = document.getElementById("ordenar").value;
    if (orden === "precio-menor") {
        listaCompras.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-mayor") {
        listaCompras.sort((a, b) => b.precio - a.precio);
    }
    actualizarLista();
}
document.getElementById("agregar").addEventListener("click", agregarProducto);
document.getElementById("ordenar").addEventListener("change", ordenarLista);
document.getElementById("buscar-btn").addEventListener("click", buscarProducto);