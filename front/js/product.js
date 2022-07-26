// Deux buts : récupérer 1 seule référence de produit par page via l'API
// créer un localstorage pour mémoriser le choix d'une page à l'autre du site

// étape 1 : URL de la page produit
// console.log(window.location);
const urlPage = window.location.href;
// console.log(urlPage);

const url = new URL(urlPage);
console.log(url);

const id = url.searchParams.get("id");
console.log(id);

// étape 2 : URL par descriptif de produit
const urlOrigin = "http://localhost:3000/api/products";
const urlChoice = urlOrigin + "/" + id;
console.log(urlChoice);

fetch(urlChoice)
  .then((response) => {
    // console.log(response);
    return response.json();
  })

  // étape 3 : intégration des données de chaque produit dans la card
  //  à partir de l'URL descriptif de produit
  .then((products) => {
    const myChoice = products;

    let myCouch = document.querySelector(".item article");
    myCouch.innerHTML = `<div class="item__img">          
                                   <img src="${myChoice.imageUrl}" alt="${myChoice.altTxt}">
                          </div>
                              <div class="item__content">
                                   <div class="item__content__titlePrice">
                                        <h1 id="title">${myChoice.name}</h1>           
                                        <p>Prix : <span id="price">${myChoice.price}</span>€</p>                  
                                   </div>                         
                                   <div class="item__content__description">
                                        <p class="item__content__description__title">Description :</p>
                                        <p id="description">${myChoice.description}</p>                         
                                   </div>
                                   <div class="item__content__settings">
                                        <div class="item__content__settings__color">
                                             <label for="color-select">Choisir une couleur :</label>
                                             <select name="color-select" id="colors">
                                                  <option value="">--SVP, choisissez une couleur --</option>
                                             </select>
                                        </div>
                                        <div class="item__content__settings__quantity">
                                             <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                                             <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                                        </div>
                                   </div>
                                    <div class="item__content__addButton">
                                      <button id="addToCart">Ajouter au panier</button>                                                                           
                                    </div>
                              </div>`;

    // gestion des coloris dans le menu déroulant
    for (let i = 0; i < myChoice.colors.length; i++) {
      const myColor = myChoice.colors[i];
      // tous les coloris sont dans le menu déroulant
      const color = document.getElementById("colors");
      color.innerHTML += `<option value="${myColor}">${myColor}</option>`;
    }

    // étape 4 : passage du produit à la page panier
    // gestion de l'évènement : au clic ajouter au panier

    const addMyCouch = document.getElementById("addToCart");
    addMyCouch.addEventListener("click", () => {
      let colorsValue = document.getElementById("colors").value;
      if (!colorsValue) {
        alert("N'oubliez pas de choisir votre coloris, SVP. Merci :)");
        return false;
      }
      let quantityValue = parseInt(document.getElementById("quantity").value);
      if (quantityValue < 1 || quantityValue > 100) {
        alert("Une quantité valide entre 1 et 100, SVP. Merci :)");
        return false;
      }
      if (colorsValue && quantityValue) {
        window.location.href = "./cart.html";
      }
      const product = {
        id: myChoice._id,
        quantity: quantityValue,
        color: colorsValue,
      };
      // création d'un tableau pour le localstorage. C'est une paire clé/valeur
      // partie 1 : la clé
      let nullOrMore = JSON.parse(localStorage.getItem("basket"));

      if (nullOrMore) {
        // gestion des doublons la même id et la même couleur
        const sameProduct = nullOrMore.find(
          (el) => el.id === myChoice._id && el.color === colorsValue
        );
        if (sameProduct) {
          sameProduct.quantity += quantityValue;
        } else {
          nullOrMore.push(product);
        }
      } else {
        nullOrMore = [];
        nullOrMore.push(product);
      }
      // partie 2 : la valeur
      localStorage.setItem("basket", JSON.stringify(nullOrMore));
    });
  });
