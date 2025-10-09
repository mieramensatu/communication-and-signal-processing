function getNameSignature(fullName) {
  if (!fullName || typeof fullName !== "string") return [];
  const cleaned = fullName
    .replace(/(Prof\.?|Dr\.?|Dipl\.Ing\.?|DEA|M\.?Eng|M\.?Si|MT|Ph\.?D|Eng|ST|Ir\.?|Hj\.?|H\.?|M\.?Sc|B\.?Eng|on leave.*|\(.*\))/gi, "")
    .replace(/[^\w\s]/g, " ")
    .trim()
    .replace(/\s+/g, " ");
  const parts = cleaned.split(" ").filter(Boolean);
  if (parts.length === 0) return [];
  if (parts.length === 1) return [parts[0].toLowerCase()];
  return [parts[0].toLowerCase(), parts[parts.length - 1].toLowerCase()];
}

export function isSamePerson(name1, name2) {
  const sig1 = getNameSignature(name1);
  const sig2 = getNameSignature(name2);
  if (sig1.length === 0 || sig2.length === 0) return false;
  if (sig1.length === 1 || sig2.length === 1) {
    return sig1[0] === sig2[0];
  }
  return sig1[0] === sig2[0] && sig1[1] === sig2[1];
}