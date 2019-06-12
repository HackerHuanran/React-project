import React, { Component } from 'react';
import {Form, Icon, Input, Button, Checkbox,Spin} from 'antd';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import './Login.css';
import {enc} from '../../components/LoginEnc'


class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      key:'',
      pk:'',
      success:'',
      token:'',
      loading:false
    }
  }

  
  //登陆页加载发送第一个请求，获得key/pk（密钥）
  componentDidMount= ()=>{
    axios.get("/Login")
    .then(res => this.setState({
      key:res.data.key,
      pk:res.data.pk
    }))
  }
 

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('表单获取的值 ', values);
        const password=enc(values.password,this.state.pk);//给明文密码进行加密
        const url='/Login/Commit?loginName='+values.userName+'&pwd='+encodeURIComponent(password)+'&key='+this.state.key;
        this.setState({
          loading:true
        })
        axios.get(url).then(res => {
          if(res.data.success){
            //登陆成功
            this.setState({
              loading:false
            })
            localStorage.setItem("jwtToken",res.data.token);
            window.location.href = "/"
          }else{
            return <Redirect to='/Login'/>
          }
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Spin 
      tip="Loading..." 
      spinning={this.state.loading} 
      size='large' 
      style={{marginTop:'150px'}}
      delay='500'
      >
      <div className='Login_web'>
        <div className='Login_img_wab'>
          <img src={require('../../assets/MenuLogo.png')} />
          <span className='MenuLogoText'>
          <a href='#'>陪</a><a href='#' style={{color:'#ee4000'}}>伴</a>
          <a href='#'>教育</a>
          </span>
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '用户名不能为空！' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住用户</Checkbox>
            )}
            <a className="login-form-forgot" href="">忘记密码</a>
            <Button type="primary" htmlType="submit" className="login-form-button" >
              登陆
            </Button>
            Or <a href="">注册新用户!</a>
          </Form.Item>
        </Form>
      </div>
      </Spin>
    );
  }
}
const WrappedRegistrationForm = Form.create()(Login);
export default WrappedRegistrationForm;
