const express = require('express'); // Node.jsのウェブフレームワーク　ウェブアプリケーションやAPIを構築できる
const mysql = require('mysql2');    // MySQLクライアント
const cors = require('cors');       // ミッドルウェア 異なるドメイン間でのHTTPリクエストを制御

require('dotenv').config();
const app = express();   // 新しいExpressアプリのインスタンスを生成 
const port = process.env.AZURE_MYSQL_PORT || 3001;       // なんでも大丈夫 Reactが3000ポートなので衝突を避けるためそれ以外

app.use(cors());         // corsをexpressアプリに追加
app.use(express.json()); // ボディをjson形式で解析する クライアントがJSON形式のデータを送信した場合に、それをJavaScriptオブジェクトに変換し、Expressのリクエストオブジェクトに格納することができます

// const dbHost = process.env.DB_HOST;
// const dbUser = process.env.DB_USER;
// const dbDatabase = process.env.DB_DATABASE;
/* データベースへの新しい接続を作成 */
const db = mysql.createConnection({
    host:     process.env.AZURE_MYSQL_HOST, // データベースサーバーのホスト名
    user:     process.env.AZURE_MYSQL_USER,       // データベースにアクセスする権限を持つユーザー名を設定
    password: process.env.AZURE_MYSQL_PASSWORD,   // データベース接続に使用するパスワード
    database: process.env.AZURE_MYSQL_DATABASE  // 接続されるデータベースの名前
});
// const dbPassword = process.env.DB_PASSWORD;  // 環境変数に設定したパスワードを読み込む
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: dbPassword,
//     database: 'score_game'
// });


/* エラーハンドリング */
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});



/* getメソッドを使用してGETリクエストを/scoresエンドポイントに関連付け */
/* GETリクエストを処理するハンドラー */
app.get('/scores', (req, res) => {
    /* 実行するSQLクエリ */
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
            res.status(201).send({ id: results.insertId });
        }
    });
});

/* 指定したポート番号でサーバーを起動 */
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
