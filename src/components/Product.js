import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import phone from '../components/images/phones.png'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})
    (({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

const Product = () => {

    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { id } = useParams()
    const productUrl = `https://dummyjson.com/products/${id}`
    const [productById, setProductById] = useState({
        images: []
    })

    const getDataById = async () => {
        try {
            setLoading(true);
            const resID = await axios.get(productUrl)
            setProductById(resID.data)
            setLoading(false);
        } catch (error) {
            console.log('error', error)
            alert(error.message)
        }
    }

    useEffect(() => {
        getDataById()
    }, [id])

    return (
        <div>
            <br /><br /><br />
            {loading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box> : <></>}
            <br /><br /><br />
            <br /><br /><br />
            <Card style={{ margin: '0 auto' }} sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="200"
                    // image={phone}
                    image={productById.images[0]}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {productById.title}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Description:</Typography>
                        <Typography paragraph>
                            {productById.description}
                        </Typography>
                        <Typography paragraph>
                            Price: {productById.price + '$'}
                        </Typography>
                        <Typography paragraph>
                            DiscountPercentage: {productById.discountPercentage + '$'}
                        </Typography>
                        <Typography paragraph>
                            Rating: {productById.rating}
                        </Typography>
                        <Typography>
                            Category: {productById.category}
                        </Typography>
                        <br />
                        <Typography>
                            Stock: {productById.stock}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>

        </div>
    )
}

export default Product;

