# Week 1: Word Counter Plus

## Goal
Build a command-line word counting tool that processes text files and generates detailed reports.

## Core Requirements
- Read a text file from command line argument
- Count total words, unique words, and find most frequent word
- Handle basic text cleanup (punctuation, case-insensitive)
- Output results as formatted JSON file
- Include basic error handling for missing files

## Usage
```bash
node solution/word-counter.js sample-data/sample.txt
```

## Expected Output
Creates `word-report.json` with structure:
```json
{
  "filename": "sample.txt",
  "totalWords": 150,
  "uniqueWords": 89,
  "mostFrequentWord": {
    "word": "the",
    "count": 12
  },
  "processedAt": "2025-01-15T10:30:00Z"
}
```

## Text Processing Rules
1. Convert all text to lowercase before processing
2. Remove punctuation (keep only letters, numbers, spaces, hyphens)
3. Split on whitespace to identify words
4. Treat hyphenated words as single words
5. Ignore empty strings

## Error Handling
- Handle missing file arguments
- Handle non-existent files
- Handle empty files
- Handle files that can't be read (permissions, etc.)

## Testing
Run the test suite with:
```bash
npm test -- --grep "Word Counter"
```

## Time Limit
2-3 hours maximum

## Resources
- Node.js File System documentation: `node --help` or built-in REPL
- No external libraries allowed - use only Node.js built-ins