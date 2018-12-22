const alphabet = [];
for (let char = 65; char <= 90; char++) {
  alphabet.push(String.fromCharCode(char));
}

const getColName = (num, subfix = "") => {
  var quotient = Math.floor(num / 26);
  var remainder = num % 26;
  const temp = (remainder === 0 ? "Z" : alphabet[remainder - 1]) + subfix;

  console.log(subfix, temp);
  if (quotient > 0 && subfix !== "") {
    return getColName(quotient, temp);
  }
  return temp;
};

for (let i = 1; i < 30; i++) {
  console.log(getColName(i));
}
module.exports = getColName;
