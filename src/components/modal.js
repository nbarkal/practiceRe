import React from 'react'
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const TheModal = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [array, newArray] = useState(props.array)
  const [comArr, setComArr] = useState([])

  const showModal = () => {
    setIsModalOpen(true);

    newArray(array.map((arr) => {
      return (
        arr.id
      )
    }))
  };

  const getPostComments = async () => {
    try {
      const resP = await axios.get(`https://jsonplaceholder.typicode.com/posts/${array[2].id}/comments`)
      setComArr(resP.data)
    } catch (error) {
      console.log('error', error)
      alert(error.message)
    }
  }

  useEffect(() => {
    getPostComments()
  }, [comArr])



  const handleOk = () => {
    setIsModalOpen(false);
    console.log(array)
    console.log(comArr)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        comments
      </Button>
      <Modal title={props.id} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {props.name}
      </Modal>
    </div>
  )
}
