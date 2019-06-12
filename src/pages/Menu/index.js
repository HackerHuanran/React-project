import React, { Component } from 'react';
import { Menu, Icon ,Spin} from 'antd';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import './Menu.css';

const SubMenu = Menu.SubMenu;

 class Menus extends Component {
  constructor(props){
    super(props);
    this.state={
      MenuList:[],
      current:'1',
      roles:'',
      loading:true
    }
  }
  
  componentDidMount(){
    //获取用户id
    axios.get("/Manager/Role/User",{
      headers:{
             'X-AUTH-TOKEN':localStorage.getItem("jwtToken")
          }
    })
    .then(res => {
      //返回菜单
      const url = '/Manager/Menu/Role?roles='+res.data.roles;
        axios.get(url,{
          headers:{
                'X-AUTH-TOKEN':localStorage.getItem("jwtToken")
          }
        })
        .then(res => this.setState({
          MenuList:res.data.data,
          loading: false,
        })).catch(function () {
          window.location.href = "/Login"
        });
    })
  }
  
  handleClick = (e) => {
    // console.log(e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div className='containe'>
        <div className='MenuLogo'>
          <img src={require('../../assets/MenuLogo.png')} />
          <span className='MenusLogoText'>
          <a href='#'>后</a><a href='#' style={{color:'#ee4000'}}>台</a>
          <a href='#' style={{color:'#fff'}}>系统</a>
          </span>
        </div>
        <Spin spinning={this.state.loading} delay='500'>
        <Menu
          theme='dark'
          onClick={this.handleClick}
          mode="inline"
          defaultSelectedKeys={[this.state.current]}
        >
        <Menu.Item key='1'>
          <NavLink to='/'>
            <Icon type="home" />
            <span>首页</span>
          </NavLink>
        </Menu.Item>
        {
          //循环list列表
          this.state.MenuList.map((item) => {
            //判断1级菜单
              if(item.type === '1' ){
                return (
                  //1级菜单样式
                  <SubMenu title={<span><Icon type='pie-chart'/><span>{item.name}</span></span>} key={item.id} >
                        {/* 2级菜单*/}
                    {
                      this.state.MenuList.map((seconditem) =>{
                        // console.log(seconditem.url)
                        if(seconditem.type === '2' && item.id === seconditem.parentId){
                          return (
                            // console.log(seconditem.url)
                            <Menu.Item key={seconditem.id} url={seconditem.url}>
                              <NavLink to={seconditem.url}>{seconditem.name}</NavLink>
                            </Menu.Item>
                          )
                        }
                      })
                    }
                  </SubMenu>
                )
              }
          })
        }
        </Menu>
      </Spin>
    </div>
      
    )
  }
}
export default Menus;