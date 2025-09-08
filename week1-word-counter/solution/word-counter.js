import { readFile, writeFile } from "fs/promises";
import { exit } from "process";

// Get command line arguments
const filename = process.argv[2];

// Your implementation here
let fileContents;
try {
  fileContents = await readFile(filename, "utf8");
} catch (err) {
  console.error(`Error: Reading file >> ${err.message}`);
  exit(1);
}

const words = fileContents
  .trim()
  .toLowerCase()
  .match(/[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*/g);

let totalWords = 0;
let totalUniqueWords = 0;
const wordMap = new Map();
let mostFrequentWord = null;

if (words) {
  totalWords = words.length;

  for (const word of words) {
    if (!wordMap.has(word)) {
      wordMap.set(word, 1);
      continue;
    }
    wordMap.set(word, wordMap.get(word) + 1);
  }
  totalUniqueWords = wordMap.size;

  mostFrequentWord = {};
  let maxCounter = 0;
  for (const [key, value] of wordMap) {
    if (value >= maxCounter) {
      maxCounter = value;
      mostFrequentWord.word = key;
      mostFrequentWord.count = value;
    }
  }
}

const wordReport = {};
wordReport.filename = filename.toString();
wordReport.totalWords = totalWords;
wordReport.uniqueWords = totalUniqueWords;
wordReport.mostFrequentWord = mostFrequentWord;
wordReport.processedAt = new Date();

try {
  await writeFile("word-report.json", JSON.stringify(wordReport));
} catch (err) {
  console.error(`Error: Writing file >> ${err.message}`);
  exit(1);
}
