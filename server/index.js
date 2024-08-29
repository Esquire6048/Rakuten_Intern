const express = require('express');
const app = express();
const mysql = require('mysql2');
//const fs = require('fs');
const cors = require('cors');

app.use(cors());

const db = mysql.createPool({
    host: 'localhost',
    user: 'testuser',
    password: 'password',
    database: 'rakuten_bousai_quiz_db',
});

app.get("/api/questions", (req, res) => {
    const k = parseInt(req.query.k) || 5; // クエリパラメータ `k` が指定されていない場合はデフォルトで 5 を使用

    // まずランダムに k 件の questions.id を取得
    const sqlSelectIds = `
        SELECT id FROM questions ORDER BY RAND() LIMIT ?;
    `;

    db.query(sqlSelectIds, [k], (err, result) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send(err);
        }

        // 取得した ID を配列に格納
        const questionIDs = result.map(row => row.id);

        if (questionIDs.length === 0) {
            return res.json([]); // 取得された質問がなければ空の配列を返す
        }

        // 取得した ID を使って質問と対応する選択肢を取得
        const sqlSelectQuestions = `
            SELECT q.id as questionID, q.content as questionText, q.explanation, q.keyword, q.url, 
                   c.id as choiceID, c.content as choiceText, c.isAnswer
            FROM questions q
            LEFT JOIN choices c ON q.id = c.questionID
            WHERE q.id IN (?)
            ORDER BY q.id, c.id;
        `;

        db.query(sqlSelectQuestions, [questionIDs], (err, result) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send(err);
            }

            // 結果を所定の形式に整形
            const questions = [];
            let currentQuestion = null;

            result.forEach(row => {
                if (!currentQuestion || currentQuestion.id !== row.questionID) {
                    if (currentQuestion) {
                        questions.push(currentQuestion);
                    }
                    currentQuestion = {
                        id: row.questionID,
                        question: row.questionText,
                        options: [],
                        correct: null,
                        explanation: row.explanation,
                        keyword: row.keyword,
                        url: row.url
                    };
                }

                currentQuestion.options.push(row.choiceText);

                if (row.isAnswer === 1) {
                    currentQuestion.correct = row.choiceText;
                }
            });

            if (currentQuestion) {
                questions.push(currentQuestion);
            }

            // Save the result to a JSON file
        
            //const jsonFilePath = './questions.json';
            //fs.writeFile(jsonFilePath, JSON.stringify(questions, null, 2), (err) => {
                //if (err) {
                    //return res.status(500).send('Error saving JSON file');
                //}
                //res.send('Data saved to quiz_data.json');
            //});

            // 結果をJSONとしてクライアントに送信
            res.json(questions);
        });
    });
});


app.listen(3001, () => {
    console.log('running on port 3001');
});


