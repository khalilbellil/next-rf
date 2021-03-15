const db = require('../../../lib/db')
const t_global = require('../../../rf_toolbox/global')

module.exports = async (req, res) => {
    let { code } = req.body
    res.status(200).json({
        department: await t_global.getDepartmentId(code)
    })
}
