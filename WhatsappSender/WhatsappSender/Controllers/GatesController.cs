using ERP.Domain.Abstract;
using ERP.Domain.Entities;
using ERP.WebUI.Messages;
using ERP.WebUI.Models;
using Newtonsoft.Json;
using System;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ERP.WebUI.Extensions;
using ERP.Domain.Enum;
using ERP.Domain.ModelView;
using ERP.Domain.Concrete;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using System;
using System.Net.Mail;
using System.Net;
using OpenQA.Selenium.Chrome;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace ERP.WebUI.Controllers
{
    public class GatesController : MyBaseController
    {
        #region Controller Constructor
        private readonly IUnitOfWork db;
        private static IUnitOfWork db2;
        private readonly ERPContext _entites;
        GA_OP_DailyRestrictionRepository GA_OP_DailyRestriction;
        Stores_AdditionClassificationRepository Stores_AdditionClassificationRepositoryObj;
        public GatesController(IUnitOfWork unitofwork, ERPContext obj)
        {
            db = unitofwork;
            db2 = unitofwork;
            _entites = obj;
            GA_OP_DailyRestriction = new GA_OP_DailyRestrictionRepository(_entites);
            Stores_AdditionClassificationRepositoryObj = new Stores_AdditionClassificationRepository(_entites);
        }
        #endregion

        #region View
        public ActionResult Index()
        {
            return View("../StoresManag/Receipt/PurchOrder");
        }
        #endregion
     

        public ActionResult AddGateData(Gates objectData)
        {
            var Return_Message = new ShowMessage();
            var User = Session["user"] as Users;
            try
            {
                objectData.UserId = User.User_Id;
                _entites.Gates.Add(objectData);
                _entites.SaveChanges();
            }
            catch (Exception ex)
            {
                Return_Message.Message = Resource1.Msg_ExceptionError;
                Return_Message.Status = (Int32)MessageStatus.Exception; var xx = Session["user"] as Users; string UserIDName = xx.UserName; int UserID = xx.User_Id; String hostName = string.Empty; hostName = Dns.GetHostName(); string ip = ""; IPHostEntry myIP = Dns.GetHostEntry(hostName); IPAddress[] address = myIP.AddressList; for (int h = 0; h < address.Length; h++) { ip = ip + "     -   " + address[h].ToString(); } string exceptionmessage = (ex.InnerException != null) ? (ex.InnerException.InnerException != null) ? ex.InnerException.InnerException.Message : Convert.ToString(ex.InnerException.InnerException) : ""; string exmessage = exceptionmessage + "  Stack Trace  " + ex.StackTrace + " Done By : " + UserIDName + "  User ID : " + UserID + "  Creation Date and time : " + " " + DateTime.Now + "    " + "  With Device IP : " + ip; string Spacee = " -------------- Space ------------------"; string[] lines = { exmessage, Spacee }; SmtpClient smtp = new SmtpClient(); smtp.Host = "smtpout.secureserver.net"; smtp.Port = 80; smtp.EnableSsl = true; smtp.Credentials = new System.Net.NetworkCredential("test3@itis.com.eg", "test1234"); MailMessage mail = new MailMessage("support@itis.com.eg", "support@itis.com.eg"); mail.IsBodyHtml = true; mail.Subject = "Optimum ERP TEST ITIS Plastic Exception"; mail.Body = exmessage; smtp.Send(mail); db.Contries.DetachAll();
            }
            return Json(Return_Message, JsonRequestBehavior.AllowGet);

        }
        public ActionResult EditGateData(Gates objectData)
        {
            var Return_Message = new ShowMessage();
            var User = Session["user"] as Users;
            try
            {
                objectData.UserId = User.User_Id;
                var DD = _entites.Gates.FirstOrDefault(D => D.ID == objectData.ID);
                _entites.Gates.Remove(DD);
                _entites.SaveChanges();
                _entites.Gates.Add(objectData);
                _entites.SaveChanges();
            }
            catch (Exception ex)
            {
                Return_Message.Message = Resource1.Msg_ExceptionError;
                //Return_Message.Status = (Int32)MessageStatus.Exception; var xx = Session["user"] as Users; string UserIDName = xx.UserName; int UserID = xx.User_Id; String hostName = string.Empty; hostName = Dns.GetHostName(); string ip = ""; IPHostEntry myIP = Dns.GetHostEntry(hostName); IPAddress[] address = myIP.AddressList; for (int h = 0; h < address.Length; h++) { ip = ip + "     -   " + address[h].ToString(); } string exceptionmessage = (ex.InnerException != null) ? (ex.InnerException.InnerException != null) ? ex.InnerException.InnerException.Message : Convert.ToString(ex.InnerException.InnerException) : ""; string exmessage = exceptionmessage + "  Stack Trace  " + ex.StackTrace + " Done By : " + UserIDName + "  User ID : " + UserID + "  Creation Date and time : " + " " + DateTime.Now + "    " + "  With Device IP : " + ip; string Spacee = " -------------- Space ------------------"; string[] lines = { exmessage, Spacee }; SmtpClient smtp = new SmtpClient(); smtp.Host = "smtpout.secureserver.net"; smtp.Port = 80; smtp.EnableSsl = true; smtp.Credentials = new System.Net.NetworkCredential("test3@itis.com.eg", "test1234"); MailMessage mail = new MailMessage("support@itis.com.eg", "support@itis.com.eg"); mail.IsBodyHtml = true; mail.Subject = "Optimum ERP TEST ITIS Plastic Exception"; mail.Body = exmessage; smtp.Send(mail); db.Contries.DetachAll();
            }
            return Json(Return_Message, JsonRequestBehavior.AllowGet);

        }

        public ActionResult DeleteGateData(List<int> Ids)
        {
            var RetData = new ShowMessage();
            try
            {
                foreach (var item in Ids)
                {
                    var DD=_entites.Gates.FirstOrDefault(D => D.ID == item);
                    _entites.Gates.Remove(DD);
                    _entites.SaveChanges();
                }


                RetData.Message = Resource1.Msg_Deletedsuccessfully;
                RetData.Status = (Int32)MessageStatus.Success;
            }
            catch (Exception ex)
            {
                db.Rollback();
                RetData.Message = Resource1.Msg_ExceptionError;
                RetData.Status = (Int32)MessageStatus.Exception; var xx = Session["user"] as Users; string UserIDName = xx.UserName; int UserID = xx.User_Id; String hostName = string.Empty; hostName = Dns.GetHostName(); string ip = ""; IPHostEntry myIP = Dns.GetHostEntry(hostName); IPAddress[] address = myIP.AddressList; for (int h = 0; h < address.Length; h++) { ip = ip + "     -   " + address[h].ToString(); } string exceptionmessage = (ex.InnerException != null) ? (ex.InnerException.InnerException != null) ? ex.InnerException.InnerException.Message : Convert.ToString(ex.InnerException.InnerException) : ""; string exmessage = exceptionmessage + "  Stack Trace  " + ex.StackTrace + " Done By : " + UserIDName + "  User ID : " + UserID + "  Creation Date and time : " + " " + DateTime.Now + "    " + "  With Device IP : " + ip; string Spacee = " -------------- Space ------------------"; string[] lines = { exmessage, Spacee }; SmtpClient smtp = new SmtpClient(); smtp.Host = "smtpout.secureserver.net"; smtp.Port = 80; smtp.EnableSsl = true; smtp.Credentials = new System.Net.NetworkCredential("test3@itis.com.eg", "test1234"); MailMessage mail = new MailMessage("support@itis.com.eg", "support@itis.com.eg"); mail.IsBodyHtml = true; mail.Subject = "Optimum ERP TEST ITIS Plastic Exception"; mail.Body = exmessage; smtp.Send(mail); db.Contries.DetachAll();
            }
            return Json(RetData);
        }

        public ActionResult GetDataForEdit()
        {
            var data = _entites.Gates.Select(D => new GatesVM
            {
                Id=D.ID,
                Destination=D.DestinationName,
                CheckIn=D.CheckIn,
                Process=D.CheckIn==0?"دخول":"خروج",
                CreationDate=D.CreationDate,
                RegisterDate=D.RegisterDate,
                CreationDateStr=D.CreationDate.Day+"/"+D.CreationDate.Month+"/"+D.CreationDate.Year,
                RegisterDateStr=D.RegisterDate.Day+"/"+D.RegisterDate.Month+"/"+D.RegisterDate.Year+"**"+D.RegisterDate.Hour+":"+D.RegisterDate.Minute,
                Name=D.Name,
                UserId=D.UserId,
                PermisionNumber=D.PermissionNumber,
                NationalID=D.NationalID,
                Note=D.Notes,
                Employee=D.User.Employee.Name,
            });
            
            
            JsonResult json = new JsonResult();
            json.Data = data;
            json.MaxJsonLength = int.MaxValue;
            return json;
        }

      
        public ActionResult SendWhatsAppMessage(VM2 zz)
        {
            var User = Session["user"] as Users;
            Task.Run(() =>
            {
                SendMessagesInBackground(zz, User);
            });
            return Content("Messages are being sent in the background. You can continue using the system.");
        }

        private void SendMessagesInBackground(VM2 zz,Users User)
        {
          
            try
            {
                // List of phone numbers to send messages to
                var phoneNumbers = new List<string>
        {
            "+201211380308", "+201066788395","+201000231101"
        };
                
                var chromeOptions = new ChromeOptions();
                chromeOptions.AddArguments("--start-maximized");
                chromeOptions.AddArguments("--disable-notifications");
                chromeOptions.AddArguments(@"--user-data-dir=C:\Temp\ChromeUserData"); // Fresh directory
                chromeOptions.AddArguments("--no-sandbox");
                chromeOptions.AddArguments("--disable-gpu");
                using (var driver = new ChromeDriver(chromeOptions))
                {
                    driver.Navigate().GoToUrl("https://web.whatsapp.com/");
                    Console.WriteLine("Please scan the QR code if not already logged in.");
                    var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
                    wait.Until(d => d.FindElement(By.XPath("//span[@data-icon='menu']")));
                    foreach (var phoneNumber in phoneNumbers)
                    {
                        string message = "تسجيل : " + (zz.CheckIn == 0 ? "دخول" : "خروج") + "\n" +
                      "المكان : " + User.Employee.Name + "\n" +
                      "تاريخ : " + zz.RegisterDate + "\n" +
                      "الجهة : " + zz.DestinationName + "\n" +
                       "الشخص : " + zz.Name + "\n" +
                       "سيارة رقم قومى : " + zz.NationalID + "\n" +
                        "رقم اذن : " + zz.PermissionNumber + "\n" +
                         "ملاحظات : " + zz.Notes + "\n" +
                           "مسجل فى : " + DateTime.Now + "\n" +
                           "تجربة الاختلاف :" + phoneNumber;
                        try
                        {
                            string url = string.Format("https://web.whatsapp.com/send?phone={0}&text={1}",
                                phoneNumber, Uri.EscapeDataString(message));
                            driver.Navigate().GoToUrl(url);
                            wait.Until(d => d.FindElement(By.XPath("//div[@contenteditable='true']")));
                            var sendButton = wait.Until(d => d.FindElement(By.XPath("//span[@data-icon='send']")));
                            Thread.Sleep(2000);
                            sendButton.Click();
                            Thread.Sleep(3000);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Failed to send message to"+ phoneNumber+":" +ex.Message);
                        }
                    }
                    driver.Quit();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred in the background task:"+ ex.Message);
            }
        }

        public ActionResult SendWhatsAppMessage2(VM2 OldData, VM2 NewData)
        {
            var User = Session["user"] as Users;
            Task.Run(() =>
            {
                SendMessagesInBackground2(OldData, NewData, User);
            });
            return Content("Messages are being sent in the background. You can continue using the system.");
        }

        private void SendMessagesInBackground2(VM2 OldData, VM2 NewData,Users User)
        {
            var OldName = _entites.Users.Where(c => c.User_Id == OldData.UserId).FirstOrDefault().Employee.Name;
         
            try
            {
                // List of phone numbers to send messages to
                var phoneNumbers = new List<string>
        {
            "+201211380308", "+201066788395","+201000231101"
        };

                var chromeOptions = new ChromeOptions();
                chromeOptions.AddArguments("--start-maximized");
                chromeOptions.AddArguments("--disable-notifications");
                chromeOptions.AddArguments(@"--user-data-dir=C:\Temp\ChromeUserData"); // Fresh directory
                chromeOptions.AddArguments("--no-sandbox");
                chromeOptions.AddArguments("--disable-gpu");
                using (var driver = new ChromeDriver(chromeOptions))
                {
                    driver.Navigate().GoToUrl("https://web.whatsapp.com/");
                    Console.WriteLine("Please scan the QR code if not already logged in.");
                    var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(8));
                    wait.Until(d => d.FindElement(By.XPath("//span[@data-icon='menu']")));
                    foreach (var phoneNumber in phoneNumbers)
                    {
                        string message = "ما قبل التعديل" + "\n" +
                    "تسجيل : " + (OldData.CheckIn == 0 ? "دخول" : "خروج") + "\n" +
                      "المكان : " + OldName + "\n" +
                      "تاريخ : " + OldData.RegisterDate + "\n" +
                      "الجهة : " + OldData.DestinationName + "\n" +
                       "الشخص : " + OldData.Name + "\n" +
                       "سيارة رقم قومى : " + OldData.NationalID + "\n" +
                        "رقم اذن : " + OldData.PermissionNumber + "\n" +
                         "ملاحظات : " + OldData.Notes + "\n" +
                           "مسجل فى : " + OldData.CreationDate + "\n" + "\n" + "\n" +

                           " ما بعد التعديل " + "\n" +
                            "المكان : " + User.Employee.Name + "\n" +
                      "تاريخ : " + NewData.RegisterDate + "\n" +
                      "الجهة : " + NewData.DestinationName + "\n" +
                       "الشخص : " + NewData.Name + "\n" +
                       "سيارة رقم قومى : " + NewData.NationalID + "\n" +
                        "رقم اذن : " + NewData.PermissionNumber + "\n" +
                         "ملاحظات : " + NewData.Notes + "\n"+
                          "تجربة الاختلاف :" + phoneNumber;
                        try
                        {
                            string url = string.Format("https://web.whatsapp.com/send?phone={0}&text={1}",
                               phoneNumber, Uri.EscapeDataString(message));
                            driver.Navigate().GoToUrl(url);
                            wait.Until(d => d.FindElement(By.XPath("//div[@contenteditable='true']")));
                            var sendButton = wait.Until(d => d.FindElement(By.XPath("//span[@data-icon='send']")));
                            Thread.Sleep(2000);
                            sendButton.Click();
                            Thread.Sleep(3000);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Failed to send message to" + phoneNumber + ":" + ex.Message);
                        }
                    }
                    driver.Quit();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred in the background task:" + ex.Message);
            }
        }

        public ActionResult SendWhatsAppMessage3(VM2 zz)
        {
            var User = Session["user"] as Users;
            Task.Run(() =>
            {
                SendMessagesInBackground3(zz,User);
            });
            return Content("Messages are being sent in the background. You can continue using the system.");
        }

        private void SendMessagesInBackground3(VM2 zz,Users User)
        {
           
            try
            {
                // List of phone numbers to send messages to
                var phoneNumbers = new List<string>
        {
            "+201211380308", "+201066788395","+201000231101"
        };

                var chromeOptions = new ChromeOptions();
                chromeOptions.AddArguments("--start-maximized");
                chromeOptions.AddArguments("--disable-notifications");
                chromeOptions.AddArguments(@"--user-data-dir=C:\Temp\ChromeUserData"); // Fresh directory
                chromeOptions.AddArguments("--no-sandbox");
                chromeOptions.AddArguments("--disable-gpu");
                using (var driver = new ChromeDriver(chromeOptions))
                {
                    driver.Navigate().GoToUrl("https://web.whatsapp.com/");
                    Console.WriteLine("Please scan the QR code if not already logged in.");
                    var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(8));
                    wait.Until(d => d.FindElement(By.XPath("//span[@data-icon='menu']")));
                    foreach (var phoneNumber in phoneNumbers)
                    {
                        string message = "تم حذف هذه البيانات" + "\n" +
                    "تسجيل : " + (zz.CheckIn == 0 ? "دخول" : "خروج") + "\n" +
                      "المكان : " + User.Employee.Name + "\n" +
                      "تاريخ : " + zz.RegisterDate + "\n" +
                      "الجهة : " + zz.DestinationName + "\n" +
                       "الشخص : " + zz.Name + "\n" +
                       "سيارة رقم قومى : " + zz.NationalID + "\n" +
                        "رقم اذن : " + zz.PermissionNumber + "\n" +
                         "ملاحظات : " + zz.Notes + "\n" +
                           "مسجل فى : " + zz.CreationDate +
                           "تجربة الاختلاف :" + phoneNumber;
                        try
                        {
                            string url = string.Format("https://web.whatsapp.com/send?phone={0}&text={1}",
                               phoneNumber, Uri.EscapeDataString(message));
                            driver.Navigate().GoToUrl(url);
                            wait.Until(d => d.FindElement(By.XPath("//div[@contenteditable='true']")));
                            var sendButton = wait.Until(d => d.FindElement(By.XPath("//span[@data-icon='send']")));
                            Thread.Sleep(2000);
                            sendButton.Click();
                            Thread.Sleep(3000);
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Failed to send message to" + phoneNumber + ":" + ex.Message);
                        }
                    }
                    driver.Quit();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred in the background task:" + ex.Message);
            }
        }
     
    
       
   
    }
}