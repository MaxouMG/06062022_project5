// parcourir le résultat de la requête ligne par ligne avec Fetch
fetch('http://localhost:3000/api/products')
      .then(response => {
            return response.json();
      })
      .then((products) => {
            console.log(products);
            //Etape 1 je me place dans la section HTML items - nom: section
            const section = document.getElementById('items');
            console.log(section);
            // Etape 2 je crée mes variables pour la future vignette de chaque produit
            let kName = `${products["name"]}`;
            let kImage = `${products["imageUrl"]}`;
            let kDescription = `${products["description"]}`;
            // Etape 3 en m'aidant du tableau l'assignation est automatique dans le HTML
            for (let i = 0; i < products.length; i++) {
                  products[i];
                  // Etape 4 en fait c'est le a href que je devrais viser pour placer les résultats dans les vignettes
                  section.innerHTML =
                        `<section id="items" class="items">
                        <a href="./product.html?id=42">
                              < article >
                                    <img src= ${kImage} alt="">
                                    <h3 class="productName">${kName}</h3>
                                    <p class="productDescription">${kDescription}</p>
                              </article>
                        </a></section>
                              <section id="items" class="items">
                        <a href="./product.html?id=42">
                              < article >
                                    <img src= ${kImage} alt="">
                                    <h3 class="productName">${kName}</h3>
                                    <p class="productDescription">${kDescription}</p>
                              </article>
                        </a></section>`
                  console.log(section.innerHTML);
                  // bonne nouvelle répétition 8 fois dans la console. Mauvaise nouvelle c'est indéfini

            }
      });





// 





