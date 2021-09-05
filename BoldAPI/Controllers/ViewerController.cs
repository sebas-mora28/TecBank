using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Stimulsoft.Report;
using Stimulsoft.Report.Angular;
using Stimulsoft.Report.Web;

namespace BoldAPI.Controllers


{
    [Controller]
    [Route("[controller]/[action]")]
    public class ViewerController : Controller
    {
        [HttpPost]
        public IActionResult InitViewer()
        {
            var requestParams = StiAngularViewer.GetRequestParams(this);
            var options = new StiAngularViewerOptions();
            options.Actions.ViewerEvent = "ViewerEvent";
            options.Theme = StiViewerTheme.Office2013WhiteTeal;

            return StiAngularViewer.ViewerDataResult(requestParams, options);
        }

        //ViewerEvent() that will process viewer requests.
        [HttpPost]
        public IActionResult ViewerEvent()
        {
            var requestParams = StiAngularViewer.GetRequestParams(this);
            if (requestParams.Action == StiAction.GetReport)
            {
                var report = StiReport.CreateNewReport();
                var path = StiAngularHelper.MapPath(this, $"Reports/EmployeeReport.mrt");
                report.Load(path);
                return StiAngularViewer.GetReportResult(this, report);
            }
            
            return StiAngularViewer.ProcessRequestResult(this);
        }

    }
}