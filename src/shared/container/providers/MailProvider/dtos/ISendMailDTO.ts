import IParseTemplateProviderDTO from '../../MailTemplateProvider/dtos/IParseTemplateProviderDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseTemplateProviderDTO;
}
