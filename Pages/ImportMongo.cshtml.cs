/* Query to get all records that are missing information:
{ $or: [ {year: -1}, {staffName: null}, { $and: [ {bigBrother: null} , {status: {$ne: "Founder"}} ]} ] }
*/
using System;
using System.IO;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MongoDB.Bson;
using MongoDB.Driver;
namespace PAS.Pages
{
    public struct MongoBrother
    {
        public int year;
        public string name;
        public string staffName;
        public string bigBrother;
        public Status status;

        public MongoBrother(int year, string name, string staffName, string bigBrother, Status status)
        {
            this.year = year;
            this.name = name;
            this.staffName = staffName;
            this.bigBrother = bigBrother;
            this.status = status;
        }
    }

    public class ImportMongoModel : PageModel
    {
        public string error;
        public void OnGet()
        {
            MongoClient mongoClient;
            IMongoDatabase mongoDatabase;
            IMongoCollection<BsonDocument> mongoCollection;
            StreamReader streamReader;
            String csvLine;
            String[] csvLineComponents;
            MongoBrother brother;
            BsonDocument queryResult;
            BsonDocument newBrother;

            try
            {
                mongoClient = new MongoClient();//Creates/Connects Client
                mongoDatabase = mongoClient.GetDatabase("PAS");//Creates/Gets Database
                mongoDatabase.DropCollection("PAS");//Drops collection if it exists
                mongoCollection = mongoDatabase.GetCollection<BsonDocument>("PAS");//Creates/Gets Table

                using (streamReader = new StreamReader("Model/PAS.csv"))
                {
                    streamReader.ReadLine();//Reads the header line so it isn't parsed as data
                    csvLine = streamReader.ReadLine();
                    while(false == String.IsNullOrEmpty(csvLine))
                    {
                        csvLine = csvLine.Replace("\\,", "\\COMMA");//Replaces escaped commas before split
                        csvLineComponents = csvLine.Split(',');//Splits line into components
                        for (int i = 0; i < csvLineComponents.Length; i++)
                        {
                            csvLineComponents[i] = csvLineComponents[i].Replace("\\COMMA", ",");
                        }//Puts commas back in strings

                        brother = new MongoBrother((int.TryParse(csvLineComponents[0], out var unused))?int.Parse(csvLineComponents[0]):-1, csvLineComponents[1], csvLineComponents[2], csvLineComponents[3], (Status)Enum.Parse(typeof(Status),csvLineComponents[4]));//Converts array to struct

                        newBrother = new BsonDocument();//New document to insert
                        newBrother.Add("year", brother.year);
                        if (false == String.IsNullOrEmpty(brother.name))
                        {
                            newBrother.Add("name", brother.name);
                        }
                        else
                        {
                            newBrother.Add("name", BsonNull.Value);
                        }//Checks if empty name

                        if (false == String.IsNullOrEmpty(brother.staffName))
                        {
                            newBrother.Add("staffName", brother.staffName);
                        }
                        else
                        {
                            newBrother.Add("staffName", BsonNull.Value);
                        }//Checks if empty staff name

                        queryResult = new BsonDocument();//Empties out old query
                        if (false == String.IsNullOrEmpty(brother.bigBrother))
                        {
                            queryResult = (mongoCollection.Find(new FilterDefinitionBuilder<BsonDocument>().Eq("name", brother.bigBrother)).ToList())[0];
                        }//Gets database value of big brother

                        newBrother.Add("bigBrother", queryResult.GetValue("_id", BsonNull.Value));

                        newBrother.Add("status", Enum.GetName(typeof(Status),brother.status));

                        mongoCollection.InsertOne(newBrother);//Adds new brother to database

                        csvLine = streamReader.ReadLine();//Gets next line to parse
                    }//Iterate through each line of csv
                }//Opens and reads from csv file
            }
            catch (Exception e)
            {
                error = e.Message;
            }
        }
    }
}