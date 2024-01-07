import {IconHome2, IconLogout, IconSettings} from "@tabler/icons-react";
import {Button, Menu, NavLink} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import "../features/styles/Header.css";
import {useIsLogged} from "../hooks/useIsLogged";

export const Header = () =>{
    const isLogged = useIsLogged();
    const navigate = useNavigate();

    const handleLogout = async()=> {

        try {
            const response = await fetch('http://localhost:3333/api/auth/signout', {
                method: 'POST',
                headers: {
                    ContentType: 'application/json',
                    Authorization: 'Basic ' + window.btoa(""),
                },
                credentials: 'include'
            })


            navigate('/')
            if (response.status !== 200) throw new Error("Logowanie się nie powiodło");

        }

        catch (e){
            console.log(e);
        }

    }

    return(
        <div className={"Header"}>
            <div className={"Logo"}>
                <Button className={"quizy"}
                    size={"lg"}
                    bg={'blue'}
                    c={'white'}
                        style={{marginLeft:'30px', width:'200px', height:"50px", marginTop:'25px'}}
                    fw={800}
                    onClick={() => {navigate('/')}}
                    leftSection={<IconHome2 size="1rem" stroke={1.5}
                    />}
                >Quizy</Button>

            </div>
            {!isLogged ? <div className={"Buttons"}>
                <Button onClick={()=>{navigate('./login')}}  size={"lg"}  className={"Button"}>Zaloguj się</Button>
                <Button onClick={()=>{navigate('./register')}}  size={"lg"}  className={"Button"}>Zarejestruj się</Button>
                <Button onClick={()=>{navigate('./quiz/new')}}  size={"lg"}  className={"Button"}>Dodaj quiz</Button>
            </div> :
                <div className={"Buttons"}>
                    <Button onClick={()=>{navigate('./quiz/new')}}  size={"lg"}  className={"Button"}>Dodaj quiz</Button>
                <Menu shadow={"md"}>
                    <Menu.Target>
                        <Button size={"lg"}>Konto</Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Ustawienia</Menu.Label>
                        <Menu.Item leftSection={<IconSettings/>}>
                            Moje quizy
                        </Menu.Item>
                        <Menu.Item onClick={handleLogout} leftSection={<IconLogout/>}>
                            Wyloguj się
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                </div>}

        </div>


    )
}