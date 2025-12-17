// ============================================================
// SISTEMA DE NOTIFICACIONES PUSH PARA MÓVIL
// Web Push API + Service Worker
// ============================================================

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

class PushNotificationService {
  private swRegistration: ServiceWorkerRegistration | null = null;
  private subscription: PushSubscription | null = null;

  // Inicializar Service Worker
  async initialize(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push notifications not supported');
      return false;
    }

    try {
      this.swRegistration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      // Esperar a que el service worker esté activo
      await navigator.serviceWorker.ready;

      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  // Solicitar permiso y suscribirse
  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    let permission = Notification.permission;

    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    return permission;
  }

  // Suscribirse a push notifications
  async subscribe(userId: string): Promise<PushSubscription | null> {
    if (!this.swRegistration) {
      const initialized = await this.initialize();
      if (!initialized) return null;
    }

    const permission = await this.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission denied');
      return null;
    }

    try {
      const subscription = await this.swRegistration!.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY || ''
        ),
      });

      this.subscription = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: this.arrayBufferToBase64(subscription.getKey('p256dh')!),
          auth: this.arrayBufferToBase64(subscription.getKey('auth')!),
        },
      };

      // Guardar suscripción en Supabase
      await this.saveSubscription(userId, this.subscription);

      return this.subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  // Desuscribirse
  async unsubscribe(userId: string): Promise<boolean> {
    if (!this.swRegistration) return false;

    try {
      const subscription = await this.swRegistration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        await this.removeSubscription(userId);
        this.subscription = null;
        return true;
      }
    } catch (error) {
      console.error('Unsubscribe failed:', error);
    }

    return false;
  }

  // Verificar si está suscrito
  async isSubscribed(): Promise<boolean> {
    if (!this.swRegistration) return false;

    const subscription = await this.swRegistration.pushManager.getSubscription();
    return subscription !== null;
  }

  // Guardar suscripción en Supabase
  private async saveSubscription(userId: string, subscription: PushSubscription): Promise<void> {
    const { supabase } = await import('./supabaseClient');
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        user_id: userId,
        endpoint: subscription.endpoint,
        p256dh_key: subscription.keys.p256dh,
        auth_key: subscription.keys.auth,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error saving push subscription:', error);
    }
  }

  // Eliminar suscripción
  private async removeSubscription(userId: string): Promise<void> {
    const { supabase } = await import('./supabaseClient');
    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error removing push subscription:', error);
    }
  }

  // Helpers para conversión de keys
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  // Enviar notificación local (para testing)
  async sendLocalNotification(title: string, options: NotificationOptions): Promise<void> {
    if (Notification.permission === 'granted' && this.swRegistration) {
      await this.swRegistration.showNotification(title, {
        ...options,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'linkpay-notification',
        requireInteraction: false,
        silent: false,
      });
    }
  }
}

export const pushNotificationService = new PushNotificationService();
