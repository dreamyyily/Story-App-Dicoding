class NotificationHelper {
  static async requestPermission() {
    if (!("Notification" in window)) return;

    const permission = await Notification.requestPermission();
    return permission;
  }

  static showNotification(message) {
    if (Notification.permission !== "granted") return;

    new Notification("Story App", {
      body: message,
      icon: `${import.meta.env.BASE_URL}icons/icon-192.png`,
    });
  }
}

export default NotificationHelper;
