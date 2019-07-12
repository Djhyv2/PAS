using Newtonsoft.Json;
using System.Data;
using System.Linq;
using System.Text;

namespace PAS
{
    public class MiscUtilities
    {
        public static string tableToCsv(DataTable dataTable)
        {
            StringBuilder stringBuilder = new StringBuilder();
            string[] columnNames;
            string[] fields;

            columnNames = dataTable.Columns.Cast<DataColumn>().Select(column => column.ColumnName).ToArray();
            stringBuilder.AppendLine(string.Join(',', columnNames));

            foreach (DataRow row in dataTable.Rows)
            {
                fields = row.ItemArray.Select(field => "\"" + field.ToString().Replace("\"", "\"\"") + "\"").ToArray();//Encapsulate field with commas
                stringBuilder.AppendLine(string.Join(',', fields));
            }

            return stringBuilder.ToString();
        }//Converts table to csv string

        public static string GetBigBrothersJson(ref string error)
        {
            DataTable bigBrothers = Connection.RunSQL("SELECT 0 AS id, 'Most Recent Common Ancestor' AS name, 'Phi Alpha Sigma' AS staffName UNION SELECT id, name, staffName FROM pas", ref error);
            if (false == string.IsNullOrEmpty(error))
            {
                return null;
            }//Exit if database errors
            return JsonConvert.SerializeObject(bigBrothers);
        }
    }
}
