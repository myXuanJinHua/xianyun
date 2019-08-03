import {Message} from 'element-ui'

export default ({axios})=>{
    $axios.onError(res=>{
        const {statusCode,message}=res.response.data
        if(statusCode){
            Message.warning(message)
        }
    })
}