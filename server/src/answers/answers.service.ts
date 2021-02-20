/**
 * Data Model Interfaces
 */
 import { GroupMap } from "./answers.interface";
 import { TopAnswers } from "./answers.interface";
 import { Round } from "./answer.interface";
 import { Basic_Ans } from "./answer.interface";
 import * as WordProcessing from "../../processing/processing";

/**
 * In-Memory Store
 */
let current_round: Round = {question: "Init", active: false};
let unsorted_groups: GroupMap = {};
let answer_array: string[] = ["cactus", "checling"];

/**
 * Service Methods
 */

 export const findAll = async (): Promise<TopAnswers[]> => {
   unsorted_groups = WordProcessing.returnGroups(answer_array);
   let final_tally: TopAnswers[] = WordProcessing.topN(unsorted_groups,6);
   //let final_tally: TopAnswers = {name: "string", count:2};
   return final_tally;
};

export const create_user_new = async (newAnswer: Basic_Ans): Promise<void> => {
  if(current_round.active == true) {
    answer_array.push(newAnswer.answer)
  }

};

export const create_round = async (newRound: Round): Promise<void> => {
  answer_array.length = 0;
  current_round.question = newRound.question;
  current_round.active = true;
};

export const stop_round = async (): Promise<void> => {
  current_round.active = false;
};

export const checkIfActive = async (): Promise<boolean> => {
 return current_round.active;
};
