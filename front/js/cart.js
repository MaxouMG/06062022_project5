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

// étape 7 retrouver dans un formulaire
const searchForms = document.forms[0];
console.log(searchForms);

let basketQuantity = 0;
let initPrice = 0;
// let quantity = product.quantity;

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

      // étape 4: calculer la quantité totale puis le prix total de la commande
      /* Quantité totale est un id = "totalQuantity"
   et le prix total est un id = "totalPrice"*/

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

      // 4.9 J'appelle ma fonction pour supprimer toute une ligne via le bouton "supprimer"
      deleteKanap();
      // 6.2 j'appelle ma fonction de modification de l'input itemQuantity
      modifyQuantity();
    });
}

// **************************************************************************

/* étape 5 Créer une fonction pour supprimer les produits du panier
La recommandation est la méthode element.closest pour cibler le produit selon id et couleur
Création d'un nouveau tableau avec filter en excluant le produit concerné
*/
// 5.7 j'enferme tout ceci dans une fonction nommée deleteKanap
function deleteKanap() {
  // 5.1 deleteItem
  const deleteItem = document.getElementsByClassName("deleteItem");
  // console.log(deleteItem);

  for (let i = 0; i < deleteItem.length; i++) {
    // 5.4 tout ce nouveau tableau je le veux au clic
    deleteItem[i].addEventListener("click", () => {
      const closestDeleteItem = deleteItem[i].closest("article");
      // 5.2 une "série" de deleteItem. autant que de lignes de panier
      // console.log(closestDeleteItem);
      // 5.3 identification du produit par son id et sa couleur (filter)
      const idProduct = closestDeleteItem.dataset.id;
      const colorProduct = closestDeleteItem.dataset.color;

      const remove = nullOrMore.filter(
        (el) => idProduct !== el.id || colorProduct !== el.color
      );
      console.log(remove);
      // 5.5 supprimer aussi du localstorage
      localStorage.setItem("basket", JSON.stringify(remove));
      // 5.6 cela s'efface de la console et du localstorage.
      // MAIS je dois rafraîchir pour que la ligne disparaisse de la page panier
      window.location.reload();
    });
  }
}
/* étape 6 créer une fonction pour modifier la quantité avant validation finale de la commande
La recommandation est l'évènement de modification input.addEventListener ("change",()) 
changement de quantité en + et en - */
/*6.1  La modification de quantité est sous <input  class="itemQuantity">
  Pour savoir exactement ce qui a été tapé dans un input, le chemin est
console	  target		value soit (e.target.value)*/
function modifyQuantity() {
  const itemQuantity = document.getElementsByClassName("itemQuantity");
  console.log(itemQuantity);

  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener("change", (e) => {
      newValue = e.target.value;

      let quantityValue = parseInt(
        document.getElementsByClassName("itemQuantity").value
      );
      console.log(quantityValue);
      let colorsValue = document.getElementsByName("myChoice").color;
      console.log(colorsValue);

      const product = {
        id: myChoice._id,
        quantity: quantityValue,
        color: colorsValue,
      };

      if (nullOrMore) {
        const newChoice = nullOrMore.find(
          (el) =>
            el.id === myChoice._id &&
            el.color === colorsValue &&
            el.quantity !== quantityValue
        );
        if (newChoice) {
          newChoice.quantity == newValue;
        } else {
          nullOrMore.push(newValue);
        }
      } else {
        nullOrMore = [];
        nullOrMore.push(newValue);
      }
      localStorage.setItem("basket", stringify(nullOrMore));
    });

    // ou alors :  const newfinalQuantity = (panier - quantité en cours += newValue)

    // window.location.reload();*/
  }
}
