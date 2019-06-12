import React, { Component } from 'react'
import { Card } from 'antd';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
  render() {
    return (
      <Card title="首页" bordered={false}>
      <p>敬请期待</p>
      </Card>
    )
  }
}
