const socketClient = io();

console.log("VISTA HOME");

//mensaje de producto agregado al carro

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1400,
  timerProgressBar: true,
  // didOpen: (toast) => {
  //   toast.addEventListener("mouseenter", Swal.stopTimer);
  //   toast.addEventListener("mouseleave", Swal.resumeTimer);
  // },
});

const allProducts = document.getElementById("listadoProductos");

// Se reciben todos los productos
socketClient.on("productsAll", (allProd) => {
  let prodListHtml = "";
  // console.log("PRODUCTO RECIBIDO", allProd);
  allProd.map((p) => {
    prodListHtml += `<div class="items">
  <div id="title">${p.title}</div>
  <div class="imgThumb"><img src="${p.thumbnails}"></div>
  <div class="line1">${p.description}</div>
  <div class="line2">$ ${p.price}</div>
  <div class="line1">Categoria: ${p.category}</div>
  <div class="line2">Stock: ${p.stock}</div>
  <div class="line1">Codigo: ${p.code}</div>
  <div class="line2">ID: ${p._id}</div>

  <button class="btnAddCart" value="${p._id}">Agregar al carro</button>
  </div>`;
  });

  allProducts.innerHTML = prodListHtml;

  const btnAddCart = document.querySelectorAll(".btnAddCart");
  btnAddCart.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pid = btn.value;
      socketClient.emit("pAddCart", pid);
      //
      //ejecuta el mensaje de prod agregado
      Toast.fire({
        icon: "success",
        title: "Se ha agregado al carro",
      });
    });
  });
});
