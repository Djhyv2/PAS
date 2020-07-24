const axios = require('axios');

class Data
{
    static async fetchByYear()
    {
        const data = await Data.performReq('treeByYear');
        data.forEach((element) =>
        {
            element.tags = [`subLevels${element.Year - element.bigBrotherYear - 1}`];
        });
        return data;
    }

    static async fetchByGeneration()
    {
        const data = await Data.performReq('treeByGeneration');
        return data;
    }

    static async getBrothers()
    {
        const data = await Data.performReq('brothersList');
        return data;
    }

    static async addNew(brother)
    {
        console.log(brother);
    }

    static async performReq(endpoint)
    {
        let resp;
        try
        {
            resp = await axios.post(`http://localhost:5000/${endpoint}`);
        }
        catch (err)
        {
            console.log(err);
            return [];
        }
        return resp.data.recordset;
    }
}

export default Data;
