import {AppShell, Burger, Group} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {Header} from "./Header";
import {useDisclosure} from "@mantine/hooks";
import "../features/styles/Quiz.css"


export const Layout = () => {
    const [opened, {toggle}] = useDisclosure();
    return (
        <AppShell className={"AppShell"}
            header={{height: 100}}
            padding="xl"

        >
            <AppShell.Header>
                <Header/>
            </AppShell.Header>

            <AppShell.Main>
                <Outlet/>
            </AppShell.Main>
        </AppShell>
    );
}

