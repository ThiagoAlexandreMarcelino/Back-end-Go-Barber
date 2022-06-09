import { container } from 'tsyringe';

import IMailTamplateProvider from './models/IMailTemplateProvider';

import HandlebarsTemplatableTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsTemplatableTemplateProvider,
};

container.registerSingleton<IMailTamplateProvider>(
  'MailTamplateProvider',
  providers.handlebars,
);
