import { BASE_SCHEMA } from "../base/BaseSchema";

export const USER_SCHEMA = {
    TABLE_NAME:"user",
    COLUMNS:{
        ... BASE_SCHEMA.COLUMNS,
        ROLE:"role",
        FIRST_NAME:"first_name",
        LAST_NAME:"last_name",
        AVATAR:"avatar",
        GENDER:"gender",
        BIRTHDAY:"birth_day"
    }
}