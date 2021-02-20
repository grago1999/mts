/**
 * Data Model Interfaces
 */
 import { Answer } from "./answer.interface";
 import { Answers } from "./answers.interface";

/**
 * In-Memory Store
 */
const answers: Answers = {
  1: {
    id: 1,
    name: "cactus",
    score: 999,
    rank: 1
   }
};
/**
 * Service Methods
 */
 export const findAll = async (): Promise<Answers> => {
  return answers;
};

export const find = async (id: number): Promise<Answer> => {
  const record: Answer = answers[id];

  if (record) {
    return record;
  }

  throw new Error("No record found");
};

export const create = async (newAnswer: Answer): Promise<void> => {
  const id = new Date().valueOf();
  answers[id] = {
    ...newAnswer,
    id,
    children: []
  };
};

export const update = async (updatedAnswer: Answer): Promise<void> => {
  if (answers[updatedAnswer.id]) {
    answers[updatedAnswer.id] = updatedAnswer;
    return;
  }

  throw new Error("No record found to update");
};

export const remove = async (id: number): Promise<void> => {
  const record: Answer = answers[id];

  if (record) {
    delete answers[id];
    return;
  }

  throw new Error("No record found to delete");
};

export const join = async (from: Answer, to: Answer): Promise<void> => {
  const parent = await find(to.id);
  const child = await find(from.id);
  // First check to make sure the parent doesn't contain the child
  if (!parent.children.some(answer => answer.id === child.id)) {
    parent.children.push(child);
  }
}
