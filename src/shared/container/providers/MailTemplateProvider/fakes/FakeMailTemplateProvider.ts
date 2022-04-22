// import IParseTemplateProviderDTO from '../dtos/IParseTemplateProviderDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content ';
  }
}
