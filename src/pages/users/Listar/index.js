
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from '../../../components/menus';

import { Container, ConteudoTitle, Title, BotaoAcao, ButtonSuccess, ButtonPrimary, ButtonWarning, ButtonDanger, Table, AlertSuccess, AlertDanger } from '../../../styles/custom_adm';
import api from '../../../config/configApi';

export const ListarUsers = () => {
    const [data, setData] = useState([]);

    const { state } = useLocation();

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const listarUsers = async () =>  {
        await api.get("/list-user")
        .then((response) => {
            /* console.log(response); */
            setData(response.data.users);
        })
        .catch((err) => {
               if(err.response) {
                setStatus({
                    type: "error",
                    mensagem: err.response.data.mensagem
                });
               }else{
                setStatus({
                    type: "error",
                    mensagem: "Erro: tente mais tarde!"
                });
               }
            });
    }

    useEffect(() => {
        listarUsers();
    }, []);

    const deleteUsers = async (idUser) => {
        /* alert("Produto Apagado" + idUser); */
        await api.delete("/destroy-user/"+ idUser)
        .then((response) => {
            /* console.log(response); */
            setStatus({
                type: "Success",
                mensagem:response.data.mensagem
            });
            listarUsers();
        })
        .catch((err) => {
               if(err.response) {
                setStatus({
                    type: "error",
                    mensagem: err.response.data.mensagem
                });
               }else{
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
                <Title>Bem vindo a listagem</Title>
                <BotaoAcao>
                    <Link to={"/users/create"}><ButtonSuccess type="button">Cadastrar</ButtonSuccess></Link>{" "}
                </BotaoAcao>
            </ConteudoTitle>
           
            {status.type === 'Success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
            {status.type === 'redSuccess' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
            {status.type === 'error' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}

            <hr></hr>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Cadastro</th>
                    </tr>
                </thead>
                <tbody>

                     {data.map(users => (
                        <tr >
                            <td>{users.id}</td>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>{users.password}</td>
                            <td>{users.createdAt}</td>
                            <td>
                                <Link to={"/users/view/" + users.id}><ButtonPrimary type="button">Detalhes</ButtonPrimary></Link>{" "}
                                <Link to={"/users/edit/" + users.id}><ButtonWarning type="button">Editar</ButtonWarning></Link>{" "}
                                <Link to={"#"}> <ButtonDanger onClick={() => deleteUsers(users.id)}>Apagar</ButtonDanger></Link>{" "}
                            </td>
                        </tr>
                    ))}

                </tbody>

            </Table>
        </Container>
    );
}