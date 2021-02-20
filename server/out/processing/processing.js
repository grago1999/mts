"use strict";
var natural = require('natural');
function isAcronym(word) {
    // TODO: actually do the check
    return false;
}
function fitToGroups(word, groups) {
    // TODO: actually "fit" this into existing groups
    return word;
}
const getLetterMap = (str) => {
    const letters = new Map();
    for (let i = 0; i < str.length; i++) {
        const letter = str.charAt(i);
        if (letters.has(letter)) {
            letters.set(letter, letters.get(letter) + 1);
        }
        else {
            letters.set(letter, 1);
        }
    }
    return letters;
};
function isSimilar(first, second, sharedLetterThreshold = 0.8, letterCountThreshold = 0.75) {
    if (first.length < 5) {
        sharedLetterThreshold *= 0.6;
    }
    const firstLetterMap = getLetterMap(first);
    const secondLetterMap = getLetterMap(second);
    const firstLetters = Array.from(firstLetterMap.keys());
    const secondLetters = Array.from(secondLetterMap.keys());
    const setOfLetters = new Set([...firstLetters, ...secondLetters]);
    let sharedLetters = 0;
    let diffLetters = 0;
    let shareLetterCountIsSame = 0;
    let shareLetterCountIsDiff = 0;
    setOfLetters.forEach(letter => {
        if (firstLetterMap.has(letter) && secondLetterMap.has(letter)) {
            sharedLetters += 1;
            if (firstLetterMap.get(letter) === secondLetterMap.get(letter)) {
                shareLetterCountIsSame += 1;
            }
            else {
                shareLetterCountIsDiff += 1;
            }
        }
        else {
            diffLetters += 1;
        }
    });
    const sharedLetterPercentage = sharedLetters / (sharedLetters + diffLetters);
    const letterCountPercentage = shareLetterCountIsSame / (shareLetterCountIsSame + shareLetterCountIsDiff);
    return sharedLetterPercentage >= sharedLetterThreshold && letterCountPercentage >= letterCountThreshold;
}
// big function that takes in all the input and slots them into groups
// export function returnGroups(input : string[]) : {[name : string] : number} {
//   var out : {[name : string] : number} = {};
//   var stringGroups : string[][] = [];
//   var tokenizer = new natural.WordTokenizer();
//   for (let str of input) {
//     str = str.toLowerCase();
//     // we don't want to completely ignore whitespace, but we want the
//     // whitespace to be consistent, so we split the string and then rejoin it
//     str = tokenizer.tokenize(str).join(" ");
//     if (typeof(out[str]) === 'undefined') {
//       out[str] = 1;
//       // note that this is a little arbitrary/greedy in terms of grouping words
//       // together
//       var strGroup : string[] = [];
//       var found = false;
//       for (let group in stringGroups) {
//         for (let word in group) {
//           if (isSimilar(str, word)) {
//             found = true;
//             strGroup = group;
//             break;
//           }
//         }
//         if (found) {
//           break;
//         }
//       }
//       strGroup.push(str);
//       if (!found) {
//         stringGroups.push(strGroup);
//       }
//     } else {
//       out[str] = out[str] + 1;
//     }
//   }
//   var realOut : {[name : string] : number} = {};
//   for (let strGroup in stringGroups) {
//     var bestStr = "";
//     var bestScore = 0;
//     var total = 0;
//     for (let str in strGroup) {
//       total = out[str] + total;
//       if (out[str] > bestScore) {
//         bestScore = out[str];
//         bestStr = str;
//       }
//     }
//     realOut[bestStr] = total;
//   }
//   return realOut;
// }
console.log(isSimilar("csgo", "csgi") === true ? "success" : "fail");
console.log(isSimilar("csgo", "cshd") === false ? "success" : "fail");
console.log(isSimilar("faang", "fang") === true ? "success" : "fail");
console.log(isSimilar("faang", "fanng") === false ? "success" : "fail");
