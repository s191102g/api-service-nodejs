import { BASE_SCHEMA } from "../base/BaseSchema";


export const WORKSPACE_SCHEMA ={
    TABLE_NAME:"workspace",
    COLUMNS:{
        ...BASE_SCHEMA.COLUMNS,
        USER_ID:"user_id",
        IMAGE:"image",
        MEMBER:"member",
        NAME:"name"
    },
    RELATED_MANY:{
        BOARD:"board"
    }
   
}