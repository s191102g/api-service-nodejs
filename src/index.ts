import { dev } from "./config/Configuration";
import { dev2 } from "./config/DbConfig";

if(process.env.NODE_ENV == 'production'){
    console.log(dev2);
    
}else{
    console.log(dev);
    
}





