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
