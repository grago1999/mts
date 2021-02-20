/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import * as AnswerService from "./answers.service";
 import { UserAnswer } from "./answer.interface";
 import { UserAnswers } from "./answers.interface";
 import { BackendAnswer } from "./answer.interface";
 import { BackendAnswers } from "./answers.interface";
 import { GroupMap } from "./answers.interface";

/**
 * Router Definition
 */
export const answersRouter = express.Router();

/**
 * Controller Definitions
 */

//Get all user answers, to be used in processing
 itemsRouter.get("/allanswers", async (req: Request, res: Response) => {
  try {
    const user_input: Items = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//Get all top answers
// answersRouter.get("/topsix", async (req: Request, res: Response) => {
//     try {
//     let topSix: BackendAnswers = await AnswerService.findTopSix();
//
//     res.status(200).send(topSix);
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
// });

//SUBMIT THE USER ANSWER
// answersRouter.post("/submitAnswer", async (req: Request, res: Response) => {
//   try {
//     const user_answer: UserAnswer = req.body.user_answer;
//     await AnswerService.create_user(user_answer);
//
//     res.sendStatus(201);
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
// });

//SUBMIT THE USER ANSWER 2
answersRouter.post("/submitAnswerNew", async (req: Request, res: Response) => {
  try {
    let user_answer_new: string = req.body.string;
    await AnswerService.create_user_new(user_answer_new);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//SUBMIT THE BACKEND ANSWER
// answersRouter.post("/submitTopAnswer", async (req: Request, res: Response) => {
//   try {
//     const backend_answer: BackendAnswer = req.body.backend_answer;
//
//     await AnswerService.create_backend(backend_answer);
//
//     res.sendStatus(201);
//   } catch (e) {
//     res.status(404).send(e.message);
//   }
// });

//Start new round
answersRouter.post("/start", async (req: Request, res: Response) => {
  try {
    user_answers.clear();
    backend_answers.clear();
    const round: Round = req.body.round;
    await AnswerService.create_round(round);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//Stop accepting answers
answersRouter.get("/stop", async (req: Request, res: Response) => {
  try {
    await AnswerService.stop_round(round);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


answersRouter.post('/join', async(req: Request, res: Response) => {
  try {
    const parent: Answer = req.body.parentAnswer;
    const child: Answer = req.body.childAnswer;
    await AnswerService.join(parent,child);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//Front end check status
itemsRouter.get("/checkactive", async (req: Request, res: Response) => {
 try {
   const game_status: boolean = await ItemService.checkIfActive();

   res.status(200).send(items);
 } catch (e) {
   res.status(404).send(e.message);
 }

});
