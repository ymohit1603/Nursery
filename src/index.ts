import express from "express";
import userRouter from "./routes/userRoutes/signin";
import nurseryRouter from "./routes/nurseryRoutes/nursery";
import blogRouter from "./routes/blogPost/plantBlog";

const app = express();

app.use("/user", userRouter);
app.use("/nursery", nurseryRouter);
app.use("/blog", blogRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
