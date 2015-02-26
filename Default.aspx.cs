using System;


namespace WebApplication
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string sLogin = Request.LogonUserIdentity.Name;
            Session.Add("UserID", sLogin.Substring(sLogin.IndexOf(@"\") + 1));
        }
    }
}