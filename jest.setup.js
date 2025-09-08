// Global test setup for JavaScript challenges

// Extend Jest matchers
expect.extend({
  toBeValidTimestamp(received) {
    const date = new Date(received);
    const pass = !isNaN(date.getTime()) && received === date.toISOString();
    
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid ISO timestamp`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid ISO timestamp`,
        pass: false,
      };
    }
  },
  
  toHaveValidLogFormat(received) {
    const logLineRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \[(INFO|WARN|ERROR|DEBUG)\] .+$/;
    const lines = received.split('\n').filter(line => line.trim().length > 0);
    const invalidLines = lines.filter(line => !logLineRegex.test(line));
    
    const pass = invalidLines.length === 0;
    
    if (pass) {
      return {
        message: () => `expected log content not to have valid format`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected all log lines to have valid format. Invalid lines: ${invalidLines.join(', ')}`,
        pass: false,
      };
    }
  }
});

// Set up global test timeout - handled by jest.config.js

// Clean up temporary files after each test
afterEach(async () => {
  const fs = await import('fs');
  const path = await import('path');
  
  // List of temporary file patterns to clean up
  const tempPatterns = [
    'word-report.json',
    '*.backup.*',
    'test-config.json',
    'temp-*.json'
  ];
  
  // Clean up files in current directory
  tempPatterns.forEach(pattern => {
    try {
      if (pattern.includes('*')) {
        // Handle glob patterns (simplified)
        const files = fs.readdirSync('.');
        files.forEach(file => {
          if (pattern.includes('*.backup.*') && file.includes('.backup.')) {
            fs.unlinkSync(file);
          }
        });
      } else {
        // Handle exact file names
        if (fs.existsSync(pattern)) {
          fs.unlinkSync(pattern);
        }
      }
    } catch (err) {
      // Ignore cleanup errors
    }
  });
});