import React, { Component } from 'react'
import axios from 'axios';
import {Card,Spin,Table, Modal,Input,Button,Icon, message} from 'antd'
import Highlighter from 'react-highlight-words';
import Utils from '../../components/Utils/index';

class UserList extends Component {
  constructor(props){
    super(props);
    this.state={
      userdata: [],
      params : {
        page:1
      },
      loading:true,
      searchText: '',
      
    }
  }
  
  //请求数据
  componentDidMount() {
    this.request();
  }
  request = () => {
    let _this = this;
    axios.get("/Manager/User",{
          headers:{
                 'X-AUTH-TOKEN':localStorage.getItem("jwtToken")
              }
        })
        .then(res => {
          //返回用户列表
          const url = '/Manager/User?roles='+res.data.roles;
            axios.get(url,{
              headers:{
                    'X-AUTH-TOKEN':localStorage.getItem("jwtToken")
              },
              params:{
                pageNumber:_this.page
              }
            }).then((res) => {
              const backData=JSON.parse(res.data.data);
                 if(res.status == '200' ){
                   //添加key
                  backData.pageList.map((item, index) =>{
                    item.key= index
                  })
                  this.setState({
                    userdata:backData.pageList,
                    //调用分页方法并存到pagination
                    pagination:Utils.pagination(backData,(current)=>{
                      _this.page = current;
                      this.request();
                    }),
                    loading:false,
                })
              }
            })
        })
  }
  //删除数据接口
  UserDelete = () => {
    
  }
  //查询
      getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              查询
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              清除
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? 'red' : '#1890ff' ,fontSize:'15px'}} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      })

      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
      }

      handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
      }
    
      //删除单选/多选
      handleCelete =(item) =>{
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
          ids.push(item.id)
        })
          axios.get("/Manager/User",{
            headers:{
                  'X-AUTH-TOKEN':localStorage.getItem("jwtToken")
                }
          })
          .then(res => {
            const url = '/Manager/User?ids='+ids;
              axios.delete(url,{
                headers:{
                      'X-AUTH-TOKEN':localStorage.getItem("jwtToken")
                }
              }).then((res) => {
                let successdata = res.data
                if(successdata.success){
                  Modal.confirm({
                    title:'删除提示',
                    content:'您确定要删除这些数据吗？',
                    onOk:()=>{
                      message.success('删除成功');
                    }
                  })
                  this.request();
                  this.setState({
                    selectedRowKeys:null,
                    selectedRows:null
                  })
                }
              })
          })
         
      }
  render() {
    //表头
    const columns =[{
      title:'用户名',
      dataIndex:'loginName',
      ...this.getColumnSearchProps('loginName'),
    },{
      title:'姓名',
      dataIndex:'name',
      ...this.getColumnSearchProps('name'),
    },{
      title:'状态',
      dataIndex:'activeName',
      ...this.getColumnSearchProps('activeName'),
    }
  ]
  //全选单选/多选
  const rowSelection = {
    //监听keys
    onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
    return (
      <div>
        <Spin spinning={this.state.loading} delay='100'>
          <Card style={{marginTop:'5px'}}>
          <div>
            <Button style={{marginRight:'15px'}} type="primary">增加</Button>
            <Button style={{marginRight:'15px'}} type="dashed">修改</Button>
            <Button onClick={this.handleCelete} type="danger">删除</Button>
          </div>
            <Table
              bordered
              columns={columns}
              dataSource={this.state.userdata}
              rowSelection={rowSelection}
              pagination={this.state.pagination}
              style={{marginTop:'10px'}}
            />
          </Card>
        </Spin>
      </div>
    )
  }
}
export default UserList;