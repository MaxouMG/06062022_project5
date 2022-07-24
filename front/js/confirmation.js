// Le but : créer un numéro de commande après validation du panier et du formulaire

//  étape 1 : les URLs et le numéro de commande
// console.log(window.location);
const urlPage = window.location.href;
// console.log(urlPage);

const url = new URL(urlPage);
console.log(url);

const orderId = url.searchParams.get("orderId");
console.log(orderId);
// étape 2 : changement de la couleur et du style pour une meilleure accessibilité
document.getElementById("orderId").style.color = "rgb(80, 5, 17)";
document.getElementById("orderId").style.fontWeight = "bold";
const number = document.getElementById("orderId");
number.innerHTML = orderId;
// étape 3 : effacer le contenu du panier via le localstorage
// après obtention du numéro de commande
localStorage.clear();
