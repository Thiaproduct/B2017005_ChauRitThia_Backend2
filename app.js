const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route.js");
const ApiError = require("./app/api-error")
const ContactService = require("./app/services/contact.services.js");
const MongoDB = require("./app/utils/mongodb.util");
const router = require("./app/routes/contact.route.js")

const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

//handle 404 respose
app.use((req, res, next) => {
    return next(new ApiError(404, "Resourece not found"));
});

app.use((error, req, res, next) => {
    // Middleware xử lý lỗi tập trung.
    // Trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error"
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});


module.exports = app;