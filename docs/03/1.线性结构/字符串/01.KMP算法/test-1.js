// next数组统一减一
let haystack =  "ccabcabfg";
let needle = "abf";
if (needle.length == 0)
  return 0;
const getNext = (needle) => {
  let next = [];
  let front = -1;
  next[0] = -1;
  for (let back = 1; back < needle.length; back++) {
    while (front >= 0 && needle[front + 1] != needle[back])
      front = next[front];
    if (needle[front + 1] == needle[back])
      front++;
    next[back] = front;
  }
  return next;
}
const next = getNext(needle);
let j = -1;
for (let i = 0; i < haystack.length; i++) {
  while (j >= 0 && haystack[i] !== needle[j + 1]) {
    j = next[j];
  }
  if (haystack[i] === needle[j + 1])
    j++;
  if (j === needle.length - 1)
    return (i - needle.length + 1);
}