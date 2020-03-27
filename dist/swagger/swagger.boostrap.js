"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
class SwaggerBootstrap {
}
SwaggerBootstrap.logger = new common_1.Logger(SwaggerBootstrap.name);
SwaggerBootstrap.useSwagger = (app, options) => {
    SwaggerBootstrap.logger.log('Building Swagger page');
    const documentBuilder = new swagger_1.DocumentBuilder()
        .setTitle(options.title)
        .setDescription(options.description)
        .setVersion(options.version)
        .setTermsOfService(options.termsOfService);
    if (options.security) {
        documentBuilder.addSecurity(options.security.name, options.security.options);
    }
    if (options.license) {
        documentBuilder.setLicense(options.license.name, options.license.url);
    }
    if (options.basePaths) {
        options.basePaths.forEach(el => documentBuilder.addServer(el));
    }
    if (options.contact) {
        documentBuilder.setContact(options.contact.name, options.contact.url, options.contact.email);
    }
    if (options.tags) {
        options.tags.forEach(el => documentBuilder.addTag(el));
    }
    const document = swagger_1.SwaggerModule.createDocument(app, documentBuilder.build());
    const metadata = class_validator_1.getFromContainer(class_validator_1.MetadataStorage)
        .validationMetadatas;
    document.components.schemas = Object.assign({}, document.components.schemas || {}, class_validator_jsonschema_1.validationMetadatasToSchemas(metadata));
    swagger_1.SwaggerModule.setup(options.prefix || 'api/swagger', app, document);
};
exports.SwaggerBootstrap = SwaggerBootstrap;
