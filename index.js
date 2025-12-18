import { menuArray } from "./data.js";

const discount = 0.1;

const paymentSection = document.querySelector(".payment")
const paymentForm = document.querySelector("#payment-form")
const starsDiv = document.querySelector(".stars")
const thanksSection = document.querySelector(".thanks")

document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        addItemToYourOrder(e.target.dataset.add)
    } else if (e.target.dataset.subtract) {
        subtractItemFromYourOrder(e.target.dataset.subtract)
    } else if (e.target.dataset.removeId) {
        deleteItemFromYourOrder(e.target.dataset.removeId)
    } else if (e.target.id === "feedback-btn") {
        thanksSection.classList.toggle("hidden")
        document.querySelector(".feedback").classList.toggle("hidden")
        setTimeout(() => {
            thanksSection.classList.toggle("hidden")
            document.body.classList.remove("disable-background")
        }, 3000)
    } else if (e.target.id === "complete-order-btn") {
        document.body.classList.add("disable-background")
        paymentSection.classList.toggle("hidden")
    } else if (e.target.dataset.star) {
        starsDiv.innerHTML = renderStars(Number(e.target.dataset.star))
    }
})

paymentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    paymentSection.classList.toggle("hidden")

    const paymentFormData = new FormData(paymentForm)

    paymentForm.reset()
    resetOrder()

    document.body.classList.remove("disable-background")
    renderSuccess(paymentFormData.get("name"))
})

function addItemToYourOrder(itemId) {
    const orderObj = menuArray.filter((item) => item.id == itemId)[0]
    orderObj.orderCount++
    orderObj.itemSelected = true

    document.querySelector(`#add-${itemId}`).textContent = `+${orderObj.orderCount}`
    document.querySelector(`#subtract-${itemId}`).disabled = false
    renderOrder()
}

function subtractItemFromYourOrder(itemId) {
    const orderObj = menuArray.filter((item) => item.id == itemId)[0]
    orderObj.orderCount--
    if (orderObj.orderCount === 0) {
        orderObj.itemSelected = false
        document.querySelector(`#subtract-${itemId}`).disabled = true
    }

    document.querySelector(`#add-${itemId}`).textContent = 
        orderObj.orderCount > 0 
        ? `+${orderObj.orderCount}` 
        : '+'
    renderOrder()
}

function deleteItemFromYourOrder(itemId) {
    const orderObj = menuArray.filter((item) => item.id == itemId)[0]
    orderObj.itemSelected = false
    orderObj.orderCount = 0

    renderOrder()
}

function resetOrder() {
    menuArray.forEach((item) => {
        item.itemSelected = false
        item.orderCount = 0
    })

    renderOrder()
}

function renderStars(number) {
    let feedBackHTML = ''
    for (let i = 0; i < number + 1; i++) {
        feedBackHTML += `
            <i class="fa-solid fa-star selected" data-star="${i}"></i>
        `
    }

    for (let i = number + 1; i < 5; i++) {
        feedBackHTML += `
            <i class="fa-solid fa-star" data-star="${i}"></i>
        `
    }

    return feedBackHTML
}

function renderFeedback() {
    document.body.classList.add("disable-background")
    document.querySelector(".feedback").classList.toggle("hidden")

    let feedBackHTML = ''
    for (let i = 0; i < 5; i++) {
        feedBackHTML += `
            <i class="fa-solid fa-star" data-star="${i}"></i>
        `
    }

    starsDiv.innerHTML = feedBackHTML
}

function renderSuccess(name) {
    const successSection = document.querySelector(".success-section")
    successSection.innerHTML = `
        <p class="success">Thanks, ${name}! Your order is on its way!</p>
    `
    successSection.classList.remove("hidden")

    setTimeout(() => successSection.classList.add("hidden"), 1500)
    setTimeout(renderFeedback, 1500)
}

function totalBill(ordersList) {
    let amount = ordersList.reduce((total, item) => {
        return total + item.price * item.orderCount
    }, 0)

    if (ordersList.length >= 2) {
        return `(Applied <span class="discount-text">10% Meal-Deal Discount</span>) $${amount - (amount * discount)}`
    }

    return `$${amount}`
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
                <p class="item-price order-item-price">${item.orderCount} x $${item.price}</p>
            </div>
        `).join('')

        ordersHTML = `
            <h2>Your order</h2>
            <div class="ordered-items">
                ${orderedItems}
            </div>
            <div class="total-price">
                <p class="item-name order-item-name">Total price:</p>
                <p class="item-price order-item-price">
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
                <button id="add-${item.id}" class="add-btn inter-font" data-add="${item.id}">+</button>
                <button id="subtract-${item.id}" class="subtract-btn inter-font" disabled data-subtract="${item.id}">-</button>
            </div>
        `
    }).join('')
}

renderMenu()