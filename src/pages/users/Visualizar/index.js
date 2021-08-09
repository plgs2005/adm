
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Menu } from '../../../components/menus';
import { Container, ConteudoTitle, Title, BotaoAcao, ConteudoView, ButtonInfo, ButtonWarning } from '../../../styles/custom_adm';
import api from '../../../config/configApi';

export const VisualizarUsers = (props) => {
    const [id] = useState(props.match.params.id);
   

    const [data, setData] = useState("");


    const [status, setStatus] = useState({
        type: "",
        mensagem: ""
    });

    useEffect(() => {
        const getUsers = async () => {
            await api.get("/list-user/" + id)
                .then((response) => {
                    /* console.log(response); */
                    setData(response.data.user);
                }).catch((err) => {
                    if (err.response) {
                        setStatus({
                            type: "redErro",
                            mensagem: err.response.data.mensagem
                        });
                    } else {
                        setStatus({
                            type: "redErro",
                            mensagem: "Erro: tente mais tarde!"
                        });
                    }
                });
        }
        getUsers();

    }, [id])
    return (
        <Container>
            <Menu></Menu><br />
            <ConteudoTitle>
                <Title>Usuário ID: {data.id}</Title>
                <BotaoAcao>
                    <Link to={"/users/list"}><ButtonInfo type="button">voltar</ButtonInfo></Link>{" "}

                    <Link to={"/users/edit/" + data.id}><ButtonWarning type="button">Editar</ButtonWarning></Link>{" "}
                </BotaoAcao>
            </ConteudoTitle>
            {status.type === 'redErro' ? <Redirect to={{
                pathname: "/users/list",
                state: {
                    type: 'redErro',
                    mensagem: status.mensagem
                }
            }}></Redirect> : ""}
            <hr></hr><br/>
            <ConteudoView>Nome: {data.name}</ConteudoView><br />
            <ConteudoView>Email: {data.email}</ConteudoView><br />
            <ConteudoView>Senha: {data.password}</ConteudoView><br />
            <ConteudoView>Cadastrado em: {data.createdAt}</ConteudoView><br />
        </Container>
    );
}