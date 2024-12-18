import { AWSRegions } from '../types/aws-regions.types';

export const getFileName = (url: string): string => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  return pathname.substring(pathname.lastIndexOf('/') + 1);
}

export const getRegion = (url: string): AWSRegions => {
  const urlObj = new URL(url);
  const hostnameParts = urlObj.hostname.split('.');
  return hostnameParts[hostnameParts.length - 3] as AWSRegions;
}

export const getBucket = (url: string): string => {
  const urlObj = new URL(url);
  const hostnameParts = urlObj.hostname.split('.');
  return hostnameParts[0];
}

export const getKey = (url: string): string => {
  const urlObj = new URL(url);
  return urlObj.pathname.substring(1);
}

export const getS3UrlParts = (url: string): {
  region: AWSRegions,
  bucket: string,
  key: string,
  fileName: string
} => {
  return {
    region: getRegion(url),
    bucket: getBucket(url),
    key: getKey(url),
    fileName: getFileName(url)
  };
}

export * as s3UrlParserService from './s3-url-parser.service';
