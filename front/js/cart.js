// Le but est d'afficher les produits dans le panier et de les modifier

// étape 1: récupérer les produits du localStorage

console.log(window.location);
const urlPage = window.location.href;
console.log(urlPage);

const url = new URL(urlPage);
console.log(url);

const urlOrigin = "http://localhost:3000/api/products";
console.log(urlOrigin);

let nullOrMore = JSON.parse(localStorage.getItem("basket"));
console.log(nullOrMore);

// étape 2: récupérer toutes les données de chaque produit sélectionné
// choix une boucle avec l'id du produit pour accéder à la fiche produit
for (let i = 0; i < nullOrMore.length; i++) {
  const product = nullOrMore[i];
  const section = document.getElementById("cart__items");
  const urlChoice = urlOrigin + "/" + product.id;
  console.log(urlChoice);

  // étape 3: avec un fetch afficher lisiblement de toutes les données du produit sélectionné

  fetch(urlChoice)
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((products) => {
      const myChoice = products;
      console.log(myChoice);
      // insertion dynamique sur la page des données prévues comme photo, quantité, prix
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

      // étape 4: calculer la quantité totale puis le prix total de la commande
      /* Quantité totale est un id = "totalQuantity"
       et le prix total est un id = "totalPrice"
       */
      let basketQuantity = 0;

      for (let product of nullOrMore) {
        //product.quantity est ma valeur chiffrée à parser
        const quantity = parseInt(product.quantity);
        basketQuantity += quantity;
      }

      console.log(basketQuantity);

      const totallQuantity = document.getElementById("totalQuantity");
      totallQuantity.innerHTML = `${basketQuantity}`;

      let initPrice = 0;
      totalPrice = [];
      const totalPricePerId = product.quantity * myChoice.price;
      console.log(totalPricePerId);
      const finalPrice = (initPrice += totalPricePerId);
      console.log(finalPrice);

      for (let product of nullOrMore) {
        console.log(product);
        if (finalPrice) {
          initPrice += totalPricePerId;
        } else {
          totalPrice = [];
          totalPrice.push(totalPricePerId);
        }
        totalPrice.push(finalPrice);

        console.log(totalPrice);
      }

      // là JS boucle sur le même prix par le nombre de lignes de produit
      //  je voudrais ligne 1/valeur 1 puis ligne 2/valeur1  + valeur 2 ou /valeur1, valeur 2

      const totallPrice = document.getElementById("totalPrice");
      totallPrice.innerHTML = `${totalPrice}`;

      // 4. Créer des fonctions qui permettent de modifier la quantité et supprimer les produits du panier
    });
}
