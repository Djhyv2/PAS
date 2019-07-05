using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace PAS
{
    public class Connection
    {

        private static string connectionString = ("Production" != Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")) ? "Server = w1969835\\sqlexpress; Database=PAS;User Id = admin; Password=password;" : "Server=tcp:phialphasigma.database.windows.net,1433;Initial Catalog=PhiAlphaSigma;Persist Security Info=False;User ID=Admin1;Password=Password1;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";//Connects to local if non-prod


        /// <summary>
        /// Executes the passed SQL command
        /// </summary>
        /// <param name="sql">
        /// Text of SQL to execute
        /// </param>
        /// <returns>
        /// Table of values from executed SQL
        /// </returns>
        public static DataTable RunSQL(string sql, ref string error)
        {
            return RunSQL(sql, null, ref error);//Chain constructors from less specific to more specific 
        }


        /// <summary>
        /// Executes the passed SQL command
        /// </summary>
        /// <param name="sql">
        /// Text of SQL to execute
        /// </param>
        /// <param name="parameters">
        /// List of Parameters to be applied to sql
        /// </param>
        /// <returns>
        /// Table of values from executed SQL
        /// </returns>
        public static DataTable RunSQL(string sql, List<SqlParameter> parameters, ref string error)
        {
            SqlConnection sqlConn = new SqlConnection(connectionString);//Gets connection string from Web.Config, requires the System.Configuration
            SqlCommand sqlCmd = new SqlCommand(sql, sqlConn);
            if (null != parameters)
            {
                sqlCmd.Parameters.AddRange(parameters.ToArray());//Converts list to array and adds all to sql parameters
            }
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlCmd);
            DataTable dataTable = new DataTable();
            try
            {
                sqlConn.Open();
                sqlDataAdapter.Fill(dataTable);//Fills table using result of executed query
            }
            catch (Exception ex)
            {
                error = ex.Message;//Sets error message
                return null;
            }
            finally
            {
                sqlConn.Close();
            }
            return dataTable;
        }

        /// <summary>
        /// Executes the passed SQL non query command
        /// </summary>
        /// <param name="sql">
        /// Text of SQL to execute
        /// </param>
        /// <returns>
        /// Number of rows affected
        /// </returns>
        public static int RunNonQuerySQL(string sql, ref string error)
        {
            return RunNonQuerySQL(sql, null, ref error);//Chains constructors from less to more specific
        }


        /// <summary>
        /// Executes the passed SQL non query command
        /// </summary>
        /// <param name="sql">
        /// Text of SQL to execute
        /// </param>
        /// <returns>
        /// Number of rows affected
        /// </returns>
        public static int RunNonQuerySQL(string sql, List<SqlParameter> parameters, ref string error)
        {
            SqlConnection sqlConn = new SqlConnection(connectionString);//Gets connection string from Web.Config, requires the System.Configuration
            SqlCommand sqlCmd = new SqlCommand(sql, sqlConn);
            int rowsAffected = -1;
            if (null != parameters)
            {
                sqlCmd.Parameters.AddRange(parameters.ToArray());//Converts list to array and adds all to sql parameters
            }
            try
            {
                sqlConn.Open();
                rowsAffected = sqlCmd.ExecuteNonQuery();//Executes query with no return table
            }
            catch (Exception ex)
            {
                error = ex.Message;//Sets error message
                return -1;
            }
            finally
            {
                sqlConn.Close();
            }
            return rowsAffected;
        }
    }
}