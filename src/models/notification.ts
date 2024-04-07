import mongoose, { Document as Doc, Model } from "mongoose";

export interface TNotification {
  title: string;
  body: string;
  user: string;
}

export interface TNotificationDoc extends Doc, TNotification {}

interface TNotificationModel extends Model<TNotificationDoc> {
  build(attrs: TNotification): TNotificationDoc;
}

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
NotificationSchema.set("timestamps", true);

const Notification: TNotificationModel = (mongoose.models?.Notification ||
  mongoose.model<TNotificationDoc, TNotificationModel>(
    "Notification",
    NotificationSchema
  )) as TNotificationModel;

export { Notification };
