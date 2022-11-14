//============= Variables
const productlist = document.querySelector(".checkout__productlist");
const total = document.querySelector(".total");
let sum = 0;
let cartArticlesArray = [];


//============= Listeners
document.addEventListener('DOMContentLoaded', () => {
    cartArticlesArray = JSON.parse(localStorage.getItem('cart')) || [];
    renderCheckout();
});


//============= Funciones

//Renderizar el array de articulos
function renderCheckout(){

    //Limpiar HTML a cada click para que no repita productos y reseta el total
    productlist.innerHTML = '';
    sum = 0;

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

        let sumNew = parseInt(article.price.replace(/[^0-9]/g, ''));

        sum +=  sumNew;
        console.log(sum)
        total.innerHTML = `
            <p class="total">Card total: ${sum}</p>
        `;
    });



}