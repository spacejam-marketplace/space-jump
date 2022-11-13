//============= Variables
const main = document.querySelector("Main");
const cartContent = document.querySelector(".cart-space__content");
const voidButton = document.querySelector(".cart-space__empty");
const checkoutButton = document.querySelector(".cart-space__checkout");
const modal = document.querySelector("#cart-space__modal");
let cartArticles = [];


//============= Listeners
main.addEventListener('click', addProduct);
modal.addEventListener('click', removeProduct);
voidButton.addEventListener('click', emptyCart);
checkoutButton.addEventListener('click', checkout);
document.addEventListener('DOMContentLoaded', () => {
    cartArticles = JSON.parse(localStorage.getItem('cart')) || [];
    renderCartModal();

});

//============= Funciones
function addProduct(e) {

    if (e.target.textContent == 'Add to cart') {

        //Generamos objeto al clickar sobre producto
        const selectedProduct = e.target.parentElement;
        const id = e.target.dataset.id;
        
        const product = {
            image: selectedProduct.querySelector('img').src,
            title: selectedProduct.querySelector('h2').textContent,
            desc: selectedProduct.getElementsByTagName('p')[0].textContent,
            price: selectedProduct.getElementsByTagName('p')[1].textContent,
            qty: 1,
            id: id
        }
        console.log("Producto agregado con id " + id);

        //Actualizar Cantidades
        const alreadyThere = cartArticles.some( article => article.id === product.id );
        if (alreadyThere) {
            //Actualizar cantidad si ya existe
            const articlesNew = cartArticles.map( article => {
                if (article.id === product.id) {
                    article.qty++;
                    return article; 
                }else {
                    return article;
                }
                
            });
            cartArticles = [...articlesNew];
        }else {
            //Agregar producto si es la primera vez
            cartArticles = [...cartArticles, product];
        }

        
        renderCartModal();


    }

}

//Renderizar el array de articulos
function renderCartModal(){

    //Limpiar HTML a cada click para que no repita productos
    cartContent.innerHTML = '';

    //Generar HTML
    cartArticles.forEach( article => {
        const div = document.createElement('div');
        div.className = "cart-space__content__product";
        div.innerHTML = `
            <img class="cart-space__content__img" src="${article.image}">
            <p class="cart-space__content__title">${article.title}</p>
            <p class="cart-space__content__price">${article.price}</p>
            <p class="cart-space__content__ud">${article.qty}ud</p>
            <button class="cart-space__content__remove" data-id="${article.id}">X</button>
        `;
        cartContent.appendChild(div);
    });

    //Agregar al LocalStorage
    syncStorage();


}

//Eliminar Producto
function removeProduct(e) {

    if (e.target.classList.contains('cart-space__content__remove')) {
        const articleId = e.target.getAttribute('data-id');
        cartArticles = cartArticles.filter(article => article.id !== articleId);
        console.log("Producto eliminado con id " + articleId)
        renderCartModal();
    }
    
}

//Vaciar Carrito
function emptyCart() {
    cartArticles = [];
    renderCartModal();
}

//Guardar carrito e ir a Checkout.html
function checkout() {
    window.location='/checkout.html';
}

//Salvar el LocalStorage
function syncStorage(){
    localStorage.setItem('cart', JSON.stringify(cartArticles));
};