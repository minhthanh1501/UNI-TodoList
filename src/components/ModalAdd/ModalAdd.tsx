import { Form, Input, Modal } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import * as apis from "../../utils/axios"
import { Todo } from '../../@types/Todo.type';

const ModalAdd = ({ title, open, onOk, confirmLoading, onCancel }: any) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient()

    const addTodoMutation = useMutation({
        mutationFn: (value: Todo) => {
            return apis.apiAddTodo(value)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: 'todos' })
        }
    })

    const handleOk = () => {
        form.submit();
        form.setFieldsValue({ name: "" })
    };

    const onFinish = (value: Todo) => {
        console.log(value)
        addTodoMutation.mutate(value)
        onOk(); // Gọi hàm onOk đã truyền vào từ component cha
    };


    return (
        <Modal
            title={title}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
        >
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item name={'name'} label="Name">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAdd