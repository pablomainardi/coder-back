console.log("VISTA REAL TIME");

const socketClient = io();
const allprodReal = document.getElementById("prodListRealTime");
const formAddProd = document.getElementById("formAddProd");
const formDelProd = document.getElementById("formDelProd");

formAddProd.addEventListener("submit", (e) => {
  e.preventDefault();
  const dataForm = new FormData(formAddProd);
  //   console.log(dataForm.get("title"));
  const jsonData = {};
  for (const [key, value] of dataForm.entries()) {
    jsonData[key] = value;
  }
  // Enviamos data del producto a agregar al servidor
  socketClient.emit("addProd", jsonData);
  // Para resetear el formulario al enviar
  formAddProd.reset();
});

// Se reciben todos los productos
socketClient.on("productsAll", (allProd) => {
  //   console.log(allProd);
  let prodListHtml = "";
  allProd.map((p) => {
    prodListHtml += `<div class="items">
    <div id="title" class="line1">${p.title}</div>
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
  allprodReal.innerHTML = prodListHtml;
  const btnAddCart = document.querySelectorAll(".btnAddCart");
  btnAddCart.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pid = btn.value;
      socketClient.emit("pAddCart", pid);
      console.log(btn.value);
    });
  });
});

formDelProd.addEventListener("submit", (e) => {
  e.preventDefault();
  const dataForm = new FormData(formDelProd);
  const idNumber = dataForm.get("id");
  // console.log(typeof idNumber);
  // const jsonData = {};
  // for (const [key, value] of dataForm.entries()) {
  //   jsonData[key] = value;
  // }
  // console.log(jsonData);
  // Enviamos data del producto a agregar al servidor
  socketClient.emit("delProd", idNumber); //Number()
  // Para resetear el formulario al enviar
  formDelProd.reset();
});
