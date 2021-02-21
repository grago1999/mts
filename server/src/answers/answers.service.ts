/**
 * Data Model Interfaces
 */
 import { Groups, UserAnswer } from "./answer.interface";
 import { UserAnswers } from "./answers.interface";
 import { BackendAnswer } from "./answer.interface";
 import { BackendAnswers } from "./answers.interface";
 import { TopAnswers } from "./answers.interface";
 import { Round } from "./answer.interface";
 import { Basic_Ans } from "./answer.interface";
 import * as WordProcessing from "../../processing/processing";

/**
 * In-Memory Store
 */

let user_answers: UserAnswers = {};
let backend_answers: BackendAnswers = {};
let current_round: Round = {question: "", active: false};
let unsorted_groups: Groups = {};
let answer_array: string[] = [];

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

export const getQuestion = async (): Promise<string> => {
  return current_round.question;
 };

// export const join = async (parent: Answer, child: Answer): Promise<void> => {
//   const newParent = await find(parent.id);
//   const newChild = await find(child.id);
//   // First check to make sure the parent doesn't contain the child
//   if (!newParent.children.some(answer => answer.id === newChild.id)) {
//     parent.children.push(newChild);
//   }
// }
