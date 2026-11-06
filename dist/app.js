import express from "express";
import bookRoutes from "./routes/book.routes.js";
import borrowRoutes from "./routes/borrow.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Library Management API is running!");
});
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
    });
});
// Global error handler
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map