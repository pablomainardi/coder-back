import { Router } from "express";
import { chatService } from "../dao/index.js";

const router = Router();

router.get("/chat", (req, res) => {
  res.render("chat");
});

// devuelve todos los productos
router.get("/", async (req, res) => {
  try {
    const chats = await chatService.getHistoryChat();
    res.json({ status: "success", data: chats });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export { router as chatsRouter };
