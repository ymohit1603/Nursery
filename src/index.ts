import express from "express";
import userRouter from "./routes/user";
import nurseryRouter from "./routes/nursery";

const app = express();

app.use("/user", userRouter);
app.use("/nursery", nurseryRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
