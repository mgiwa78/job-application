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
exports.Fetch__ANNOTATION__GET = exports.Create__ANNOTATION__POST = void 0;
const annotation_1 = require("../models/annotation");
const mongodb_1 = require("mongodb");
const Create__ANNOTATION__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const fileId = req.params.fileId;
        yield annotation_1.Annotation.findOneAndUpdate({ file: new mongodb_1.ObjectId(fileId) }, { file: fileId, data: data }, { new: true, upsert: true });
        return res.json({ status: "success" });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__ANNOTATION__POST = Create__ANNOTATION__POST;
const Fetch__ANNOTATION__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fileId } = req.params;
        const fileAnnotations = yield annotation_1.Annotation.findOne({ file: fileId });
        return res.json({ status: "success", data: fileAnnotations });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__ANNOTATION__GET = Fetch__ANNOTATION__GET;
//# sourceMappingURL=Annotation-Controller.js.map