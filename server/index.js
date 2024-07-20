const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConfig");
dotenv.config({ path: "./config/config.env" });
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const productRouter = require("./routes/product");

const app = express();
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/auth", authRouter);
app.use('/cart', cartRouter);
app.use("/product", productRouter);

const PORT = process.env.PORT || 8080;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
