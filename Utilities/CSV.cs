using System.Data;
using System.Linq;
using System.Text;

namespace PAS
{
    public class CSV
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
    }
}
