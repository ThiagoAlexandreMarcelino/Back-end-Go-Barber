import IParseMailTemplateDTO from '../dtos/IParseTemplateProviderDTO';

export default interface IMailTamplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
