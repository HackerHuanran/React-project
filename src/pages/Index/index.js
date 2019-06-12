import React, { Component } from 'react';
import { Layout ,Icon} from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from '../Menu/index';
import Headers from '../Header/index';
import WindowBig from '../WindowBig/index';
import Home from '../Home/index';
import UserList from '../User/list';
//路由文件
import './index.css';

const {Header, Footer, Sider, Content} = Layout;
class Index extends Component {
  constructor(props){
    super(props);
    this.state={
       collapsed: false,
    }
  }
  //左侧菜单收起
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout>
      {/* 左侧边栏 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
          <Menu />
      </Sider>
      {/* 右边栏 */}
      <Layout style={{height:'calc(100vh)',overflow:'auto'}}>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
          />
          <Headers />
          <WindowBig />
        </Header>
        <Content style={{ margin: '20px 16px 0' }}>
          <div style={{ padding: 10, minHeight: 600}}>
             {/* 内容页面跳转 */}
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          陪伴教育 ©2018 版权所有
        </Footer>
      </Layout>
    </Layout>
    );
  }
}

export default Index;
