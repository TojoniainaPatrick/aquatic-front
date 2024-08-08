import { message } from 'antd'

export default function Messages(){
    
    const [ messageApi ] = message.useMessage()

    const success = ( message ) => {
        messageApi.open({
        type: 'success',
        content: message,
        });
    };

    const error = ( message ) => {
        messageApi.open({
        type: 'error',
        content: message,
        });
    };

    const warning = ( message ) => {
        messageApi.open({
        type: 'warning',
        content: message,
        });
    };

    return [ success, error, warning ]
}

