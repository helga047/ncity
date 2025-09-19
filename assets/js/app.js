async function loadComponent(id, url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load ${url}: ${response.status}`);
      }
      const html = await response.text();
      document.getElementById(id).innerHTML = html;
    } catch (err) {
      console.error(err);
    }
  }
  
document.addEventListener("DOMContentLoaded", async (event) => {
    loadComponent("header", "https://helga047.github.io/ncity/components/header.html");
    loadComponent("footer", "https://helga047.github.io/ncity/components/footer.html");
    console.log("DOM fully loaded and components loaded.");
  });

function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error(`Error loading ${file}:`, error));
}




async function loadTranslations(lang) {
  const response = await fetch(`https://helga047.github.io/ncity/assets/js/${lang}.json?nocache=${Date.now()}`);
  const translations = await response.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const text = key.split(".").reduce((obj, k) => obj?.[k], translations);
    if (text) el.textContent = text;
  });

  // save chosen language
  localStorage.setItem("lang", lang);
}

// Load saved language or default
const savedLang = localStorage.getItem("lang") || "en";
loadTranslations(savedLang);

// Example: user clicks button to change language
document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    loadTranslations(lang);
  });
});
