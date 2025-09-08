# JavaScript Self-Sufficiency Coding Challenges

## 🎯 Goal
Build back confidence in coding without AI assistance. Focus on fundamental file operations, data processing, and problem-solving using only official documentation.

## 📋 Rules
- **No AI assistance** during coding (Claude, ChatGPT, etc.)
- **No Stack Overflow** or tutorial websites
- **Only official docs**: Node.js documentation, MDN for browser APIs
- **Time limit**: 2-3 hours per challenge maximum
- **Test-driven**: Use provided test suites to validate solutions

## 🚀 Quick Start

### Installation
```bash
cd js-challenges
npm install
```

### Running Tests
```bash
# Test all challenges
npm test

# Test specific week
npm run test:week1    # Word Counter
npm run test:week2    # Config Manager
npm run test:week3    # Log Analyzer

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🗓 Challenge Schedule (3-Week Rotation)

### Week 1: Word Counter Plus
**📁 Location**: `week1-word-counter/`

**🎯 Task**: Build a command-line word counting tool
- Read text files and count words, unique words, most frequent word
- Handle text cleanup and edge cases
- Output formatted JSON reports
- **Time**: 2-3 hours

**🏃 Start**: 
```bash
cd week1-word-counter
cat challenge.md
```

### Week 2: Config File Manager  
**📁 Location**: `week2-config-manager/`

**🎯 Task**: Build a JSON configuration management tool
- Read/update JSON configs with dot notation
- Create backups and handle nested properties
- Type preservation and validation
- **Time**: 2-3 hours

**🏃 Start**:
```bash
cd week2-config-manager  
cat challenge.md
```

### Week 3: Simple Log Analyzer
**📁 Location**: `week3-log-analyzer/`

**🎯 Task**: Build a log file analysis tool
- Parse structured log files with timestamps
- Filter by time ranges, count log levels
- Identify error patterns and generate reports
- **Time**: 2-3 hours

**🏃 Start**:
```bash
cd week3-log-analyzer
cat challenge.md
```

## 🔄 Progressive Difficulty

Each 3-week cycle adds new requirements:

**Cycle 2 Enhancements**:
- Word Counter: Add reading level calculation, word length analysis
- Config Manager: Support arrays, schema validation
- Log Analyzer: Time-based trending, CSV export

**Cycle 3 Advanced Features**:
- Word Counter: Multiple file formats, word cloud data
- Config Manager: Environment variables, template interpolation  
- Log Analyzer: Real-time monitoring, alert thresholds

## 📚 Learning Resources

### Allowed Documentation
- **Node.js Docs**: Use `node --help` or the built-in REPL
- **MDN Web Docs**: For JavaScript fundamentals
- **Built-in Help**: `node -e "console.log(process.versions)"`

### Quick Reference Commands
```bash
# Node.js help
node --help

# Interactive REPL for testing
node

# Check available modules
node -e "console.log(Object.getOwnPropertyNames(process.binding('natives')))"
```

## 🧪 Testing Your Solutions

### Test Structure
Each challenge includes:
- **Input files**: Sample data with various edge cases
- **Test suite**: Automated validation of outputs  
- **Edge cases**: Empty files, malformed data, missing files
- **Performance**: Large file handling tests

### Running Individual Tests
```bash
# Run specific test file
npx jest week1-word-counter/test/word-counter.test.js

# Run tests matching pattern
npx jest --testNamePattern="should handle empty file"

# Verbose output
npx jest --verbose
```

## 📊 Success Metrics
- ✅ Complete each challenge within time limit
- ✅ Pass all provided tests
- ✅ Handle edge cases gracefully
- ✅ Code written without external assistance  
- ✅ Improve completion time across cycles

## 🗂 Project Structure
```
js-challenges/
├── week1-word-counter/
│   ├── challenge.md          # Challenge description
│   ├── test/                # Test suite (don't peek!)
│   ├── sample-data/         # Sample input files
│   └── solution/            # Your code goes here
├── week2-config-manager/
│   ├── challenge.md
│   ├── test/
│   ├── sample-data/
│   └── solution/
├── week3-log-analyzer/
│   ├── challenge.md  
│   ├── test/
│   ├── sample-data/
│   └── solution/
├── docs/                    # Reference documentation
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🎲 Getting Started

1. **Choose your challenge** based on the week
2. **Read the challenge.md** file carefully
3. **Examine sample data** to understand the input format
4. **Create your solution** in the `solution/` directory
5. **Test frequently** with `npm test`
6. **No peeking** at the test files until you're done!

## 🔧 Troubleshooting

### Common Issues
- **Tests not found**: Make sure you're in the right directory
- **Permission errors**: Check file permissions on sample data
- **Module not found**: Only use Node.js built-in modules
- **Timeout errors**: Optimize your solution for large files

### Getting Help (Without Cheating)
- Use `node --help` for built-in documentation
- Test small code snippets in the Node.js REPL
- Read error messages carefully - they often contain the solution
- Break down complex problems into smaller steps

## 🏆 Challenge Tips

### General Strategies
1. **Read the challenge completely** before coding
2. **Start with the simplest case** and build up
3. **Test early and often** with provided sample data
4. **Handle edge cases** (empty files, malformed data)
5. **Use descriptive variable names** - future you will thank you
6. **Write error messages that help debugging**

### Node.js Specific
- Use `fs.readFileSync()` for simple file reading
- `process.argv` contains command line arguments
- `JSON.parse()` and `JSON.stringify()` for JSON handling
- Regular expressions for text processing
- `console.error()` for error messages

## 📈 Tracking Progress

Keep a simple log of your attempts:
```
Week 1 - Attempt 1: 3.5 hours, failed 2 tests (empty file handling)
Week 1 - Attempt 2: 2 hours, all tests passed!
Week 2 - Attempt 1: 2.5 hours, all tests passed
...
```

## 🎉 Next Steps

After completing all three challenges:
- **Review your code** - what patterns did you use?
- **Optimize solutions** - can you make them faster or more readable?
- **Add new features** - try the Cycle 2 enhancements
- **Document lessons learned** - what was hardest? What felt natural?

---

Remember: The goal isn't just to pass tests, but to rebuild confidence in your ability to solve problems independently. Take your time, think through the problems, and trust your problem-solving skills!