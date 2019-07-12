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
        private int ddlYear;
        private string txtName;
        private string txtStaffName;
        private int cmbBigBrother;
        private Status ddlStatus;//Properites bound from form

        private int id;//Id from GET
        public string name;
        public string staffName;
        public int bigBrother;
        public int year;
        public Status status;//Values to use in front end

        [BindProperty(SupportsGet = true)]
        public int Id { get => id; set => id = value; }//Id from GET


        public Status DdlStatus { get => ddlStatus; set => ddlStatus = value; }
        public int CmbBigBrother { get => cmbBigBrother; set => cmbBigBrother = value; }
        public string TxtStaffName { get => txtStaffName; set => txtStaffName = value; }
        public string TxtName { get => txtName; set => txtName = value; }
        public int DdlYear { get => ddlYear; set => ddlYear = value; }
        public int HdnId { get => hdnId; set => hdnId = value; }

        public void OnGet()
        {
            DataTable brother;
            List<SqlParameter> queryParameters = new List<SqlParameter>();//Stores query parameters

            jsonBigBrothers = MiscUtilities.GetBigBrothersJson(ref error);//Gets JSON for big brother dropdown

            queryParameters.Add(new SqlParameter("@Id", Id));
            brother = Connection.RunSQL("SELECT 1992 AS year, 'Most Recent Common Ancestor' AS name, 'Phi Alpha Sigma' AS staffName, NULL AS status, 0 AS brotherID, -1 AS bigBrotherID UNION SELECT brother.year, brother.name, brother.staffName, brother.status, brother.id AS brotherID, ISNULL(bigBrother.id, 0) AS bigBrotherID FROM pas AS brother LEFT OUTER JOIN pas AS bigBrother ON brother.bigBrother = bigBrother.id WHERE id = @Id ORDER BY brotherID ", queryParameters, ref error);//Gets brother to database
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
            year = int.Parse(brother.Rows[0]["year"].ToString());
            status = (Status)Enum.Parse(typeof(Status), brother.Rows[0]["status"].ToString());
            //bigBrother = int.Parse

        }
    }
}