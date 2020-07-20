const axios = require('axios');

class Data
{
    static async fetch()
    {
        let resp;
        try
        {
            resp = await axios.post('http://localhost:5000/tree');
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
}

export default Data;
