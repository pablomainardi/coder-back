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

const boxPages = document.getElementById("boxPages");

// Se reciben todos los productos
socketClient.on("productsAll", (allProd) => {
  // console.log("ALLPROD", allProd);

  const currentPage = allProd.page;
  const totalPages = allProd.totalPages;

  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : 1;
  const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : totalPages;

  boxPages.innerHTML = `<div><a href="/${prevPage}">Atras</a></div>
  <div>Pagina ${currentPage}</div>
  <div><a href="/${nextPage}">Siguiente</a></div>
  <div>Paginas ${totalPages}</div>`;

  // Comentado, para realizar pruieba de renderizado en hbs
  // const productsFull = allProd; //.docs
  // let prodListHtml = "";
  // // console.log("PRODUCTO RECIBIDO", allProd);
  // productsFull.map((p) => {
  // prodListHtml += `<div class="items">
  // <div id="title">${p.title}</div>
  // <div class="imgThumb"><img src="${p.thumbnails}"></div>
  // <div class="line1">${p.description}</div>
  // <div class="line2">$ ${p.price}</div>
  // <div class="line1">Categoria: ${p.category}</div>
  // <div class="line2">Stock: ${p.stock}</div>
  // <div class="line1">Codigo: ${p.code}</div>
  // <div class="line2">ID: ${p._id}</div>

  // <button class="btnAddCart" value="${p._id}">Agregar al carro</button>
  // </div>`;
  // });

  // allProducts.innerHTML = prodListHtml;

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
