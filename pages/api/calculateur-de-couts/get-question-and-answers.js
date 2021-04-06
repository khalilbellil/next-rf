const db = require('../../../lib/db')
const global = require('../../../rf_toolbox/global')

module.exports = async (req, res) => {
    let success = 'no'
    let three = {}
    let { id_next_question } = req.body
    try {
        three = await global.getNextQuestionAndAnswers(id_next_question)
        console.log('three', three)
        success = 'yes'
    } catch (error) {
        console.log(error)
    }
    res.status(200).json({
        success: success,
        three: three
    })
}