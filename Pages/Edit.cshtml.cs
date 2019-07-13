using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PAS.Pages
{
    [BindProperties]
    public class EditModel : PageModel
    {
        public string error;
        public string jsonBigBrothers;

        private int hdnId;
        private Nullable<int> ddlYear;
        private string txtName;
        private string txtStaffName;
        private Nullable<int> cmbBigBrother;
        private Status ddlStatus;//Properites bound from form

        private int id;//Id from GET
        public string name;
        public string staffName;
        public Nullable<int> bigBrother;
        public Nullable<int> year;
        public Status status;//Values to use in front end
        [BindProperty(SupportsGet = true)]
        public int Id { get => id; set => id = value; }//Id from GET


        public Status DdlStatus { get => ddlStatus; set => ddlStatus = value; }
        public Nullable<int> CmbBigBrother { get => cmbBigBrother; set => cmbBigBrother = value; }
        public string TxtStaffName { get => txtStaffName; set => txtStaffName = value; }
        public string TxtName { get => txtName; set => txtName = value; }
        public Nullable<int> DdlYear { get => ddlYear; set => ddlYear = value; }
        public int HdnId { get => hdnId; set => hdnId = value; }

        public void OnGet()
        {
            DataTable brother;
            List<SqlParameter> queryParameters = new List<SqlParameter>();//Stores query parameters

            jsonBigBrothers = MiscUtilities.GetBigBrothersJson(ref error);//Gets JSON for big brother dropdown

            queryParameters.Add(new SqlParameter("@Id", Id));
            brother = Connection.RunSQL("SELECT year, name, staffName, status, ISNULL(bigBrother, 0) AS bigBrother FROM pas WHERE id = @Id", queryParameters, ref error);//Gets brother to database
            if (false == String.IsNullOrEmpty(error))
            {
                return;
            }//Exits if query errored
            if (0 == brother.Rows.Count)
            {
                error = "Unable to find Brother";
                return;
            }//Exit if unable to find brother
            name = brother.Rows[0]["name"].ToString();
            staffName = brother.Rows[0]["staffName"].ToString();
            year = int.TryParse(brother.Rows[0]["year"].ToString(),out int unused) ? int.Parse(brother.Rows[0]["year"].ToString()) : (Nullable<int>)null;//Checks if year is null
            status = (Status)Enum.Parse(typeof(Status), brother.Rows[0]["status"].ToString());
            bigBrother = int.Parse(brother.Rows[0]["bigBrother"].ToString());//Gets values from database
        }

        public void OnPost()
        {
            List<SqlParameter> queryParameters = new List<SqlParameter>();
            queryParameters.Add(new SqlParameter("@Id", hdnId));
            queryParameters.Add(new SqlParameter("@Name", txtName));
            queryParameters.Add(new SqlParameter("@StaffName", txtStaffName ?? (object)DBNull.Value));
            queryParameters.Add(new SqlParameter("@Year", ddlYear ?? (object)DBNull.Value));
            queryParameters.Add(new SqlParameter("@Status", Enum.GetName(typeof(Status), ddlStatus)));
            queryParameters.Add(new SqlParameter("@BigBrother", (0 == cmbBigBrother) ? (object)DBNull.Value : cmbBigBrother));
            Connection.RunNonQuerySQL("UPDATE pas SET year = @Year, name = @Name, staffName = @StaffName, bigBrother = @bigBrother, status = @Status WHERE id = @Id", queryParameters, ref error);
            if (false == String.IsNullOrEmpty(error))
            {
                return;
            }//if query errored
            Response.Redirect("/");//Redirect to homepage
        }
    }
}