
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from '../../../components/menus';

import { Container, ConteudoTitle, Title, BotaoAcao, ButtonSuccess, ButtonPrimary, ButtonWarning, ButtonDanger, Table, AlertSuccess, AlertDanger } from '../../../styles/custom_adm';


import api from '../../../config/configApi';

export const ListarProd = () => {
    
    
   
    const [data, setData] = useState([]);

    const { state } = useLocation();

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : ""
    });

    const listarProdutos = async () =>  {
        const headers = {
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        
        await api.get("/list-produto", headers)
        .then((response) => {
             console.log(response);  
            setData(response.data.produtos);
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
        listarProdutos();
    }, []);

    const deleteProduto = async (idProduto) => {
        /* alert("Produto Apagado" + idProduto); */
        await api.delete("/destroy-produto/"+ idProduto)
        .then((response) => {
            /* console.log(response); */
            setStatus({
                type: "Success",
                mensagem:response.data.mensagem
            });
            listarProdutos();
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
                    <Link to={"/produtos/create"}><ButtonSuccess type="button">Cadastrar</ButtonSuccess></Link>{" "}
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
                        <th>Valor</th>
                        <th>Qtde</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                     {data.map(produto => (
                        <tr >
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{new Intl.NumberFormat('pt-br', {style:'currency', currency: 'BRL'}).format(produto.preco_venda)}</td>
                            <td>{produto.qtde}</td>
                            <td>
                                <Link to={"/produtos/view/" + produto.id}><ButtonPrimary type="button">Detalhes</ButtonPrimary></Link>{" "}
                                <Link to={"/produtos/edit/" + produto.id}><ButtonWarning type="button">Editar</ButtonWarning></Link>{" "}
                                <Link to={"#"}> <ButtonDanger onClick={() => deleteProduto(produto.id)}>Apagar</ButtonDanger></Link>{" "}
                            </td>
                        </tr>
                    ))}

                </tbody>

            </Table>
        </Container>
    );
}