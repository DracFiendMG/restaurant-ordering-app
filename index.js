import { menuArray } from "./data.js";

const orders = []

document.addEventListener("click", function(e) {
    if (e.target.dataset.id) {
        addItemToYourOrder(e.target.dataset.id)
    }
})

function addItemToYourOrder(itemId) {
    const orderObj = menuArray.filter((item) => item.id == itemId)[0]
    orderObj.orderCount++

    renderOrder()
}

function renderOrder() {
    const ordersList = menuArray.filter((item) => item.orderCount > 0)
    const orderedItems = ordersList.map((item) => `
        <div class="ordered-item">
            <div class="item">
                <p class="item-name order-item-name">${item.name}</p>
                <button class="remove-btn">remove</button>
            </div>
            <p class="item-price order-item-price">$${item.price}</p>
        </div>
    `).join('')
    document.querySelector(".order").innerHTML = `
        <h2>Your order</h2>
        <div class="ordered-items">
            ${orderedItems}
        </div>
        <div class="total-price">
            <p class="item-name order-item-name">Total price:</p>
            <p class="item-price order-item-price">$14</p>
        </div>
        <button class="complete-order-btn">Complete Order</button>
    `
}

function renderMenu() {
    document.querySelector(".cards").innerHTML = menuArray.map((item) => {
        return `
            <div class="card">
                <div class="card-container">
                    <p class="emoji">${item.emoji}</p>
                    <div class="item-details">
                        <p class="item-name">${item.name}</p>
                        <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                </div>
                <button class="add-btn inter-font" data-id="${item.id}">+</button>
            </div>
        `
    }).join('')
}

renderMenu()