# Your Solution Goes Here

Create your `config-manager.js` file in this directory.

## Starter Template
```javascript
// config-manager.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

// Your implementation here
```

## Command Line Parsing Tips
- `process.argv` contains all command line arguments
- Look for `--file`, `--set`, `--get` flags
- Parse `--set property=value` format
- Handle missing required arguments

## Remember
- Only use Node.js built-in modules
- No external libraries or AI assistance
- Create backups before modifying files
- Preserve JSON formatting when possible