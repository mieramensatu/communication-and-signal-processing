function cleanName(fullName) {
  if (!fullName || typeof fullName !== "string") return "";
  return fullName
    .replace(
      /(Prof\.?|Dr\.?|Dipl\.Ing\.?|DEA|M\.?Eng|M\.?Si|MT|Ph\.?D|Eng|ST|Ir\.?|Hj\.?|H\.?|M\.?Sc|B\.?Eng|on leave.*|\(.*\))/gi,
      ""
    )
    .replace(/[^\w\s]/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function tokenize(name) {
  return cleanName(name).split(" ").filter(Boolean);
}

export function isSamePerson(name1, name2) {
  const t1 = tokenize(name1);
  const t2 = tokenize(name2);

  if (t1.length === 0 || t2.length === 0) return false;

  if (t1.length === 1 || t2.length === 1) {
    return (
      t1.some((token) => t2.includes(token)) ||
      t2.some((token) => t1.includes(token))
    );
  }

  let matchCount = 0;

  for (const token1 of t1) {
    for (const token2 of t2) {
      if (
        token1 === token2 ||
        (token1.length === 1 && token2.startsWith(token1)) ||
        (token2.length === 1 && token1.startsWith(token2))
      ) {
        matchCount++;
        break;
      }
    }
  }

  const minTokens = Math.min(t1.length, t2.length);
  return matchCount >= Math.min(2, minTokens);
}
