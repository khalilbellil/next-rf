const db = require('../../../lib/db')
var md5 = require("md5")

module.exports = async (req, res) => {
    const { id_next_question, wait, input, actual_price, influence_method, influence_value, min_price, interval_precision } = req.body
    let success = 'no'
    let answers = undefined
    let question = undefined
    let new_price = undefined
    let finish = undefined
    let final_price_start = undefined
    let final_price_end = undefined
    try {
        if(wait && input){
            new_price = parseFloat(actual_price) + (parseFloat(wait) * parseFloat(input))
            console.log('new_price', new_price)
        }else if(influence_method && influence_value){
            if(influence_method === '-%'){
                new_price = parseFloat(actual_price) - (parseFloat(actual_price) * (influence_value/100))
            }else if(influence_method === '+%'){
                new_price = parseFloat(actual_price) + (parseFloat(actual_price) * (influence_value/100))
            }
        }
        if(id_next_question && id_next_question != 0){
            question = await db.query(`SELECT * FROM sr_cost_calculator_question WHERE id='${id_next_question}' LIMIT 1`)
            if(question.length > 0){
                question = question[0]
                answers = await db.query(`SELECT * FROM sr_cost_calculator_answer WHERE id_question='${id_next_question}' LIMIT 50`)
                success = 'yes'
            }
        }else if(id_next_question == 0){
            new_price = parseFloat(actual_price)

            final_price_start = new_price - (parseFloat(new_price) * (interval_precision/100))
            if(parseFloat(final_price_start) < parseFloat(min_price)){
                final_price_start = parseFloat(min_price)
                final_price_end = parseFloat(min_price) + (parseFloat(parseFloat(min_price)) * (interval_precision/100))
            }else{
                final_price_end = new_price + (parseFloat(new_price) * (interval_precision/100))
            }

            success = 'yes'
            finish = true
            console.log('finish')
        }
    } catch (error) {
        console.log(error)
    }
    res.status(200).json({
        success: success,
        question: question,
        answers: answers,
        new_price: new_price,
        finish: finish,
        final_price_start: final_price_start,
        final_price_end: final_price_end
    })
}