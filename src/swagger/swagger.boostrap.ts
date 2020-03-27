import { SwaggerDocumentOptions } from './swagger.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

export class SwaggerBootstrap {
  private static logger = new Logger(SwaggerBootstrap.name);

  static useSwagger = (
    app: INestApplication,
    options: SwaggerDocumentOptions,
  ): void => {
    SwaggerBootstrap.logger.log('Building Swagger page');

    const documentBuilder = new DocumentBuilder()
      .setTitle(options.title)
      .setDescription(options.description)
      .setVersion(options.version)
      .setTermsOfService(options.termsOfService);

    if (options.security) {
      documentBuilder.addSecurity(
        options.security.name,
        options.security.options,
      );
    }
    if (options.license) {
      documentBuilder.setLicense(options.license.name, options.license.url);
    }

    if (options.basePaths) {
      options.basePaths.forEach(el => documentBuilder.addServer(el));
    }

    if (options.contact) {
      documentBuilder.setContact(
        options.contact.name,
        options.contact.url,
        options.contact.email,
      );
    }

    if (options.tags) {
      options.tags.forEach(el => documentBuilder.addTag(el));
    }

    const document = SwaggerModule.createDocument(app, documentBuilder.build());

    const metadata = (getFromContainer(MetadataStorage) as any)
      .validationMetadatas;
    document.components.schemas = Object.assign(
      {},
      document.components.schemas || {},
      validationMetadatasToSchemas(metadata),
    );

    SwaggerModule.setup(options.prefix || 'api/swagger', app, document);
  };
}
