import App from "./app.js";
import { subscribeUser } from "./utils/push.js";
import "./../styles/styles.css";

const app = new App({
  navigationDrawer: document.getElementById("navigation-drawer"),
  drawerButton: document.getElementById("drawer-button"),
  content: document.getElementById("main-content"),
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
    .then(reg => console.log("SW registered:", reg))
    .catch(err => console.error("SW registration failed:", err));
}

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById("btn-install");
  if (installBtn) {
    installBtn.style.display = "block";
    installBtn.onclick = () => {
      deferredPrompt.prompt();
      deferredPrompt = null;
      installBtn.style.display = "none";
    };
  }
});

window.addEventListener("load", () => {
  const token = localStorage.getItem("token");
  
  if (token && "PushManager" in window && "serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(() => {
      subscribeUser(); 
    });
  }
});