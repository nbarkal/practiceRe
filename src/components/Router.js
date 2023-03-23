import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import * as path from './paths'
import Product from './Product';
import { ProductsTable } from './productsTable';


const renderNestedRoutes = r => {
    return (
        <Route
            element={r.redirect ? <Navigate replace to={r.redirect} /> : r.component}
            path={r.path}
            key={r.key}>
        </Route>
    )
}

export const RouterList = () => {

    const routes = [

        {
            component: <ProductsTable />,
            path: path.ProductsTable,
            key: path.ProductsTable,
        },
        {
            component: <Product />,
            path: path.Product,
            key: path.Product
        }

    ]

    return (
        <Routes>
            {routes.map(r => {
                return renderNestedRoutes(r)
            })}
        </Routes>
    )
}