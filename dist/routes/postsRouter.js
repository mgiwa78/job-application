"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_Controller_1 = require("../controllers/Post-Controller");
const require_auth_1 = require("../middleware/require-auth");
const express_validator_1 = require("express-validator");
const postRouter = express_1.default.Router();
postRouter.post("/", [(0, express_validator_1.body)("body").notEmpty().withMessage("Post body is required")], require_auth_1.AuthenticateUser, Post_Controller_1.Create__POST__POST);
postRouter.put("/", [(0, express_validator_1.body)("body").notEmpty().withMessage("Body is required")], require_auth_1.AuthenticateUser, Post_Controller_1.Update__POST__PUT);
postRouter.put("/:postId/like-post", require_auth_1.AuthenticateUser, Post_Controller_1.Like__POST__PUT);
postRouter.get("/:postId", require_auth_1.AuthenticateUser, Post_Controller_1.Fetch__POST__GET);
postRouter.put("/set-image-url/:postId", [(0, express_validator_1.body)("image").notEmpty().withMessage("image url is required")], require_auth_1.AuthenticateUser, Post_Controller_1.SET_POST_IMAGE__PUT);
postRouter.put("/set-video-url/:postId", [(0, express_validator_1.body)("video").notEmpty().withMessage("image url is required")], require_auth_1.AuthenticateUser, Post_Controller_1.SET_POST_VIDEO__PUT);
postRouter.delete("/:postId", require_auth_1.AuthenticateUser, Post_Controller_1.Delete__POST__DELETE);
exports.default = postRouter;
//# sourceMappingURL=postsRouter.js.map