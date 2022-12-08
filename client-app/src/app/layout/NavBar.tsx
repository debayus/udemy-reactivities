import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Prop{
    openForm : () => void;
}

export default function NavBar({openForm} : Prop){
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assests/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"/>
                <Menu.Item>
                    <Button positive content="Create Activity" onClick={openForm} />
                </Menu.Item>
            </Container>
        </Menu>
    );
}