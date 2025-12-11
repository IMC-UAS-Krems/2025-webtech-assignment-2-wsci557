const storeItems = [
  { id: 1, name: "House Building Services", price: 12.0, img: "img/item1.png" },
  { id: 2, name: "Well Building Services", price: 6.0, img: "img/item2.png" },
  { id: 3, name: "Path Building Services", price: 10.0, img: "img/item3.png" },
  {
    id: 4,
    name: "Roof ReBuilding Services",
    price: 18.0,
    img: "img/item4.png",
  },
  {
    id: 5,
    name: "General Clean Up and Repair Services",
    price: 18.0,
    img: "img/item5.png",
  },
  {
    id: 6,
    name: "Bridge Building Services",
    price: 18.0,
    img: "img/item6.png",
  },
  { id: 7, name: "Lamp Services", price: 6.0, img: "img/item7.png" },
  { id: 8, name: "Medical Services", price: 8.0, img: "img/item8.png" },
  { id: 9, name: "Veterinary Services", price: 18.0, img: "img/item9.png" },
  {
    id: 10,
    name: "Educational Services for Moominlings",
    price: 20.0,
    img: "img/item10.png",
  },
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  console.log("Moomin script loaded");
  window.store_page = document.getElementById("store");
  window.cart_page = document.getElementById("cart-section");
  window.checkout_page = document.getElementById("checkout-form");
  window.confirmation_page = document.getElementById("confirmation");

  function updateCheckoutButton() {
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.disabled = cart.length === 0;
  }

  window.toggleStore = function () {
    store_page.style.display =
      store_page.style.display === "none" ? "block" : "none";
  };

  window.toggleCart = function () {
    cart_page.style.display =
      cart_page.style.display === "none" ? "block" : "none";
  };

  window.go_checkout = function () {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    checkout_page.style.display = "block"; // ONLY opens checkout
  };

  window.hideAllButtons = function () {
    const btns = ["toggle-store-btn", "toggle-cart-btn", "checkout-btn"];

    btns.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = "none";
    });
  };

  // Add to Cart Buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      let name = button.dataset.name;
      let price = parseFloat(button.dataset.price);
      cart.push({ name, price });
      updateCart();
    });
  });

  function updateCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
      let li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );

      li.innerHTML = `
      <span>${item.name} - €${item.price.toFixed(2)}</span>
      <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
    `;

      cartList.appendChild(li);
    });

    cart_page.style.display = "block";
    updateCheckoutButton();
  }

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  document.getElementById("customer-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const zipcode = document.getElementById("zipcode").value.trim();

    if (!phone.startsWith("+")) {
      alert("Phone number must start with +");
      return;
    }

    if (!/^\d+$/.test(phone.substring(1))) {
      alert("Phone number must contain only digits after +");
      return;
    }

    if (!email.includes("@")) {
      alert("Email must contain @");
      return;
    }

    if (!/^\d{2}-\d{3}$/.test(zipcode)) {
      alert("ZIP code must have format 12-345");
      return;
    }

    // Calculations
    let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    let discount = cart.length >= 3 ? subtotal * 0.1 : 0;
    let afterDiscount = subtotal - discount;
    let tax = afterDiscount * 0.01;
    let total = afterDiscount + tax;

    const summaryDiv = document.getElementById("summary");

    summaryDiv.innerHTML = `
      <div id="gifinback">
        <h3>All that you Bought will be redistributed to fellow Moomins in need</h3>
        <p><strong>Items Purchased:</strong></p>
        <ul id="thankscheckout">
          ${cart
            .map((item) => `<li>${item.name} – M€${item.price.toFixed(2)}</li>`)
            .join("")}
        </ul>
        <p><strong>Subtotal:</strong> M€${subtotal.toFixed(2)}</p>
        <p><strong>Discount (${
          cart.length >= 3 ? "10%" : "0%"
        })</strong>: -M€${discount.toFixed(2)}</p>
        <p><strong>Tax (1%):</strong> M€${tax.toFixed(2)}</p>
        <h4><strong>Total:</strong> M€${total.toFixed(2)}</h4>
      </div>
    `;
    // Checkbox logic — remove gif if the user unchecks it
    const gifCheckbox = document.getElementById("gif-toggle");
    const gifContainer = document.getElementById("gifinback");

    if (!gifCheckbox.checked) {
      gifContainer.style.backgroundImage = "none";
    }
    store_page.style.display = "none";
    cart_page.style.display = "none";
    checkout_page.style.display = "none";
    confirmation_page.style.display = "block";

    // document.getElementById("toggle-store-btn").style.display = "none";
    // document.getElementById("toggle-cart-btn").style.display = "none";
    // document.getElementById("checkout-btn").style.display = "none";
    hideAllButtons();

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.location.reload();
    }, 10000);
  });
});
