export const state = () => {
    return {
        historyList:[]
    }
}
export const mutations= {
    // state就是上面的state，这个参数是固定默认的
    // data使用调用该方法时候传入的数据
    // 设置上面数据的方法
    setHistoryList(state,data){
        state.historyList=data
    }
}