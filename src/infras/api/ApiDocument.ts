
// import { COMPONENT_SCHEMA_PATH } from "@shared/decorators/RefSchema";
// import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { OpenAPIObject } from "openapi3-ts";
import {
  getMetadataArgsStorage,
  RoutingControllersOptions,
} from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import { COMPONENT_SCHEMA_PATH } from "../../core/shared/decorators/RefSchema";

export class ApiDocument {
  static generate(options: RoutingControllersOptions): OpenAPIObject {
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: COMPONENT_SCHEMA_PATH,  // đường dẫn tới hàm trong các controller
    });
    const storage = getMetadataArgsStorage();

    return routingControllersToSpec(storage, options, {
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
          url: `http://webapiservice-env-1.eba-me2tu2kp.us-east-1.elasticbeanstalk.com/`,
          description: "Production",
        },
        {
          url: `https://back-end-for-app.herokuapp.com/`,
          description: "Preventive",
        },
        
      
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
    }) as OpenAPIObject;
  }
}
