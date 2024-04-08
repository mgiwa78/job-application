import { sendPushNotificationToUser } from "../app";
import { TComment, TCommentDoc } from "../models/comment";
import { Notification } from "../models/notification";
import { TUserDoc } from "../models/user";

export async function notifyNewComment(
  postCreatorId: string,
  commentAuthor: TUserDoc
) {
  const notification = {
    type: "newComment",
    message: `New comment: ${commentAuthor.userName}`,
  };

  await Notification.create({
    title: "New Comment Notification",
    body: `Your Post has recieved a new comment by ${commentAuthor.userName}`,
    user: postCreatorId,
  });
  sendPushNotificationToUser(postCreatorId, notification);
}

export async function notifyNewCommentLike(
  commentCreatorId: string,
  liker: TUserDoc
) {
  const notification = {
    type: "newCommentLike",
    message: `New like by: ${liker.userName}`,
  };

  await Notification.create({
    title: "Like Notification",
    body: `Your Comment has recieved a new like by ${liker.userName}`,
    user: commentCreatorId,
  });
  sendPushNotificationToUser(commentCreatorId, notification);
}

export async function notifyNewPostLike(
  postCreatorId: string,
  liker: TUserDoc
) {
  const notification = {
    type: "newPostLike",
    message: `New like by: ${liker.userName}`,
  };

  await Notification.create({
    title: "Like Notification",
    body: `Your Post has recieved a new like by ${liker.userName}`,
    user: postCreatorId,
  });
  sendPushNotificationToUser(postCreatorId, notification);
}

export async function notifyNewFollower(
  followedUserId: string,
  follower: TUserDoc
) {
  const notification = {
    type: "newFollower",
    message: `${follower.userName} Started following you`,
  };

  await Notification.create({
    title: "New Follower Notification",
    body: `${follower.userName} Started following you `,
    user: followedUserId,
  });
  sendPushNotificationToUser(followedUserId, notification);
}
export async function notifyNewPostByFollowedUser(
  postAuthor: TUserDoc,
  followerID: string
) {
  const notification = {
    type: "newPost",
    message: `${postAuthor.userName} Created a new post`,
  };

  await Notification.create({
    title: "New Post Notification",
    body: `${postAuthor.userName} Created a new post `,
    user: followerID,
  });
  sendPushNotificationToUser(followerID, notification);
}
