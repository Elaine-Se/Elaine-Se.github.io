s = "abac";

if (s.length == 0)
  return false;
const getNext = (s) => {
  let next = [];
  next[0] = -1;
  let front = -1;
  for (let back = 1; back < s.length; back++) {
    while (front >= 0 && s[back] != s[front + 1])
      front = next[front];
    if (s[back] == s[front + 1])
      front++;
    next[back] = front;
  }
  return next;
}

const next = getNext(s);
let c = next[s.length - 1] + 1;
let q = s.length - 1;
if (c != 0 && s.length % (q - c) == 0)
  return true;
return false;