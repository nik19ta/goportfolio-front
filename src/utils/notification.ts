import { notification } from 'antd';

// Eroor
export const errNotification = (title: string, text: string) => {
  notification.error({
    message: title,
    description: text
  });
};

// Success
export const successNotification = (title: string, text: string) => {
  notification.success({
    message: title,
    description: text
  });
};

// Info
export const infoNotification = (title: string, text: string) => {
  notification.info({
    message: title,
    description: text
  });
};
