const PostMessageStream = require('post-message-stream')
const pageStream = new PostMessageStream({
    name: 'injected',
    target: 'contentscript'
})

pageStream.on('data', function ({
    status,
    error,
    data,
}) {
    console.log(data)
})

const send = (action, data) => {
    pageStream.write({
        from: 'page',
        action,
        data
    })
}

window.myWallet = {
    async hello() {
        send("EVENT", 'hello')
    }
}
