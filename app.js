// // LISTINO PRODOTTI
const products = [
  {
    id: "troppoco",
    name: "Troppoco' T-shirt",
    price: 24.99,
    imageFront: "troppoco-front.jpg",
    imageBack: "troppoco-back.jpg",
    colors: [
      { name: "nero", hex: "#000000" },
      { name: "bianco", hex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stripePaymentLink: "https://buy.stripe.com/test_123456789"
  },
  {
    id: "nostop",
    name: "NoStop T-shirt",
    price: 29.99,
    imageFront: "nostop-front.jpg",
    imageBack: "nostop-back.jpg",
    colors: [
      { name: "nero", hex: "#000000" },
      { name: "bianco", hex: "#ffffff" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stripePaymentLink: "https://buy.stripe.com/test_987654321"
  }
];

// RENDERING CATALOGO
function renderCatalog() {
  const catalogContainer = document.getElementById("catalog");
  catalogContainer.innerHTML = "";

  products.forEach(product => {
    // Genera quadrati colore
    const colorSwatchesHtml = product.colors
      .map((color, index) => `
        <div 
          class="color-swatch ${index === 0 ? 'active' : ''}" 
          style="background-color: ${color.hex};" 
          title="${color.name}"
          onclick="selectColor('${product.id}', '${color.name}', this)">
        </div>
      `).join("");

    // Genera opzioni taglie
    const sizeOptionsHtml = product.sizes
      .map(size => `<option value="${size}">Taglia ${size}</option>`)
      .join("");

    const productCard = `
      <div class="col-12 col-md-5 text-start">
        <div class="card product-card">
          <h3 class="product-title font-logo mb-3">${product.name}</h3>
          
          <!-- Immagine con cambio al passaggio del mouse -->
          <div class="product-img-wrapper mb-3">
            <img 
              id="img-${product.id}"
              src="${product.imageFront}" 
              class="product-img" 
              alt="${product.name}"
              onmouseover="this.src='${product.imageBack}'"
              onmouseout="this.src='${product.imageFront}'"
            >
          </div>
          
          <!-- Sezione Colore -->
          <div class="product-selection-label font-text">Colore:</div>
          <div class="color-swatch-container mb-3">
            ${colorSwatchesHtml}
          </div>

          <!-- Sezione Taglia -->
          <div class="product-selection-label font-text">Taglia:</div>
          <select id="size-${product.id}" class="form-select size-select font-text mb-4">
            ${sizeOptionsHtml}
          </select>

          <!-- Prezzo e Tasto Acquista -->
          <div class="d-flex align-items-center justify-content-between pt-2 border-top border-secondary">
            <span class="font-text text-warning fw-bold fs-4">€${product.price.toFixed(2)}</span>
            <button onclick="buyProduct('${product.id}')" class="btn btn-outline-light buy-btn font-text px-4">
              Acquista
            </button>
          </div>
        </div>
      </div>
    `;

    catalogContainer.innerHTML += productCard;
  });
}

// SELEZIONE COLORE (Aggiunge bordo attivo)
function selectColor(productId, colorName, element) {
  const parent = element.parentElement;
  parent.querySelectorAll('.color-swatch').forEach(swatch => swatch.classList.remove('active'));
  element.classList.add('active');
}

// LOGICA DI ACQUISTO CON LINK STRIPE
function buyProduct(productId) {
  const product = products.find(p => p.id === productId);
  const selectedSize = document.getElementById(`size-${productId}`).value;

  if (product && product.stripePaymentLink) {
    const checkoutUrl = `${product.stripePaymentLink}?client_reference_id=${productId}_${selectedSize}`;
    window.location.href = checkoutUrl;
  } else {
    alert("Prodotto momentaneamente non disponibile per l'acquisto.");
  }
}

document.addEventListener("DOMContentLoaded", renderCatalog);