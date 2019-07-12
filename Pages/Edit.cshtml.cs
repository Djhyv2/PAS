using System;
using System.Collections.Generic;
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

        public int hdnId;
        public int ddlYear;
        public string txtName;
        public string txtStaffName;
        public int cmbBigBrother;
        public Status ddlStatus;//Properites bound from form


        public void OnGet()
        {
            jsonBigBrothers = MiscUtilities.GetBigBrothersJson(ref error);
        }
    }
}