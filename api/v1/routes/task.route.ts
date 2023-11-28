import Task from "../../../models/task.model";
import { Request, Response, Router } from "express";

const router:Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false,
  });
  res.json(tasks);
});
router.get("/detail/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });
    res.json(task);
  } catch (error) {
    res.json({
      code: 404,
      message: "Lỗi",
    });
  }
});

export const taskRoutes:Router = router;
