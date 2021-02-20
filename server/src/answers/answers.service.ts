/**
 * Data Model Interfaces
 */
 import { UserAnswer } from "./answer.interface";
 import { UserAnswers } from "./answers.interface";
 import { BackendAnswer } from "./answer.interface";
 import { BackendAnswers } from "./answers.interface";
 import { GroupMap } from "./answers.interface";
 import { TopAnswers } from "./answers.interface";
 //import * as WordProcessing from "./answers.service";

/**
 * In-Memory Store
 */
let user_answers: UserAnswers = {};
let backend_answers: BackendAnswers = {};
let current_round: Round = {question: "Init", active: false};
let unsorted_groups: GroupMap = {};
let answer_array: string[];

/**
 * Service Methods
 */
 export const findAll = async (): Promise<TopAnswers> => {
   //unsorted_groups = WordProcessing.returnGroups(answer_array);
   //let final_tally: TopAnswers = WordProcessing.topN(unsorted_groups,6);
   let final_tally: TopAnswers;
   return final_tally;
};

// export const findTopSix = async (): Promise<Answers> => {
//  return backend_answers;
// };


// export const create_user = async (newAnswer: UserAnswer): Promise<void> => {
//   if(current_round.active == true) {
//     const id = new Date().valueOf();
//     user_answers[id] = {
//       ...newAnswer,
//       id
//     };
//   }
// };

export const create = async (newAnswer: Answer): Promise<void> => {
  const id = new Date().valueOf();
  answers[id] = {
    ...newAnswer,
    id,
    children: []
  };
};
export const create_user_new = async (newAnswer: string): Promise<void> => {
  if(current_round.active == true) {
    answer_array.push(newAnswer)
  }

};

// export const create_backend = async (newAnswer: BackendAnswer): Promise<void> => {
//   if(current_round.active == true) {
//     const id = new Date().valueOf();
//     user_answers[id] = {
//       ...newAnswer,
//       id
//     };
//   }
// };

export const create_round = async (newRound: Round): Promise<void> => {
  answer_array.length = 0;
  current_round.question = newRound.question;
  current_round.active = true;
};

export const stop_round = async (newRound: Round): Promise<void> => {
  current_round.active = false;
};

export const checkIfActive = async (): Promise<boolean> => {
 return current_round.active;
};

export const join = async (parent: Answer, child: Answer): Promise<void> => {
  const newParent = await find(parent.id);
  const newChild = await find(child.id);
  // First check to make sure the parent doesn't contain the child
  if (!newParent.children.some(answer => answer.id === newChild.id)) {
    parent.children.push(newChild);
  }
}
