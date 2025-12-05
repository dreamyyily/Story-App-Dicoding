if ("serviceWorker" in navigator && "PushManager" in window) {
  navigator.serviceWorker
    .register(`${import.meta.env.BASE_URL}sw.js`)
    .then(async (reg) => {
      console.log("SW registered", reg);

      const pushToggle = document.getElementById("push-toggle");
      if (!pushToggle) return;

      const existingSub = await reg.pushManager.getSubscription();
      pushToggle.checked = !!existingSub;

      pushToggle.addEventListener("click", async () => {
        if (pushToggle.checked) {
          const resp = await fetch(
            "https://story-api.dicoding.dev/v1/push/vapid"
          );
          const result = await resp.json();
          const vapidPublicKey = result.data.vapidPublicKey;

          const convertedKey = urlBase64ToUint8Array(vapidPublicKey);

          const subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedKey,
          });

          await fetch("https://story-api.dicoding.dev/v1/push/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(subscription),
          });

          alert("Berhasil berlangganan notifikasi");
        } else {
          const sub = await reg.pushManager.getSubscription();
          if (sub) {
            await fetch("https://story-api.dicoding.dev/v1/push/unsubscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(sub),
            });
            await sub.unsubscribe();
          }

          alert("Berhenti berlangganan notifikasi");
        }
      });
    })
    .catch((err) => console.error("SW register failed", err));
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
