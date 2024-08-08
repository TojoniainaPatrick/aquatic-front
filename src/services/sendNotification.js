import axios from "../api/axios"

const sendNotification = async ({ notification_object, notification_object_reference, notification_content, notification_receiver }) => {
    await axios.post('/notification/create', {
        notification_object,
        notification_object_reference,
        notification_content,
        notification_receiver
    })
}

module.exports = {
    sendNotification
}