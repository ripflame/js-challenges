# Week 3: Simple Log Analyzer

## Goal
Build a command-line log analysis tool that processes structured log files and generates statistical reports.

## Core Requirements
- Read log file with timestamp, level, and message format
- Filter entries from last N hours (command line parameter)
- Count log levels (INFO, WARN, ERROR, DEBUG)
- Identify most common error messages
- Generate summary report

## Log Format
```
2025-01-15 10:30:45 [INFO] User login successful: user123
2025-01-15 10:31:02 [ERROR] Database connection failed: timeout
2025-01-15 10:31:15 [WARN] High memory usage detected: 85%
2025-01-15 10:32:20 [DEBUG] Processing request ID: req_789
2025-01-15 10:33:10 [ERROR] Database connection failed: timeout
2025-01-15 10:33:45 [INFO] User logout: user123
```

## Usage Examples
```bash
# Analyze all logs
node solution/log-analyzer.js sample-data/application.log

# Analyze logs from last 2 hours
node solution/log-analyzer.js sample-data/application.log --hours 2

# Analyze logs from last 24 hours
node solution/log-analyzer.js sample-data/application.log --hours 24
```

## Expected Output
```
Log Analysis Report
===================
File: application.log
Time Range: 2025-01-15 08:30:45 to 2025-01-15 10:33:45
Total Entries: 156

Log Level Summary:
  INFO:  89 entries (57.1%)
  WARN:  23 entries (14.7%)
  ERROR: 31 entries (19.9%)
  DEBUG: 13 entries (8.3%)

Top Error Messages:
  1. Database connection failed: timeout (12 occurrences)
  2. Authentication failed: invalid token (8 occurrences)
  3. File not found: config.json (5 occurrences)
  4. Network timeout: api.example.com (3 occurrences)
  5. Permission denied: /secure/data (3 occurrences)

Time Distribution:
  Last 1 hour:  45 entries
  Last 2 hours: 89 entries
  Last 6 hours: 134 entries
  Last 24 hours: 156 entries
```

## Features
1. **Time Filtering**: Parse timestamps and filter by hours
2. **Level Counting**: Count entries by log level
3. **Error Analysis**: Find most frequent error messages
4. **Time Distribution**: Show entry counts for different time ranges
5. **Summary Statistics**: Calculate percentages and totals

## Log Parsing Requirements
- Parse timestamp: `YYYY-MM-DD HH:MM:SS` format
- Extract log level: `[INFO]`, `[WARN]`, `[ERROR]`, `[DEBUG]`
- Extract message: Everything after the log level
- Handle malformed log lines gracefully

## Command Line Arguments
- First argument: Log file path (required)
- `--hours N`: Filter to entries from last N hours (optional, default: all)
- `--level LEVEL`: Filter to specific log level (optional)
- `--format json`: Output as JSON instead of text (optional)

## Error Handling
- Handle missing log files
- Handle empty log files
- Skip malformed log lines with warning
- Handle invalid timestamp formats
- Validate command line arguments

## JSON Output Format
```json
{
  "file": "application.log",
  "timeRange": {
    "start": "2025-01-15T08:30:45Z",
    "end": "2025-01-15T10:33:45Z"
  },
  "totalEntries": 156,
  "levelCounts": {
    "INFO": 89,
    "WARN": 23,
    "ERROR": 31,
    "DEBUG": 13
  },
  "topErrors": [
    {
      "message": "Database connection failed: timeout",
      "count": 12
    }
  ],
  "timeDistribution": {
    "last1Hour": 45,
    "last2Hours": 89,
    "last6Hours": 134,
    "last24Hours": 156
  }
}
```

## Testing
Run the test suite with:
```bash
npm test -- --grep "Log Analyzer"
```

## Time Limit
2-3 hours maximum

## Resources
- Node.js Date and time handling
- String parsing and regular expressions
- File system operations
- Command line argument processing
- No external date/time libraries allowed