import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';


import { Login } from '../pages/login';
import { Dashboard } from '../pages/Dashboard';
import { ListarProd } from '../pages/produtos/Listar';
import { VisualizarProd } from '../pages/produtos/Visualizar';
import { CadastrarProd } from '../pages/produtos/create';
import { EditarProd } from '../pages/produtos/Edit';

import { ListarUsers } from '../pages/users/Listar';
import { VisualizarUsers } from '../pages/users/Visualizar';
import { CadastrarUser } from '../pages/users/create';
import { EditarUser } from '../pages/users/Edit';


function CustomRoute({isPrivate, ...rest}) {
    const {authenticated, valUser} = useContext(Context);
    valUser()

    if (isPrivate && ! authenticated) {
        return <Redirect to="/"></Redirect>
    }

    return <Route {...rest} />
}

export default function RoutesAdm() {
    return (
        <Switch>
            <CustomRoute exact path="/" component={Login} />
            <CustomRoute exact isPrivate path="/dashboard" component={Dashboard} />
            <CustomRoute exact isPrivate path="/produtos/list" component={ListarProd} />
            <CustomRoute exact isPrivate path="/produtos/view/:id" component={VisualizarProd} />
            <CustomRoute exact isPrivate path="/produtos/create" component={CadastrarProd} />
            <CustomRoute exact isPrivate path="/produtos/edit/:id" component={EditarProd} />


            <CustomRoute exact isPrivate path="/users/list" component={ListarUsers} />
            <CustomRoute exact isPrivate path="/users/view/:id" component={VisualizarUsers} />
            <CustomRoute exact isPrivate path="/users/create" component={CadastrarUser} />
            <CustomRoute exact isPrivate path="/users/edit/:id" component={EditarUser} />
        </Switch>
    )
}