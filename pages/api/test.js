const db = require('../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
    const users = await db.query(escape`
        SELECT *
        FROM user
        ORDER BY id
        LIMIT 10
    `)
    res.status(200).json({
        test: "allo",
        users: users
    })
}