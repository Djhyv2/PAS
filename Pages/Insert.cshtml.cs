using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PAS.Pages
{
    public class InsertModel : PageModel
    {
        public string jsonBigBrothers;
        public string error;
        public void OnGet()
        {   
            jsonBigBrothers = MiscUtilities.GetBigBrothersJson(ref error);
        }

        public void OnPost()
        {
            int rows;
            string name, staffName;
            int bigBrother, year;
            Status status;//Values of new brother
            List<SqlParameter> queryParameters;//Stores query parameters


            year = int.Parse(Request.Form["ddlYear"]);//Gets year of new brothers
            for (rows = 0;rows <= int.Parse(Request.Form["btnSubmit"]);rows++)
            {
                if(0 == Request.Form["txtName" + rows].Count)
                {
                    continue;
                }//Skips row if it was deleted before submission
                name = Request.Form["txtName" + rows];
                staffName = Request.Form["txtStaffName" + rows];
                bigBrother = int.Parse(Request.Form["cmbBigBrother" + rows]);
                status = (Status)Enum.Parse(typeof(Status), Request.Form["ddlStatus" + rows]);//Gets info from form
                queryParameters = new List<SqlParameter>();
                queryParameters.Add(new SqlParameter("@Name", name));
                queryParameters.Add(new SqlParameter("@StaffName", staffName));
                queryParameters.Add(new SqlParameter("@BigBrother", bigBrother));
                queryParameters.Add(new SqlParameter("@Status", Enum.GetName(typeof(Status), status)));
                queryParameters.Add(new SqlParameter("@Year", year));
                Connection.RunNonQuerySQL("INSERT INTO pas (name, staffName, bigBrother, status, year) VALUES (@Name, @StaffName, @BigBrother, @Status, @Year)", queryParameters, ref error);//Submits info to database
                if (false == String.IsNullOrEmpty(error))
                {
                    return;
                }//Exits if query errored
            }
            OnGet();//Runs get again before postback
        }
    }
}