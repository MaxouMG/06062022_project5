// Afficher les produits dans le panier

// 1. Récupérer les produits du localStorage

console.log(window.location);
const urlPage = window.location.href;
console.log(urlPage);

const url = new URL(urlPage);
console.log(url);

const urlOrigin = "http://localhost:3000/api/products";
console.log(urlOrigin);

let nullOrMore = JSON.parse(localStorage.getItem("basket"));
console.log(nullOrMore);

// 2. Boucler les produits du localStorage :
for (let i = 0; i < nullOrMore.length; i++) {
  const product = nullOrMore[i];
  const section = document.getElementById("cart__items");
  const urlChoice = urlOrigin + "/" + product.id;
  console.log(urlChoice);

  //  3. Pour chaque produit du localStorage, faire un fetch permettant l'affichage
  // de toutes les données du produit sélectionné

  fetch(urlChoice)
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((products) => {
      const myChoice = products;
      console.log(myChoice);

      section.innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
  <div class="cart__item__img">
    <img src= "${myChoice.imageUrl}" alt="${myChoice.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${myChoice.name}</h2>
      <p>${product.color}</p>
      <p>${myChoice.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value= ${product.quantity}>
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;

      // 4. Calculer le prix total et la quantité totale
      /* Quantité totale est un id = "totalQuantity" et prix total est un id = "totalPrice"
       */

      let basketQuantity = 0;
      const basketPricePerProduct = product.quantity * myChoice.price;
      console.log(basketPricePerProduct);

      for (let product of nullOrMore) {
        //product.quantity est ma valeur chiffrée à parser
        const quantity = parseInt(product.quantity);
        basketQuantity += quantity;
      }
      console.log(basketQuantity);

      const totallQuantity = document.getElementById("totalQuantity");
      totallQuantity.innerHTML = `${basketQuantity}`;

      /* <span id="totalPrice"><!-- 84,00 --></span> € */

      // 4. Créer des fonctions qui permettent de modifier la quantité et supprimer les produits du panier
    });
}
