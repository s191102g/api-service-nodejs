
import { BASE_SCHEMA } from "../base/BaseSchema";


export const DATA_SCHEMA = {
    TABLE_NAME:"data",
    COLUMNS : {
        ...BASE_SCHEMA.COLUMNS,
        HEADING:"heading",
        BOARD_ID:"board_id"
    }
}