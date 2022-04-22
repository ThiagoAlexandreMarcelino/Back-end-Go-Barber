import handlebars from 'handlebars';
import fs from 'fs';
import IParseTemplateProviderDTO from '../dtos/IParseTemplateProviderDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsTemplatableTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseTemplateProviderDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsTemplatableTemplateProvider;
