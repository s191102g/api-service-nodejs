import { USER_SCHEMA } from "./UserSchema";


export const ADMIN_SCHEMA ={
    TABLE_NAME: "admin",
    COLUMNS:{
        ...USER_SCHEMA.COLUMNS,
        USER_NAME:"username",
        PASS_WORD:"password"
    }
}