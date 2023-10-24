const socketClient = io();

console.log("VISTA CARTiD");

const dataCartBox = document.getElementById("dataCartBox");

// socketClient.on("dataCartProducts", (data) => {
//   let cartProducts = "";
//   data.map((p) => {
//     cartProducts += `<div class="cart">
//       <h2 class="title">${p.productId.title}</h2>
//       <img class="thumbnails" src="${p.productId.thumbnails}" alt="Product Image" />
//       <div class="details">
//       <p class="code">Cantidad: ${p.quantity}</p>
//         <p class="code">Code: ${p.productId.code}</p>
//         <p class="stock">Stock: ${p.productId.stock}</p>
//         <p class="status">Status: ${p.productId.status}</p>
//         <p class="description">Description: ${p.productId.description}</p>
//         <p class="price">Price: $${p.productId.price}</p>
//         <p class="productId">Product ID: ${p.productId._id}</p>
//       </div>
//       </div>`;
//   });

//   dataCartBox.innerHTML = cartProducts;
// });

// const cartIdBox = document.getElementById("cartData");

// const id = // Obtén el ID del carro de la URL;
//   fetch(`/cartId/${id}`)
//     .then((response) => response.json())
//     .then((data) => {
//       // Manipulación de los datos obtenidos del servidor
//       const cartData = data.carts
//         .map(
//           (cartItem) => `
//       <div class="cart">
//         <h2>${cartItem.productId.title}</h2>
//         <img src="${cartItem.productId.thumbnails}" alt="Product Image" />
//         <!-- Agrega el resto de los detalles del producto aquí -->
//       </div>
//     `
//         )
//         .join("");

//       cartIdBox.innerHTML = cartData; // Inserta los datos en el contenedor
//     })
//     .catch((error) => console.error("Error al obtener los datos:", error));
