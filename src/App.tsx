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
            colorBgBase: "#36C2CE",
            colorBgContainer: "#77E4C8",
            borderRadius: 10
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
