import { Router } from "express";

import {
  createTodo,
  getTodos,
  updateToDo,
  deleteTodo,
} from "../controllers/todos";

const router = Router();

router.post("/", createTodo);

router.get("/", getTodos);

router.patch("/:id", updateToDo);

router.delete("/:id", deleteTodo);

export default router;
