import { BASE_SCHEMA } from "../base/BaseSchema";


export const SANG_SCHEMA ={
   TABLE_NAME:"test",
   COLUMNS:{
    ...BASE_SCHEMA.COLUMNS,
    NAME:"name"
   }
}