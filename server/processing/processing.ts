var natural = require('natural');


const getLetterMap = (str: string): Map<string, string> => {
  const letters = new Map()
  for (let i = 0; i < str.length; i++) {
    const letter = str.charAt(i)
    if (letters.has(letter)) {
      letters.set(letter, letters.get(letter) + 1)
    } else {
      letters.set(letter, 1)
    }
  }

  return letters
}

function isSimilar(first : string, second : string, sharedLetterThreshold : number = 0.8, letterCountThreshold : number = 0.75) : boolean {
  if (first.length < 5) {
    sharedLetterThreshold *= 0.6
  }
  const firstLetterMap = getLetterMap(first)
  const secondLetterMap = getLetterMap(second)

  const firstLetters = Array.from(firstLetterMap.keys())
  const secondLetters = Array.from(secondLetterMap.keys())

  const setOfLetters = new Set([...firstLetters, ...secondLetters])

  let sharedLetters = 0
  let diffLetters = 0
  let shareLetterCountIsSame = 0
  let shareLetterCountIsDiff = 0
  setOfLetters.forEach(letter => {
    if (firstLetterMap.has(letter) && secondLetterMap.has(letter)) {
      sharedLetters += 1
      if (firstLetterMap.get(letter) === secondLetterMap.get(letter)) {
        shareLetterCountIsSame += 1
      } else{
        shareLetterCountIsDiff += 1
      }
    } else {
      diffLetters += 1
    }
  })

  const sharedLetterPercentage = sharedLetters / (sharedLetters + diffLetters)
  const letterCountPercentage = shareLetterCountIsSame / (shareLetterCountIsSame + shareLetterCountIsDiff)

  return sharedLetterPercentage >= sharedLetterThreshold && letterCountPercentage >= letterCountThreshold
}

// function that gets the top n answers from the returnGroups function
//HAS ERROR
// export function topN(groups : {[name : string] : number}, n : number) : {name : string, count: number}[] {
//   var props = Object.keys(groups).map(function(name) {
//     return {name : name, count : this[key]};
//   }, groups);
//   props.sort(function(w1, w2) { return w1.count - w2.count;});
//   return props.slice(0, n);
// }

// big function that takes in all the input and slots them into groups
export function returnGroups(input : string[]) : {[name : string] : number} {
  var out : {[name : string] : number} = {};
  var stringGroups : string[][] = [];
  var tokenizer = new natural.WordTokenizer();
  // iterate through strings
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
      for (var i = 0; i < stringGroups.length; i++) {
        var group = stringGroups[i];
        for (let word in group) {
          // Check if this is similar to existing words already, and slot them
          // into group if need be
          if (isSimilar(str, word)) {
            // This is just a way to exit both for loops
            found = true;
            strGroup = group;
            break;
          }
        }
        if (found) {
          break;
        }
      }
      // Add this string to the group (whether found or new)
      strGroup.push(str);
      if (!found) {
        // if we have not found an existing group for this, then just add the
        // new group for it
        stringGroups.push(strGroup);
      }
    } else {
      // This already exists, so we just increment its count
      out[str] = out[str] + 1;
    }
  }
  // Now we combine the groups we have such that the answer in the group with
  // the greatest count gets priority
  var realOut : {[name : string] : number} = {};
  for (var i = 0; i < stringGroups.length; i++) {
    var strGroup = stringGroups[i];
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

// console.log(isSimilar("csgo", "csgi") === true ? "success" : "fail")
// console.log(isSimilar("csgo", "cshd") === false ? "success" : "fail")
// console.log(isSimilar("faang", "fang") === true ? "success" : "fail")
// console.log(isSimilar("faang", "fanng") === false ? "success" : "fail")
