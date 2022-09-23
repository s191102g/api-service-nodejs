import { BASE_SCHEMA } from "../base/baseSchema";


export const SANG_SCHEMA ={
   TABLE_NAME:"test",
   COLUMNS:{
    ...BASE_SCHEMA.COLUMNS,
    NAME:"name"
   }
}