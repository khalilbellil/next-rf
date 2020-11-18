const mysql = require('serverless-mysql')

const db = mysql({
    config: {
        host: '23.251.131.103',
        database: 'renofaciledz',
        user: 'khalilb',
        password: 'kookie09'
    },
})

exports.query = async (query) => {
    try {
        const results = await db.query(query)
        await db.end()
        return results
    } catch (error) {
        console.log('DB ERROR: ', error)
        return { error }
    }
}