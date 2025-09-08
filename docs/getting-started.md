# Getting Started Guide

## 🚀 First Time Setup

### Prerequisites
- **Node.js** 16+ installed
- Basic familiarity with command line
- Text editor of choice

### Installation
```bash
cd js-challenges
npm install
```

### Verify Setup
```bash
# Check Node.js version
node --version

# Run test to ensure everything works
npm test

# Should show tests for all three challenges (they'll fail until you write solutions)
```

## 🎯 Choosing Your First Challenge

### For Beginners
Start with **Week 1: Word Counter** if you're new to file operations

### For Intermediate Developers  
Jump to **Week 2: Config Manager** for JSON and argument parsing practice

### For Advanced Developers
Try **Week 3: Log Analyzer** for complex text processing and time handling

## 📋 Challenge Workflow

### Step 1: Read the Challenge
```bash
cd week1-word-counter
cat challenge.md
```

### Step 2: Examine Sample Data
```bash
ls sample-data/
cat sample-data/sample.txt
```

### Step 3: Create Your Solution
```bash
cd solution/
touch word-counter.js
# Edit with your preferred editor
```

### Step 4: Test Your Solution  
```bash
# From the js-challenges root directory
npm run test:week1

# Or test all challenges
npm test
```

### Step 5: Debug and Iterate
- Read error messages carefully
- Test with different sample files
- Use `console.log()` for debugging
- Test edge cases manually

## 🔧 Development Tips

### Command Line Testing
```bash
# Test your solution manually first
cd week1-word-counter/solution
node word-counter.js ../sample-data/sample.txt

# Check if output file was created
ls -la *.json
```

### Using the Node.js REPL
```bash
# Start interactive session
node

# Test small pieces of your code
> const fs = require('fs');
> const content = fs.readFileSync('sample.txt', 'utf8');
> content.split(' ').length
```

### Debugging Strategies
```javascript
// Add debug logging
if (process.argv.includes('--debug')) {
  console.log('Debug: processing', filename);
}

// Log intermediate results
console.log('Words found:', words.length);
console.log('First 5 words:', words.slice(0, 5));
```

## 📊 Understanding Test Output

### Passing Tests
```
✓ should process sample.txt correctly
✓ should handle empty file
✓ should handle punctuation correctly
```

### Failing Tests
```
✗ should process sample.txt correctly
  
  Error: Solution file word-counter.js not found. Create it in the solution directory.
```

### Common Error Messages
- **"Solution file not found"**: Create your `.js` file in the `solution/` directory
- **"Solution crashed"**: Your code has a runtime error - check the details
- **"Expected X but got Y"**: Your output format doesn't match expectations
- **"Timeout"**: Your solution is taking too long - optimize it

## 🎨 Code Style Guidelines

### File Structure
```javascript
// solution/word-counter.js
const fs = require('fs');
const path = require('path');

// Get command line arguments
const filename = process.argv[2];

// Validate arguments
if (!filename) {
  console.error('Usage: node word-counter.js <filename>');
  process.exit(1);
}

// Your main logic here
```

### Error Handling
```javascript
// Always handle file errors
try {
  const content = fs.readFileSync(filename, 'utf8');
  // Process content...
} catch (error) {
  console.error('Error reading file:', error.message);
  process.exit(1);
}
```

### Output Format
```javascript
// Create consistent output
const report = {
  filename: path.basename(filename),
  totalWords: totalWords,
  uniqueWords: uniqueWords,
  mostFrequentWord: {
    word: mostFrequent,
    count: maxCount
  },
  processedAt: new Date().toISOString()
};

fs.writeFileSync('word-report.json', JSON.stringify(report, null, 2));
```

## 🐛 Common Pitfalls

### File Path Issues
```javascript
// ❌ Wrong - relative paths can be tricky
const filename = 'sample.txt';

// ✅ Right - use command line argument
const filename = process.argv[2];

// ✅ Better - validate the path
if (!fs.existsSync(filename)) {
  console.error('File not found:', filename);
  process.exit(1);
}
```

### Text Processing Mistakes
```javascript
// ❌ Wrong - doesn't handle punctuation
const words = text.split(' ');

// ✅ Right - clean text first
const words = text
  .toLowerCase()
  .replace(/[^\w\s-]/g, '')
  .split(/\s+/)
  .filter(word => word.length > 0);
```

### JSON Output Issues
```javascript
// ❌ Wrong - not valid JSON structure
const output = `Total words: ${count}`;

// ✅ Right - proper JSON object
const output = {
  totalWords: count,
  processedAt: new Date().toISOString()
};
fs.writeFileSync('report.json', JSON.stringify(output, null, 2));
```

## ⏱ Time Management

### 2-3 Hour Breakdown
- **30 minutes**: Read challenge, understand requirements, examine sample data
- **90 minutes**: Write initial solution, handle basic cases  
- **45 minutes**: Handle edge cases, debug failing tests
- **15 minutes**: Final cleanup and optimization

### When You're Stuck
1. **Step back** - are you overcomplicating it?
2. **Test smaller pieces** - use the REPL to test individual functions
3. **Read error messages** - they often contain the exact problem
4. **Check the sample data** - make sure you understand the format
5. **Re-read the challenge** - did you miss any requirements?

## 🏆 Success Celebration

When you pass all tests:
```bash
# Celebrate! 🎉
echo "Challenge complete!"

# Review your solution
cat solution/your-file.js

# Check coverage (optional)
npm run test:coverage
```

## 📚 Next Challenge

After completing one challenge:
1. **Review your code** - what worked well?
2. **Note lessons learned** - what was difficult?
3. **Move to next challenge** or **try cycle 2 enhancements**
4. **Compare approaches** - how do your three solutions differ?

Remember: The goal is building confidence and self-sufficiency. Take your time, think through problems systematically, and trust your problem-solving abilities!