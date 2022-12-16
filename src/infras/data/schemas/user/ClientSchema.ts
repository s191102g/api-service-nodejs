import { USER_SCHEMA } from "./UserSchema";


export const CLIENT_SCHEMA ={
    TABLE_NAME: "client",
    COLUMNS:{
        ...USER_SCHEMA.COLUMNS,
        USER_NAME:"username",
        PASS_WORD:"password",
        EMAIL:"email",
        ACTIVEKEY:"active_key",
        STATUS:"status",
        TYPE_USE:"type_use",
        PAY:"pay"
    }
}