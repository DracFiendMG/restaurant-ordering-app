import { menuArray } from "./data.js";

const orders = []

document.addEventListener("click", function(e) {
    if (e.target.dataset.id) {
        addItemToYourOrder(e.target.dataset.id)
    } else if (e.target.dataset.removeId) {
        deleteItemFromYourOrder(e.target.dataset.removeId)
    }
})

function addItemToYourOrder(itemId) {
    const orderObj = menuArray.filter((item) => item.id == itemId)[0]
    orderObj.itemSelected = true

    renderOrder()
}

function deleteItemFromYourOrder(itemId) {
    const orderObj = menuArray.filter((item) => item.id == itemId)[0]
    orderObj.itemSelected = false

    renderOrder()
}

function renderOrder() {
    const ordersList = menuArray.filter((item) => item.itemSelected)

    let ordersHTML = ''

    if (ordersList.length > 0) {
        const orderedItems = ordersList.map((item) => `
            <div class="ordered-item">
                <div class="item">
                    <p class="item-name order-item-name">${item.name}</p>
                    <button class="remove-btn" data-remove-id="${item.id}">remove</button>
                </div>
                <p class="item-price order-item-price">$${item.price}</p>
            </div>
        `).join('')

        ordersHTML = `
            <h2>Your order</h2>
            <div class="ordered-items">
                ${orderedItems}
            </div>
            <div class="total-price">
                <p class="item-name order-item-name">Total price:</p>
                <p class="item-price order-item-price">$${ordersList.reduce((total, item) => {
                    return total + item.price
                }, 0)}</p>
            </div>
            <button class="complete-order-btn">Complete Order</button>
        `
    }
    
    document.querySelector(".order").innerHTML = ordersHTML
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