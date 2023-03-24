import { TableRow } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Users } from './users'
import { ProductsTable } from './productsTable'


export const Search = () => {

    const [productNames, getProductNames] = useState([])

    const productUrlNames = `https://dummyjson.com/products`

    const getNames = async () => {
        try {
            const resNames = await axios.get(productUrlNames)
            getProductNames(resNames.data.products)
        } catch (error) {
            console.log('error', error)
            alert(error.message)
        }

    }

    useEffect(() => {
        getNames()
    }, [])

    console.log(productNames)

    const [query, setQuery] = useState('')


    return (
        // <div>
        //     <input
        //         type="text"
        //         placeholder='Search...'
        //         className="search"
        //         onChange={e => setQuery(e.target.value)} />
        //     {
        //         Users.filter((user) => user.first_name.toLowerCase().includes(query)).map((user) => {
        //             return (
        //                 <li key={user.id}>{user.first_name}</li>
        //             )
        //         })
        //     }
        // </div>
        <div>
            <input
                type="text"
                placeholder='Search...'
                className="search"
                onChange={e => setQuery(e.target.value)} />
            {
                productNames.filter((product) => product.title.toLowerCase().includes(query)).map((product) => (
                    <>{product.title}</>
                ))
            }
        </div>
    )
}
