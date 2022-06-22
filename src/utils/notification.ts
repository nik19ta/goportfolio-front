import {notification} from 'antd';

// Error Notification
export const errNotification = (title: string, text: string) => {
  notification.error({
    message: title,
    description: text,
  });
};

// Success Notification
export const successNotification = (title: string, text: string) => {
  notification.success({
    message: title,
    description: text,
  });
};

// Info Notification
export const infoNotification = (title: string, text: string) => {
  notification.info({
    message: title,
    description: text,
  });
};
