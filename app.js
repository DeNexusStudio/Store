import { STORE } from "./config.js";
import { PRODUCTS } from "./products.js";

const $ = (s, root = document) => root.querySelector(s);
const money = n => new Intl.NumberFormat(STORE.locale, { style: "currency", currency: STORE.currency, maximumFractionDigits: 0 }).format(Number(n) || 0);
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const whatsappUrl = message => `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(message)}`;
const CART_KEY = "luvitus-store-cart-v1";
let cart = loadCart();
let activeCategory = "All";

function loadCart() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}
function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); renderCart(); }
function productById(id) { return PRODUCTS.find(p => p.id === id); }
function variantBySize(product, size) { return product?.variants.find(v => v.size === size); }
function showToast(message) {
  const toast = $("#toast"); toast.textContent = message; toast.classList.add("show");
  window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}
function setBrand() {
  document.title = `${STORE.name} | Herbal Wellness`;
  document.querySelectorAll("[data-store-name]").forEach(el => el.textContent = STORE.name);
  $("#contactEmail").href = `mailto:${STORE.email}`;
  $("#contactEmail").textContent = `✉ ${STORE.email}`;
  $("#contactWhatsapp").href = whatsappUrl("Hello, I would like to make an enquiry.");
  const consult = STORE.consultationWhatsapp || STORE.whatsappNumber;
  const support = STORE.supportWhatsapp || STORE.whatsappNumber;
  $("#consultWhatsapp").href = `https://wa.me/${consult}?text=${encodeURIComponent("Hello, I would like to book a free consultation. Please let me know the available times.")}`;
  $("#supportWhatsapp").href = `https://wa.me/${support}?text=${encodeURIComponent("Hello, I have a question about one of your products. Please assist me.")}`;
  document.querySelectorAll("[data-asset]").forEach(img => { const key = img.dataset.asset; if (STORE.assets?.[key]) img.src = STORE.assets[key]; });
  $("#year").textContent = new Date().getFullYear();
  $("#socialLinks").innerHTML = Object.entries(STORE.socials).filter(([,url]) => url && !url.includes("YOUR_")).map(([name,url]) => `<a href="${escapeHTML(url)}" target="_blank" rel="noopener">${escapeHTML(name)}</a>`).join("");
}
function renderCategories() {
  const categories = ["All", ...new Set(PRODUCTS.map(p => p.category).filter(Boolean))];
  $("#categoryFilters").innerHTML = categories.map(c => `<button class="category-chip ${c === activeCategory ? "active" : ""}" data-category="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("");
}
function renderProducts() {
  const term = $("#searchInput").value.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (activeCategory === "All" || p.category === activeCategory) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term));
  $("#productGrid").innerHTML = list.length ? list.map(p => {
    const v = p.variants[0];
    return `<article class="product-card">
      <button class="product-image" data-details="${escapeHTML(p.id)}" aria-label="View ${escapeHTML(p.name)}">
        <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy">
        ${v.oldPrice > v.price ? `<span class="sale-tag">SPECIAL PRICE</span>` : ""}
        <span class="quick-view">View details ↗</span>
      </button>
      <div class="product-info"><div class="product-meta"><span>${escapeHTML(p.category)}</span><span class="rating">★ ${Number(p.rating).toFixed(1)} <small>(${Number(p.ratingCount) || 0})</small></span></div>
      <h3>${escapeHTML(p.name)}</h3><p class="product-description">${escapeHTML(p.description)}</p>
      <div class="card-bottom"><div class="price-block"><strong>${money(v.price)}</strong>${v.oldPrice > v.price ? `<del>${money(v.oldPrice)}</del>` : ""}</div><button class="add-btn" data-details="${escapeHTML(p.id)}" aria-label="Choose options for ${escapeHTML(p.name)}">＋</button></div></div>
    </article>`;
  }).join("") : `<div class="no-results">No products found. Try another search or category.</div>`;
}
function openProduct(id) {
  const p = productById(id); if (!p) return;
  const options = p.variants.map((v,i) => `<option value="${i}">${escapeHTML(v.size)} — ${money(v.price)}${v.oldPrice > v.price ? ` (was ${money(v.oldPrice)})` : ""}</option>`).join("");
  const media = p.video ? `<video class="detail-video" controls playsinline preload="metadata" poster="${escapeHTML(p.image)}"><source src="${escapeHTML(p.video)}"></video>` : "";
  const infoRow = (label, value) => value ? `<section class="product-fact"><h3>${label}</h3><p>${escapeHTML(Array.isArray(value) ? value.join(" • ") : value)}</p></section>` : "";
  $("#productDialogContent").innerHTML = `<div class="detail-layout"><div><img class="detail-image" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">${media}</div><div class="detail-copy"><p class="eyebrow">${escapeHTML(p.category)}</p><h2>${escapeHTML(p.name)}</h2><div class="rating">★ ${Number(p.rating).toFixed(1)} <small>(${Number(p.ratingCount) || 0} ratings)</small></div>${infoRow("Product description",p.description)}${infoRow("Ingredients",p.ingredients)}${infoRow("Dosage & directions",p.dosage)}${infoRow("How to use",p.usage)}${infoRow("Warnings & precautions",p.warnings)}${infoRow("Storage",p.storage)}${infoRow("Additional information",p.otherInfo)}<label>Choose size / option<select id="variantSelect">${options}</select></label><div id="detailPrice" class="detail-price"></div><div class="policy-box"><b>Return / refund policy — please read</b><p>${escapeHTML(p.returnPolicy)}</p><label class="check-line"><input id="policyAgree" type="checkbox"> I have read and agree to this product's return/refund policy.</label></div><button class="btn btn-primary full-btn" id="addSelected">Add to cart</button><p class="form-note">The seller confirms stock, payment and delivery in WhatsApp.</p></div></div>`;
  const updatePrice = () => { const v = p.variants[Number($("#variantSelect").value)]; $("#detailPrice").innerHTML = `<strong>${money(v.price)}</strong>${v.oldPrice > v.price ? `<del>${money(v.oldPrice)}</del><span class="save-label">Save ${money(v.oldPrice-v.price)}</span>` : ""}`; };
  $("#variantSelect").addEventListener("change", updatePrice); updatePrice();
  $("#addSelected").addEventListener("click", () => {
    if (!$("#policyAgree").checked) return showToast("Please agree to the product return/refund policy first.");
    const v = p.variants[Number($("#variantSelect").value)];
    const existing = cart.find(x => x.id === p.id && x.size === v.size);
    if (existing) existing.qty += 1; else cart.push({ id:p.id, size:v.size, qty:1, agreed:true, agreedAt:new Date().toISOString(), policy:p.returnPolicy });
    saveCart(); $("#productDialog").close(); showToast("Product added to your cart.");
  });
  $("#productDialog").showModal();
}
function renderCart() {
  const count = cart.reduce((n,x) => n + x.qty, 0);
  $("#cartCount").textContent = count; $("#drawerCount").textContent = `(${count})`;
  $("#cartItems").innerHTML = cart.map((item,index) => {
    const p = productById(item.id), v = variantBySize(p,item.size); if (!p || !v) return "";
    return `<article class="cart-item"><img src="${escapeHTML(p.image)}" alt=""><div class="cart-item-main"><b>${escapeHTML(p.name)}</b><small>${escapeHTML(item.size)} · ${money(v.price)}</small><div class="quantity"><button data-qty="${index}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-qty="${index}" data-change="1" aria-label="Increase quantity">＋</button></div></div><div class="cart-item-end"><b>${money(v.price * item.qty)}</b><button class="remove-item" data-remove="${index}">Remove</button></div></article>`;
  }).join("");
  const subtotal = cart.reduce((sum,item) => { const p=productById(item.id), v=variantBySize(p,item.size); return sum + (v ? v.price*item.qty : 0); },0);
  $("#cartSubtotal").textContent = money(subtotal);
  $("#cartEmpty").hidden = cart.length > 0; $("#cartSummary").hidden = cart.length === 0;
}
function openCart() { $("#cartDrawer").classList.add("open"); $("#drawerBackdrop").classList.add("visible"); $("#cartDrawer").setAttribute("aria-hidden","false"); document.body.classList.add("no-scroll"); }
function closeCart() { $("#cartDrawer").classList.remove("open"); $("#drawerBackdrop").classList.remove("visible"); $("#cartDrawer").setAttribute("aria-hidden","true"); document.body.classList.remove("no-scroll"); }
function orderMessage(details) {
  const lines = cart.map((item,i) => { const p=productById(item.id), v=variantBySize(p,item.size); return `${i+1}. ${p.name}\n   Size: ${item.size}\n   Quantity: ${item.qty}\n   Unit price: ${money(v.price)}\n   Line total: ${money(v.price*item.qty)}\n   Return/refund policy agreed: YES\n   Policy: ${item.policy}`; });
  const total = cart.reduce((sum,item) => sum + variantBySize(productById(item.id),item.size).price*item.qty,0);
  return `NEW WEBSITE ORDER — ${STORE.name}\n\nCUSTOMER\nName: ${details.name}\nPhone: ${details.phone}\nDelivery address: ${details.address}\nAdditional note: ${details.note || "None"}\n\nORDER ITEMS\n${lines.join("\n\n")}\n\nSUBTOTAL: ${money(total)}\nDelivery fee: To be confirmed\nPayment: To be agreed in WhatsApp\n\nCustomer confirmed each product's return/refund policy before adding it to cart.\nOrder time: ${new Date().toLocaleString(STORE.locale)}`;
}
function initTheme() {
  const saved = localStorage.getItem("store-theme");
  const theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = theme; $("#themeIcon").textContent = theme === "dark" ? "☀" : "☾";
}
$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next; localStorage.setItem("store-theme",next); $("#themeIcon").textContent = next === "dark" ? "☀" : "☾";
});
$("#menuToggle").addEventListener("click", () => {
  const open = $("#navLinks").classList.toggle("open"); $("#menuToggle").setAttribute("aria-expanded",String(open));
});
$("#navLinks").addEventListener("click", e => { if(e.target.closest("a")) { $("#navLinks").classList.remove("open"); $("#menuToggle").setAttribute("aria-expanded","false"); }});
$("#categoryFilters").addEventListener("click", e => { const b=e.target.closest("[data-category]"); if(!b)return; activeCategory=b.dataset.category; renderCategories(); renderProducts(); });
$("#searchInput").addEventListener("input",renderProducts);
$("#productGrid").addEventListener("click",e => { const b=e.target.closest("[data-details]"); if(b)openProduct(b.dataset.details); });
$("#openCart").addEventListener("click",openCart); $("#closeCart").addEventListener("click",closeCart); $("#drawerBackdrop").addEventListener("click",closeCart); $("#continueShopping").addEventListener("click",closeCart);
$("#cartItems").addEventListener("click",e => {
  const remove=e.target.closest("[data-remove]"), qty=e.target.closest("[data-qty]");
  if(remove) cart.splice(Number(remove.dataset.remove),1);
  if(qty) { const item=cart[Number(qty.dataset.qty)]; item.qty += Number(qty.dataset.change); if(item.qty<=0)cart.splice(Number(qty.dataset.qty),1); }
  saveCart();
});
$("#startCheckout").addEventListener("click",() => { if(!cart.length)return; closeCart(); $("#checkoutDialog").showModal(); });
$("#checkoutForm").addEventListener("submit",e => {
  e.preventDefault(); if(!cart.length)return showToast("Your cart is empty.");
  const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  window.open(whatsappUrl(orderMessage(data)),"_blank","noopener");
  $("#checkoutDialog").close(); cart=[]; saveCart(); showToast("Your WhatsApp order message is ready to send.");
});
$("#openRefund").addEventListener("click",() => $("#refundDialog").showModal());
$("#refundForm").addEventListener("submit",e => {
  e.preventDefault(); const d=Object.fromEntries(new FormData(e.currentTarget).entries());
  const message=`RETURN / REFUND REQUEST — ${STORE.name}\n\nName: ${d.name}\nPhone: ${d.phone}\nOrder reference: ${d.order}\nProduct: ${d.product}\nPayment account name: ${d.accountName}\nPayment method / account details: ${d.accountDetails}\nDelivery date: ${d.deliveryDate}\nIssue: ${d.details}\nCustomer confirms accuracy and policy acknowledgement.\n\nPlease review eligibility under the expired-product-only policy and five-working-day contact window.`;
  window.open(whatsappUrl(message),"_blank","noopener"); $("#refundDialog").close(); e.currentTarget.reset();
});
$("#contactForm").addEventListener("submit",async e => {
  e.preventDefault(); const endpoint=STORE.formspreeEndpoint;
  if(!endpoint || endpoint.includes("YOUR_FORM_ID")) { $("#contactStatus").textContent="Setup needed: add your Formspree form endpoint in config.js before using this form."; return; }
  const button=e.currentTarget.querySelector("button"); button.disabled=true; button.textContent="Sending…";
  try {
    const response=await fetch(endpoint,{method:"POST",body:new FormData(e.currentTarget),headers:{Accept:"application/json"}});
    if(!response.ok)throw new Error("Unable to send");
    e.currentTarget.reset(); $("#contactStatus").textContent="Thank you. Your message has been sent.";
  } catch { $("#contactStatus").textContent="Sorry, your message could not be sent. Please contact us through WhatsApp."; }
  finally { button.disabled=false; button.innerHTML="Send message <span>↗</span>"; }
});
document.querySelectorAll("[data-close-dialog]").forEach(b=>b.addEventListener("click",()=>b.closest("dialog").close()));
function renderVideoList(items, target, emptyText) {
  const root = $(target);
  if (!Array.isArray(items) || !items.length) { root.innerHTML = `<p class="video-empty">${emptyText}</p>`; return; }
  root.innerHTML = items.map(item => {
    const url = String(item.embedUrl || "");
    let safeUrl = "";
    try { const parsed = new URL(url); if (parsed.protocol === "https:" && ["www.youtube.com","youtube.com","player.vimeo.com"].includes(parsed.hostname)) safeUrl = parsed.href; } catch {}
    if (!safeUrl) return "";
    return `<article class="video-card"><div class="video-frame"><iframe src="${escapeHTML(safeUrl)}" title="${escapeHTML(item.title || "Luvitus video")}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="video-card-copy"><b>${escapeHTML(item.title || "Luvitus video")}</b>${item.description ? `<p>${escapeHTML(item.description)}</p>` : ""}</div></article>`;
  }).join("") || `<p class="video-empty">Add your video links in config.js to display them here.</p>`;
}
renderVideoList(STORE.videos?.testimonials, "#testimonialVideos", "Add customer testimonial videos in config.js.");
renderVideoList(STORE.videos?.guides, "#guideVideos", "Add product guide videos in config.js.");

setBrand(); initTheme(); renderCategories(); renderProducts(); renderCart();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(console.error));
