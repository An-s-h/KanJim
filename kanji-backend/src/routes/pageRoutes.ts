import  {Router}  from "express";
// import { registeration,login} from "../controllers/authController";
import { getKanjis } from "../controllers/kanjiController";
import { syncUser } from "../controllers/userController";
import { getQuiz } from "../controllers/quizController";
const router = Router();

router.post("/sync", syncUser);
router.get("/kanji/:level", getKanjis);
router.get("/quiz/:level/:type", getQuiz);

export default router;
  