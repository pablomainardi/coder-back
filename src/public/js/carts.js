const socketClient = io();

console.log("VISTA CARTS");

const cartBox = document.getElementById("cartBox");

// Se reciben todo los carros
socketClient.on("cartAll", async (cartAll) => {
  let carts = [];
  cartAll.forEach((cart) => {
    carts += `<div class="cart">
      <div id="cartId" class="line1"><a href="/cartid/${cart._id}">ID Cart: ${cart._id}</a></div>
      <button type="submit" value="${cart._id}" class="classCartId">Eliminar Carro</button>
      <br>`;

    cart.carts.forEach((item) => {
      carts += `<div class="cartIdtitle">${item.productId.title}</div>
      <div class="cartIdimg"><img src="${item.productId.thumbnails}" /img></div>
      <div class="cartIdprice">$ ${item.productId.price}</div>
                <div class="cartIdcant">Cantidad: ${item.quantity}</div>
                <div class="inpQtyBox">
                <input name="inpQty" type="text" value="" placeholder="Agrega cantidad" class="inpQty">
                <button type="submit" value="${item.productId._id}" class="inpQtyBtn">Agregar unidades</button>
                </div>
                <button class="btnDelProd" value="${item.productId._id}" type="submit">Eliminar Producto</button>
                <button class="eachCid" value="${item._id}"></button>
                <hr class="hrShort"/>`;
    });
    carts += `</div>`;
  });

  cartBox.innerHTML = carts;

  //btn para eliminar el carro
  const delCartById = document.querySelectorAll(".classCartId");
  delCartById.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cid = btn.value;
      socketClient.emit("delCart", cid);
    });
  });

  //btn para eliminar un prod del carro
  const btnDelProd = document.querySelectorAll(".btnDelProd");
  let cid = "";
  btnDelProd.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pid = btn.value;
      delCartById.forEach((btn) => {
        cid = btn.value;
      });
      socketClient.emit("delProdCart", { cid, pid });
    });
  });

  //VER JERARQUIA DE PARENTELEMENT PARA VER SI PODEMOS MODIFICAR CANTIDADES, SIN QUE SE ENVIE EL PRODUCTO

  //btn para agregar unidades al carro
  const inpQtyBtn = document.querySelectorAll(".inpQtyBtn");
  const inpQty = document.querySelectorAll(".inpQty");

  let qtyProd = "";
  let prodId = "";
  let cartId = "";

  inpQtyBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      qtyProd = btn.parentElement.querySelector(".inpQty").value;
      cartId = btn.closest(".cart").querySelector(".classCartId").value;
      prodId = btn.value; // Corrección aquí
      if (qtyProd && cartId && prodId) {
        // console.log("qtyNAV", qtyProd);
        // console.log("cartidNAV", cartId);
        // console.log("prodNAV", prodId);
        socketClient.emit("inpQtyBtn", cartId, prodId, qtyProd);
      }
    });
  });
});

// inpQtyBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     let qty = "";
//     inpQty.forEach((btn) => {
//       qty = btn.value;
//       console.log("qtyNAV", qty);
//     });

// let cid = "";
// delCartById.forEach((btn) => {
//   cid = btn.value;
//   // console.log("cidNAV", cid);
// });

// let pid = "";
// btnDelProd.forEach((btn) => {
//   pid = btn.value;
//   // console.log("pidNAV", pid);
// });

// console.log("inpQtyBtn", cid, pid, qty);
// socketClient.emit("inpQtyBtn", cid, pid, qty);
///////////////////////
// });
// const inpQtyBtn = document.querySelectorAll(".inpQtyBtn");
// let qty;
// inpQtyBtn.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const inpQty = document.querySelector(".inpQty");
//     qty = inpQty.value;
//     console.log(qty);
//   });

//   // socketClient.emit("inpQtyBtn", cid, pid, qty);
// });

//

// });

// allProducts.innerHTML = prodListHtml;
// const btnAddCart = document.querySelectorAll(".btnAddCart");
// btnAddCart.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const pid = btn.value;
//     socketClient.emit("pAddCart", pid);
//     console.log(btn.value);
//   });
// });
// });

//   cartAll.forEach((e) => {
//     cartBox.innerHTML = `<div class="cart">
//     <div id="cartId" class="line1">${e._id}</div>
//     <div class="prodId">${e.productID}</div>
//     <div class="prodCant">${e.quantity}</div>
//        </div>`;
//   });

// const btnAddCart = document.querySelectorAll(".btnAddCart");
// btnAddCart.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     const pid = btn.value;
//     socketClient.emit("pAddCart", pid);
//     console.log(btn.value);
//   });
// });
