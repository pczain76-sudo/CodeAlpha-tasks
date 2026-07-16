import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));
app.use('/api/orders', orderRoutes);

app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use("/api/products", productRoutes);
app.use('/api/auth', authRoutes);
