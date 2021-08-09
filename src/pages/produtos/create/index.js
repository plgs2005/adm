
import React, { useState } from 'react';
import {Menu} from '../../../components/menus';
import {Link, Redirect} from 'react-router-dom';


import { Container, ConteudoTitle, Title, BotaoAcao, ButtonWarning, Form, Label, Input, ButtonInfo, AlertDanger, AlertSuccess } from '../../../styles/custom_adm';
import api from '../../../config/configApi';

export const CadastrarProd = () => {
    const [produto, setProduto] = useState({
        nome: '',
        preco_compra: '',
        preco_venda: '',
        qtde: ''
    });

 

    const [precoCompraTarget, setPrecoCompraTarget] = useState();
    const [precoVendaTarget, setPrecoVendaTarget] = useState();

    const valueImput = e => setProduto({ ...produto, [e.target.name]: e.target.value });

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const addProduto = async e => {
        e.preventDefault();
        const headers = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
        await api.post("cad-produto", produto, headers)
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

    const valuePrecoCompra = async e => {
        var valorPrecoCompraInput = e.target.value;

        valorPrecoCompraInput = valorPrecoCompraInput.replace(/\D/g, "");
        valorPrecoCompraInput = valorPrecoCompraInput.replace(/(\d)(\d{2})$/, "$1,$2");
        valorPrecoCompraInput = valorPrecoCompraInput.replace(/(?=(\d{3})+(\D))\B/g, ".");
        //9.725,82 - 9725.82
        setPrecoCompraTarget(valorPrecoCompraInput);

        var precoCompraSalvar = await valorPrecoCompraInput.replace(".", "");
        precoCompraSalvar = await precoCompraSalvar.replace(",", ".");

        setProduto({ ...produto, preco_compra: precoCompraSalvar});
    }

    const valuePrecoVenda = async e => {
        var precoVendaInput = e.target.value;

        precoVendaInput = precoVendaInput.replace(/\D/g, "");
        precoVendaInput = precoVendaInput.replace(/(\d)(\d{2})$/, "$1,$2");
        precoVendaInput = precoVendaInput.replace(/(?=(\d{3})+(\D))\B/g, ".");
        //9.725,82 - 9725.82
        setPrecoVendaTarget(precoVendaInput);

        var precoVendaSalvar = await precoVendaInput.replace(".", "");
        precoVendaSalvar = await precoVendaSalvar.replace(",", ".");

        setProduto({ ...produto, preco_venda: precoVendaSalvar});
    }
        return (
        <Container>
            <Menu></Menu><br />
            <ConteudoTitle>
                <Title>Cadastro de produtos</Title>
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

            {/*  {status.type ==='Error' ? <p style={{color: 'red'}}>{status.mensagem}</p>:  ""} */}

            <Form onSubmit={addProduto}>
                <Label>Nome: </Label>
                <Input type="text" name="nome" placeholder="Nome do produto" onChange={valueImput} required="true"></Input>
                
                <Label>Preço de Compra: </Label>
                <Input type="text" name="precoCompraTarget" placeholder="Preço de compra" value={precoCompraTarget} onChange={valuePrecoCompra} />
                
                <Label>Preço de venda: </Label>
                <Input type="text" name="precoVendaTarget" placeholder="Preço de venda" value={precoVendaTarget} onChange={valuePrecoVenda} />
                
                <Label>Qtde em estoque: </Label>
                <Input type="number" name="qtde" placeholder="1,5,6,10..." onChange={valueImput} required="true"></Input>
                <hr></hr>

                <BotaoAcao>
                    <ButtonWarning type="submit">cadastrar</ButtonWarning>
                </BotaoAcao>
            </Form>
        </Container>
    );
}