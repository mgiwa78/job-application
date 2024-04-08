"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Controller_1 = require("../controllers/User-Controller");
const require_auth_1 = require("../middleware/require-auth");
const router = express_1.default.Router();
router.get("/my-profile", require_auth_1.AuthenticateUser, User_Controller_1.Fetch__PROFILE__GET);
router.put("/follow-user", require_auth_1.AuthenticateUser, User_Controller_1.Follow__USER__PUT);
router.put("/", require_auth_1.AuthenticateUser, User_Controller_1.Update__USER__PUT);
exports.default = router;
//# sourceMappingURL=usersRouter.js.map