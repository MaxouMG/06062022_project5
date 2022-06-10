// * Le but est de récupérer 1 seule réf de Kanap par page via l'API
// penser à paramétrer la balise “a” et son attribut “href”

// La référence de la page URL produits
console.log(window.location);
const urlPage = window.location.href
console.log(urlPage);

const url = new URL(urlPage);
console.log(url);

// Attention à bien utiliser URLSearchParams pour passer l’id 
// d’une page à une autre
const id = url.searchParams.get("id");
console.log(id);



fetch('http://localhost:3000/api/products')
     .then(response => {
          // console.log(response);
          return response.json();
     })
     .then((products) => {
          // mon erreur est au niveau de [0]. Pas de solution
          const product = products[0];
          console.log(product);

          let myCouch = document.getElementsByClassName('item');
          console.log(myCouch);

          myCouch.innerHTML +=
               `<article>
                    <div class="item__img">
                         <img src="${product.imageUrl}" alt="${product.altTxt}">
                    </div>
                    <div class="item__content">
                         <div class="item__content__titlePrice">
                              <h1 id="title">${product.name}</h1>           
                              <p>Prix : <span id="price">${product.price}</span>€</p>                  
                         </div>
                         <div class="item__content__description">
                              <p class="item__content__description__title">Description :</p>
                              <p id="description">${product.description}</p>                         
                         </div>
                         <div class="item__content__settings">
                              <div class="item__content__settings__color">
                                   <label for="color-select">Choisir une couleur :</label>
                                   <select name="color-select" id="colors">
                                        <option value="">--SVP, choisissez une couleur --</option>
                                             <option value="bleu">${product.colors[0]}</option>
                                             <option value="blanc">${product.colors[1]}</option>
                                             <option value="noir">${product.colors[2]}</option>
                                   </select>
                         </div>
                    </div>
               </article>
          `

     })





