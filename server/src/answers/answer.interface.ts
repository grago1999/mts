export interface UserAnswer {
  id: number;
  name: string;
}

export interface BackendAnswer {
  id: number;
  name: string;
  score: number;
  rank: number;
  children: Answer[];
}

export interface Round {
  question: string;
  active: boolean;
}
