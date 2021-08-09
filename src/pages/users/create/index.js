
import React, { useState } from "react";
import { Menu } from '../../../components/menus';
import { Redirect, Link } from 'react-router-dom';
import { Container, ConteudoTitle, Title, BotaoAcao, ButtonWarning, Form, Label, Input, ButtonInfo, AlertDanger, AlertSuccess } from '../../../styles/custom_adm';
import api from '../../../config/configApi';

export const CadastrarUser = () => {
    const [usuario, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

 

    const valueImput = e => setUser({ ...usuario, [e.target.name]: e.target.value });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const addUser = async e => {
        e.preventDefault();
        const headers ={
            'headers':{
                'Content-Type': 'application/json'
            }
        }
        await api.post("cad-user", usuario, headers)
        .then((response) => {
          setStatus({
              type: 'redSuccess',
              mensagem:response.data.mensagem
          })
        }).catch((err) => {
            if (err.response) {
                setStatus({
                    type: "error",
                    mensagem: err.response.data.mensagem
                });
            } else {
                setStatus({
                    type: "error",
                    mensagem: "Erro: tente mais tarde!"
                });
            }
        });

    }

   
        return (
        <Container>
            <Menu></Menu><br />
            <ConteudoTitle>
                <Title>Cadastro de produtos</Title>
                <BotaoAcao>
                    <Link to={"/users/list"}><ButtonInfo type="button">voltar</ButtonInfo></Link>{" "}
                </BotaoAcao>
            </ConteudoTitle>
            {status.type === 'Error' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
            {status.type === 'Success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

            {status.type === 'redSuccess' ? <Redirect to={{
                pathname: "/users/list",
                state: {
                    type: 'redSuccess',
                    mensagem: status.mensagem
                }
            }}></Redirect> : ""}

            {/*  {status.type ==='Error' ? <p style={{color: 'red'}}>{status.mensagem}</p>:  ""} */}

            <Form onSubmit={addUser}>
                <Label>Nome: </Label>
                <Input type="text" name="name" placeholder="Nome do Usuário" onChange={valueImput} required="true"></Input>
                <Label>Email: </Label>
                <Input type="email" name="email" placeholder="Email do usuário" onChange={valueImput} required="true"></Input>
                <Label>Senha: </Label>
                <Input type="password" name="password" placeholder="Senha do usuário" onChange={valueImput} required="true"></Input>
                
                
                <hr></hr>

                <BotaoAcao>
                    <ButtonWarning type="submit">cadastrar</ButtonWarning>
                </BotaoAcao>
            </Form>
        </Container>
    );
}