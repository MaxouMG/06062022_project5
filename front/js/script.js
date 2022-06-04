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
            // Etape 2 avec const couch, je crée une sélection d'éléments dans la liste
            const couch = products;
            console.log(couch);
            // Etape 3 je crée mes variables pour la future vignette de chaque produit
            let ref = `${couch["_id"]}`;
            let name = `${couch["name"]}`;
            let image = `${couch["imageUrl"]}`;
            let description = `${couch["description"]}`;
            // Etape 4 en m'aidant du tableau l'assignation est automatique dans le HTML

            for (let i = 0; i < couch.length; i++) {
                  couch[i];
                  couch.innerHTML =
                        `<section id="items" class="items">
                        <a href=${ref}>
                              < article >
                                    <img src= ${image} alt="">
                                    <h3 class="productName">${name}</h3>
                                    <p class="productDescription">${description}</p>
                              </article>
                        </section>`
                  console.log(couch.innerHTML);
                  // bonne nouvelle répétition 8 fois. Mauvaise nouvelle c'est indéfini

            }
      });





// 





