const db = require('../../lib/db')
const escape = require('sql-template-strings')

export default function getTest(req, res){
    const users = await db.query(escape`
        SELECT *
        FROM user
        ORDER BY id
        LIMIT 10
    `)
    res.json({
        test: "allo",
        users: users
    })
}