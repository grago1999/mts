export interface UserAnswer {
  id: number;
  name: string;
}

export interface BackendAnswer {
  id: number;
  name: string;
  score: number;
  rank: number;
}

export interface Round {
  question: string;
  active: boolean;
}

export interface Basic_Ans {
  answer: string;
}
