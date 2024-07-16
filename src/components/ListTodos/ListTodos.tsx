import { useEffect, useState } from 'react';
import { Button, List, Skeleton, Typography, } from 'antd';
import { Todo } from '../../@types/Todo.type';
import { useInfiniteQuery, useQuery } from 'react-query';
import * as apis from "../../utils/axios/"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalAdd from '../ModalAdd';
import ModalUpdate from '../ModalUpdate';
import ModalDelete from '../ModalDelete';
const { Title } = Typography;


const ListTodos = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<Todo[]>([])

    const loadMoreQuery = useInfiniteQuery({
        queryKey: ['todos'],
        queryFn: ({ pageParam = 1 }) => apis.apiGetListTodos({ _page: pageParam, _per_page: 3 }),
        getNextPageParam: (lastPage, allPages) => lastPage.next ?? false,
        // getPreviousPageParam: (firstPage, allPages) => firstPage.prev ?? false,
    })

    useEffect(() => {
        if (loadMoreQuery.data?.pages) {
            // Ghép các trang lại với nhau
            const newList = loadMoreQuery.data.pages.flatMap(page => page.data);
            setList(newList);
        }
        setLoading(false)
        setInitLoading(false)

    }, [loadMoreQuery.data])

    const onLoadMore = () => {
        setLoading(true)
        setTimeout(() => {
            loadMoreQuery.fetchNextPage();
            setLoading(false)
        }, 1000)
    };

    const loadMore =
        loadMoreQuery.hasNextPage ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore} disabled={loadMoreQuery.isFetchingNextPage} loading={loading}>loading more</Button>
            </div>
        ) : null;


    // handle modalAdd
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    // handle modalUpdate
    const [openUpdate, setOpenUpdate] = useState(false);
    const [confirmLoadingUpdate, setConfirmLoadingUpdate] = useState(false);

    const showModalUpdate = (id: string) => {
        setOpenUpdate(true);
        setSelectedTodoId(id);
    };

    const handleOkUpdate = () => {
        setConfirmLoadingUpdate(true);
        setTimeout(() => {
            setOpenUpdate(false);
            setConfirmLoadingUpdate(false);
        }, 1500);
    };

    const handleCancelUpdate = () => {
        console.log('Clicked cancel button');
        setOpenUpdate(false);
        setSelectedTodoId(null);
    };

    //handle delete
    const [openDelete, setOpenDelete] = useState(false);
    const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);

    const showModalDelete = (id: string) => {
        setOpenDelete(true)
        setSelectedTodoId(id);
    }

    const handleOkDelete = () => {
        setConfirmLoadingDelete(true);
        setTimeout(() => {
            setOpenDelete(false);
            setConfirmLoadingDelete(false);
        }, 1500);
    };

    const handleCancelDelete = () => {
        console.log('Clicked cancel button');
        setOpenDelete(false);
        setSelectedTodoId(null);
    };

    return (
        <div className='flex items-center justify-center'>
            <div className='m-10'>
                <div className=''>
                    <Button style={{ backgroundColor: "green", color: "white" }} onClick={showModal}>Add Todo</Button>
                </div>
                <div className='mt-10'>
                    <Title
                        style={{
                            textAlign: "center",
                            backgroundColor: "#4535C1",
                            margin: 0,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}
                    >
                        TodoList
                    </Title>
                    <List
                        style={{
                            backgroundColor: "#478CCF",
                            minWidth: "500px",
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            padding: 10
                        }}

                        className="demo-loadmore-list"
                        loading={initLoading}
                        itemLayout="horizontal"
                        loadMore={loadMore}
                        dataSource={list}
                        renderItem={(item) => (
                            <List.Item
                                key={item.id}
                                actions={[
                                    <Button key="list-edit" icon={<EditOutlined />} style={{ backgroundColor: "orange" }} onClick={() => showModalUpdate(item.id)}></Button>,
                                    <Button key="list-delete" icon={<DeleteOutlined />} style={{ backgroundColor: "red" }} onClick={() => showModalDelete(item.id)}></Button>
                                ]}
                            >
                                <Skeleton loading={false} active>
                                    <List.Item.Meta
                                        key={item.id}
                                        title={item.name}

                                    />
                                    {
                                        item.status ?
                                            <Button style={{ backgroundColor: 'green' }}>Done</Button>
                                            :
                                            <Button style={{ backgroundColor: 'orange' }}>UnFinish</Button>
                                    }
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>
                <ModalAdd title="ADD TODO"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel} />
                {selectedTodoId && (
                    <ModalUpdate
                        title="UPDATE TODO"
                        open={openUpdate}
                        onOk={handleOkUpdate}
                        confirmLoading={confirmLoadingUpdate}
                        onCancel={handleCancelUpdate}
                        todoID={selectedTodoId}
                    />
                )}
                {selectedTodoId && (
                    <ModalDelete
                        title="DELETE TODO"
                        open={openDelete}
                        onOk={handleOkDelete}
                        confirmLoading={confirmLoadingDelete}
                        onCancel={handleCancelDelete}
                        todoID={selectedTodoId}
                    />
                )}
            </div>
        </div>
    );
};


export default ListTodos