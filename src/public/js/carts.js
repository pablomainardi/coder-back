const socketClient = io();

console.log("VISTA CARTS");

const cartBox = document.getElementById("cartBox");

// Se reciben todo los carros
socketClient.on("cartAll", async (cartAll) => {
  let carts = "";
  console.log(cartAll);
  cartAll.forEach((cart) => {
    carts += `<div class="cart">
      <div id="cartId" class="line1">Carro numero: ${cart._id}</div>
      <br>`;
    cart.carts.forEach((item) => {
      carts += `<div class="prodId">${item.productId.title}</div>
      <div class="prodId">${item.productId.thumbnails}</div>
      <div class="prodId">$ ${item.productId.price}</div>
                <div class="prodCant">Cantidad: ${item.quantity}</div>
                <hr/>`;
    });
    carts += `</div>`;
  });

  cartBox.innerHTML = carts;
});

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
