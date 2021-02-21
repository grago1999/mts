export interface Round {
  question: string;
  active: boolean;
}

export interface Basic_Ans {
  answer: string;
}

export interface Groups {
  [name : string] : {
    bestScore: number,
    strGroup: string[]
  }
} 
