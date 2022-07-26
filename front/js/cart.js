// Le but : afficher les produits dans le panier et de les modifier

// étape 1: les variables - URLs, inscription dans localstorage
// quantité initiale, prix initial

// console.log(window.location);
const urlPage = window.location.href;
// console.log(urlPage);

const url = new URL(urlPage);
console.log(url);

const urlOrigin = "http://localhost:3000/api/products";
console.log(urlOrigin);

let nullOrMore = JSON.parse(localStorage.getItem("basket"));
console.log(nullOrMore);

let basketQuantity = 0;
let initPrice = 0;

// étape 2: récupérer toutes les données de chaque produit sélectionné
// boucle avec l'id du produit pour accéder à la fiche produit
for (let i = 0; i < nullOrMore.length; i++) {
  const product = nullOrMore[i];
  const section = document.getElementById("cart__items");
  const urlChoice = urlOrigin + "/" + product.id;
  console.log(urlChoice);

  // étape 3: afficher lisiblement toutes les données du produit sélectionné

  fetch(urlChoice)
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((products) => {
      const myChoice = products;
      console.log(myChoice);
      // insertion des données prévues comme photo, quantité, prix
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
      const finalQuantity = (basketQuantity += product.quantity);
      const totalPricePerId = product.quantity * myChoice.price;
      // console.log(totalPricePerId);
      const finalPrice = (initPrice += totalPricePerId);
      // console.log(finalPrice);

      // 6.4 gestion des quantités nulles et négatives
      if (product.quantity < 1) {
        alert(
          "Attention! Il y a moins d'un produit dans cette ligne, elle va être effacée."
        );
        const remove = nullOrMore.filter((el) => product !== el);
        localStorage.setItem("basket", JSON.stringify(remove));
        window.location.reload();
      } else {
        finalQuantity;
        console.log(finalQuantity);
        finalPrice;
        console.log(finalPrice);
      }

      const totallQuantity = document.getElementById("totalQuantity");
      totallQuantity.innerHTML = `${finalQuantity}`;

      const totallPrice = document.getElementById("totalPrice");
      totallPrice.innerHTML = `${finalPrice}`;

      // 4.9 J'appelle ma fonction pour supprimer toute une ligne via le bouton "Supprimer"
      deleteKanap();
      // 6.2 j'appelle ma fonction de modification de l'input itemQuantity
      modifyQuantity();
      // étape 7 : récupérer  et analyser les données saisies dans le formulaire
      const searchForms = document.forms[0];
      console.log(searchForms);
      verifyFirstName();
      verifyLastName();
      verifyAddress();
      verifyCity();
      verifyEmail();
    });
}
// passage de la page panier à la page confirmation
beforeOrder();

// **************************************************************************

// étape 5 Créer une fonction pour supprimer les produits du panier

// 5.7 j'enferme tout ceci dans une fonction nommée deleteKanap
function deleteKanap() {
  // 5.1 deleteItem
  const deleteItem = document.getElementsByClassName("deleteItem");

  for (let i = 0; i < deleteItem.length; i++) {
    // 5.4 tout ce nouveau tableau je le veux au clic
    deleteItem[i].addEventListener("click", () => {
      // 5.2 une "série" de deleteItem. autant que de lignes de panier
      const closestDeleteItem = deleteItem[i].closest("article");
      // 5.3 identification du produit par son id et sa couleur
      const idProduct = closestDeleteItem.dataset.id;
      const colorProduct = closestDeleteItem.dataset.color;
      // re création d'un tableau excluant le produit à supprimer
      const remove = nullOrMore.filter(
        (el) => idProduct !== el.id || colorProduct !== el.color
      );
      console.log(remove);
      // 5.5 suppression du localstorage
      localStorage.setItem("basket", JSON.stringify(remove));
      // 5.6 rechargement de la page
      window.location.reload();
    });
  }
}

// **************************************************************************

// étape 6 créer une fonction pour modifier la quantité avant la validation finale
// de la commande
// 6.1  La modification de quantité

function modifyQuantity() {
  const itemQuantity = document.getElementsByClassName("itemQuantity");

  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener("change", (e) => {
      /*Pour savoir exactement ce qui a été tapé dans un input, le chemin est
console	  target		value soit (e.target.value)*/
      const newValue = parseInt(e.target.value);
      console.log(newValue);

      const closestItemQuantity = itemQuantity[i].closest("article");
      const idProduct = closestItemQuantity.dataset.id;
      const colorProduct = closestItemQuantity.dataset.color;
      // 6.2 création d'un tableau l'id, la couleur et la valeur modifiée manuellement
      if (nullOrMore) {
        const newChoice = nullOrMore.find(
          (el) =>
            el.id === idProduct &&
            el.color === colorProduct &&
            el.quantity !== newValue
        );
        if (newChoice) {
          newChoice.quantity = newValue;
        }
      }
      // 6.3 sauvegarde en localstorage et rafraîchissement de la page
      localStorage.setItem("basket", JSON.stringify(nullOrMore));
      window.location.reload();
      // 6.4 gestion des quantités nulles et négatives = remonter dans la page
      // ligne 70
    });
  }
}

// **************************************************************************

