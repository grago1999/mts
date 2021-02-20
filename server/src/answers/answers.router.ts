/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import * as AnswerService from "./answers.service";
 import { Answer } from "./answer.interface";
 import { Answers } from "./answers.interface";

/**
 * Router Definition
 */
export const answersRouter = express.Router();

/**
 * Controller Definitions
 */

 //Get the top answers
 answersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const answers: Answers = await AnswerService.findAll();

    res.status(200).send(answers);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//Get all groups
answersRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const answer: Answer = await AnswerService.find(id);

    res.status(200).send(item);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//SUBMIT THE USER ANSWER
answersRouter.post("/submitAnswer", async (req: Request, res: Response) => {
  try {
    const answer: Answer = req.body.item;

    await AnswerService.create(answer);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

//Start new round
answersRouter.post("/start", async (req: Request, res: Response) => {
  try {
    const answer: Answer = req.body.item;

    await AnswerService.update(answer);

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
