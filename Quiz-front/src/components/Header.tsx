import {IconHome2} from "@tabler/icons-react";
import {Button, NavLink} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import "../features/styles/Header.css";

export const Header = () =>{
    const navigate = useNavigate();
    return(
        <div className={"Header"}>
            <div className={"Logo"}>
                <NavLink
                    h={100}
                    fw={800}
                    onClick={() => {navigate('/')}}
                    label="Quizy"
                    leftSection={<IconHome2 size="1rem" stroke={1.5}
                    />}
                />

            </div>
            <div className={"Buttons"}>
            <Button onClick={()=>{navigate('./login')}}  size={"lg"}  className={"Button"}>Zaloguj się</Button>
            <Button onClick={()=>{navigate('./register')}}  size={"lg"}  className={"Button"}>Zarejestruj się</Button>
            <Button onClick={()=>{navigate('./quiz/new')}}  size={"lg"}  className={"Button"}>Dodaj quiz</Button>
            </div>
        </div>


    )
}