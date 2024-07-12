import { Form, Input, Modal, Select } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as apis from "../../utils/axios"
import { Todo } from '../../@types/Todo.type';
import { Option } from 'antd/es/mentions';
import { useEffect, useState } from 'react';

const ModalUpdate = ({ title, open, onOk, confirmLoading, onCancel, todoID }: any) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient()
    const [todoData, setTodoData] = useState<Todo>()


    const { refetch } = useQuery({
        queryKey: ["todo", todoID],
        queryFn: ({ queryKey }) => {
            const [, id] = queryKey;
            return apis.apiGetTodo(id)
        },
        onSuccess: (result: apis.ResponseTodo) => {

            setTodoData(result[0]); // Convert [{...}] to {...}

            console.log(result)
        },
        enabled: false
    })


    useEffect(() => {
        if (open) {
            refetch();
        }
    }, [open, refetch]);

    const updateTodoMutation = useMutation({
        mutationFn: (value: Todo) => {
            return apis.apiUpdateTodo(value)
        },
        onSuccess: (result: apis.ResponseTodo) => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
            setTodoData(result[0]);
            console.log(todoData)
        }
    })

    const handleOk = () => {
        form.submit();
    };

    const onFinish = (value: Todo) => {
        console.log(value)
        updateTodoMutation.mutate(value)
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
            {todoData &&
                (<Form
                    initialValues={{
                        status: todoData.status ? "Done" : "UnFinish",
                        name: todoData.name,
                        id: todoData.id
                    }}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item name='id' label="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item name='name' label="Name" rules={[{ required: true, message: 'Please enter name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="status"
                        rules={[{ required: true, message: 'Please select status!' }]}
                    >
                        <Select placeholder="select your gender">
                            <Option value="true">Done</Option>
                            <Option value="false">UnFinish</Option>
                        </Select>
                    </Form.Item>
                </Form>)
            }
        </Modal>
    )
}

export default ModalUpdate