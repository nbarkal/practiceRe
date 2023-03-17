import axios from "axios";
import { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import { TheModal } from './modal'

const baseURL = "https://jsonplaceholder.typicode.com/posts";
const baseURLuser = "https://jsonplaceholder.typicode.com/users";
const commentURL = "https://jsonplaceholder.typicode.com/posts/4/comments";

const apies = [
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/users"
]

export const Post = () => {

    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const showModal = async () => {
    //     setIsModalOpen(true);
    // };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };


    const [posts, setPosts] = useState([])

    const [users, setUsers] = useState([])

    const [comments, setComments] = useState([])

    const getPosts = async () => {
        try {
            const res = await axios.get(baseURL)
            setPosts(res.data)
        } catch (error) {
            console.log('error', error)
            alert(error.message)
        }
    }

    const getUsers = async () => {
        try {
            const resU = await axios.get(baseURLuser)
            setUsers(resU.data)
        } catch (error) {
            console.log('error', error)
            alert(error.message)
        }
    }


    const getComments = async () => {
        try {
            const resU = await axios.get(commentURL)
            setComments(resU.data)
        } catch (error) {
            console.log('error', error)
            alert(error.message)
        }
    }


    useEffect(() => {
        getPosts();
        getUsers();
        getComments();
    }, [])

    return (
        <>
            {comments.map((comment) => {
                return (
                    <div style={{display: 'flex'}}>
                        {comment.name} <TheModal id={comment.id} name={comment.body} key={comment.id} />
                    </div>
                )
            })}
        </>
    );
}



