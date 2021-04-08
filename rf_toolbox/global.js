const nodemailer = require("nodemailer");
const db = require('../lib/db');

export async function getDepartmentId(code){
    let department = await db.query(`SELECT id FROM department WHERE code = ${code} LIMIT 1`)
    return department[0].id
}

export async function getNextQuestionAndAnswers(id_next_question){
    let three = {}
    const first = await db.query(`SELECT * FROM sr_cost_calculator_question WHERE id='${id_next_question}'`)
    three.name = first[0].name
    three.attributes = first[0]

    three.children = await getChildren(id_next_question, true)
    return three
}

export async function getChildren(id_next_question, isAnAnswer, isField = false){
    let new_children = []
    let answers = undefined

    if(isAnAnswer){
        answers = await db.query(`SELECT * FROM sr_cost_calculator_answer WHERE id_question='${id_next_question}' ORDER BY id ASC LIMIT 50`)
    }else{
        answers = await db.query(`SELECT * FROM sr_cost_calculator_question WHERE id='${id_next_question}'`)
    }
    if(answers.length > 0){
        if(answers[0]?.answer_is_a_field == 1){
            new_children[0] = {
                name: answers[0].name,
                attributes: answers[0],
                children: [
                    {
                        name:'FIELD',
                        attributes:{
                            answer_is_a_field: 1,
                            id_next_question: answers[0].id_field_next_question
                        },
                        children: await getChildren(answers[0].id_field_next_question, false)
                    }
                ]
            }
        }else{
            for (let i = 0; i < answers.length; i++) {
                const element = answers[i];
                new_children[i] = {
                    name: element.name,
                    attributes: element,
                    children: (isAnAnswer)?await getChildren(element.id_next_question, false):await getChildren(id_next_question, true)
                }
            }
        }
    }else{
        new_children = undefined
    }
    
    return new_children
}

export async function getNewAnswers(tree_answers){
    let new_children = {}
    for (let i = 0; i < tree_answers.length; i++) {
        if(tree_answers[i].id_next_question && tree_answers[i].id_next_question != 0){
            const question = await db.query(`SELECT * FROM sr_cost_calculator_question WHERE id='${tree_answers[i].id_next_question}'`)
            new_children.name = question[0].name
            new_children.attributes = question[0]
            let answers = undefined
            if(new_children.attributes.answer_is_a_field == 1){
                answers = [{answer_is_a_field: 1, id_next_question: new_children.id_field_next_question}]
            }else{
                answers = await db.query(`SELECT * FROM sr_cost_calculator_answer WHERE id_question='${new_children.id_next_question}' ORDER BY id ASC LIMIT 50`)
            }
            new_children.children = await getNewAnswers(answers)
        }
    }
    return new_children
}