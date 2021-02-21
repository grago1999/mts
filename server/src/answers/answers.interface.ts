import { BackendAnswer } from "./answer.interface";
import { UserAnswer } from "./answer.interface";

export interface UserAnswers {
  [key: number]: UserAnswer;
}

export interface BackendAnswers {
    [key: number]: BackendAnswer;
  }

export interface TopAnswers {
  name: string;
  count: number;
  strGroup: string[];
}
