// =========================
// Mobile navigation toggle
// =========================
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
 
if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
 
    // Close the menu after a link is tapped (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}
 
// =========================
// Toast (replaces browser alert)
// =========================
const toast = document.getElementById("toast");
let toastTimer = null;
 
function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
 
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 2600);
}
 
// =========================
// Copy contact details to clipboard
// =========================
function copyToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
            .writeText(text)
            .then(() => showToast(`${label} copied to clipboard`))
            .catch(() => showToast(`Could not copy ${label.toLowerCase()}`));
    } else {
        showToast(`${label}: ${text}`);
    }
}
 
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const email = link.getAttribute("href").replace("mailto:", "");
        copyToClipboard(email, "Email");
    });
});
 
document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        const phone = link.textContent.trim();
        copyToClipboard(phone, "Phone number");
    });
});
 
// =========================
// Footer year
// =========================
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
 