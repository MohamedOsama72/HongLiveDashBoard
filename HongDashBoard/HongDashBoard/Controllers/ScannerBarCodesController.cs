using ERP.Domain.Abstract;
using ERP.Domain.Concrete;
using ERP.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Media;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Web.Mvc;

namespace ERP.WebUI.Controllers
{
    public class ScannerBarCodesController : Controller
    {
        private readonly IUnitOfWork db;
        private readonly ERPContext _entities;
        public ScannerBarCodesController(IUnitOfWork unitofwork, ERPContext _Entity)
        {
            db = unitofwork;
            _entities = _Entity;
        }
        public void NotifyDashboardUpdate()
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<DashboardHub>();
            context.Clients.All.refreshDashboard("New data available");
        }
        // The Function integrated with ScannerTrackingApp
        public string AddScannedBarCode(ScannerVM Obj)
        {

            var User = Session["user"] as Users;
            string[] parts = Obj.BarCode.Split('*');


            if (parts.Length < 2)
            {
               return"Barcode does not contain the expected format.";
            }

            // Store the first two segments in separate variables
            string ModelNum = parts[0];
            string Quantity = parts[1];
            var realQuan = Convert.ToInt32(Quantity);




            var ModelDecripe = _entities.ModelDesciption.Where(m => m.ModelNumber == ModelNum).FirstOrDefault();
            if (ModelDecripe == null)
            {
                return "that is no areal modelnumber";
            }

            var ProductionStagesOfTheModelNewId = _entities.ProductionStagesOfTheModelNew.Where(m => m.ModelDescriptionId == ModelDecripe.Id).FirstOrDefault().Id;

            var ProductionStagesOfTheModelWithEmployeeId = _entities.ProductionStagesOfTheModelWithEmployee.Where(m => m.ProductionStagesOfTheModelNewId == ProductionStagesOfTheModelNewId).FirstOrDefault().Id;
            var newSerial = _entities.BarCodeMapping.Where(c => c.RealSerialNumber == Obj.SerialNumber).FirstOrDefault();
            if (newSerial==null)
            {
                return "This Scanner Is Not Verified";
            }
            var ProductionStagesWithEmployees = _entities.ProductionStagesWithEmployee.Where(m => m.ProductionStagesOfTheModelWithEmployeeId == ProductionStagesOfTheModelWithEmployeeId && m.SerialId == newSerial.Id).Select(x => new
            {
                x.Id,
                x.EmployeeId,
                x.RealStagesNewId

            });
            var RealStagesNewId = ProductionStagesWithEmployees.FirstOrDefault().RealStagesNewId;
            var GetSerial = _entities.RealStagesNew.Where(x => x.Id == RealStagesNewId).Select(z => new
            {
                serialNumber = z.serialNumber,
                flag = z.flag
            }).FirstOrDefault();
            var BaseCheck = _entities.ActualProductionStagesOfTheModel.Where(x => x.ProductionStagesSerialNum == GetSerial.serialNumber && x.BalletBarCode == Obj.BarCode).FirstOrDefault();
            if (BaseCheck != null)
            {
                return "This BarCode Was Used Before In the Same Stage";
            }
            else
            {
                if (GetSerial.flag == 0 || GetSerial.flag == 1)
                {
                    var Check1 = _entities.CutOrderSizeList.Where(x => x.BarCodeWithSize == Obj.BarCode).FirstOrDefault();
                    if (Check1 == null)
                    {
                        return "Not a Valid BarCode For this Serial";
                    }
                    var BarInsideAPSOTM = _entities.ActualProductionStagesOfTheModel.Where(x => x.BalletBarCode == Obj.BarCode && x.ProductionStagesSerialNum == GetSerial.serialNumber).FirstOrDefault();
                    if (BarInsideAPSOTM != null)
                    {
                        return "this barcode was used to this serial before";
                    }

                    var CutOrderColorListId = _entities.BarCodeForColorList.Where(x => x.Id == Check1.BarCodeForColorListId).FirstOrDefault().CutOrderColorListId;
                    var CuttingOrderId = _entities.CutOrderColorList.Where(x => x.Id == CutOrderColorListId).FirstOrDefault().CutttingOrderId;
                    var objectToAdd = new ActualProductionStagesOfTheModel();
                    objectToAdd.BalletBarCode = Obj.BarCode;
                    objectToAdd.ProductionStagesSerialNum = GetSerial.serialNumber;
                    objectToAdd.EmployeeCode = ProductionStagesWithEmployees.FirstOrDefault().EmployeeId;
                    objectToAdd.ProductionStagesOfTheModelNewId = ProductionStagesOfTheModelNewId;
                    objectToAdd.CutttingOrderId = CuttingOrderId;
                    objectToAdd.Date = DateTime.Now;
                    objectToAdd.UserId = 112;
                    objectToAdd.CutOrderSizeListId = Check1.Id;
                    objectToAdd.Quantity = realQuan;
                    _entities.ActualProductionStagesOfTheModel.Add(objectToAdd);
                    _entities.SaveChanges();
                    NotifyDashboardUpdate();
                }
                else if (GetSerial.flag == 2 || GetSerial.flag == 3)
                {
                    var Check2 = _entities.PrintedBarCode.Where(x => x.BarCode == Obj.BarCode).FirstOrDefault();
                    if (Check2 == null)
                    {
                        return "Not a Valid BarCode For this Serial";
                    }
                    var BarInsideAPSOTM = _entities.ActualProductionStagesOfTheModel.Where(x => x.BalletBarCode == Obj.BarCode && x.ProductionStagesSerialNum == GetSerial.serialNumber).FirstOrDefault();
                    if (BarInsideAPSOTM != null)
                    {
                        return "this barcode was used to this serial before";
                    }
                    var BarCodeForPiecesId = Check2.BarCodeForPiecesId;
                    var CutOrderSizeListId = _entities.BarCodeForPieces.Where(x => x.Id == BarCodeForPiecesId).FirstOrDefault().CutOrderSizeListId;
                    var BarCodeForColorListId = _entities.CutOrderSizeList.Where(x => x.Id == CutOrderSizeListId).FirstOrDefault().BarCodeForColorListId;
                    var sizelist = CutOrderSizeListId;
                    var CutOrderColorListId = _entities.BarCodeForColorList.Where(x => x.Id == BarCodeForColorListId).FirstOrDefault().CutOrderColorListId;
                    var CuttingOrderId = _entities.CutOrderColorList.Where(x => x.Id == CutOrderColorListId).FirstOrDefault().CutttingOrderId;
                    var objectToAdd = new ActualProductionStagesOfTheModel();
                    objectToAdd.BalletBarCode = Obj.BarCode;
                    objectToAdd.ProductionStagesSerialNum = GetSerial.serialNumber;
                    objectToAdd.EmployeeCode = ProductionStagesWithEmployees.FirstOrDefault().EmployeeId;
                    objectToAdd.ProductionStagesOfTheModelNewId = ProductionStagesOfTheModelNewId;
                    objectToAdd.CutttingOrderId = CuttingOrderId;
                    objectToAdd.Date = DateTime.Now;
                    objectToAdd.UserId = 112;
                    objectToAdd.CutOrderSizeListId = sizelist;
                    objectToAdd.Quantity = realQuan;
                    _entities.ActualProductionStagesOfTheModel.Add(objectToAdd);
                    _entities.SaveChanges();
                    NotifyDashboardUpdate();
                }
            }
          
            return "OK";



        }

        public class ScannerVM
        {
            public string SerialNumber { get; set; }
            public string BarCode { get; set; }
        }
    }
}