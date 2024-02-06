import { createSlice } from "@reduxjs/toolkit";

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

const channelReducer = channelStore.reducer

export {setChannels}
export default channelReducer