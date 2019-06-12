import React, { Component } from "react";
import { Button } from "antd";
import { judgeIsSupportFull, fullScreen, fullExit } from "../../components/screenMax/index";
export default class FullScree extends Component {
  state = {
    isSupportFull: false,
    isFull: false
  };
  componentDidMount() {
    window.addEventListener("resize", this.changeFullStatus);
    this.judgeIsSupportFull();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.changeFullStatus);
  }
  // 判断当前浏览器是否支持全屏API
  judgeIsSupportFull = () => {
    let isSupportFull = judgeIsSupportFull();
    this.setState({ isSupportFull });
  };
  // 计算当前是否处于全屏
  changeFullStatus = () => {
    // 判断网页的高度或者宽度是否等于屏幕对应大小
    // true: 当前处于全屏状态
    // false: 当前不处于全屏状态
    if (
      document.body.scrollHeight === window.screen.height ||
      document.body.scrollWidth === window.screen.width
    ) {
      this.setState({ isFull: true });
    } else {
      this.setState({ isFull: false });
    }
  };
  //点击全屏
  handClick = () => {
    this.state.isFull ? fullExit() : fullScreen();
  };
  render() {
    let { isSupportFull } = this.state;

    if (!isSupportFull) {
      return null;
    }

    return (
      <Button
        style={{ 
          border: "none", 
          color: "#696969" ,
          float:'right',
          lineHeight:'65px',
          fontSize:'20px',
          margin:'0 15px'
        }}
        onClick={this.handClick}
        shape="circle"
        icon={this.state.isFull ? "shrink" : "arrows-alt"}
      />
    );
  }
}