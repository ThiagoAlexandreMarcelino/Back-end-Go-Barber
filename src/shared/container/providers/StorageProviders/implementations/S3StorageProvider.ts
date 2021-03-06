import uploadConfig from 'config/upload';
import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import path from 'path';

import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      // encoding: 'utf-8',
    });

    await this.client
      .putObject({
        Bucket: 'app-gobarber-2022',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise();
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (error) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default S3StorageProvider;
