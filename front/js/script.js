// parcourir le résultat de la requête ligne par ligne avec Fetch
fetch("http://localhost:3000/api/products")
  .then((response) => {
    return response.json();
  })
  .then((products) => {
    // console.log(products);
    // La boucle pour lecture et affichage automatique de chaque Kanap
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      console.log(product);
      // Intégration automatique des données dans chaque card
      let couch = document.getElementById("items");
      console.log(couch);
      couch.innerHTML += `          <a href="./product.html?id=${product._id}">
                  <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                  </article>
                </a>`;
    }
  });
