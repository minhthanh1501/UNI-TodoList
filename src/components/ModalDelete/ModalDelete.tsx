import { Modal } from 'antd';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import * as apis from "../../utils/axios"

const ModalDelete = ({ title, open, onOk, confirmLoading, onCancel, todoID }: any) => {
    const queryClient = useQueryClient()
    const DeleteTodoMutation = useMutation({
        mutationFn: (value: string | number) => apis.apiDeleteTodo(value)
    })

    const handleOk = () => {
        DeleteTodoMutation.mutate(todoID, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['todos'] })
            }
        })
        onOk()
    }

    return (
        <Modal title={title} open={open} confirmLoading={confirmLoading} onOk={handleOk} onCancel={onCancel}>
            <p>Chắc chắn xóa</p>
        </Modal>
    )
}

export default ModalDelete