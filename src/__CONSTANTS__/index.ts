require("dotenv").config();

const JWT_SECRET = "sdsdfo8y2jkfbdfsdf";
export const PAGE_SIZE = 10;

process.env.NODE_ENV === "development";

const MONGO_URI =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/job-application"
    : "mongodb+srv://vercel-admin-user:TpcUDU37xA5JroSR@cluster0.za7xrpe.mongodb.net/job-application";

console.log(MONGO_URI);
export { JWT_SECRET, MONGO_URI };
