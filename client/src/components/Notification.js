

const Notification = ({ message }) => {

    if (!message) {
        return null
    }

    return (
<div className={`message-banner ${message.type}`}>
{message.content}
</div>

    )

}

export default Notification