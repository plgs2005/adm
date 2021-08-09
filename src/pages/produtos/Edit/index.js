
import React, { useEffect, useState } from "react";
import { Menu } from '../../../components/menus';

import { Link, Redirect } from 'react-router-dom';

import { Container, ConteudoTitle, Title, BotaoAcao, ButtonWarning, Form, Label, Input, ButtonInfo, AlertDanger, AlertSuccess } from '../../../styles/custom_adm';

import api from '../../../config/configApi';



export const EditarProd = (props) => {
    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState("");
    const [preco_compra, setPrecoCompra] = useState("");
    const [preco_venda, setPrecoVenda] = useState("");
    const [qtde, setQuantidade] = useState("");

    const [precoCompraTarget, setPrecoCompraTarget] = useState();
    const [precoVendaTarget, setPrecoVendaTarget] = useState();

    const editProduto = async e => {
        e.preventDefault();
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }


        await api.put("edit-produto", { id, nome, preco_compra, preco_venda, qtde }, headers)
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
        const getProduto = async () => {
            const headers = {
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }

            await api.get("/list-produto/" + id, headers)
                .then((response) => {
                    /* console.log(response); */
                    //setData(response.data.produto);
                    setNome(response.data.produto.nome);

                    setPrecoCompra(response.data.produto.preco_compra);
                    setPrecoCompraTarget(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' }).format(response.data.produto.preco_compra));


                    setPrecoVenda(response.data.produto.preco_venda);
                    setPrecoVendaTarget(new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' }).format(response.data.produto.preco_venda));

                    setQuantidade(response.data.produto.qtde);

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
        getProduto();
    }, [id]);
    const valuePrecoCompra = async (valorPrecoCompraInput) => {
        var valorPrecoCompraConvert = valorPrecoCompraInput.toString().replace(/\D/g, "");
        valorPrecoCompraConvert = valorPrecoCompraConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoCompraConvert = valorPrecoCompraConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");
        setPrecoCompraTarget(valorPrecoCompraConvert);

        var precoCompraSalvar = await valorPrecoCompraConvert.replace(".", "");
        precoCompraSalvar = await precoCompraSalvar.replace(",", ".");
        setPrecoCompra(precoCompraSalvar);
    }
    const valuePrecoVenda = async (valorPrecoVendaInput) => {
        var valorPrecoVendaConvert = valorPrecoVendaInput.toString().replace(/\D/g, "");
        valorPrecoVendaConvert = valorPrecoVendaConvert.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoVendaConvert = valorPrecoVendaConvert.replace(/(?=(\d{3})+(\D))\B/g, ".");
        setPrecoVendaTarget(valorPrecoVendaConvert);

        var precoVendaSalvar = await valorPrecoVendaConvert.replace(".", "");
        precoVendaSalvar = await precoVendaSalvar.replace(",", ".");
        setPrecoVenda(precoVendaSalvar);
    }
    return (
        <Container>
            <Menu></Menu><br />
            <ConteudoTitle>
                <Title>Editar de produtos</Title>
                <BotaoAcao>
                    <Link to={"/produtos/list"}><ButtonInfo type="button">voltar</ButtonInfo></Link>{" "}
                </BotaoAcao>
            </ConteudoTitle>
            {status.type === 'Error' ? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
            {status.type === 'Success' ? <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}

            {status.type === 'redSuccess' ? <Redirect to={{
                pathname: "/produtos/list",
                state: {
                    type: 'redSuccess',
                    mensagem: status.mensagem
                }
            }}></Redirect> : ""}
            <hr></hr>
            <Form onSubmit={editProduto}>
                <Label>Nome: </Label>
                <Input type="text" name="nome" placeholder="Nome do produto" value={nome} onChange={e => setNome(e.target.value)}></Input>
                <Label>Preço de Compra: </Label>
                <Input type="text" name="precoCompraTarget" placeholder="Preço de compra" value={precoCompraTarget} onChange={e => valuePrecoCompra(e.target.value)} />

                <Label>Preço de Venda: </Label>
                <Input type="text" name="precoVendaTarget" placeholder="Preço de venda" value={precoVendaTarget} onChange={e => valuePrecoVenda(e.target.value)} />

                <Label>Quantidade: </Label>
                <Input type="number" name="quantidade" placeholder="Quantidade do produto" value={qtde} onChange={e => setQuantidade(e.target.value)} />



                <BotaoAcao>
                    <ButtonWarning type="submit">Salvar</ButtonWarning>
                </BotaoAcao>
            </Form>
        </Container>
    );
}