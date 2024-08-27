const express = require('express');
const app = express();
const mysql = require('mysql2');
const fs = require('fs');

const db = mysql.createPool({
    host: 'localhost',
    user: 'testuser',
    password: 'password',
    database: 'quiz',
});

app.get("/", (req, res) => {
    const sqlSelect = `
        SELECT q.id as questionID, q.content as questionText, q.explanation, q.keyword, q.url, c.id as choiceID, c.content as choiceText, c.isAnswer
        FROM questions q
        LEFT JOIN choices c ON q.id = c.questionID
        ORDER BY q.id, c.id;
    `;
    
    db.query(sqlSelect, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        
        // Reshape the result into the desired format
        const questions = [];
        let currentQuestion = null;

        result.forEach(row => {
            if (!currentQuestion || currentQuestion.id !== row.questionID) {
                if (currentQuestion) {
                    questions.push(currentQuestion);
                }
                currentQuestion = {
                    id: row.questionID,
                    question: row.questionText,  // Ensure questionText is included
                    options: [],
                    correct: null,
                    explanation: row.explanation,
                    keyword: row.keyword,
                    url: row.url
                };
            }

            currentQuestion.options.push(row.choiceText);

            if (row.isAnswer === 1) {
                currentQuestion.correct = row.choiceText; // Set correct if isAnswer is 1
            }

        });

        if (currentQuestion) {
            questions.push(currentQuestion);
        }

        //res.send(questions);
        
        // Save the result to a JSON file
        const jsonFilePath = './questions.json';
        fs.writeFile(jsonFilePath, JSON.stringify(questions, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving JSON file');
            }
            res.send('Data saved to quiz_data.json');
        });
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});
