import * as path from 'node:path';
import { readFileSync } from 'fs';

export class CsvReader {
  public load(filePath: string, header: string[], callback: (item:object) => void): void {
    const file = path.resolve(filePath);

    const fileContent = readFileSync(file, 'utf-8');
    const lines = fileContent.split('\n');

    for (const line of lines.slice(1)) {
      if (line.length <= 0)
        return;

      const item = this.processCsvLine(line, header);
      callback(item);
    }
  }

  private processCsvLine(line: string, headers: string[]) {
    const columns = line.split(';');
    const record: { [key: string]: string } = {};
    headers.forEach((header, index) => {
      record[header] = columns[index];
    });

    return record;
  }
}