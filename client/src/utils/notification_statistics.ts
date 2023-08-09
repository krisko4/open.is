import { NotificationStatistics, NotificationType } from 'store/api/types';
export const mapNotificationStatistics = (data: NotificationStatistics[]) => {
  console.log(data);
  return {
    eventStatistics: data.find((s) => s.type === NotificationType.EVENT),
    rewardStatistics: data.find((s) => s.type === NotificationType.REWARD),
    ratingStatistics: data.find((s) => s.type === NotificationType.RATING_REQUEST),
    geolocationStatistics: data.find((s) => s.type === NotificationType.EVENT_TODAY_NEARBY),
  };
};

export type GroupedNotificationStatistics = ReturnType<typeof mapNotificationStatistics>;