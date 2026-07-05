import express from "express";
import Razorpay from "razorpay";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();
app.enable("trust proxy");
// __dirname polyfill for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };

  const order = await razorpay.orders.create(options);
  console.log("--------", order.id);
  res.json(order);
});
const clientBuildPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientBuildPath));
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});
app.listen(5000);
