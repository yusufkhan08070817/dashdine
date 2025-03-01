import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"

const app = express();
const prisma = new PrismaClient();
app.use(cors({
    origin: "http://localhost:5173", // Change this to your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies if needed
  }));
app.get("/categories", async (req, res) => {
    try {
        const storeId  = "cm6vzesd30002g29eig349k9k"

        if (!storeId) {
            return res.status(400).json({ error: "storeId is required" });
        }

        const categories = await prisma.category.findMany({
            where: { storeId: storeId.toString() }, // Ensure storeId is a string
            include: { Item: true }, // ✅ Corrected field name
        });

        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => console.log("Server is running on port 5000"));
