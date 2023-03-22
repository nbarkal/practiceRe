import React from 'react'
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const TheModal = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comArr, setComArr] = useState([])

  const showModal = async () => {
    console.log('props', props)
    const resP = await axios.get(`https://jsonplaceholder.typicode.com/posts/${props.id}/comments`)
    console.log('resPresP', resP)
    setComArr(resP.data)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
        {comArr.map(item => {
          return <div key={item.id}> {item.id} - {item.body}</div>
        })}
      </Modal>
    </div>
  )
}
