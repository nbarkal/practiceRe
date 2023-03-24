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

export const ProductsTable = () => {

    const [productsData, setProductsData] = useState([])

    const [query, setQuery] = useState('')


    useEffect(() => {
        fetch(`https://dummyjson.com/products`)
            .then((response) => response.json())
            .then((actualData) => setProductsData(actualData.products))
            .catch((err) => {
                console.log(err.message);
            });
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <br /><br /><br />
            <input
                style={{ margin: '0 auto', height: '30px', borderRadius: '12px' }}
                type="text"
                placeholder='Search...'
                className="search"
                onChange={e => setQuery(e.target.value)}
            />
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
                                                <a style={{ color: 'black' }}>
                                                    <VisibilityIcon />
                                                </a>
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
