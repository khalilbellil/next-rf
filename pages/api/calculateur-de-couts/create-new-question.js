const db = require('../../../lib/db')
const global = require('../../../rf_toolbox/global')

module.exports = async (req, res) => {
    let success = 'no'
    let { name, answer_is_a_field, id_parent_answer, id_question } = req.body
    let insertedId = undefined
    console.log(req.body)
    if(name){
        try {
            if(answer_is_a_field){
                const ress = await db.query(`INSERT INTO sr_cost_calculator_question (name, answer_is_a_field) VALUES('${name}', ${answer_is_a_field})`)
                insertedId = ress.insertId
            }else{
                const ress = await db.query(`INSERT INTO sr_cost_calculator_question (name) VALUES('${name}')`)
                insertedId = ress.insertId
            }
            if(id_question){
                await db.query(`UPDATE sr_cost_calculator_question SET id_field_next_question = ${insertedId} WHERE id= ${id_question}`)
            }else if(id_parent_answer){
                await db.query(`UPDATE sr_cost_calculator_answer SET id_next_question = ${insertedId} WHERE id= ${id_parent_answer}`)
            }
            
            success = 'yes'
        } catch (error) {
            success = 'no'
            console.log(error)
        }
    }
    res.status(200).json({
        success: success,
        insertedId: insertedId
    })
}