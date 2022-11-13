"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDocument = void 0;
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const RefSchema_1 = require("../../core/shared/decorators/RefSchema");
class ApiDocument {
    static generate(options) {
        const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
            refPointerPrefix: RefSchema_1.COMPONENT_SCHEMA_PATH,
        });
        const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
        return (0, routing_controllers_openapi_1.routingControllersToSpec)(storage, options, {
            info: {
                title: ` API`,
                description: "Developed by Sang2k2",
                version: "1.0.0",
                contact: {
                    name: "Sang",
                    email: "caoquang.sang1911@gmail.com",
                },
            },
            servers: [
                {
                    url: `http://localhost/3000/`,
                    description: "Localhost",
                },
                {
                    url: `http://apiservice-env.eba-vgrg7cua.us-east-1.elasticbeanstalk.com/`,
                    description: "Production",
                }
            ],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            components: {
                schemas,
                securitySchemes: {
                    bearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
        });
    }
}
exports.ApiDocument = ApiDocument;
