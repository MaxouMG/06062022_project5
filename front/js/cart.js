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

let basketQuantity = 0;
let initPrice = 0;

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
      <p class= "deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
      /* en lien avec la suppression totale, j'injecte un id deleteItem)

      // étape 4: calculer la quantité totale puis le prix total de la commande
      /* Quantité totale est un id = "totalQuantity"
       et le prix total est un id = "totalPrice"
       */

      const finalQuantity = (basketQuantity += product.quantity);
      console.log(finalQuantity);

      const totallQuantity = document.getElementById("totalQuantity");
      totallQuantity.innerHTML = `${finalQuantity}`;

      totalPrice = [];
      const totalPricePerId = product.quantity * myChoice.price;
      console.log(totalPricePerId);
      const finalPrice = (initPrice += totalPricePerId);
      console.log(finalPrice);

      const totallPrice = document.getElementById("totalPrice");
      totallPrice.innerHTML = `${finalPrice}`;

      // 4. Créer des fonctions qui permettent de modifier la quantité et supprimer les produits du panier
      /* ma première fonction est pour tout supprimer
La recommandation est la méthode element.closest pour cibler le produit selon id et couleur
Création d'un nouveau tableau avec filter en excluant le produit concerné
*/

      // 4.9 J'appelle ma fonction
      deleteKanap();
    });
}
// 4.8 j'enferme tout ceci dans une fonction nommée deleteKanap
function deleteKanap() {
  // 4.1 deleteItem
  const deleteItem = document.getElementsByClassName("deleteItem");
  // console.log(deleteItem);
  // 4.2 une "série" de deleteItem. autant que de lignes de panier
  for (let i = 0; i < deleteItem.length; i++) {
    // 4.5 tout ce nouveau tableau je le veux au clic
    deleteItem[i].addEventListener("click", () => {
      const closestDeleteItem = deleteItem[i].closest("article");
      // 4.2 une "série" de deleteItem. autant que de lignes de panier
      // console.log(closestDeleteItem);
      // 4.4 identification du produit par son id et sa couleur (filter)
      const idProduct = closestDeleteItem.dataset.id;
      const colorProduct = closestDeleteItem.dataset.color;

      const remove = nullOrMore.filter(
        (kanap) => idProduct !== kanap.id || colorProduct !== kanap.color
      );
      console.log(remove);
      // 4.6 supprimer aussi du localstorage
      localStorage.setItem("basket", JSON.stringify(remove));
      // 4.7 cela s'efface de la console et du localstorage.
      // MAIS je dois rafraîchir pour que le ligne disparaisse de la page panier
      window.location.reload();
    });
  }
}
