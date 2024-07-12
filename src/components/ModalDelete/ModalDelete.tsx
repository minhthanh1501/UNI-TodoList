import { Button, Modal } from 'antd';
import { useEffect } from 'react';

const ModalDelete = ({ title, open, onOk, confirmLoading, onCancel, todoID }: any) => {

    useEffect(() => {
        console.log("open")
    }, [open])

    return (
        <Modal title={title} open={open} confirmLoading={confirmLoading} onOk={onOk} onCancel={onCancel}>
            <p>Chắc chắn xóa</p>
        </Modal>
    )
}

export default ModalDelete