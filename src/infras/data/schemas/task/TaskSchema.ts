import { BASE_SCHEMA } from "../base/BaseSchema";


export const TASK_SCHEMA = {
    TABLE_NAME:"task",
    COLUMNS:{
        ...BASE_SCHEMA.COLUMNS,
        TITLE:"title",
        CONTENT:"content",
        POSITION:"position",
        DATA_ID:"data-id",
        DEADLINE:"dead_line"
    }
}