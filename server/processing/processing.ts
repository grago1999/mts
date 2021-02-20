export function returnGroups(input : string[]) : {[name : string] : number} {
  var out : {[name : string] : number} = {};
  for (let str of input) {
    if (typeof(out[str]) === 'undefined') {
      out[str] = 1;
    } else {
      out[str] = out[str] + 1;
    }
  }
  return out;
}
