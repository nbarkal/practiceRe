import axios from "axios";
import { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import { TheModal } from './modal'

const baseURL = "https://jsonplaceholder.typicode.com/posts";
const baseURLuser = "https://jsonplaceholder.typicode.com/users";
const commentURL = "https://jsonplaceholder.typicode.com/posts/1/comments";

const apies = [
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/users"
]

export const Post = () => {

    const [posts, setPosts] = useState([])

    const [users, setUsers] = useState([])

    const [comments, setComments] = useState([])

    const [postComments, showPostComments] = useState([])

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

    const array = posts;

    return (
        <div>
            {posts.map((post) => {
                return (
                    <div key={post.id} style={{display: 'flex'}}>
                        {post.id} <TheModal array={array} id={post.id} name='as' key={post.id} />
                    </div>
                )
            })}
        </div>
    );

}



