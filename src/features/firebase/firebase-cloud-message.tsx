import { postDeviceToken } from "@/src/entities/notification";
import { app } from "../../../firbase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const initFCM = () => {
  const messaging = getMessaging(app);
  const loginToken = localStorage.getItem("accessToken");
  const requestPermissionAndGetToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const fcmToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_FIREBASE_VAPID_KEY,
        });

        if (fcmToken && loginToken) {
          await postDeviceToken({token: fcmToken
        });
        } else {
          console.log("FCM 토큰을 가져올 수 없습니다.");
        }
      } else {
        console.log("알림 권한이 거부되었습니다.");
      }
    } catch (error) {
      console.error("FCM 토큰 요청 실패:", error);
    }
  };
  if ("serviceWorker" in navigator) {
    (async () => {
      try {
        await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        await requestPermissionAndGetToken();
      } catch (error) {
        console.error(error);
      }
    })();
  }

  onMessage(messaging, (payload) => {
    if (Notification.permission === "granted") {
      const { title, body } = payload.notification || {};
      const url = payload.data?.url;

      const notification = new Notification(title || "알림", {
        badge: "/logo.png",
        body: body || "새로운 메시지가 도착했어요.",
        icon: "/logo.png",
        data: url ? { url } : {},
      });

      notification.onclick = (event) => {
        event.preventDefault();
        if (notification.data?.url) {
          window.open(notification.data.url, "_blank");
        }
      };
    }
  });
};