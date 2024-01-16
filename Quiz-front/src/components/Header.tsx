import {IconHome2, IconLogout, IconSettings, IconSquareRoundedLetterA} from "@tabler/icons-react";
import {Button, Menu} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import "../features/styles/Header.css";
import {useIsLogged} from "../hooks/useIsLogged";
import {QuizCategories} from "../types/QuizCategories";
import {useIsAdmin} from "../hooks/useIsAdmin";
import {logout} from "../fetchFunctions/postFunctions";

export const Header = () =>{
    const isLogged = useIsLogged();
    const navigate = useNavigate();
    const isAdmin = useIsAdmin();

    const handleLogout = ()=> {

        logout().then(()=>{
            navigate('/')
        });

    }
    const handleSelectCategory = async(category: string)=>{
        const searchParams = new URLSearchParams();

        searchParams.append('category', category);
        navigate(`/?${searchParams.toString()}`);

    }
    return(
        <div className={"Header"}>
            <div className={"Logo"}>
                <Button className={"quizy"}

                    size={"lg"}
                        style={{marginLeft:'30px', width:'200px', height:"50px", marginTop:'25px'}}
                    fw={800}
                    onClick={() => {navigate('/')}}
                    leftSection={<IconHome2 size="1rem" stroke={1.5}
                    />}
                >Quizy</Button>
                {isLogged ?
                <Menu trigger={"hover"} width={200}>
                    <Menu.Target>
                        <Button
                            size={"lg"}
                            //bg={'blue'}

                            style={{marginLeft:'30px', width:'200px', height:"50px", marginTop:'25px'}}
                            fw={800}
                        >
                            Kategorie</Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        {Object.values(QuizCategories).map((category)=>(
                            <Menu.Item key={category} onClick={()=>handleSelectCategory(category)}>{category}</Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu> : ""}


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
                        <Menu.Item onClick={()=>navigate('/quizzes')} leftSection={<IconSettings/>}>
                            Moje quizy
                        </Menu.Item>
                        {isAdmin==true ?
                            <Menu.Item onClick={()=>navigate('/admin')} leftSection={<IconSquareRoundedLetterA/>}>
                                Panel administracyjny
                            </Menu.Item>
                        : ""}

                        <Menu.Item onClick={handleLogout} leftSection={<IconLogout/>}>
                            Wyloguj się
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                </div>}

        </div>


    )
}