import * as path from 'node:path';
import { readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CsvBuilder {
  private filePath: string;
  private headers: string[];

  public setFilePath(path: string): this {
    this.filePath = path;
    return this;
  }

  public setHeaders(headers: string[]): this {
    this.headers = headers;
    return this;
  }

  public load(callback: (item: object) => void): void {
    if (!this.filePath || this.headers.length <= 0) {
      return;
    }

    const file = path.resolve(this.filePath);

    const fileContent = readFileSync(file, 'utf-8');
    const lines = fileContent.split('\n');

    for (const line of lines.slice(1)) {
      if (line.length <= 0)
        return;

      const item = this.processCsvLine(line, this.headers);
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
