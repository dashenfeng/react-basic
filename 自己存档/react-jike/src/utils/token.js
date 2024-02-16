// 封装token相关的方法

const TOKENKEY = 'token_key'
const setToken = (token)=>{
    localStorage.setItem(TOKENKEY,token)
}

const getToken = ()=>{
    return localStorage.getItem(TOKENKEY)
}

const removeToken = ()=>{
    return localStorage.removeItem(TOKENKEY)
}

export {setToken,getToken,removeToken}