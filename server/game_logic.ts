interface Group_Score {
  name: string;
  points: number;
}

function getFromLP(): Group_Score[] {
  //Get what is sent from the language processor
  let input: string[];
  let results: Group_Score[];
  let i: number = 0;
  let j: number = 0;
  for(i = 0; i < input.length; i++) {
    let in: number = results.findIndex((group: Group_Score) => group.name === input[i];
    if (in == -1) {
      let newAnswer: Group_Score;
      newAnswer.name = input[i];
      newAnswer.points = 1;
      results.push(newAnswer);
    }
    else {
      results[in].points++;
    }
  }
  return results;
}

function topAnswers(results: Group_Score[]) {
  
}
