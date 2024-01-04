import {showNotification} from "@mantine/notifications";

export const loginErrorNotification=()=>{
    showNotification({
        color:'red',
        title:'Error',
        message:'Logowanie się nie powiodło',
    })
}