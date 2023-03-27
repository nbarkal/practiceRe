import * as React from 'react';
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export const ProductsTable = () => {

    const [productsData, setProductsData] = useState([])
    const [productsDataId, setProductsDataId] = useState([])

    const [query, setQuery] = useState('')


    useEffect(() => {
        fetch(`https://dummyjson.com/products`)
            .then((response) => response.json())
            .then((actualData) => setProductsData(actualData.products))
            .catch((err) => {
                console.log(err.message);
            });
    }, [])

    const search = async () => {
        try {
            const resForId = await axios.get(`https://dummyjson.com/products/search?q=${query}`)
            setProductsDataId(resForId.data.products)
        } catch (error) {
            console.log('error', error)
            alert(error.message)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <br /><br /><br />
            <div style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
                <input
                    style={{ margin: '0 auto', height: '30px', borderRadius: '12px' }}
                    type="text"
                    placeholder='Search...'
                    className="search"
                    onChange={e => setQuery(e.target.value)}
                />
                <button onClick={search} type='submit' style={{ marginLeft: '20px', borderRadius: '50%', width: '40px', height: '40px' }}>
                    {
                        productsDataId.map((productos) => {
                            return (
                                <Link key={productos.id} to={`product/${productos.id}`}>
                                    <SearchIcon />
                                </Link>
                            )
                        })
                    }

                </button>
            </div>
            <div style={{ padding: '100px' }}>
                <TableContainer style={{ border: '3px solid grey', borderRadius: '24px' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{ borderBottom: '2px solid grey' }}>
                            <TableRow>
                                <TableCell><h1>Title</h1></TableCell>
                                <TableCell align="right"><h1>Brand</h1></TableCell>
                                <TableCell align="right"><h1>Rating</h1></TableCell>
                                <TableCell align="right"><h1>Price</h1></TableCell>
                                <TableCell align="right"><h1>About</h1></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                productsData.filter((product) => product.title.toLowerCase().includes(query)).map((product) => (
                                    <TableRow
                                        style={{ borderTop: '2px solid grey' }}
                                        key={product.title}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="product">
                                            {product.title}
                                        </TableCell>
                                        <TableCell align="right">{product.brand}</TableCell>
                                        <TableCell align="right">{product.rating}</TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`product/${product.id}`}>
                                                <VisibilityIcon style={{ color: 'black' }} />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}
