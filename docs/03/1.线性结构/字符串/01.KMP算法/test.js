// 直接求next数组，未统一减一
let haystack =  "ccabcabfg";
let needle = "abf";
if (needle.length == 0)
  return 0;
const getNext = (needle) => {
  let next = [];
  let front = 0;
  next[0] = 0;
  for (let back = 1; back < needle.length; back++) {
    while (front > 0 && needle[front] != needle[back])
      front = next[front - 1];
    if (needle[front] == needle[back])
      front++;
    next[back] = front;
  }
  return next;
}
const next = getNext(needle);
let j = 0
for (let i = 0; i < haystack.length; i++) {
  while (j > 0 && haystack[i] !== needle[j]) {
    j = next[j - 1];
  }
  if (haystack[i] === needle[j])
    j++;
  if (j === needle.length)
    return (i - needle.length + 1);
}