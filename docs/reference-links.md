# Reference Documentation Links

## 📚 Allowed Resources During Challenges

### Node.js Official Documentation
- **File System**: https://nodejs.org/api/fs.html
- **Process**: https://nodejs.org/api/process.html  
- **Path**: https://nodejs.org/api/path.html
- **URL**: https://nodejs.org/api/url.html (for `fileURLToPath`)
- **ES Modules**: https://nodejs.org/api/esm.html
- **Utilities**: https://nodejs.org/api/util.html
- **Child Process**: https://nodejs.org/api/child_process.html

### JavaScript Language (MDN)
- **String Methods**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- **Array Methods**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- **Regular Expressions**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
- **Date Object**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
- **JSON**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON

## 🖥 Built-in Help Commands

### Node.js REPL Help
```bash
# Start interactive Node.js session
node

# In REPL, get help on any object:
> help
> console.help
> fs.help
```

### Command Line Help  
```bash
# General Node.js help
node --help

# Version information
node --version
node -e "console.log(process.versions)"

# List built-in modules
node -e "console.log(Object.getOwnPropertyNames(process.binding('natives')))"
```

## 📖 Quick Reference Guides

### File System Operations
```javascript
import fs from 'fs';

// Read file synchronously
const content = fs.readFileSync('file.txt', 'utf8');

// Write file synchronously
fs.writeFileSync('output.txt', data);

// Check if file exists
const exists = fs.existsSync('file.txt');

// Get file stats
const stats = fs.statSync('file.txt');
```

### Command Line Arguments
```javascript
// Get command line arguments
const args = process.argv.slice(2);
const filename = args[0];

// Check for flags
const hasFlag = args.includes('--verbose');
const flagIndex = args.indexOf('--output');
const flagValue = flagIndex !== -1 ? args[flagIndex + 1] : null;
```

### Date Handling
```javascript
// Create date from string
const date = new Date('2025-01-15 10:30:45');

// Format date to ISO string
const isoString = date.toISOString();

// Get timestamp for comparisons
const timestamp = date.getTime();

// Calculate time difference
const diffMs = date1.getTime() - date2.getTime();
const diffHours = diffMs / (1000 * 60 * 60);
```

### JSON Operations
```javascript
// Parse JSON string
const obj = JSON.parse(jsonString);

// Convert object to JSON
const jsonString = JSON.stringify(obj);

// Pretty print JSON
const prettyJson = JSON.stringify(obj, null, 2);
```

### String Processing
```javascript
// Split string
const words = text.split(' ');
const lines = text.split('\n');

// Regular expressions
const regex = /\[([A-Z]+)\]/; // Match [INFO], [ERROR], etc.
const match = line.match(regex);

// Clean up text
const cleaned = text
  .toLowerCase()
  .replace(/[^\w\s-]/g, '') // Remove punctuation except hyphens
  .trim();
```

### ES Module Setup
```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import specific functions
import { execSync } from 'child_process';
```

### Error Handling
```javascript
// Try-catch for file operations
try {
  const content = fs.readFileSync('file.txt', 'utf8');
} catch (error) {
  console.error('Error reading file:', error.message);
  process.exit(1);
}

// Check arguments
if (process.argv.length < 3) {
  console.error('Usage: node script.js <filename>');
  process.exit(1);
}
```

## 🚫 What NOT to Use

### Forbidden Resources
- ❌ Stack Overflow
- ❌ GitHub code searches
- ❌ ChatGPT, Claude, or any AI assistants  
- ❌ Tutorial websites or blogs
- ❌ npmjs.com package searches
- ❌ External libraries or frameworks

### Forbidden NPM Packages
- ❌ lodash, underscore (use native JS)
- ❌ moment.js (use native Date)
- ❌ commander.js (parse argv manually)
- ❌ fs-extra (use native fs)
- ❌ Any external dependencies

## ✅ Debugging Strategies

### Console Debugging
```javascript
// Log variable values
console.log('Debug:', variableName);

// Log object structure
console.log('Object:', JSON.stringify(obj, null, 2));

// Conditional logging
if (process.argv.includes('--debug')) {
  console.log('Debug info:', data);
}
```

### Testing Individual Functions
```javascript
// Test in Node.js REPL
node
> const fs = require('fs');
> const content = fs.readFileSync('sample.txt', 'utf8');
> content.split(' ').length
```

### Error Message Analysis
- Read the entire error message
- Look for line numbers and file names
- Check for typos in variable names
- Verify file paths are correct

## 📝 Documentation Reading Tips

### Efficient Documentation Use
1. **Ctrl+F is your friend** - search for specific methods
2. **Look for examples** - most Node.js docs include usage examples
3. **Check return types** - know what methods return
4. **Read parameter descriptions** - understand what each parameter does
5. **Note synchronous vs asynchronous** - use sync methods for simplicity

### Common Documentation Patterns
- **Syntax**: Shows the method signature
- **Parameters**: Lists each parameter and its type
- **Return Value**: What the method returns
- **Examples**: Working code you can copy and modify

Remember: The documentation is your primary tool. Learn to read it efficiently and you'll become much more self-sufficient!