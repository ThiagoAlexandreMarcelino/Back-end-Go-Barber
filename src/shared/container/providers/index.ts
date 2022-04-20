import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProviders/models/IStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
