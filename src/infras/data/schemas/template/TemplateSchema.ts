import { BASE_SCHEMA } from "../base/BaseSchema";


export const TEMPLATE_SCHEMA = {
    TABLE_NAME:"template",
    COLUMNS:{
        ...BASE_SCHEMA.COLUMNS,
        TYPE_BY_STRING:"type_by_string",
        USAGE_FIELDS:"USAGE_FIELD"
    }
}