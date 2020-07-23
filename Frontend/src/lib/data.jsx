const axios = require('axios');

class Data
{
    static async fetchByYear()
    {
        let resp;
        try
        {
            resp = await axios.post('http://localhost:5000/treeByYear');
        }
        catch (err)
        {
            console.log(err);
            return {};
        }
        const data = resp.data.recordset;
        data.forEach((element) =>
        {
            element.tags = [`subLevels${element.Year - element.bigBrotherYear - 1}`];
        });
        return data;
    }

    static async fetchByGeneration()
    {
        console.log('gen');
        let resp;
        try
        {
            resp = await axios.post('http://localhost:5000/treeByGeneration');
        }
        catch (err)
        {
            console.log(err);
            return {};
        }
        console.log(resp.data.recordset[0]);
        return resp.data.recordset;
    }
}

export default Data;
