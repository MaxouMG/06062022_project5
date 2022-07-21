// le but est de créer un numéro de commande après validation de toutes les étapes

/* Dans confirmation.html
<span id="orderId"><!-- 65431343444684674 --></span>
*/
// La référence de la page URL produits
console.log(window.location);
const urlPage = window.location.href;
console.log(urlPage);

const url = new URL(urlPage);
console.log(url);

// Attention à bien utiliser URLSearchParams pour passer l’id
// d’une page à une autre
const orderId = url.searchParams.get("orderId");
console.log(orderId);

document.getElementById("orderId").style.color = "rgb(80, 5, 17)";
document.getElementById("orderId").style.fontWeight = "bold";
const number = document.getElementById("orderId");
number.innerHTML = orderId;
// Pour effacer le panier après num de commande
localStorage.clear();
