import axios from 'axios';
import { Modal } from 'antd';

export default class Axios{
    //请求接口封装
    static ajax(options){
        // let baseApi = "http://192.168.6.87:8080"
        return new Promise((resolve,reject)=>{
            axios({
                // url:options.url,
                headers:{
                    'X-AUTH-TOKEN':localStorage.getItem("jwtToken")
                },
                method:'get',
                // baseURL:baseApi,
                timeout:10000,
                params:(options.data && options.data.params) || ''
            }).then((response)=>{
                if(response.status == '200'){
                    let res = response.data;
                    if(res.roles == '1'){
                        // 请求成功
                        resolve(res);
                    }else{
                       Modal.info({
                           title:'提示',
                           content:res.data.msg
                       })
                    }
                }else{
                    reject(response.data)
                }
            })
        })
    }
}
