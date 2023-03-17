import React from 'react'
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

export const TheModal = ( props ) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = async () => {
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
        {props.name}
      </Modal>
    </div>
  )
}
