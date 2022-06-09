import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';

import S3StorageProvider from './implementations/S3StorageProvider';
// import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>('StorageProvider', providers.s3);
