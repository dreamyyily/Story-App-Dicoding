import App from "./app.js";
import NotificationHelper from "./utils/notification-helper.js";
import "./../styles/styles.css";

const app = new App({
  navigationDrawer: document.getElementById("navigation-drawer"),
  drawerButton: document.getElementById("drawer-button"),
  content: document.getElementById("main-content"),
});

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installBtn = document.getElementById("btn-install");
  if (!installBtn) return;

  installBtn.style.display = "block";
  installBtn.addEventListener("click", async () => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Install outcome:", outcome);
    deferredPrompt = null;
    installBtn.style.display = "none";
  });
});

async function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window))
    return null;

  try {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    const reg = await navigator.serviceWorker.register(swUrl);
    console.log("Service Worker registered:", reg);

    setupPushToggle(reg);
    setupSubscribeButton(reg);

    return reg;
  } catch (err) {
    console.error("SW registration failed:", err);
    return null;
  }
}

registerServiceWorker();

async function setupPushToggle(reg) {
  const pushToggle = document.getElementById("push-toggle");
  if (!pushToggle) return;

  const existingSub = await reg.pushManager.getSubscription();
  pushToggle.checked = !!existingSub;

  pushToggle.addEventListener("click", async () => {
    if (pushToggle.checked) {
      await subscribePush(reg);
    } else {
      await unsubscribePush(reg);
    }
  });
}

async function setupSubscribeButton(reg) {
  const subBtn = document.getElementById("subscribe-btn");
  if (!subBtn) return;

  subBtn.addEventListener("click", async () => {
    await NotificationHelper.requestPermission();

    if (Notification.permission !== "granted") {
      alert("Izin notifikasi ditolak");
      return;
    }

    await subscribePush(reg);
    alert("Notifikasi berhasil diaktifkan!");
  });
}

async function subscribePush(reg) {
  await NotificationHelper.requestPermission();
  if (Notification.permission !== "granted") return;

  const DUMMY_VAPID_KEY =
    "BOr3yRyvE4s-lA7x4VxP8S9ZP9oJt_2ZBv6hTgiuCwR4FjkL4d8BoGOOjPmcVSnxD8D0uQ6KyHRxHXv3eZ9e2y8";

  const convertedKey = urlBase64ToUint8Array(DUMMY_VAPID_KEY);

  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey,
  });

  NotificationHelper.showNotification("Berhasil berlangganan notifikasi!");
}

async function unsubscribePush(reg) {
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return;

  await fetch("https://story-api.dicoding.dev/v1/push/unsubscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub),
  });

  await sub.unsubscribe();

  NotificationHelper.showNotification("Berhenti berlangganan notifikasi");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
