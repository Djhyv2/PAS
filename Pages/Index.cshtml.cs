using System.Data;
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
            brothers = Connection.RunSQL("SELECT NULL AS year, NULL AS name, NULL AS staffName, NULL AS status, 0 AS brotherID, -1 AS bigBrotherID UNION SELECT brother.year, brother.name, brother.staffName, brother.status, brother.id AS brotherID, ISNULL(bigBrother.id, 0) AS bigBrotherID FROM pas AS brother LEFT OUTER JOIN pas AS bigBrother ON brother.bigBrother = bigBrother.id ORDER BY brotherID;", ref error);//Gets all brothers and fake common ancestor
            if (false == string.IsNullOrEmpty(error))
            {
                return;
            }//Exit if database errors
            csvBrothersData = tableToCsv(brothers).Replace("-1","");//Replaces common ancestor's ancestor with nothing
        }

        private string tableToCsv(DataTable dataTable)
        {
            StringBuilder stringBuilder = new StringBuilder();
            string[] columnNames;
            string[] fields;

            columnNames = dataTable.Columns.Cast<DataColumn>().Select(column => column.ColumnName).ToArray();
            stringBuilder.AppendLine(string.Join(',', columnNames));

            foreach(DataRow row in dataTable.Rows)
            {
                fields = row.ItemArray.Select(field => "\"" + field.ToString().Replace("\"","\"\"") + "\"").ToArray();//Encapsulate field with commas
                stringBuilder.AppendLine(string.Join(',', fields));
            }
            
            return stringBuilder.ToString();
        }//Converts table to csv string
    }
}