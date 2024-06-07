const express = require('express'); // Node.jsのウェブフレームワーク　ウェブアプリケーションやAPIを構築できる
const mysql = require('mysql2');    // MySQLクライアント
const cors = require('cors');       // ミッドルウェア 異なるドメイン間でのHTTPリクエストを制御
const fs = require('fs');


const app = express();   // 新しいExpressアプリのインスタンスを生成 
const port = 8181;       // なんでも大丈夫 Reactが3000ポートなので衝突を避けるためそれ以外


app.use(cors());         // corsをexpressアプリに追加
app.use(express.json()); // ボディをjson形式で解析する クライアントがJSON形式のデータを送信した場合に、それをJavaScriptオブジェクトに変換し、Expressのリクエストオブジェクトに格納することができます
// app.use((req, res, next) => {
//     res.setHeader('x-content-type-options', 'nosniff');
//     res.setHeader('cache-control', 'no-cache, no-store, must-revalidate');
//     res.setHeader('Access-Control-Allow-Origin', 'https://wonderful-dune-020695f1e.5.azurestaticapps.net');
//     next();
// });

require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;  // 環境変数に設定したパスワードを読み込む
/* データベースへの新しい接続を作成 */
const db = mysql.createConnection({
    host:     'scores-game.mysql.database.azure.com', // データベースサーバーのホスト名
    user:     'ryosuke',       // データベースにアクセスする権限を持つユーザー名を設定
    password: dbPassword,   // データベース接続に使用するパスワード
    database: 'score_game',  // 接続されるデータベースの名前
    ssl: {
        ca: fs.readFileSync('DigiCertGlobalRootG2.crt.pem'),
        rejectUnauthorized: false
    }
});


/* エラーハンドリング */
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        process.exit(1);
    }
    console.log('Connected to database.');
});



/* getメソッドを使用してGETリクエストを/scoresエンドポイントに関連付け */
/* GETリクエストを処理するハンドラー */
app.get('/scores', (req, res) => {
    /* 実行するSQLクエリ */
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS scores (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            score INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURREN_TIMESTAMP
            )
    `;
    db.query(createTableQuery, (err, results, fields) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table created successfully');
    });

    const query = `
        SELECT id, name, score, created_at, 
        @rank := @rank + 1 AS ranking 
        FROM scores, (SELECT @rank := 0) r
        ORDER BY score DESC 
        LIMIT 10
    `;

    /* データベースにクエリを送信 */ 
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err); // エラーをログに記録する
            res.status(500).send(err);  // Internal server Error
            return;
        }
        else {
            res.json(results);  // クエリの結果をJSON形式でレスポンスとして送信
        }
    });
});


/* POSTリクエストを処理するハンドラー */
app.post('/scores', (req, res) => {
    const { name, score } = req.body;  // リクエストのボディからnameとscoreの値を抽出 JSON形式
    
    db.query('INSERT INTO scores (name, score) VALUES (?, ?)', [name, score], 
        (err, results) => {
            if (err) {
                res.status(500).send(err);  // Internal Server Error
            }
            else {
                res.status(201).send({ id: results.insertId });  // Created
            }
    });
});


/* tabalの中身を消してidを1からにする */
app.delete('/scores', (req, res) => {
    db.query('TRUNCATE TABLE scores', (err, results) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send('All scores have beendeleted.');
        }
    });
});

/* 指定したポート番号でサーバーを起動 */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
