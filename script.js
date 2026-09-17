// =========================
// Theme toggle (light/dark)
// =========================
const themeToggle = document.getElementById("themeToggle");
const rootEl = document.documentElement;
 
function setTheme(theme) {
    rootEl.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute("content", theme === "dark" ? "#0B0E14" : "#F5F6F8");
    }
}
 
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = rootEl.getAttribute("data-theme") === "dark" ? "dark" : "light";
        setTheme(current === "dark" ? "light" : "dark");
    });
}
 
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
// Scroll progress bar
// =========================
const scrollProgress = document.getElementById("scrollProgress");
 
function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
}
 
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();
 
// =========================
// Active nav link on scroll
// =========================
const navLinkEls = document.querySelectorAll("[data-nav-link]");
const trackedSections = document.querySelectorAll("main section[id]");
 
if (navLinkEls.length && trackedSections.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = entry.target.getAttribute("id");
                navLinkEls.forEach((link) => {
                    const isMatch = link.getAttribute("href") === `#${id}`;
                    link.classList.toggle("is-active", isMatch);
                    if (isMatch) {
                        link.setAttribute("aria-current", "true");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
 
    trackedSections.forEach((section) => navObserver.observe(section));
}
 
// =========================
// Reveal sections on scroll
// =========================
const revealEls = document.querySelectorAll("[data-reveal]");
 
if (revealEls.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
 
    revealEls.forEach((el) => revealObserver.observe(el));
} else {
    // Fallback: show everything immediately if IntersectionObserver is unavailable
    revealEls.forEach((el) => el.classList.add("is-visible"));
}
 
// =========================
// Footer year
// =========================
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
 