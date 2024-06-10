import { isAuthenticated } from "../../middleware/auth";
import router from "./signin";

router.post("/logout",isAuthenticated, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "cookie cleared" });
})