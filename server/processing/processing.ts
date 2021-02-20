var natural = require('natural');

function isAcronym(word : string) : boolean {
  // TODO: actually do the check
  return false;
}

function fitToGroups(word : string, groups : {[name : string] : number}) {
  // TODO: actually "fit" this into existing groups
  return word;
}

// big function that takes in all the input and slots them into groups
export function returnGroups(input : string[]) : {[name : string] : number} {
  var out : {[name : string] : number} = {};
  var tokenizer = new natural.WordTokenizer();
  for (let str of input) {
    str = str.toLowerCase();
    // we don't want to completely ignore whitespace, but we want the
    // whitespace to be consistent, so we split the string and then rejoin it
    str = tokenizer.tokenize(str).join(" ")
    if (typeof(out[str]) === 'undefined') {
      if (isAcronym(str)) {
        out[str] = 1;
      } else {
        // Technically this is the greedy solution where we build groups as we go along
        // but going to have this temporarily here
        group = fitToGroups(str, out);
        if (group === str) {
          out[str] = 1;
        } else {
          out[str] = out[str] + 1;
        }
      }
    } else {
      out[str] = out[str] + 1;
    }
  }
  // before we return in final solution, we will "merge" existing groups if they
  // are similar enough and then throw away outliers based on a threshold
  return out;
}
