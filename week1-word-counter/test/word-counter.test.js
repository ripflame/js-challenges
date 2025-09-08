import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Word Counter', () => {
  const solutionPath = path.join(__dirname, '..', 'solution', 'word-counter.js');
  const sampleDataPath = path.join(__dirname, '..', 'sample-data');
  
  beforeEach(() => {
    // Clean up any existing output files
    try {
      fs.unlinkSync('word-report.json');
    } catch (e) {
      // File doesn't exist, that's ok
    }
  });

  test('should process sample.txt correctly', () => {
    const sampleFile = path.join(sampleDataPath, 'sample.txt');
    
    // Check if solution file exists
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file word-counter.js not found. Create it in the solution directory.');
    }

    // Run the solution
    try {
      execSync(`node "${solutionPath}" "${sampleFile}"`, { stdio: 'pipe' });
    } catch (error) {
      throw new Error(`Solution crashed: ${error.message}`);
    }

    // Check if output file was created
    expect(fs.existsSync('word-report.json')).toBe(true);

    // Parse and validate output
    const output = JSON.parse(fs.readFileSync('word-report.json', 'utf8'));
    
    expect(output).toHaveProperty('filename');
    expect(output).toHaveProperty('totalWords');
    expect(output).toHaveProperty('uniqueWords');
    expect(output).toHaveProperty('mostFrequentWord');
    expect(output).toHaveProperty('processedAt');

    // Validate counts based on sample.txt analysis (allow small variation for different processing approaches)
    expect(output.totalWords).toBeGreaterThanOrEqual(160);
    expect(output.totalWords).toBeLessThanOrEqual(170);
    expect(output.uniqueWords).toBeGreaterThanOrEqual(88);
    expect(output.uniqueWords).toBeLessThanOrEqual(95);
    
    // Validate most frequent word - "the" should definitely be the most common
    expect(output.mostFrequentWord.word).toBe('the');
    expect(output.mostFrequentWord.count).toBeGreaterThanOrEqual(12);
    expect(output.mostFrequentWord.count).toBeLessThanOrEqual(16);
    
    // Validate timestamp format
    expect(new Date(output.processedAt).toISOString()).toBe(output.processedAt);
    
    // Validate filename extraction (should handle both full path and basename)
    expect(output.filename).toMatch(/sample\.txt$/);
  });

  test('should handle empty file', () => {
    const emptyFile = path.join(sampleDataPath, 'empty.txt');
    
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file word-counter.js not found. Create it in the solution directory.');
    }

    execSync(`node "${solutionPath}" "${emptyFile}"`, { stdio: 'pipe' });
    
    expect(fs.existsSync('word-report.json')).toBe(true);
    
    const output = JSON.parse(fs.readFileSync('word-report.json', 'utf8'));
    expect(output.totalWords).toBe(0);
    expect(output.uniqueWords).toBe(0);
    expect(output.mostFrequentWord).toBeNull();
  });

  test('should handle punctuation correctly', () => {
    const punctuationFile = path.join(sampleDataPath, 'punctuation-heavy.txt');
    
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file word-counter.js not found. Create it in the solution directory.');
    }

    execSync(`node "${solutionPath}" "${punctuationFile}"`, { stdio: 'pipe' });
    
    expect(fs.existsSync('word-report.json')).toBe(true);
    
    const output = JSON.parse(fs.readFileSync('word-report.json', 'utf8'));
    
    // Validate exact counts for punctuation-heavy file
    expect(output.totalWords).toBe(43);
    expect(output.uniqueWords).toBe(37);
    
    // Should handle punctuation removal correctly
    expect(output.mostFrequentWord).toBeTruthy();
    expect(typeof output.mostFrequentWord.word).toBe('string');
    expect(typeof output.mostFrequentWord.count).toBe('number');
    expect(output.mostFrequentWord.count).toBeGreaterThan(0);
  });

  test('should handle missing file gracefully', () => {
    const nonExistentFile = path.join(sampleDataPath, 'does-not-exist.txt');
    
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file word-counter.js not found. Create it in the solution directory.');
    }

    expect(() => {
      execSync(`node "${solutionPath}" "${nonExistentFile}"`, { stdio: 'pipe' });
    }).toThrow();
  });

  test('should handle missing command line argument', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file word-counter.js not found. Create it in the solution directory.');
    }

    expect(() => {
      execSync(`node "${solutionPath}"`, { stdio: 'pipe' });
    }).toThrow();
  });

  test('should follow text processing rules correctly', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file word-counter.js not found. Create it in the solution directory.');
    }

    // Create a test file with specific text processing challenges
    const testContent = `HELLO world! Don't worry about "quoted text" and (parentheses).
    Hyphenated-words should work. Numbers like 123 and word123 count.
    THE word "the" appears multiple times: the, THE, The.`;
    
    const testFilePath = path.join(__dirname, 'processing-test.txt');
    fs.writeFileSync(testFilePath, testContent);

    try {
      execSync(`node "${solutionPath}" "${testFilePath}"`, { stdio: 'pipe' });
      
      const output = JSON.parse(fs.readFileSync('word-report.json', 'utf8'));
      
      // Validate exact processing results
      expect(output.totalWords).toBe(28);
      expect(output.uniqueWords).toBe(23);
      
      // Should normalize case - "the" appears 5 times in different cases
      expect(output.mostFrequentWord.word).toBe('the');
      expect(output.mostFrequentWord.count).toBe(5);
      
      // Validate filename (should handle both full path and basename)
      expect(output.filename).toMatch(/processing-test\.txt$/);
      
    } finally {
      // Clean up test file
      try {
        fs.unlinkSync(testFilePath);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  });

  afterEach(() => {
    // Clean up output files
    try {
      fs.unlinkSync('word-report.json');
    } catch (e) {
      // File doesn't exist, that's ok
    }
  });
});