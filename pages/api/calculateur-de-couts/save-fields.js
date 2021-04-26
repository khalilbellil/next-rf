const db = require('../../../lib/db')
var md5 = require("md5")

module.exports = async (req, res) => {
    let success = 'no'
    let { attributes } = req.body
    let set = ''
    try {
        if(attributes.type === 'question'){
            const length = Object.keys(attributes).length
            Object.keys(attributes).map((item, i) => {
                if (item !== 'id' && item !== 'type' && attributes[item]){
                    set += item + `='` + attributes[item] + `'` + `,`
                }
            })
            set += ` WHERE id = '${attributes.id}'`
            set = set.replace(', WHERE', ' WHERE')
            await db.query(`UPDATE sr_cost_calculator_question SET ${set}`)
            success = 'yes'
        }else if(attributes.type === 'answer'){
            const length = Object.keys(attributes).length
            Object.keys(attributes).map((item, i) => {
                if (item !== 'id' && item !== 'type' && item !== 'id_next_question' && attributes[item]){
                    set += item + `='` + attributes[item] + `'` + `,`
                }
            })
            set += ` WHERE id = '${attributes.id}'`
            set = set.replace(', WHERE', ' WHERE')
            await db.query(`UPDATE sr_cost_calculator_answer SET ${set}`)
            success = 'yes'
        }
    } catch (error) {
        console.log(error)
    }
    res.status(200).json({
        success: success
    })
}