﻿using System.Data;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace PAS.Pages
{
    public class IndexModel : PageModel
    {
        public string csvBrothersData;
        public string error;
        public void OnGet()
        {
            DataTable brothers;
            brothers = Connection.RunSQL("SELECT 1992 AS year, 'Most Recent Common Ancestor' AS name, 'Phi Alpha Sigma' AS staffName, NULL AS status, 0 AS brotherID, -1 AS bigBrotherID UNION SELECT brother.year, brother.name, brother.staffName, brother.status, brother.id AS brotherID, ISNULL(bigBrother.id, 0) AS bigBrotherID FROM pas AS brother LEFT OUTER JOIN pas AS bigBrother ON brother.bigBrother = bigBrother.id ORDER BY brotherID;", ref error);//Gets all brothers and fake common ancestor
            if (false == string.IsNullOrEmpty(error))
            {
                return;
            }//Exit if database errors
            csvBrothersData = MiscUtilities.tableToCsv(brothers).Replace("-1","");//Replaces common ancestor's ancestor with nothing
        }

        
    }
}