const strArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "G", 'K', 'L', 'M', 'N', 'O', 'P', 'Q','R','S','T', 'U', 'V', 'W', 'X', 'Y', 'Z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-']
const random = function(n) {
  let str = '';
  for (let i = 0; i < n; i++) {
    let index = Math.floor(Math.random() * 63);
    str += strArr[index]
  }
  return str
}
export {
  random
}