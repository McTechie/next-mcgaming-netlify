exports.handler = async () => {
    console.log('function ran')

    const data = { name: 'techie', age: 19, job: 'developer' }

    // return response to browser
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}