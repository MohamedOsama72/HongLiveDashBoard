using ERP.Domain.Abstract;
using System; using System.Net.Mail; using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ERP.Domain.Entities;
using ERP.Domain.ModelView;

namespace ERP.WebUI.Controllers.Reports
{
    public class SellingConfigController : MyBaseController
    {
        private readonly IUnitOfWork db;

        public SellingConfigController(IUnitOfWork unitofwork)
        {
            db = unitofwork;
        }
        
        public ActionResult HongReports()
        {
            new SiteLanguages().SetLanguage("en-GB");
            return View("~/Views/Reports/Operation/Hong/HongReports.cshtml");
        }
        public ActionResult OSOSTest()
        {
            return View("~/Views/Reports/Operation/Hong/OSOSTest.cshtml");
        }
        
    }
}