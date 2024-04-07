"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Annotation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AnnotationSchema = new mongoose_1.default.Schema({
    data: {
        type: String,
        required: true
    },
    file: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "File"
    }
});
const Annotation = (((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.Annotation) ||
    mongoose_1.default.model("Annotation", AnnotationSchema));
exports.Annotation = Annotation;
//# sourceMappingURL=annotation.js.map