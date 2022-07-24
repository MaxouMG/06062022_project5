// Le but : afficher sur la page d'accueil une card par produit
// grâce aux données de l'API

//  étape 1 : ligne par ligne, récupérer les données de chaque produit
fetch("http://localhost:3000/api/products")
  .then((response) => {
    // console.log(response);
    return response.json();
  })
  // étape 2 : intégrer les données par card.
  .then((products) => {
    // La boucle pour lecture et affichage automatique de chaque produit
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(product);
      // Intégration automatique des données dans chaque card
      let couch = document.getElementById("items");
      // console.log(couch);
      couch.innerHTML += `          <a href="./product.html?id=${product._id}">
                  <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                  </article>
                </a>`;
    }
  });