// étape 7 retrouver dans un formulaire
// 7.1 les regex
const regexName = /^[^@&"().,!_$*%€£`+=\/;?#\d]+$/;
const regexAddress = /^(.*[A-Za-z0-9.*à.*é.*è.*ù.*ï.*ë]+)$/;
const regexCity = /^(\d{5})(.*[A-Za-z0-9.*à.*é.*è.*ù.*ï.*ë])$/;
const regexEmail = /^(\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b)$/;

// 7.2 FirstName vérification (verify) puis validation au "submit (validation)"
function verifyFirstName() {
  const verifyFirstName = document.getElementById("firstName");
  verifyFirstName.addEventListener("change", (e) => {
    const firstName = e.target.value;
    console.log(firstName);
    // changement de la couleur et du style en cas d'erreur
    // pour une meilleure accessibilité
    document.getElementById("firstNameErrorMsg").style.color = "rgb(80, 5, 17)";
    document.getElementById("firstNameErrorMsg").style.fontStyle = "italic";
    const firstNameComment = document.getElementById("firstNameErrorMsg");
    if (firstName.match(regexName)) {
      firstNameComment.innerHTML = "";
    } else {
      firstNameComment.innerHTML = `Pas de chiffre, ni de caractère spécial dans le prénom, SVP. Merci :)`;
    }
  });
}

function validationFirstName() {
  const firstName = document.getElementById("firstName").value;
  if (firstName.match(regexName)) {
    return true;
  } else {
    return false;
  }
}

// 7.3 Idem pour lastName, address, city et email
function verifyLastName() {
  const verifyLastName = document.getElementById("lastName");
  verifyLastName.addEventListener("change", (e) => {
    const lastName = e.target.value;
    console.log(lastName);
    document.getElementById("lastNameErrorMsg").style.color = "rgb(80, 5, 17)";
    document.getElementById("lastNameErrorMsg").style.fontStyle = "italic";
    const lastNameComment = document.getElementById("lastNameErrorMsg");
    if (lastName.match(regexName)) {
      lastNameComment.innerHTML = "";
    } else {
      lastNameComment.innerHTML = `Pas de chiffre, ni de caractère spécial dans le nom, SVP. Merci :)`;
    }
  });
}

function validationLastName() {
  const lastName = document.getElementById("lastName").value;
  if (lastName.match(regexName)) {
    return true;
  } else {
    return false;
  }
}

function verifyAddress() {
  const verifyAddress = document.getElementById("address");
  verifyAddress.addEventListener("change", (e) => {
    const address = e.target.value;
    console.log(address);
    document.getElementById("addressErrorMsg").style.color = "rgb(80, 5, 17)";
    document.getElementById("addressErrorMsg").style.fontStyle = "italic";
    const addressComment = document.getElementById("addressErrorMsg");
    if (address.match(regexAddress)) {
      addressComment.innerHTML = "";
    } else {
      addressComment.innerHTML = `N'oubliez pas d'écrire une adresse postale! Merci :)`;
    }
  });
}

function validationAddress() {
  const address = document.getElementById("address").value;
  if (address.match(regexAddress)) {
    return true;
  } else {
    return false;
  }
}

function verifyCity() {
  const verifyCity = document.getElementById("city");
  verifyCity.addEventListener("change", (e) => {
    const city = e.target.value;
    console.log(city);
    document.getElementById("cityErrorMsg").style.color = "rgb(80, 5, 17)";
    document.getElementById("cityErrorMsg").style.fontStyle = "italic";
    const cityComment = document.getElementById("cityErrorMsg");
    if (city.match(regexCity)) {
      cityComment.innerHTML = "";
    } else {
      cityComment.innerHTML = `Un code postal avec 5 chiffres attachés puis le nom de la ville, SVP. Merci :)`;
    }
  });
}

function validationCity() {
  const city = document.getElementById("city").value;
  if (city.match(regexCity)) {
    return true;
  } else {
    return false;
  }
}

function verifyEmail() {
  const verifyEmail = document.getElementById("email");
  verifyEmail.addEventListener("change", (e) => {
    const email = e.target.value;
    console.log(email);
    document.getElementById("emailErrorMsg").style.color = "rgb(80, 5, 17)";
    document.getElementById("emailErrorMsg").style.fontStyle = "italic";
    const emailComment = document.getElementById("emailErrorMsg");
    if (email.match(regexEmail)) {
      emailComment.innerHTML = "";
    } else {
      emailComment.innerHTML = `N'oubliez pas votre adresse mail, SVP ! Merci :)`;
    }
  });
}

function validationEmail() {
  const email = document.getElementById("email").value;
  if (email.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

function beforeOrder() {
  const order = document.querySelector(".cart__order__form");

  order.addEventListener("submit", (e) => {
    // éviter le rechargement automatique de la page
    e.preventDefault();
    if (
      validationFirstName() &&
      validationLastName() &&
      validationAddress() &&
      validationCity() &&
      validationEmail() &&
      // nullOrMore.length pour ne pas répéter l'action à chaque article
      nullOrMore.length
    ) {
      beforeConfirmation();
    } else {
      return false;
    }

    function beforeConfirmation() {
      for (let i = 0; i < nullOrMore.length; i++) {
        const table = nullOrMore[i].id;
      }
    }

    // 7.3 méthode fetch post pour id de commande dans l'URL
    // 7.3.1 : créer les valeurs à passer
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    // console.log(contact);

    // 7.3.2 : récupérer des id seules
    const products = nullOrMore.map((el) => el.id);
    // console.log(products);

    // 7.3.3 : le fetch post pour envoyerle numéro de commande
    // sur la page confirmation
    fetch(urlOrigin + "/order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ contact, products }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "./confirmation.html?orderId=" + data.orderId;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}
