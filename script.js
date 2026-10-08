
// =========================
// Theme toggle (light/dark)
// =========================
const themeToggle = document.getElementById("themeToggle");
const rootEl = document.documentElement;
 
function setTheme(theme) {
    rootEl.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
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
// Copy buttons (email / phone still open normally when clicked)
// =========================
function copyToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
            .writeText(text)
            .then(() => showToast(`${label} copied to clipboard`))
            .catch(() => showToast(`${label}: ${text}`));
    } else {
        showToast(`${label}: ${text}`);
    }
}
 
document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
        copyToClipboard(btn.dataset.copy, btn.dataset.label || "Text");
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
 
 
// =========================
// Count-up for hero stats
// =========================
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduceMotion || !target) return;
    const start = performance.now();
    const duration = 1100;
    function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased) + (t === 1 ? suffix : "");
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
});

