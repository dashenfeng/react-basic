import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const channelStore = createSlice({
    name:'channel',
    // 仓库的值
    initialState:{
        channelList:[],
    },
    // 仓库的方法
    reducers:{
        setChannels(state,actions){
            state.channelList = actions.payload
        }
    }
})

// 得到方法与reducer函数，便于后面的导出

const {setChannels} = channelStore.actions
const URL = 'http://geek.itheima.net/v1_0/channels'
// 感觉就是在加工一个方法，然后导出了，在实际脚本中再写这些应该也是可以的
const fetchChannelList = ()=>{
    return async (dispatch) => {
        const res = await axios.get(URL)
        console.log(res,'res');
        dispatch(setChannels(res.data.data.channels))
    }
}
const channelReducer = channelStore.reducer

export {fetchChannelList}
export default channelReducer