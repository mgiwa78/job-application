"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const require_auth_1 = require("../middleware/require-auth");
const Annotation_Controller_1 = require("../controllers/Annotation-Controller");
const annotationRouter = (0, express_1.Router)();
annotationRouter.post("/:fileId", require_auth_1.AuthenticateUser, Annotation_Controller_1.Create__ANNOTATION__POST);
annotationRouter.get("/:fileId", require_auth_1.AuthenticateUser, Annotation_Controller_1.Fetch__ANNOTATION__GET);
exports.default = annotationRouter;
//# sourceMappingURL=annotationRouter.js.map