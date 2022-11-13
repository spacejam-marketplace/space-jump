//============= Variables
const productlist = document.querySelector(".checkout__productlist");
let cartArticlesArray = [];


//============= Listeners
document.addEventListener('DOMContentLoaded', () => {
    cartArticlesArray = JSON.parse(localStorage.getItem('cart')) || [];
    renderCheckout();
});


//============= Funciones

//Renderizar el array de articulos
function renderCheckout(){

    //Limpiar HTML a cada click para que no repita productos
    productlist.innerHTML = '';

    //Generar HTML
    cartArticlesArray.forEach( article => {
        const div = document.createElement('div');
        div.className = "checkout-space__content__product";
        div.innerHTML = `
            <img class="checkout-space__content__img" src="${article.image}">
            <p class="checkout-space__content__title">${article.title}</p>
            <p class="checkout-space__content__price">${article.price}</p>
            <p class="checkout-space__content__ud">${article.qty}ud</p>
            <button class="checkout-space__content__remove" data-id="${article.id}">X</button>
        `;
        productlist.appendChild(div);

    });



}
