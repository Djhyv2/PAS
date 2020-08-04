const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./auth.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('./build'));

function sqlEndpoint(req, res, sqlCommand)
{
    sql.connect(auth, (connErr) =>
    {
        if (connErr)
        {
            console.log(connErr);
            res.status(500).send(connErr);
        }
        new sql.Request().query(sqlCommand,
            (reqErr, recordset) =>
            {
                if (reqErr)
                {
                    console.log(reqErr);
                    res.status(500).send(reqErr);
                }
                res.send(recordset);
            });
    });
}

app.post('/treeByYear', (req, res) =>
{
    sqlEndpoint(req, res, `SELECT ISNULL(brother.year,2004) AS Year, brother.name AS Name, brother.staffName AS [Staff Name], brother.status AS Status, brother.id, brother.bigBrother AS pid, bigBrother.name AS "Big Brother", ISNULL(bigBrother.year,2004) AS bigBrotherYear
    FROM pas AS brother 
    LEFT JOIN pas AS bigBrother
    ON brother.bigBrother = bigBrother.id
    ORDER BY year;`);
});

app.post('/treeByGeneration', (req, res) =>
{
    sqlEndpoint(req, res, `WITH data AS(
        SELECT year AS Year, name AS Name, staffName AS 'Staff Name', status AS Status, id, NULL AS pid, CAST(NULL AS VARCHAR(255)) AS 'Big Brother', -1 AS generation FROM PAS WHERE bigBrother IS NULL
        UNION ALL
        SELECT p.year AS YEAR, p.name AS Name, p.staffName AS 'Staff Name',p.status AS Status, p.id AS id, p.bigBrother AS pid, CAST(b.name AS VARCHAR(255)) AS 'Big Brother', b.generation + 1 AS generation
        FROM pas AS p
        INNER JOIN data AS b
        ON b.id = p.bigBrother
    )
    SELECT * FROM data ORDER BY year;`);
});

app.post('/brothersList', (req, res) =>
{
    sqlEndpoint(req, res, `SELECT ISNULL(name,'') + IIF(staffName IS NULL,'',' - ' + staffName) AS Name, id
    FROM pas ORDER BY year DESC`);
});

app.post('/brother/:id', (req, res) =>
{
    sqlEndpoint(req, res, `SELECT year, name, staffName, bigBrother, status FROM pas WHERE id =${req.params.id}`);
});

app.post('/addBrother', (req, res) =>
{
    const name = req.body.name ? `'${req.body.name}'` : null;
    const staffName = req.body.staffName ? `'${req.body.staffName}'` : null;
    sqlEndpoint(req, res, `INSERT INTO pas (year, name, staffName, bigBrother, status)
    VALUES (${req.body.year},${name},${staffName},${req.body.bigBrother},'${req.body.status}')`);
});

app.post('/updateBrother', (req, res) =>
{
    const name = req.body.name ? `'${req.body.name}'` : null;
    const staffName = req.body.staffName ? `'${req.body.staffName}'` : null;
    sqlEndpoint(req, res, `UPDATE pas 
    SET year =${req.body.year}, name=${name}, staffName=${staffName}, bigBrother=${req.body.bigBrother}, status='${req.body.status}' 
    WHERE id=${req.body.id}`);
});

app.get('*', (req, res) =>
{
    res.sendFile(`${__dirname}/build/index.html`);
});

const port = process.env.PORT || 8080;
app.listen(port, () =>
{
    console.log(`Server started on Port ${port}`);
});
