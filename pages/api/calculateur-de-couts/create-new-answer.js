const db = require('../../../lib/db')
const global = require('../../../rf_toolbox/global')

module.exports = async (req, res) => {
    let success = 'no'
    let { name, influence_method, influence_value, id_question } = req.body
    console.log(req.body)
    if(name && id_question){
        try {
            await db.query(`INSERT INTO sr_cost_calculator_answer (id_question, name ${(influence_method)?', influence_method, influence_value':''}) 
            VALUES(${id_question}, '${name.replace(/'/g, "''")}' ${(influence_method)?`, '${influence_method}', ${influence_value}`:''})`)
            success = 'yes'
        } catch (error) {
            console.log(error)
            success = 'no'
        }
    }
    res.status(200).json({
        success: success
    })
}