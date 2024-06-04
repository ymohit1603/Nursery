"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/signup", (req, res) => {
    res.send("Signup Page for Nursery");
});
router.get("/signin", (req, res) => {
    res.send("Signin Page for Nursery");
});
exports.default = router;
