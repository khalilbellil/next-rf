const db = require('../../../lib/db')
const global = require('../../../rf_toolbox/global')

module.exports = async (req, res) => {
    let success = 'no'
    let { name, min_price, interval_precision } = req.body
    console.log(req.body)
    if(name, min_price, interval_precision){
        try {
            const ress = await db.query(`INSERT INTO sr_cost_calculator_service (name, min_price, interval_precision) VALUES('${name.replace(/'/g, "''")}', ${min_price}, ${interval_precision})`)
            success = 'yes'
        } catch (error) {
            success = 'no'
            console.log(error)
        }
    }
    res.status(200).json({
        success: success
    })
}