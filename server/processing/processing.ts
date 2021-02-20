var natural = require('natural');

function isAcronym(word : string) : boolean {
  // TODO: actually do the check
  return false;
}

function fitToGroups(word : string, groups : {[name : string] : number}) {
  // TODO: actually "fit" this into existing groups
  return word;
}

function isSimilar(first : string, second : string) : boolean {
  return false;
}


// big function that takes in all the input and slots them into groups
export function returnGroups(input : string[]) : {[name : string] : number} {
  var out : {[name : string] : number} = {};
  var stringGroups : string[][] = [];
  var tokenizer = new natural.WordTokenizer();
  for (let str of input) {
    str = str.toLowerCase();
    // we don't want to completely ignore whitespace, but we want the
    // whitespace to be consistent, so we split the string and then rejoin it
    str = tokenizer.tokenize(str).join(" ");
    if (typeof(out[str]) === 'undefined') {
      out[str] = 1;
      // note that this is a little arbitrary/greedy in terms of grouping words
      // together
      var strGroup : string[] = [];
      var found = false;
      for (let group in stringGroups) {
        for (let word in group) {
          if (isSimilar(str, word)) {
            found = true;
            strGroup = group;
            break;
          }
        }
        if (found) {
          break;
        }
      }
      strGroup.push(str);
      if (!found) {
        stringGroups.push(strGroup);
      }
    } else {
      out[str] = out[str] + 1;
    }
  }
  var realOut : {[name : string] : number} = {};
  for (let strGroup in stringGroups) {
    var bestStr = "";
    var bestScore = 0;
    var total = 0;
    for (let str in strGroup) {
      total = out[str] + total;
      if (out[str] > bestScore) {
        bestScore = out[str];
        bestStr = str;
      }
    }
    realOut[bestStr] = total;
  }

  return realOut;
}
