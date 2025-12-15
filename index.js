import { menuArray } from "./data.js";

document.addEventListener("click", function() {
    console.log("hello")
})

function renderMenu() {
    document.querySelector(".cards").innerHTML = menuArray.map((item) => {
        return `
            <div class="card">
                <div class="card-container">
                    <p class="emoji">🍕</p>
                    <div class="item-details">
                        <p class="item-name">Pizza</p>
                        <p class="item-ingredients">ingredients</p>
                        <p class="item-price">$14</p>
                    </div>
                </div>
                <button class="add-btn inter-font">+</button>
            </div>
        `
    }).join('')
}

renderMenu()