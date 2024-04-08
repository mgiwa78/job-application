"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.JWT_SECRET = exports.PAGE_SIZE = void 0;
require("dotenv").config();
const JWT_SECRET = "sdsdfo8y2jkfbdfsdf";
exports.JWT_SECRET = JWT_SECRET;
exports.PAGE_SIZE = 10;
process.env.NODE_ENV === "development";
const MONGO_URI = process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/job-application"
    : "mongodb+srv://vercel-admin-user:TpcUDU37xA5JroSR@cluster0.za7xrpe.mongodb.net/job-application";
exports.MONGO_URI = MONGO_URI;
console.log(MONGO_URI);
//# sourceMappingURL=index.js.map