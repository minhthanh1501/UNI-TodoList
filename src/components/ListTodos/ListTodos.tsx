import { useState } from 'react';
import { Button, List, Skeleton, Typography } from 'antd';
import { Todo } from '../../@types/Todo.type';
import { useQuery, UseQueryResult } from 'react-query';
import * as apis from "../../utils/axios/"



interface DataType {
    todos: Todo[]
    loading: boolean;
}



const ListTodos = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<DataType[]>([]);

    const { Title } = Typography;

    const { isLoading, isError, data, error, isSuccess }: UseQueryResult<DataType[], Error> = useQuery({
        queryKey: ['todos'],
        queryFn: () => {
            return apis.apiGetListTodos()
        },
    })

    // if (isLoading) {
    //     setLoading(true)
    //     return <span>Loading...</span>
    // }

    // if (isError) {
    //     return <span>Error: {error.message}</span>
    // }

    if (isSuccess) {
        // setList(data)
        console.log(data)
    }


    const onLoadMore = () => {
        setLoading(true);

    };

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

    return (
        <div className='flex items-center justify-center'>
            <div className='m-10'>
                <div className=''>
                    <Button style={{ backgroundColor: "green", color: "white" }}>Add Todo</Button>
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
                                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}

                            >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    {/* <List.Item.Meta
                                        avatar={<Avatar src={item.picture.large} />}
                                        title={<a href="https://ant.design">{item.name?.last}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    /> */}
                                    <div>content</div>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};


export default ListTodos