import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { parser } from 'stream-json';
import { AWSRegions } from '../types/aws-regions.types';
import { Readable } from 'stream';
import { Observable } from 'rxjs';
import StreamArray, { streamArray } from 'stream-json/streamers/StreamArray';
import { BaseClass } from '../common/base.class';

export class S3Uploader extends BaseClass {
  private region: AWSRegions;
  private readonly bucketName: string;
  private readonly key: string;
  private s3Client: S3Client;

  constructor(region: AWSRegions, bucketName: string, key: string) {
    super();
    this.checkEnvParams([region, bucketName, key]);
    this.region = region;
    this.bucketName = bucketName;
    this.key = key;
    this.s3Client = new S3Client({ region, credentials: undefined });
  }

  public async process<T extends object>() {
    try {
      const fileStream = await this.getFileStream();
      const jsonStream = this.createJsonStream(fileStream);
      return this.createJsonObservable<T>(jsonStream);
    } catch (error) {
      throw new Error("Error processing JSON file:")
    }
  }

  private async getFileStream(): Promise<Readable> {
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: this.key });
    const response = await this.s3Client.send(command);
    return response.Body as Readable;
  }

  private createJsonStream(fileStream: Readable): StreamArray {
    return fileStream.pipe(parser()).pipe(streamArray());
  }

  private createJsonObservable<T extends object>(jsonStream: any): Observable<T> {
    return new Observable((subscriber) => {
      jsonStream.on('data', (chunk: {value: T}) => subscriber.next(chunk.value));
      jsonStream.on('end', () => subscriber.complete());
      jsonStream.on('error', (err: any) => subscriber.error(err));
    });
  }

}
