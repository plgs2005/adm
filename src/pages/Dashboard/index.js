
import React from "react";

import { Menu } from '../../components/menus';

import { Container, ConteudoTitle, Title } from '../../styles/custom_adm';
export const Dashboard = () => {
    return (
        <Container>
            <Menu></Menu><br />
            <ConteudoTitle>
                <Title>Bem vindo Dashboard</Title>
            </ConteudoTitle>
        </Container>
    );
}