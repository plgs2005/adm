
import React, { useEffect, useState } from "react";
import { Menu } from '../../../components/menus';

import { Link, Redirect } from 'react-router-dom';

import { Container, ConteudoTitle, Title, BotaoAcao, ButtonWarning, Form, Label, Input, ButtonInfo, AlertDanger, AlertSuccess } from '../../../styles/custom_adm';

import api from '../../../config/configApi';



export const EditarUser = (props) => {
    const [id] = useState(props.match.params.id);
    const [name, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
   


    const editUser = async e => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        await api.put("edit-users", { id, name, email, password }, headers)
            .then((response) => {
                setStatus({
                    type: 'redSuccess',
                    mensagem: response.data.mensagem
                })
            }).catch((err) => {
                if (err.response) {
                    setStatus({
                        type: "Error",
                        mensagem: err.response.data.mensagem
                    });
                } else {
                    setStatus({
                        type: "Error",
                        mensagem: "Erro: tente mais tarde!"
                    });
                }
            });

    }

    const [status, setStatus] = useState({
        type: "",
        mensagem: ""
    });


    useEffect(() => {
        const getUser = async () => {
            await api.get("/list-user/" + id)
                .then((response) => {
                     console.log(response); 
                    //setData(response.data.produto);
                    setNome(response.data.user.name);
                    setEmail(response.data.user.email);  
                    setPass(response.data.user.password);

                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: "Error",
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: "Error",
                            mensagem: "Erro: tente mais tarde!"
                        });
                    }
                });
        }
        getUser();
    }, [id]);
   
    return (
        <Container>
            <Menu></Menu><br />
            <ConteudoTitle>
                <Title>Editar Usuário</Title>
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
            <hr></hr>
            <Form onSubmit={editUser}>
                <Label>Nome: </Label>
                <Input type="text" name="name" placeholder="Nome do usuario" value={name} onChange={e => setNome(e.target.value)}></Input>
                <Label>Email: </Label>
                <Input type="email" name="email" placeholder="Email do usuário" value={email} onChange={e => setEmail(e.target.value)}></Input>
                <Label>Senha: </Label>
                <Input type="password" name="password" placeholder="Senha do Usuario" value={password} onChange={e => setPass(e.target.value)}></Input>



                <BotaoAcao>
                    <ButtonWarning type="submit">Salvar</ButtonWarning>
                </BotaoAcao>
            </Form>
        </Container>
    );
}