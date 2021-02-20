/**
 * Data Model Interfaces
 */
 import { UserAnswer } from "./answer.interface";
 import { UserAnswers } from "./answers.interface";
 import { BackendAnswer } from "./answer.interface";
 import { BackendAnswers } from "./answers.interface";

/**
 * In-Memory Store
 */
let user_answers: UserAnswers = {};
let backend_answers: BackendAnswers = {};
let current_round: Round = {question: "Init", active: false};

let
/**
 * Service Methods
 */
 export const findAll = async (): Promise<Answers> => {
  return user_answers;
};

export const findTopSix = async (): Promise<Answers> => {
 return backend_answers;
};


export const create_user = async (newAnswer: UserAnswer): Promise<void> => {
  if(current_round.active == true) {
    const id = new Date().valueOf();
    user_answers[id] = {
      ...newAnswer,
      id
    };
  }
};

export const create_backend = async (newAnswer: BackendAnswer): Promise<void> => {
  if(current_round.active == true) {
    const id = new Date().valueOf();
    user_answers[id] = {
      ...newAnswer,
      id
    };
  }
};

export const create_round = async (newRound: Round): Promise<void> => {
  current_round.question = newRound.question;
  current_round.active = true;
};

export const stop_round = async (newRound: Round): Promise<void> => {
  current_round.active = false;
};

export const checkIfActive = async (): Promise<boolean> => {
 return current_round.active;
};
