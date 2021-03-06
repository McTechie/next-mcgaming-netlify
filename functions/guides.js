exports.handler = async (event, context) => {
    const guides = [
        { title: 'Beat all Zelda bosses like a Bawse', author: 'mario' },
        { title: 'Mario Kart shortcuts You Never Knew Existed', author: 'luigi' },
        { title: 'The Ultimate Street Fighter Guide', author: 'chun-li' },
    ]

    if (context.clientContext.user) {
        return {
            statusCode: 200,
            body: JSON.stringify(guides)
        }
    }

    return {
        statusCode: 401,
        body: JSON.stringify({ message: 'ah, ah, ah you must be logged in to see this' })
    }
}