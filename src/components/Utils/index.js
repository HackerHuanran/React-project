export default {
    //分页
    pagination(data,Callback){
        let page = {
            onChange:(current)=>{
                Callback(current);
            },
             current:data.pageNumber,
             pageSize:data.pageRows,
             total:data.pageCountRows,
            showTotal:()=>{
                return `共 ${data.pageCountRows} 条`
            },
            showQuickJumper:true
        }
        return page;
    }
}