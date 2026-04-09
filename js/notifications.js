function notify(msg) {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(msg);
  } else {
    Notification.requestPermission().then((perm) => {
      if (perm === "granted") new Notification(msg);
    });
  }
}