import { BASE_SCHEMA } from "../base/BaseSchema";


export const BOARD_SCHEMA = {
    TABLE_NAME:"board",
    COLUMNS:{
        ...BASE_SCHEMA.COLUMNS,
        TITLE:"title",
        ICON:"icon",
        POSITION:"position",
        DESCRIPTION:"description",
        FAVOURITE:"favourite",
        FAVOURITE_POSITION:"favourite_position",
        WORKSPACE_ID:"workspace_id",
        TEMPLATE_ID:"template_id"
    },
    RELATED_MANY:{
        DATA:"datas"
    }
}