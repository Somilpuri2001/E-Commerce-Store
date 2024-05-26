const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

const connectToDatabase = require("./config/database");
const authRoutes = require("./routes/authRoute");
const categoryRouter = require("./routes/categoryRoutes")
const productRouter = require("./routes/productRoutes")
const bannerRouter = require("./routes/bannerRoutes")

//dotenv configuration
dotenv.config();

//connect database
connectToDatabase();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/banner",bannerRouter)


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
