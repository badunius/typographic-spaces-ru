const defaultFixAfter = [
  "а",
  "абы",
  "аж",
  "без",
  "безо",
  "в",
  "вне",
  "во",
  "где",
  "для",
  "до",
  "за",
  "зато",
  "и",
  "из",
  "из-за",
  "из-под",
  "из-подо",
  "изо",
  "или",
  "к",
  "как",
  "ко",
  "либо",
  "меж",
  "на",
  "над",
  "надо",
  "не",
  "ни",
  "но",
  "о",
  "об",
  "обо",
  "от",
  "ото",
  "по",
  "под",
  "при",
  "про",
  "с",
  "со",
  "то",
  "у",
  "хоть",
  "хотя",
  "чем",
  "что",
  "чтоб",
  "чтобы",
];

const defaultFixBefore = ["б", "бы", "ж", "же", "ли", "ль"];

export const fixSpaces = (options = {}) => {
  const {
    root = document.body,
    fixAfter = defaultFixAfter,
    fixBefore = defaultFixBefore,
  } = options;

  const after = new RegExp(
    `(?<!\\p{L}\\p{M}*|[\\p{N}_])(${fixAfter.join("|")})(\\s)`,
    "gmui"
  );

  const before = new RegExp(
    `(\\s)(${fixBefore.join("|")})(?![\\p{L}\\p{N}_])`,
    "gmui"
  );

  const getTextNodesIterator = (el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    walker[Symbol.iterator] = () => ({
      next() {
        const value = walker.nextNode();
        return { value, done: !value };
      },
    });
    return walker;
  };

  console.log({ before, after });

  for (const textNode of getTextNodesIterator(root)) {
    textNode.textContent = textNode.textContent.replace(after, "$1\xa0");
    textNode.textContent = textNode.textContent.replace(before, "\xa0$2");
  }
};

(() => document.addEventListener("DOMContentLoaded", fixSpaces))();
