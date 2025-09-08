import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Config Manager', () => {
  const solutionPath = path.join(__dirname, '..', 'solution', 'config-manager.js');
  const sampleDataPath = path.join(__dirname, '..', 'sample-data');
  const testConfigPath = path.join(__dirname, 'test-config.json');
  
  beforeEach(() => {
    // Create a fresh test config for each test
    const originalConfig = {
      app: {
        name: "TestApp",
        debug: false,
        port: 3000
      },
      database: {
        host: "localhost",
        port: 3306
      }
    };
    fs.writeFileSync(testConfigPath, JSON.stringify(originalConfig, null, 2));
    
    // Clean up any backup files
    const backupFiles = fs.readdirSync(__dirname).filter(file => 
      file.startsWith('test-config.json.backup.')
    );
    backupFiles.forEach(file => {
      try {
        fs.unlinkSync(path.join(__dirname, file));
      } catch (e) {
        // Ignore if file doesn't exist
      }
    });
  });

  afterEach(() => {
    // Clean up test files
    try {
      fs.unlinkSync(testConfigPath);
    } catch (e) {
      // Ignore if file doesn't exist
    }
    
    // Clean up backup files
    const backupFiles = fs.readdirSync(__dirname).filter(file => 
      file.startsWith('test-config.json.backup.')
    );
    backupFiles.forEach(file => {
      try {
        fs.unlinkSync(path.join(__dirname, file));
      } catch (e) {
        // Ignore if file doesn't exist
      }
    });
  });

  test('should exist', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }
    expect(fs.existsSync(solutionPath)).toBe(true);
  });

  test('should get existing property value', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }

    const output = execSync(
      `node "${solutionPath}" --file "${testConfigPath}" --get app.name`,
      { encoding: 'utf8' }
    );
    
    expect(output).toContain('TestApp');
  });

  test('should get nested property value', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }

    const output = execSync(
      `node "${solutionPath}" --file "${testConfigPath}" --get database.port`,
      { encoding: 'utf8' }
    );
    
    expect(output).toContain('3306');
  });

  test('should set property value and create backup', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }

    const output = execSync(
      `node "${solutionPath}" --file "${testConfigPath}" --set app.port=8080`,
      { encoding: 'utf8' }
    );
    
    expect(output).toContain('Backup created');
    expect(output).toContain('8080');
    
    // Check that config was updated
    const updatedConfig = JSON.parse(fs.readFileSync(testConfigPath, 'utf8'));
    expect(updatedConfig.app.port).toBe(8080);
    
    // Check that backup was created
    const backupFiles = fs.readdirSync(__dirname).filter(file => 
      file.startsWith('test-config.json.backup.')
    );
    expect(backupFiles.length).toBe(1);
    
    // Check backup contains original values
    const backupPath = path.join(__dirname, backupFiles[0]);
    const backupConfig = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    expect(backupConfig.app.port).toBe(3000);
  });

  test('should set nested property value', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }

    execSync(
      `node "${solutionPath}" --file "${testConfigPath}" --set database.host=remote.server.com`,
      { encoding: 'utf8' }
    );
    
    const updatedConfig = JSON.parse(fs.readFileSync(testConfigPath, 'utf8'));
    expect(updatedConfig.database.host).toBe('remote.server.com');
  });

  test('should handle boolean values correctly', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }

    execSync(
      `node "${solutionPath}" --file "${testConfigPath}" --set app.debug=true`,
      { encoding: 'utf8' }
    );
    
    const updatedConfig = JSON.parse(fs.readFileSync(testConfigPath, 'utf8'));
    expect(updatedConfig.app.debug).toBe(true);
    expect(typeof updatedConfig.app.debug).toBe('boolean');
  });

  test('should handle numeric values correctly', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }

    execSync(
      `node "${solutionPath}" --file "${testConfigPath}" --set database.port=5432`,
      { encoding: 'utf8' }
    );
    
    const updatedConfig = JSON.parse(fs.readFileSync(testConfigPath, 'utf8'));
    expect(updatedConfig.database.port).toBe(5432);
    expect(typeof updatedConfig.database.port).toBe('number');
  });

  test('should handle missing file error', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }

    expect(() => {
      execSync(
        `node "${solutionPath}" --file "nonexistent.json" --get app.name`,
        { encoding: 'utf8', stdio: 'pipe' }
      );
    }).toThrow();
  });

  test('should handle invalid JSON error', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }

    const invalidJsonPath = path.join(sampleDataPath, 'invalid.json');
    
    expect(() => {
      execSync(
        `node "${solutionPath}" --file "${invalidJsonPath}" --get app.name`,
        { encoding: 'utf8', stdio: 'pipe' }
      );
    }).toThrow();
  });

  test('should handle missing command line arguments', () => {
    if (!fs.existsSync(solutionPath)) {
      throw new Error('Solution file config-manager.js not found. Create it in the solution directory.');
    }

    expect(() => {
      execSync(
        `node "${solutionPath}"`,
        { encoding: 'utf8', stdio: 'pipe' }
      );
    }).toThrow();
  });
});