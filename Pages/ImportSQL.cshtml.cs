using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using Microsoft.AspNetCore.Mvc.RazorPages;
namespace PAS.Pages
{

    public class ImportSQLModel : PageModel
    {
        public string error;
        public void OnGet()
        {
            StreamReader streamReader;
            String csvLine;
            String[] csvLineComponents;
            Brother brother;

            try
            {
                DataTable queryResult;
                List<SqlParameter> queryParameters;
                Nullable<int> bigBrotherId;

                Connection.RunNonQuerySQL("DROP TABLE IF EXISTS pas", ref error);//Drop existing table
                if (false == String.IsNullOrEmpty(error))
                {
                    return;
                }//Exits if database errors

                Connection.RunNonQuerySQL(@"CREATE TABLE pas (
    id INT PRIMARY KEY IDENTITY(1,1),
    year INT,
    name VARCHAR(255),
    staffName VARCHAR(255),
    bigBrother INT,
    status VARCHAR(255) NOT NULL
);", ref error);//Create new table
                if (false == String.IsNullOrEmpty(error))
                {
                    return;
                }//Exists if database errors

                using (streamReader = new StreamReader("Model/PAS.csv"))
                {
                    streamReader.ReadLine();//Reads the header line so it isn't parsed as data
                    csvLine = streamReader.ReadLine();
                    while (false == String.IsNullOrEmpty(csvLine))
                    {
                        csvLine = csvLine.Replace(@"\,", @"\COMMA");//Replaces escaped commas before split
                        csvLineComponents = csvLine.Split(',');//Splits line into components
                        for (int i = 0; i < csvLineComponents.Length; i++)
                        {
                            csvLineComponents[i] = csvLineComponents[i].Replace("\\COMMA", ",");
                        }//Puts commas back in strings

                        brother = new Brother();
                        if(int.TryParse(csvLineComponents[0], out var unused))
                        {
                            brother.year = int.Parse(csvLineComponents[0]);
                        }
                        else
                        {
                            brother.year = null;
                        }
                        brother.name = String.IsNullOrEmpty(csvLineComponents[1]) ? null: csvLineComponents[1] ;
                        brother.staffName = String.IsNullOrEmpty(csvLineComponents[2]) ? null : csvLineComponents[2];
                        brother.bigBrother = String.IsNullOrEmpty(csvLineComponents[3]) ? null : csvLineComponents[3];
                        bigBrotherId = null;
                        brother.status =  Enum.TryParse<Status>(csvLineComponents[4],out var unused2)?(Status)Enum.Parse(typeof(Status),csvLineComponents[4]):Status.Brother;//Converts array to struct

                        if (null != brother.bigBrother)
                        {
                            queryParameters = new List<SqlParameter>();
                            queryParameters.Add(new SqlParameter("@Name", brother.bigBrother));
                            queryResult = Connection.RunSQL("SELECT id FROM pas WHERE name = @Name",queryParameters, ref error);
                            if(false == String.IsNullOrEmpty(error))
                            {
                                return;
                            }//Exits if query errored
                            if (0 == queryResult.Rows.Count)
                            {
                                error = "Unable to find " + brother.bigBrother;
                                return;
                            }//Exit if unable to find big brother
                            bigBrotherId = (int)queryResult.Rows[0]["id"];
                        }//Gets database value of big brother

                        queryParameters = new List<SqlParameter>();
                        queryParameters.Add(new SqlParameter("@Year", (object)brother.year ?? DBNull.Value));
                        queryParameters.Add(new SqlParameter("@Name", (object)brother.name ?? DBNull.Value));
                        queryParameters.Add(new SqlParameter("@StaffName", (object)brother.staffName ?? DBNull.Value));
                        queryParameters.Add(new SqlParameter("@BigBrother", (object)bigBrotherId ?? DBNull.Value));
                        queryParameters.Add(new SqlParameter("@Status", Enum.GetName(typeof(Status), brother.status)));
                        Connection.RunNonQuerySQL(@"INSERT INTO pas (year, name, staffName, bigBrother, status)
VALUES(@Year, @Name, @StaffName, @BigBrother, @Status);", queryParameters, ref error);//Insert brother to database
                        if (false == String.IsNullOrEmpty(error))
                        {
                            return;
                        }//Exit if database errors

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