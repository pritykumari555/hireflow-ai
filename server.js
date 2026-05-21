const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =======================
// MIDDLEWARE
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://hireflow-frontend-ghce.vercel.app",
        "https://hireflow-frontend-ghce-i77v278pn-pritykumari555s-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// =======================
// DATABASE CONNECTION
// =======================
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected ✅");
})
.catch((err) => {
    console.log("Mongo Error ❌", err);
});

// =======================
// TEST ROUTE
// =======================
app.get("/", (req, res) => {

    res.send("Backend Running 🚀");

});

// =======================
// ROUTES
// =======================

// Questions Route
app.use(
    "/api/questions",
    require("./routes/question")
);

// Company Route
app.use(
    "/api/company",
    require("./routes/company")
);

// Auth Route
app.use(
    "/auth",
    require("./routes/auth")
);

// Apply Route
app.use(
    "/apply",
    require("./routes/apply")
);

// AI Interview Route
app.use(
    "/api/interview",
    require("./routes/interview")
    
);
app.use(
  "/api/evaluate",
  require("./routes/evaluate")
);


// Result Route
app.use(
    "/api/results",
    require("./routes/result")
);

// =======================
// 404 ROUTE
// =======================
app.use((req, res) => {

    res.status(404).json({
        message: "Route Not Found ❌"
    });

});

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT} 🚀`);

});