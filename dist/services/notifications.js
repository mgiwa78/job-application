"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyNewFollower = exports.notifyNewPostLike = exports.notifyNewCommentLike = exports.notifyNewComment = void 0;
const app_1 = require("../app");
const notification_1 = require("../models/notification");
function notifyNewComment(postCreatorId, commentAuthor) {
    return __awaiter(this, void 0, void 0, function* () {
        const notification = {
            type: "newComment",
            message: `New comment: ${commentAuthor.userName}`,
        };
        yield notification_1.Notification.create({
            title: "New Comment Notification",
            body: `Your Post has recieved a new comment by ${commentAuthor.userName}`,
            user: postCreatorId,
        });
        (0, app_1.sendPushNotificationToUser)(postCreatorId, notification);
    });
}
exports.notifyNewComment = notifyNewComment;
function notifyNewCommentLike(commentCreatorId, liker) {
    return __awaiter(this, void 0, void 0, function* () {
        const notification = {
            type: "newCommentLike",
            message: `New like by: ${liker.userName}`,
        };
        yield notification_1.Notification.create({
            title: "Like Notification",
            body: `Your Comment has recieved a new like by ${liker.userName}`,
            user: commentCreatorId,
        });
        (0, app_1.sendPushNotificationToUser)(commentCreatorId, notification);
    });
}
exports.notifyNewCommentLike = notifyNewCommentLike;
function notifyNewPostLike(postCreatorId, liker) {
    return __awaiter(this, void 0, void 0, function* () {
        const notification = {
            type: "newPostLike",
            message: `New like by: ${liker.userName}`,
        };
        yield notification_1.Notification.create({
            title: "Like Notification",
            body: `Your Post has recieved a new like by ${liker.userName}`,
            user: postCreatorId,
        });
        (0, app_1.sendPushNotificationToUser)(postCreatorId, notification);
    });
}
exports.notifyNewPostLike = notifyNewPostLike;
function notifyNewFollower(followedUserId, follower) {
    return __awaiter(this, void 0, void 0, function* () {
        const notification = {
            type: "newFollower",
            message: `${follower.userName} Started following you`,
        };
        yield notification_1.Notification.create({
            title: "New Follower Notification",
            body: `${follower.userName} Started following you `,
            user: followedUserId,
        });
        (0, app_1.sendPushNotificationToUser)(followedUserId, notification);
    });
}
exports.notifyNewFollower = notifyNewFollower;
//# sourceMappingURL=notifications.js.map