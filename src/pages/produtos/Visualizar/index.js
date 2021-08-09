
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Menu } from '../../../components/menus';
import { Container, ConteudoTitle, Title, BotaoAcao, ConteudoView, ButtonInfo, ButtonWarning } from '../../../styles/custom_adm';
import api from '../../../config/configApi';

export const VisualizarProd = (props) => {
    const [id] = useState(props.match.params.id);
   

    const [data, setData] = useState("");


    const [status, setStatus] = useState({
        type: "",
        mensagem: ""
    });

    useEffect(() => {
        const getProduto = async () => {
            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/list-produto/" + id, headers)
                .then((response) => {
                    /* console.log(response); */
                    setData(response.data.produto);
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
        getProduto();

    }, [id])
    return (
        <Container>
            <Menu></Menu><br />
            <ConteudoTitle>
                <Title>Produto ID: {data.id}</Title>
                <BotaoAcao>
                    <Link to={"/produtos/list"}><ButtonInfo type="button">voltar</ButtonInfo></Link>{" "}

                    <Link to={"/produtos/edit/" + data.id}><ButtonWarning type="button">Editar</ButtonWarning></Link>{" "}
                </BotaoAcao>
            </ConteudoTitle>
            {status.type === 'redErro' ? <Redirect to={{
                pathname: "/produtos/list",
                state: {
                    type: 'redErro',
                    mensagem: status.mensagem
                }
            }}></Redirect> : ""}
            <hr></hr>
            <ConteudoView>Nome: {data.nome}</ConteudoView><br />
            <ConteudoView>Valor compra : {new Intl.NumberFormat('pt-br', {style:'currency', currency: 'BRL'}).format(data.preco_compra)}</ConteudoView><br />
            <ConteudoView>Valor Venda: {new Intl.NumberFormat('pt-br', {style:'currency', currency: 'BRL'}).format(data.preco_venda)}</ConteudoView><br />
            <ConteudoView>Qtde: {data.qtde}</ConteudoView><br />
        </Container>
    );
}