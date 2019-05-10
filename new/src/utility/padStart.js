export default function padStart(targetLength, padString = " ", str) {
  targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
  if (str.length >= targetLength) {
    return str;
  } else {
    targetLength = targetLength - str.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + str;
  }
}
