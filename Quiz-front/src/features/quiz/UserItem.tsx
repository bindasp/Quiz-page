import {FC, memo} from "react";
import "../styles/Forms.css"
import {TableTd, TableTr} from "@mantine/core";

interface UserProps{
    id:number;
    login:string;
    email:string;
}

export const UserItem:FC<UserProps> = memo((item)=>{

    const deleteUser = async(id:number)=>{
        const quiz = await fetch(`http://localhost:3333/api/admin/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials:'include'

        });
        console.log(id);
    };

    return(
        <TableTr key={item.login} onClick={()=>deleteUser(item.id)}>
            <TableTd>{item.login}</TableTd>
            <TableTd>{item.email}</TableTd>
        </TableTr>

    )
});