/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import * as AnswerService from "./answers.service";
 import { UserAnswer } from "./answer.interface";
 import { UserAnswers } from "./answers.interface";
 import { BackendAnswer } from "./answer.interface";
 import { BackendAnswers } from "./answers.interface";
 import { TopAnswers } from "./answers.interface";
 import { Round } from "./answer.interface";
 import { Basic_Ans } from "./answer.interface";

/**
 * Router Definition
 */
export const answersRouter = express.Router();

/**
 * Controller Definitions
 */

//Get all user answers, to be used in processing
 answersRouter.get("/allanswers", async (req: Request, res: Response) => {
  try {
    const final_results: TopAnswers[] = await AnswerService.findAll();
    res.status(200).send(final_results);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//Submit the user answer
answersRouter.post("/submitAnswerNew", async (req: Request, res: Response) => {
  try {
    let user_answer_new: Basic_Ans = req.body.basic_ans;
    await AnswerService.create_user_new(user_answer_new);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//Start new round
answersRouter.post("/start", async (req: Request, res: Response) => {
  try {
    const round: Round = req.body.round;
    await AnswerService.create_round(round);

    res.status(200).send(round.question);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//Stop accepting answers and collect final results
answersRouter.get("/stop", async (req: Request, res: Response) => {
  try {
    await AnswerService.stop_round();
    const final_results: TopAnswers[] = await AnswerService.findAll();
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//Front end check status
answersRouter.get("/checkactive", async (req: Request, res: Response) => {
 try {
   const game_status: boolean = await AnswerService.checkIfActive();
   const question = await AnswerService.getQuestion();

   res.status(200).send({ game_status, question });
 } catch (e) {
   res.status(404).send(e.message);
 }
});
