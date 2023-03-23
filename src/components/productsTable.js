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

    useEffect(() => {
        fetch(`https://dummyjson.com/products`)
            .then((response) => response.json())
            .then((actualData) => setProductsData(actualData.products))
            .catch((err) => {
                console.log(err.message);
            });
        console.log(productsData)
    }, [])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h1>Title</h1></TableCell>
                            <TableCell align="right"><h1>Brand</h1></TableCell>
                            <TableCell align="right"><h1>Rating</h1></TableCell>
                            <TableCell align="right"><h1>Price</h1></TableCell>
                            <TableCell align="right"><h1>About</h1></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productsData.map((product) => (
                            <TableRow
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
                                    <Link to='/products'>
                                        <VisibilityIcon />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
