import express from "express";
import userRouter from "./routes/userRoutes/index";
import nurseryRouter from "./routes/nurseryRoutes/nursery";
import blogRouter from "./routes/blogPost/plantBlog";
import buyMedicines from "./routes/Medicines/med";
import bookAppointment from "./routes/bookApointment/appointment";
import getPlants from "./routes/buyPlants/allPlants";
import formContact from "./routes/contact";
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/nursery", nurseryRouter);
app.use("/blog", blogRouter);
app.use("/medicines", buyMedicines);
app.use("/appointment", bookAppointment);
app.use("/getPlants", getPlants);
app.use("/contact", formContact);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
