import { menuArray } from "./data.js";

const discount = 0.1;

const paymentSection = document.querySelector(".payment")
const paymentForm = document.querySelector("#payment-form")

document.addEventListener("click", function(e) {
    if (e.target.dataset.id) {
        addItemToYourOrder(e.target.dataset.id)
    } else if (e.target.dataset.removeId) {
        deleteItemFromYourOrder(e.target.dataset.removeId)
    } else if (e.target.id === "complete-order-btn") {
        paymentSection.classList.toggle("hidden")
    }
})

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    paymentSection.classList.toggle("hidden")

    const paymentFormData = new FormData(paymentForm)

    paymentForm.reset()
    resetOrder()

    renderSuccess(paymentFormData.get("name"))
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

function resetOrder() {
    menuArray.forEach((item) => item.itemSelected = false)

    renderOrder()
}

function renderSuccess(name) {
    document.querySelector(".success-section").innerHTML = `
        <p class="success hidden">Thanks, ${name}! Your order is on its way!</p>
    `
    document.querySelector(".success").classList.remove("hidden")
}

function totalBill(ordersList) {
    let amount = ordersList.reduce((total, item) => {
        return total + item.price
    }, 0)

    if (ordersList.length >= 2) {
        return `${amount - (amount * discount)} (With <span class="discount-text">10% Meal-Deal Discount</span>)`
    }

    return amount
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
                <p class="item-price order-item-price">$
                    ${totalBill(ordersList)}
                </p>
            </div>
            <button class="complete-order-btn" id="complete-order-btn">Complete Order</button>
        `
    }
    
    document.querySelector(".order").innerHTML = ordersHTML
}

function renderMenu() {
    document.querySelector(".cards").innerHTML += menuArray.map((item) => {
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