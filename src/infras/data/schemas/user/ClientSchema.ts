import { USER_SCHEMA } from "./UserSchema";


export const CLIENT_SCHEMA ={
    TABLE_NAME: "client",
    COLUMNS:{
        ...USER_SCHEMA.COLUMNS,
        USER_NAME:"user_name",
        PASS_WORD:"pass_word",
        EMAIL:"email"
    }
}