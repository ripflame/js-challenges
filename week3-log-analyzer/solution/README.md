# Your Solution Goes Here

Create your `log-analyzer.js` file in this directory.

## Starter Template
```javascript
// log-analyzer.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const logFile = args[0];

// Your implementation here
```

## Date Parsing Tips
- Use `new Date()` constructor for parsing timestamps
- Compare dates with `getTime()` for millisecond timestamps
- Calculate time differences for filtering

## Log Parsing Tips
- Use regular expressions to match log format
- Split lines and process each line individually
- Handle malformed lines gracefully

## Remember
- Only use Node.js built-in modules
- No external libraries or AI assistance
- Process large files efficiently
- Provide clear error messages