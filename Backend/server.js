const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const auth = require('./auth.json');

const app = express();
app.use(cors());
app.use(express.static('../Frontend/build'));

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

app.listen(5000, () =>
{
    console.log('Server started on Port 5000');
});
