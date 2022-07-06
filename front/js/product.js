// * Le but est de récupérer 1 seule réf de Kanap par page via l'API

// La référence de la page URL produits
console.log(window.location);
const urlPage = window.location.href;
console.log(urlPage);

const url = new URL(urlPage);
console.log(url);

// Attention à bien utiliser URLSearchParams pour passer l’id
// d’une page à une autre
const id = url.searchParams.get("id");
console.log(id);

const urlOrigin = "http://localhost:3000/api/products";
const urlChoice = urlOrigin + "/" + id;
console.log(urlChoice);

fetch(urlChoice)
  .then((response) => {
    // console.log(response);
    return response.json();
  })
  .then((products) => {
    // console.log(products);
    const myChoice = products;

    let myCouch = document.querySelector(".item article");
    // console.log(myCouch);
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
                                        <a href="./cart.html"> <button id="addToCart">Ajouter au panier</button></a>                                        
                                    </div>
                              </div>`;

    console.log(myCouch);

    // tous les coloris sont "présents" dans la console
    for (let i = 0; i < myChoice.colors.length; i++) {
      const myColor = myChoice.colors[i];
      // console.log(myColor);
      // tous les coloris sont dans le menu déroulant
      const color = document.getElementById("colors");
      color.innerHTML += `<option value="${myColor}">${myColor}</option>`;
    }

    // au clic ajouter au panier

    const addMyCouch = document.getElementById("addToCart");
    addMyCouch.addEventListener("click", () => {
      let quantityValue = parseInt(document.getElementById("quantity").value);
      // console.log(quantityValue);
      let colorsValue = document.getElementById("colors").value;
      // console.log(colorsValue);
      const product = {
        id: myChoice._id,
        quantity: quantityValue,
        color: colorsValue,
      };
      console.log(product);

      // storage.setItem(nomClé, valeurClé);
      // pour placer ma ligne dans le localstorage
      // localStorage.setItem("basket", JSON.stringify(product));

      let nullOrMore = JSON.parse(localStorage.getItem("basket"));
      console.log(nullOrMore);

      if (nullOrMore) {
        // là je demande la même id et la même couleur
        const sameProduct = nullOrMore.find(
          (el) => el.id === myChoice._id && el.color === colorsValue
        );
        // et j'insère une condition dans la condition
        if (sameProduct) {
          sameProduct.quantity += quantityValue;
        } else {
          nullOrMore.push(product);
        }
      } else {
        nullOrMore = [];
        nullOrMore.push(product);
      }
      localStorage.setItem("basket", JSON.stringify(nullOrMore));
    });
  });
