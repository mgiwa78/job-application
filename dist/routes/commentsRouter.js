"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Comment_Controller_1 = require("../controllers/Comment-Controller");
const require_auth_1 = require("../middleware/require-auth");
const express_validator_1 = require("express-validator");
const commentRouter = express_1.default.Router();
commentRouter.get("/:postId", require_auth_1.AuthenticateUser, Comment_Controller_1.Fetch__COMMENTS__GET);
commentRouter.post("/:postId", [(0, express_validator_1.body)("body").notEmpty().withMessage("Comment body is required")], require_auth_1.AuthenticateUser, Comment_Controller_1.Create__COMMENT__POST);
commentRouter.put("/", [(0, express_validator_1.body)("body").notEmpty().withMessage("Comment body is required")], require_auth_1.AuthenticateUser, Comment_Controller_1.Update__COMMENT__PUT);
commentRouter.get("/:commentId", require_auth_1.AuthenticateUser, Comment_Controller_1.Fetch__COMMENT__GET);
commentRouter.delete("/:commentId", require_auth_1.AuthenticateUser, Comment_Controller_1.Delete__COMMENT__DELETE);
commentRouter.put("/:commentId/like-comment", require_auth_1.AuthenticateUser, Comment_Controller_1.Like__COMMENT__PUT);
exports.default = commentRouter;
//# sourceMappingURL=commentsRouter.js.map