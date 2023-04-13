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
import { Button, Modal } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { message, Popconfirm } from 'antd';
import './allPage.css'
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';

export const ProductsTable = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyB1oo6BwlXetj3zAaaS1DRPoGn7J6cwqL0",
        authDomain: "my-aw-3d948.firebaseapp.com",
        projectId: "my-aw-3d948",
        storageBucket: "my-aw-3d948.appspot.com",
        messagingSenderId: "848761929817",
        appId: "1:848761929817:web:947e921f1d460047bd3148",
        measurementId: "G-KFB94Y1G80"
    };

    const [option1Checked, setOption1Checked] = useState(false);
    const [option2Checked, setOption2Checked] = useState(false);

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);

    const [productsData, setProductsData] = useState([])
    const [productsDataId, setProductsDataId] = useState([])

    const [query, setQuery] = useState('')

    const [set, unSet] = useState()




    const option11Checked = () => {
        return (
            setProduct({ ...product, condition: 'new' }),
            setOption1Checked(true), setOption2Checked(false)
        )
    }

    const option22Checked = () => {
        return (
            setProduct({ ...product, condition: 'used' }),
            setOption2Checked(true), setOption1Checked(false)
        )
    }


    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [discountPercentage, setDiscountPercentage] = useState()
    // const [price, setPrice] = useState()
    // const [rating, setRating] = useState()
    // const [stock, setStock] = useState()
    // const [brand, setBrand] = useState('')
    // const [category, setCategory] = useState('')

    // const [addTitle, setAddTitle] = useState('')
    // const [addDescription, setAddDescription] = useState('')
    // const [addDiscountPercentage, setAddDiscountPercentage] = useState()
    // const [addPrice, setAddPrice] = useState()
    // const [addRating, setAddRating] = useState()
    // const [addStock, setAddStock] = useState()
    // const [addBrand, setAddBrand] = useState('')
    // const [addCategory, setAddCategory] = useState('')


    const handleChangeBox = (event) => {
        setProduct({ ...product, category: event.target.value })
    };


    const [product, setProduct] = useState({
        title: '',
        price: 0,
        description: '',
        discountPercentage: '',
        price: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        condition: ''
    })

    // const onChange = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // };

    // const onChange2 = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // };

    const [editModal, setEditModal] = useState(null)

    const getAllPost = () => {
        fetch(`http://localhost:3000/posts`)
            .then((response) => response.json())
            .then((actualData) => setProductsData(actualData))
            // .then((actualData) => console.log(actualData,'dasdfsdf'))
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        getAllPost()
    }, [])

    console.log(productsData)


    const search = async () => {
        console.log('queryquery', query)
        try {
            const resForId = await axios.get(`http://localhost:3000/posts?q=${query}`)
            console.log('resForIdresForId', resForId)
            setProductsData(resForId.data)
        } catch (error) {
            console.log('error', error)
            alert(error.message)
        }
    }

    const handleOk = () => {
        // const controller = new AbortController();
        // const signal = controller.signal;
        console.log(product)
        fetch('http://localhost:3000/posts', {
            // signal,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                product
            )
        })
            .then(res => res.json())
            .then(getAllPost)
        setIsModalOpen(false);
    };

    const handleOk1 = async () => {
        try {
            await axios.put(
                `http://localhost:3000/posts/${product.id}`,
                product
            );
            getAllPost()
        } catch (error) {
            console.log(error);
        }
        console.log(product)
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal1 = () => {
        setIsModalOpen(true);
        unSet(true)
    }


    const showModal = async (product) => {
        setProduct(product)
        setIsModalOpen(true);
        unSet(false)
        console.log(product)
        setEditModal(product)
    };

    const removeUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/posts/${id}`)
            console.log('Item successfully deleted.')
            setProductsData(product => product.filter((u) => u.id !== id));
        } catch (error) {
            alert(error)
        }
    }

    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <br /><br /><br />
            <div style={{ display: 'flex', alignItems: 'center', height: '50px' }}>
                <Button style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    marginRight: '20px', width: '40px', height: '40px', borderRadius: '50%',
                    background: 'grey'
                }}
                    type="primary"
                    onClick={showModal1}
                >
                    <AddIcon style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                </Button>
                <input
                    style={{ margin: '0 auto', height: '30px', borderRadius: '12px', border: '1px solid grey' }}
                    type="text"
                    placeholder='Search...'
                    className="search"
                    onChange={e => setQuery(e.target.value)}
                />
                <button onClick={search} type='submit'
                    style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        marginLeft: '20px', border: 'none', borderRadius: '50%', width: '40px', height: '40px',
                        background: 'grey', cursor: 'pointer'
                    }}>
                    {/* {
                        productsDataId.map((productos) => {
                            return (
                                <Link key={productos.id} to={`product/${productos.id}`}>
                                    <SearchIcon />
                                </Link>
                            )
                        })
                    } */}
                    <SearchIcon style={{ color: 'white', width: '27px', height: '27px', borderRadius: '50%' }} />
                </button>
            </div>
            <br /><br /><br />
            <Modal open={isModalOpen}
            onOk={() => set ? handleOk() : handleOk1(editModal)}
            onCancel={handleCancel}
                // footer={[
                //     <Button key="back" onClick={handleCancel}>
                //         Return
                //     </Button>,
                //     // <Button key="submit" type="primary" onClick={() => set ? handleOk() : handleOk1(editModal)}>
                //     //     Submit
                //     // </Button>,
                //     // <Button
                //     //     key="link"
                //     //     href="https://google.com"
                //     //     type="primary"
                //     //     loading={loading}
                //     //     onClick={handleOk}
                //     // >
                //     //     Search on Google
                //     // </Button>,
                // ]}
            >
                <div key={editModal?.id} style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
                    <label>Title</label>
                    <input
                        value={product?.title}
                        onChange={e => setProduct({ ...product, title: e.target.value })}
                        style={{ marginTop: '5px', padding: '5px', borderRadius: '12px', border: '1px solid grey' }} />
                    <label>Price</label>
                    <input
                        value={product?.price}
                        type='number'
                        onChange={e => setProduct({ ...product, price: e.target.value })}
                        style={{ marginTop: '5px', padding: '5px', borderRadius: '12px', border: '1px solid grey' }} />
                    <label>Brand</label>
                    <input
                        value={product?.brand}
                        onChange={e => setProduct({ ...product, brand: e.target.value })}
                        style={{ marginTop: '5px', padding: '5px', borderRadius: '12px', border: '1px solid grey' }} />
                    <label>Category</label>
                    {/* <input
                        value={product?.category}
                        onChange={e => setProduct({ ...product, category: e.target.value })}
                        style={{ marginTop: '5px', padding: '5px', borderRadius: '12px', border: '1px solid grey' }} /> */}
                    <Box sx={{ minWidth: 120 }} style={{ marginTop: '5px', padding: '5px', borderRadius: '12px', border: '1px solid grey' }}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">
                                {console.log(product.category)}
                                {product.category}
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={product.category}
                                onChange={handleChangeBox}
                            >
                                <MenuItem value='ten'>Ten</MenuItem>
                                <MenuItem value='twenty'>Twenty</MenuItem>
                                <MenuItem value='thisty'>Thirty</MenuItem>
                                <MenuItem value={product?.category}>{product?.category}</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <label>Description</label>
                    <input
                        value={product?.description}
                        onChange={e => setProduct({ ...product, description: e.target.value })}
                        style={{ marginTop: '5px', padding: '5px', borderRadius: '12px', border: '1px solid grey' }} />
                    <label>DiscountPercentage</label>
                    <input
                        value={product?.discountPercentage}
                        type='number'
                        onChange={e => setProduct({ ...product, discountPercentage: e.target.value })}
                        style={{ marginTop: '5px', padding: '5px', borderRadius: '12px', border: '1px solid grey' }} />
                    <label>Rating</label>
                    <input
                        value={product?.rating}
                        type='number'
                        onChange={e => setProduct({ ...product, rating: e.target.value })}
                        style={{ marginTop: '5px', padding: '5px', borderRadius: '12px', border: '1px solid grey' }} />
                    <br />
                    <div style={{ display: 'flex', width: '120px', justifyContent: 'space-between' }}>
                        <div>
                            <label>new</label>
                            <input
                                type='checkbox'
                                checked={option1Checked}
                                onChange={option11Checked}
                            />
                        </div>
                        <div>
                            <label>used</label>
                            <input
                                type='checkbox'
                                checked={option2Checked}
                                onChange={option22Checked}
                            />
                        </div>
                    </div>
                    <br />
                    <label>Stock</label>
                    <input
                        value={product?.stock}
                        type='number'
                        onChange={e => setProduct({ ...product, stock: e.target.value })}
                        style={{ marginTop: '5px', padding: '5px', borderRadius: '12px', border: '1px solid grey' }} />
                </div>
            </Modal >
            <div style={{ padding: '100px' }}>
                <TableContainer style={{ border: '3px solid grey', borderRadius: '24px' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead style={{ borderBottom: '2px solid grey' }}>
                            <TableRow>
                                <TableCell><h1>Title</h1></TableCell>
                                <TableCell align="right"><h1>Brand</h1></TableCell>
                                <TableCell align="right"><h1>Category</h1></TableCell>
                                <TableCell align="right"><h1>Rating</h1></TableCell>
                                <TableCell align="right"><h1>Price</h1></TableCell>
                                <TableCell align="right"><h1>About</h1></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsData?.map((product) => {
                                return (
                                    <TableRow
                                        style={{ borderTop: '2px solid grey' }}
                                        key={product.title}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="product">
                                            {product.title}
                                        </TableCell>
                                        <TableCell align="right">{product.brand}</TableCell>
                                        <TableCell align="right">{product.category}</TableCell>
                                        <TableCell align="right">{product.rating}</TableCell>
                                        <TableCell align="right">{product.price}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`product/${product.id}`}>
                                                <VisibilityIcon style={{ color: 'black' }} />
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <Popconfirm
                                                className='deleteContainer'
                                                title="Delete the task"
                                                description="Are you sure?"
                                                onConfirm={(e) => {
                                                    console.log(e);
                                                    removeUser(product.id);
                                                    message.success('Click on Yes');
                                                }}
                                                onCancel={cancel}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <a
                                                    style={{ border: 'none', background: 'none' }}>
                                                    <DeleteIcon style={{ cursor: 'pointer' }} />
                                                </a>
                                            </Popconfirm>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                style={{
                                                    boxShadow: 'none',
                                                    background: 'none',
                                                    border: 'none',
                                                    outline: 'none'
                                                }}
                                                type="primary"
                                                onClick={() => showModal(product)}
                                            >
                                                <EditIcon style={{ color: 'black', cursor: 'pointer' }} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>

                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div >
    )
}
