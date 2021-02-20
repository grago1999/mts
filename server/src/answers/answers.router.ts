/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import * as ItemService from "./items.service";
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
    const answers: Answers = await ItemService.findAll();

    res.status(200).send(answers);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// GET items/:id
//Get all groups

answersRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const answer: Answer = await ItemService.find(id);

    res.status(200).send(item);
  } catch (e) {
    res.status(404).send(e.message);
  }
});


// POST items/
//SUBMIT THE USER ANSWER

answersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const answer: Answer = req.body.item;

    await ItemService.create(answer);

    res.sendStatus(201);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// PUT items/
//Start new round

answersRouter.put("/", async (req: Request, res: Response) => {
  try {
    const answer: Answer = req.body.item;

    await ItemService.update(answer);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

answersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);

    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
