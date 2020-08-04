/*eslint-disable no-console */
const axios = require('axios');

class Data
{
    static async fetchByYear()
    {
        const data = await Data.performSelectReq('treeByYear');
        data.forEach((element) =>
        {
            //eslint-disable-next-line no-param-reassign
            element.tags = [`subLevels${element.Year - element.bigBrotherYear - 1}`];
        });
        return data;
    }

    static async fetchByGeneration()
    {
        const data = await Data.performSelectReq('treeByGeneration');
        return data;
    }

    static async getBrothers()
    {
        const data = await Data.performSelectReq('brothersList');
        return data;
    }

    static async addNew(brother)
    {
        const url = 'https://phialphasigma.azurewebsites.net';
        try
        {
            await axios.post(`${url}/addBrother`, brother);
        }
        catch (err)
        {
            console.log(err);
            return err.message;
        }
        return null;
    }

    static async updateExisting(brother)
    {
        const url = 'https://phialphasigma.azurewebsites.net';
        try
        {
            await axios.post(`${url}/updateBrother`, brother);
        }
        catch (err)
        {
            console.log(err);
            return err.message;
        }
        return null;
    }

    static async getBrother(id)
    {
        const data = await Data.performSelectReq(`brother/${id}`);
        return data;
    }

    static async performSelectReq(endpoint)
    {
        const url = 'https://phialphasigma.azurewebsites.net';
        let resp;
        try
        {
            resp = await axios.post(`${url}/${endpoint}`);
        }
        catch (err)
        {
            console.log(err);
            return [];
        }
        return resp?.data?.recordset;
    }
}

export default Data;
