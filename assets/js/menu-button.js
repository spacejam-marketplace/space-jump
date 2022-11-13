function openMenu() {
    document.getElementById("menuButton").addEventListener("click", function () {
        document.getElementById("menu-container").style.width = '100vw';
    })
}

function closeMenu() {
    document.getElementById("closeButton").addEventListener("click", function () {
        document.getElementById("menu-container").style.width = '0';
    })
}

openMenu()

closeMenu()