const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const auth = require('./auth.json');

const app = express();
app.use(cors());
app.use(express.static('../Frontend/build'));

app.post('/tree', (req, res) =>
{
    sql.connect(auth, (connErr) =>
    {
        if (connErr)
        {
            console.log(connErr);
            res.status(500).send(connErr);
        }
        new sql.Request().query(`SELECT 2003 AS Year, 'Most Recent Common Ancestor' AS Name, 'Phi Alpha Sigma' AS [Staff Name], NULL AS Status, 0 as id, NULL AS pid, NULL as bigBrotherYear UNION
        SELECT ISNULL(brother.year,2004) AS Year, brother.name AS Name, brother.staffName AS [Staff Name], brother.status AS Status, brother.id, ISNULL(brother.bigBrother, 0) AS pid, ISNULL(bigBrother.year,2003) AS bigBrotherYear
        FROM pas AS brother 
        LEFT JOIN pas AS bigBrother
        ON brother.bigBrother = bigBrother.id
        ORDER BY id`, (reqErr, recordset) =>
        {
            if (reqErr)
            {
                console.log(reqErr);
                res.status(500).send(reqErr);
            }
            res.send(recordset);
        });
    });
});

app.listen(5000, () =>
{
    console.log('Server started on Port 5000');
});
