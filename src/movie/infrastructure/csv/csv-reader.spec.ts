import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import { CsvReader } from './csv-reader';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('CsvReader', () => {
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvReader],
    }).compile();

    service = module.get<CsvReader>(CsvReader);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('load', () => {
    it('should read CSV and call callback for each line', () => {
      const filePath = 'fake-path/to/file.csv';
      const header = ['name', 'age', 'city'];

      const mockCsvContent = 'name;age;city\nJohn;25;New York\nJane;30;Los Angeles';
      (fs.readFileSync as jest.Mock).mockReturnValue(mockCsvContent);

      const callback = jest.fn();

      service.load(filePath, header, callback);

      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenCalledWith({
        name: 'John',
        age: '25',
        city: 'New York',
      });
      expect(callback).toHaveBeenCalledWith({
        name: 'Jane',
        age: '30',
        city: 'Los Angeles',
      });
    });

    it('should not call callback for empty lines', () => {
      const filePath = 'fake-path/to/file.csv';
      const header = ['name', 'age', 'city'];

      const mockCsvContent = 'name;age;city\nJohn;25;New York\n\nJane;30;Los Angeles';
      (fs.readFileSync as jest.Mock).mockReturnValue(mockCsvContent);

      const callback = jest.fn();

      service.load(filePath, header, callback);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle invalid file paths gracefully', () => {
      const filePath = 'invalid/path/to/file.csv';
      const header = ['name', 'age', 'city'];

      (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
        throw new Error('File not found');
      });

      const callback = jest.fn();

      try {
        service.load(filePath, header, callback);
      } catch (error) {
        expect(error.message).toBe('File not found');
      }

      expect(callback).not.toHaveBeenCalled();
    });
  });
});
