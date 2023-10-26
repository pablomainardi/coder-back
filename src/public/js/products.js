// const socketClient = io();

console.log("VISTA HOME");

const filterTotalPagesTop = document.getElementById("filterTotalPagesTop");
const filterTotalPages = document.getElementById("filterTotalPages");
const totalPages = filterTotalPages.dataset.totalPages;

console.log(totalPages);
let pagesHTML = "";
for (let i = 1; i <= totalPages; i++) {
  pagesHTML += `<a href="/products/${i}">${i}</a> `;
}
filterTotalPages.innerHTML = pagesHTML;
filterTotalPagesTop.innerHTML = pagesHTML;

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

// const allProducts = document.getElementById("listadoProductos");

// const boxPagesTop = document.getElementById("boxPagesTop"); //

// const boxPagesBot = document.getElementById("boxPagesBot");

// // verificamos si hay pagina previa o posterior

// let prevPag = 0;
// let nextPag = 0;
// console.log(prevPage, nextPage);

// if (allProd.hasPrevPage) {
//   prevPag = allProd.prevPage;
//   console.log("PREVPAG", prevPag);
// } else {
//   prevPag = page;
// }

// if (allProd.hasNextPage) {
//   nextPag = allProd.nextPage + 1;
//   console.log("NEXTPAG", nextPag);
// } else {
//   nextPag = allProd.page;
// }

// const linkPaginate = `<div><a href="/products/${prevPag}">Atras</a></div>
//     <div>Pagina ${allProd.page}</div>
//     <div><a href="/products/${nextPag}">Siguiente</a></div>
//     <div>Paginas ${allProd.totalPages}</div><div>Total de productos ${allProd.totalDocs}</div>`;

// boxPagesTop.innerHTML = linkPaginate;
// boxPagesBot.innerHTML = linkPaginate;

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

// socketClient.on("productsAll", (allProd) => {
//   // console.log("allprod", allProd);
//   const {
//     docs,
//     totalDocs,
//     limit,
//     totalPages,
//     page,
//     pagingCounter,
//     hasPrevPage,
//     hasNextPage,
//     prevPage,
//     nextPage,
//   } = allProd;
// });
