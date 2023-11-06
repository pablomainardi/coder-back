import { Router } from "express";
import { chatService, userService } from "../dao/index.js";

const router = Router();

router.get("/chat", async (req, res) => {
  if (req.session.userMail) {
    const userMail = req.session.userMail;
    const user = await userService.getUserByMail(userMail);
    res.render("chat", { user });
  } else {
    res.render("login");
  }
});

// devuelve todos los productos
router.get("/api/chat", async (req, res) => {
  try {
    const chats = await chatService.getHistoryChat();
    res.json({ status: "success", data: chats });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export { router as chatsRouter };
