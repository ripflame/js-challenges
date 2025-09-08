import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Log Analyzer', () => {
  const solutionPath = path.join(__dirname, '..', 'solution', 'log-analyzer.js');
  const sampleDataPath = path.join(__dirname, '..', 'sample-data');

  test('should exist', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }
    expect(fs.existsSync(solutionPath)).toBe(true);
  });

  test('should analyze basic log file', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    const logFile = path.join(sampleDataPath, 'application.log');
    const output = execSync(
      `node "${solutionPath}" "${logFile}"`,
      { encoding: 'utf8' }
    );

    expect(output).toContain('Log Analysis Report');
    expect(output).toContain('Total Entries:');
    expect(output).toContain('Log Level Summary:');
    expect(output).toContain('INFO:');
    expect(output).toContain('WARN:');
    expect(output).toContain('ERROR:');
    expect(output).toContain('DEBUG:');
  });

  test('should count log levels correctly', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    const logFile = path.join(sampleDataPath, 'application.log');
    const output = execSync(
      `node "${solutionPath}" "${logFile}"`,
      { encoding: 'utf8' }
    );

    // Validate exact counts based on application.log analysis
    expect(output).toMatch(/Total Entries:\s*118/);
    expect(output).toMatch(/INFO:\s*63/);
    expect(output).toMatch(/WARN:\s*17/);
    expect(output).toMatch(/ERROR:\s*22/);
    expect(output).toMatch(/DEBUG:\s*16/);
  });

  test('should identify top error messages', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    const logFile = path.join(sampleDataPath, 'error-heavy.log');
    const output = execSync(
      `node "${solutionPath}" "${logFile}"`,
      { encoding: 'utf8' }
    );

    // Validate exact counts for error-heavy.log
    expect(output).toMatch(/Total Entries:\s*12/);
    expect(output).toMatch(/ERROR:\s*10/);
    expect(output).toMatch(/WARN:\s*1/);
    expect(output).toMatch(/INFO:\s*1/);
    
    // Validate specific error message frequencies
    expect(output).toContain('Top Error Messages:');
    expect(output).toContain('Database connection failed: timeout');
    expect(output).toMatch(/Database connection failed: timeout.*4/);
    expect(output).toContain('Authentication failed: invalid token');
    expect(output).toContain('File not found: config.json');
  });

  test('should filter by hours', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    const logFile = path.join(sampleDataPath, 'application.log');
    const output = execSync(
      `node "${solutionPath}" "${logFile}" --hours 1`,
      { encoding: 'utf8' }
    );

    expect(output).toContain('Log Analysis Report');
    // Should show fewer entries when filtered
    expect(output).toMatch(/Total Entries:\s+\d+/);
  });

  test('should output JSON format', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    const logFile = path.join(sampleDataPath, 'application.log');
    const output = execSync(
      `node "${solutionPath}" "${logFile}" --format json`,
      { encoding: 'utf8' }
    );

    // Should be valid JSON with exact expected structure and values
    const jsonOutput = JSON.parse(output);
    
    expect(jsonOutput).toHaveProperty('file');
    expect(jsonOutput.file).toMatch(/application\.log$/);
    
    // Validate exact counts
    expect(jsonOutput.totalEntries).toBe(118);
    expect(jsonOutput.levelCounts.INFO).toBe(63);
    expect(jsonOutput.levelCounts.WARN).toBe(17);
    expect(jsonOutput.levelCounts.ERROR).toBe(22);
    expect(jsonOutput.levelCounts.DEBUG).toBe(16);
    
    // Validate top errors structure and content
    expect(Array.isArray(jsonOutput.topErrors)).toBe(true);
    expect(jsonOutput.topErrors.length).toBeGreaterThan(0);
    
    // Check that the most common error is present
    const topError = jsonOutput.topErrors[0];
    expect(topError).toHaveProperty('message');
    expect(topError).toHaveProperty('count');
    expect(topError.message).toBe('Database connection failed: timeout');
    expect(topError.count).toBe(5);
  });

  test('should handle empty log file', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    const emptyLogFile = path.join(sampleDataPath, 'empty.log');
    const output = execSync(
      `node "${solutionPath}" "${emptyLogFile}"`,
      { encoding: 'utf8' }
    );

    expect(output).toContain('Total Entries: 0');
  });

  test('should handle malformed log entries', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    const malformedLogFile = path.join(sampleDataPath, 'malformed.log');
    
    // Should not crash on malformed entries
    expect(() => {
      execSync(
        `node "${solutionPath}" "${malformedLogFile}"`,
        { encoding: 'utf8' }
      );
    }).not.toThrow();
  });

  test('should handle missing file error', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    expect(() => {
      execSync(
        `node "${solutionPath}" "nonexistent.log"`,
        { encoding: 'utf8', stdio: 'pipe' }
      );
    }).toThrow();
  });

  test('should handle missing command line arguments', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    expect(() => {
      execSync(
        `node "${solutionPath}"`,
        { encoding: 'utf8', stdio: 'pipe' }
      );
    }).toThrow();
  });

  test('should filter by specific log level', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    const logFile = path.join(sampleDataPath, 'application.log');
    const output = execSync(
      `node "${solutionPath}" "${logFile}" --level ERROR`,
      { encoding: 'utf8' }
    );

    // When filtering by ERROR level, should only show ERROR entries
    expect(output).toMatch(/ERROR:\\s*22/);
    // Should show 0 for other levels when filtered by ERROR
    expect(output).toMatch(/INFO:\\s*0/);
    expect(output).toMatch(/WARN:\\s*0/);
    expect(output).toMatch(/DEBUG:\\s*0/);
  });

  test('should validate log parsing with specific format requirements', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file log-analyzer.js not found. Create it in the solution directory.');
    }

    // Test with malformed log to ensure graceful handling
    const malformedLogFile = path.join(sampleDataPath, 'malformed.log');
    const output = execSync(
      `node "${solutionPath}" "${malformedLogFile}"`,
      { encoding: 'utf8' }
    );

    // Should handle malformed entries gracefully and only count valid ones
    expect(output).toMatch(/Total Entries:\\s*[0-9]+/);
    
    // Should find some valid entries (there are a few valid lines in malformed.log)
    expect(output).toMatch(/INFO:\\s*[0-9]+/);
    expect(output).toMatch(/ERROR:\\s*[0-9]+/);
    expect(output).toMatch(/WARN:\\s*[0-9]+/);
  });
});