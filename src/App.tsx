import { ConfigProvider, Layout } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import Head from "./components/Head"
import ListTodos from "./components/ListTodos"

function App() {


  return (
    <Layout
      style={{
        minHeight: "100vh"
      }}>
      <Header>
        <Head />
      </Header>
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: "#405D72",
            colorBgContainer: "#758694",
            borderRadius: 10,
            colorTextTertiary: "red",
          }
        }}
      >
        <Layout>
          <Content>
            <ListTodos />
          </Content>
        </Layout>
      </ConfigProvider>
    </Layout>
  )
}

export default App
