const postMessage = async (req,res) => {
    const db = req.app.get('db'),
        { title, img, content } = req.body,
        { id } = req.session.user;

    const postMessage = await db.post_message( [ id, title, img, content ] )
    return res.status(200).send(postMessage)
}

const getMessages = async (req,res) => {
    const db = req.app.get('db')
    const messages = await db.get_messages()
    res.status(200).json(messages)
} 

const searchTitle = (req, res) =>{
    console.log(req.params)
        // search for this
    let title = items.filter(items => items.title.toLowerCase() === req.params.title.toLowerCase())
        // return this
        console.log(title)
    res.json(title);
}


module.exports = {
    postMessage,
    getMessages, 
    searchTitle
}