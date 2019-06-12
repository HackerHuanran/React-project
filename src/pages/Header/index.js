import React, { Component } from 'react'
import { Menu, Dropdown, Icon} from 'antd';
import axios from 'axios';
import './Header.css';


class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      userName:'',
      userOut:''
    }
    this.handleOut=this.handleOut.bind(this)
  }
  //页面加载请求
  componentDidMount= ()=>{
    axios.get("/Manager/Home",{
      headers:{
             'X-AUTH-TOKEN':localStorage.getItem("jwtToken")
          }
    })
    .then(res => this.setState({
      userName:res.data.name,
    }))
  }
  
//退出
  handleOut=()=>{
    axios.get("/Manager/Home/LoginOut",{
      headers:{
             'X-AUTH-TOKEN':localStorage.getItem("jwtToken")
          }
    })
    .then(res => {
      if(res.data.success){
          localStorage.removeItem("jwtToken");
          window.location.href = "/login"
          }
    })
  }
  render() {
    const menu = (
      <Menu theme='dark'>
        <Menu.Item  key='1'>
          <a target="_blank" onClick={this.handleOut} style={{textAlign:'center',lineHeight:'50px'}}>退出</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className='HeaderLogin'>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link">
            <Icon type="user" /> {this.state.userName} <Icon type="down" />
            </a>
          </Dropdown>
      </div>
    )
  }
}
export default Header;