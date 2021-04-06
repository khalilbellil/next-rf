const nodemailer = require("nodemailer");
const db = require('../lib/db');

export async function getDepartmentId(code){
    let department = await db.query(`SELECT id FROM department WHERE code = ${code} LIMIT 1`)
    return department[0].id
}

export async function getNextQuestionAndAnswers(id_next_question){
    let three = {}
    const first = await db.query(`SELECT * FROM sr_cost_calculator_question WHERE id='${id_next_question}'`)
    three.question = first[0]
    three.answers = await db.query(`SELECT * FROM sr_cost_calculator_answer WHERE id_question='${id_next_question}' ORDER BY id ASC LIMIT 50`)
    three.answers = await getNewAnswers(three.answers)
    return three
}

export async function getNewAnswers(tree_answers){
    for (let i = 0; i < tree_answers.length; i++) {
        if(tree_answers[i].id_next_question && tree_answers[i].id_next_question != 0){
            tree_answers[i].question = await db.query(`SELECT * FROM sr_cost_calculator_question WHERE id='${tree_answers[i].id_next_question}'`)
            tree_answers[i].question = tree_answers[i].question[0]
            
            if(tree_answers[i].question.answer_is_a_field == 1){
                tree_answers[i].answers = [{answer_is_a_field: 1, id_next_question: tree_answers[i].question.id_field_next_question}]
            }else{
                tree_answers[i].answers = await db.query(`SELECT * FROM sr_cost_calculator_answer WHERE id_question='${tree_answers[i].id_next_question}' ORDER BY id ASC LIMIT 50`)
            }
            tree_answers[i].answers = await getNewAnswers(tree_answers[i].answers)
        }
    }
    return tree_answers
}

