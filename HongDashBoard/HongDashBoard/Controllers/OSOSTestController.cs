using ERP.Domain.Abstract;
using ERP.Domain.Entities;
using ERP.Domain.Enum;
using ERP.Domain.ModelView;
using ERP.WebUI.Messages;
using ERP.WebUI.Models;
using Newtonsoft.Json;
using System;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ERP.Domain.Helpers;
using ERP.Domain.Concrete;

namespace ERP.WebUI.Controllers
{
    public class OSOSTestController : MyBaseController
    {
        #region Controller Constructor
        private readonly IUnitOfWork db; 
        private readonly ERPContext _entities;
        public OSOSTestController(IUnitOfWork unitofwork, ERPContext _Entity)
        {
            _entities = _Entity;
            db = unitofwork;
        }
        #endregion

        #region View
        public ActionResult Index()
        {
            return View("~/Views/Selling/Manag/Hong/CutOrder.cshtml");
        }
        #endregion
        public JsonResult GetCutOrderNumber()
        {
            var data = 1;
            var Check = db.CutttingOrder.GetAll().Where(x => x.CutOrderNumber > 0).ToList();
            if (Check != null && Check.Count > 0)
                data = Check.Max(x => x.CutOrderNumber) + 1;
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetDataForAdd()
        {
            Func<SalesOrder, bool> con = p => p.Stage == 2;
            var data = db.SalesOrder.GetDataByCondition(con);
            JsonResult Res = Json(data, JsonRequestBehavior.AllowGet);
            Res.MaxJsonLength = int.MaxValue;
            return Res;
        }
        public ActionResult GetModelData()
        {
            var data = _entities.ModelDesciption.Select(p => new
            {
                ModelDesciptionId = p.Id,
                ModelNumber = p.ModelNumber,
                SizeGroupingNameId = p.SizeGroupingNameId

            }).ToList();
            JsonResult Res = Json(data, JsonRequestBehavior.AllowGet);
            Res.MaxJsonLength = int.MaxValue;
            return Res;
        }
       
        public ActionResult GetData(int Id1 , int Id2,int Id3)
        {
                var ColorList = _entities.ModelColors.Where(c => c.ModelDesciptionId == Id2 && c.ColorId != null).Select(C => new
                {
                    Id = C.Id,
                    ColorId = C.ColorId,
                    Name = C.Color != null ? C.Color.ColorName : "",
                    Code = C.Color != null? C.Color.BasicCode:""
                }).ToList();
                var SizeList = _entities.Stores_SizeGrouping.Where(z => z.SizeGroupingNameId == Id1).Select(Z => new
                    {
                        Id = Z.Id,
                        Size = Z.Size
                    }).ToList();
                var ColorSizeValues = new List<ColorSizeValueMV>();
                foreach (var item in ColorList)
                {
                    var objColor = new ColorSizeValueMV();
                    objColor.ColorName = item.Name;
                    objColor.ColorCode = item.Code;
                    objColor.TotalValues = 0;
                    objColor.SizeValue = new Dictionary<string, double>();
                    objColor.SizeValueDone = new Dictionary<string, double>();
                    objColor.SizeValueRemain = new Dictionary<string, double>();
                    objColor.SizeValuePercent = new Dictionary<string, double>();
                    for (int i = 0; i < SizeList.Count; i++)
                    {
                        int SizeId = SizeList[i].Id;
                        string SizeName = SizeList[i].Size;
                        var Value = _entities.ModelColorSizeGrouping.Where(x => x.ModelColorId == item.Id && x.SizeGroupingId == SizeId).FirstOrDefault();
                        if (Value!=null)
                        {
                            objColor.SizeValue.Add(SizeName, Value.Value);
                            objColor.TotalValues += Value.Value;
                        }else
                            objColor.SizeValue.Add(SizeName, 0);
                    }
                    ColorSizeValues.Add(objColor);
                }
                var PSOTMNStages = new List<RealStagesNewMV>();
                if (Id3==1)
                {
                       PSOTMNStages = _entities.RealStagesNew.Where(b => b.ProductionStagesOfTheModelNew.ModelDescriptionId == Id2&&(b.flag==0||b.flag==1)).Select(B => new RealStagesNewMV
                    {
                        Id = B.Id,
                        serialNumber = B.serialNumber,
                        Name = B.chineseName,
                        NameAr = B.arabicName
                    }).ToList();
                }
                else if (Id3==2)
                {
                       PSOTMNStages = _entities.RealStagesNew.Where(b => b.ProductionStagesOfTheModelNew.ModelDescriptionId == Id2&&b.flag==2).Select(B => new RealStagesNewMV
                    {
                        Id = B.Id,
                        serialNumber = B.serialNumber,
                        Name = B.chineseName,
                        NameAr = B.arabicName
                    }).ToList();
                }
                else if (Id3==3)
                {
                        PSOTMNStages = _entities.RealStagesNew.Where(b => b.ProductionStagesOfTheModelNew.ModelDescriptionId == Id2&&b.flag==3).Select(B => new RealStagesNewMV
                    {
                        Id = B.Id,
                        serialNumber = B.serialNumber,
                        Name = B.chineseName,
                        NameAr = B.arabicName
                    }).ToList();
                }
                else
                {
                    PSOTMNStages = _entities.RealStagesNew.Where(b => b.ProductionStagesOfTheModelNew.ModelDescriptionId == Id2 ).Select(B => new RealStagesNewMV
                    {
                        Id = B.Id,
                        serialNumber = B.serialNumber,
                        Name = B.chineseName,
                        NameAr = B.arabicName
                    }).ToList();
                }
                foreach (var item in PSOTMNStages)
                {
                    string json = JsonConvert.SerializeObject(ColorSizeValues);
                    item.ColorSizeValues = JsonConvert.DeserializeObject<List<ColorSizeValueMV>>(json); 
                    var NameOfModel = _entities.ModelDesciption.Where(m => m.Id == Id2).FirstOrDefault().ModelNumber;
                    var APSOTMContain = _entities.ActualProductionStagesOfTheModel.Where(c => c.BalletBarCode.Contains(NameOfModel) && c.ProductionStagesSerialNum == item.serialNumber).ToList();
                    foreach (var Color in item.ColorSizeValues)
                    {
                        Color.SizeValueDone = new Dictionary<string, double>();
                        Color.TotalValuesDone = 0;
                        foreach (var Size in SizeList)
                        {
                            var realQuan = 0;
                            string SizeName = "";
                            int? StageFlag = null;
                            int RepeatedSize = 0;
                            foreach (var BarCodeData in APSOTMContain)
                            {
                                StageFlag = _entities.RealStagesNew.Where(f => f.ProductionStagesOfTheModelId == BarCodeData.ProductionStagesOfTheModelNewId && f.serialNumber == item.serialNumber).FirstOrDefault().flag;
                                var BarCodeName = BarCodeData.BalletBarCode;
                                string[] parts = BarCodeName.Split('*');
                                string ModelNum = parts[0];
                                string Quantity = parts[1];
                                string ColorSize = parts[parts.Count() - 1];
                                string ColorCode = ColorSize.Substring(0, 3);
                                SizeName = ColorSize.Substring(3);
                                if (StageFlag == 0 || StageFlag == 1)
                                {
                                    if (ColorCode == Color.ColorCode && SizeName == Size.Size){
                                        realQuan = Convert.ToInt32(Quantity);
                                        break;
                                    }
                                    else
                                    {
                                        if (Color.SizeValueDone.ContainsKey(Size.Size))
                                        {
                                            Color.SizeValueDone[Size.Size] = realQuan;
                                            Color.TotalValuesDone += realQuan;
                                        }
                                        else
                                            Color.SizeValueDone.Add(Size.Size, 0);
                                    }
                                }
                                else if ((StageFlag == 2 || StageFlag == 3) && SizeName == Size.Size && ColorCode == Color.ColorCode)
                                {
                                    RepeatedSize++;
                                }
                            }
                            if ((StageFlag == 0 || StageFlag == 1 || StageFlag == null) && !Color.SizeValueDone.ContainsKey(Size.Size))
                            {
                                Color.SizeValueDone.Add(Size.Size, realQuan);
                                Color.TotalValuesDone += realQuan;
                            }
                            else if ((StageFlag == 0 || StageFlag == 1 || StageFlag == null) && Color.SizeValueDone.ContainsKey(Size.Size))
                            {
                                Color.SizeValueDone[Size.Size] = realQuan;
                                Color.TotalValuesDone += realQuan;
                            }
                            else if (StageFlag == 2 || StageFlag == 3)
                            {
                                Color.SizeValueDone.Add(Size.Size, RepeatedSize);
                                Color.TotalValuesDone += RepeatedSize;
                            }
                        }
                    }
                }
                foreach (var stage in PSOTMNStages)
                {
                    foreach (var colorSizeValue in stage.ColorSizeValues)
                    {
                        var sizeValueRemain = new Dictionary<string, double>();
                        var sizeValuePercent = new Dictionary<string, double>();

                        foreach (var key in colorSizeValue.SizeValue.Keys)
                        {
                            double value = colorSizeValue.SizeValue[key];
                            double doneValue = colorSizeValue.SizeValueDone.ContainsKey(key)
                                ? colorSizeValue.SizeValueDone[key]
                                : 0;

                            sizeValueRemain[key] = value - doneValue;
                            sizeValuePercent[key] = doneValue != 0 ? Math.Round((doneValue / value * 100), 3) : 0;
                        }
                        colorSizeValue.SizeValueRemain = sizeValueRemain;
                        colorSizeValue.SizeValuePercent = sizeValuePercent;
                        colorSizeValue.TotalValuesRemaining = colorSizeValue.TotalValues - colorSizeValue.TotalValuesDone;
                        colorSizeValue.TotalValuesPercent = colorSizeValue.TotalValuesDone != 0 ? Math.Round((colorSizeValue.TotalValuesDone / colorSizeValue.TotalValues*100), 3) : 0;
                    }
                }
                var Data = new
                {
                    ColorList,
                    SizeList,
                    PSOTMNStages,
                };
                JsonResult Res = Json(Data, JsonRequestBehavior.AllowGet);
            Res.MaxJsonLength = int.MaxValue;
            return Res;
        }
        public ActionResult GetData2(int Id1, int Id2, int Id3)
        {
            var ColorList = _entities.ModelColors.Where(c => c.ModelDesciptionId == Id2 && c.ColorId != null).Select(C => new
            {
                Id = C.Id,
                ColorId = C.ColorId,
                Name = C.Color != null ? C.Color.ColorName : "",
                Code = C.Color != null ? C.Color.BasicCode : ""
            }).ToList();
            var SizeList = _entities.Stores_SizeGrouping.Where(z => z.SizeGroupingNameId == Id1).Select(Z => new
            {
                Id = Z.Id,
                Size = Z.Size
            }).ToList();
            var ColorSizeValues = new List<ColorSizeValueMV>();
            foreach (var item in ColorList)
            {
                var objColor = new ColorSizeValueMV();
                objColor.ColorName = item.Name;
                objColor.ColorCode = item.Code;
                objColor.TotalValues = 0;
                objColor.SizeValue = new Dictionary<string, double>();
                objColor.SizeValueDone = new Dictionary<string, double>();
                objColor.SizeValueRemain = new Dictionary<string, double>();
                objColor.SizeValuePercent = new Dictionary<string, double>();
                for (int i = 0; i < SizeList.Count; i++)
                {
                    int SizeId = SizeList[i].Id;
                    string SizeName = SizeList[i].Size;
                    var Value = _entities.ModelColorSizeGrouping.Where(x => x.ModelColorId == item.Id && x.SizeGroupingId == SizeId).FirstOrDefault();
                    if (Value != null)
                    {
                        objColor.SizeValue.Add(SizeName, Value.Value);
                        objColor.TotalValues += Value.Value;
                    }
                    else
                        objColor.SizeValue.Add(SizeName, 0);
                }
                ColorSizeValues.Add(objColor);
            }
            var PSOTMNStages = new List<RealStagesNewMV>();
            if (Id3 == 1)
            {
                PSOTMNStages = _entities.RealStagesNew.Where(b => b.ProductionStagesOfTheModelNew.ModelDescriptionId == Id2 && (b.flag == 0 || b.flag == 1)).Select(B => new RealStagesNewMV
                {
                    Id = B.Id,
                    serialNumber = B.serialNumber,
                    Name = B.chineseName,
                    NameAr = B.arabicName
                }).ToList();
            }
            else if (Id3 == 2)
            {
                PSOTMNStages = _entities.RealStagesNew.Where(b => b.ProductionStagesOfTheModelNew.ModelDescriptionId == Id2 && b.flag == 2).Select(B => new RealStagesNewMV
                {
                    Id = B.Id,
                    serialNumber = B.serialNumber,
                    Name = B.chineseName,
                    NameAr = B.arabicName
                }).ToList();
            }
            else if (Id3 == 3)
            {
                PSOTMNStages = _entities.RealStagesNew.Where(b => b.ProductionStagesOfTheModelNew.ModelDescriptionId == Id2 && b.flag == 3).Select(B => new RealStagesNewMV
                {
                    Id = B.Id,
                    serialNumber = B.serialNumber,
                    Name = B.chineseName,
                    NameAr = B.arabicName
                }).ToList();
            }
            else
            {
                PSOTMNStages = _entities.RealStagesNew.Where(b => b.ProductionStagesOfTheModelNew.ModelDescriptionId == Id2 ).Select(B => new RealStagesNewMV
                {
                    Id = B.Id,
                    serialNumber = B.serialNumber,
                    Name = B.chineseName,
                    NameAr=B.arabicName
                }).ToList();  
            }
            foreach (var stage in PSOTMNStages)
            {
                string json = JsonConvert.SerializeObject(ColorSizeValues);
                stage.ColorSizeValues = JsonConvert.DeserializeObject<List<ColorSizeValueMV>>(json);
                var NameOfModel = _entities.ModelDesciption.Where(m => m.Id == Id2).FirstOrDefault().ModelNumber;
                var APSOTMContain = _entities.ActualProductionStagesOfTheModel.Where(c => c.BalletBarCode.Contains(NameOfModel) && c.ProductionStagesSerialNum == stage.serialNumber).ToList();

                // Group APSOTMContain by EmployeeCode
                var groupedByEmployee = APSOTMContain.GroupBy(x => x.EmployeeCode).ToList();
                stage.ColorSizeDoneValue = new List<ColorSizeValueMV>(); // Clear existing data

                foreach (var group in groupedByEmployee)
                {
                    var employeeName = _entities.GS_Employees.Where(x => x.Id == group.Key).FirstOrDefault().Name; // Access the EmployeeCode for this group

                    foreach (var Color in stage.ColorSizeValues)
                    {
                        var colorSizeDoneByEmployee = new ColorSizeValueMV
                        {
                            ColorName = Color.ColorName,
                            ColorCode = Color.ColorCode,
                            TotalValues = Color.TotalValues,
                            SizeValue = Color.SizeValue,
                            SizeValueDone = new Dictionary<string, double>(),
                            SizeValueRemain = new Dictionary<string, double>(),
                            SizeValuePercent = new Dictionary<string, double>()
                        };

                        foreach (var Size in SizeList)
                        {
                            double realQuan = 0;
                            string SizeName = Size.Size;
                            int RepeatedSize = 0;

                            foreach (var BarCodeData in group)
                            {
                                string[] parts = BarCodeData.BalletBarCode.Split('*');
                                string ModelNum = parts[0];
                                string Quantity = parts[1];
                                string ColorSize = parts.Last();
                                string ColorCode = ColorSize.Substring(0, 3);
                                string BarSizeName = ColorSize.Substring(3);

                                // Check for matching ColorCode and SizeName
                                if (ColorCode == Color.ColorCode && BarSizeName == SizeName)
                                {
                                    int? stageFlag = _entities.RealStagesNew
                                        .Where(f => f.ProductionStagesOfTheModelId == BarCodeData.ProductionStagesOfTheModelNewId && f.serialNumber == stage.serialNumber)
                                        .Select(f => f.flag)
                                        .FirstOrDefault();

                                    if (stageFlag == 0 || stageFlag == 1)
                                    {
                                        realQuan += Convert.ToDouble(Quantity);
                                    }
                                    else if (stageFlag == 2 || stageFlag == 3)
                                    {
                                        RepeatedSize++;
                                    }
                                }
                            }

                            // Populate SizeValueDone for the employee
                            colorSizeDoneByEmployee.SizeValueDone.Add(SizeName, realQuan + RepeatedSize);
                        }

                        // Calculate remaining and percentage values
                        foreach (var key in Color.SizeValue.Keys)
                        {
                            double value = Color.SizeValue[key];
                            double doneValue = colorSizeDoneByEmployee.SizeValueDone.ContainsKey(key)
                                ? colorSizeDoneByEmployee.SizeValueDone[key]
                                : 0;

                            colorSizeDoneByEmployee.SizeValueRemain[key] = value - doneValue;
                            colorSizeDoneByEmployee.SizeValuePercent[key] = doneValue != 0 ? Math.Round((doneValue / value * 100), 3) : 0;
                        }

                        colorSizeDoneByEmployee.TotalValuesDone = colorSizeDoneByEmployee.SizeValueDone.Values.Sum();
                        colorSizeDoneByEmployee.TotalValuesRemaining = colorSizeDoneByEmployee.TotalValues - colorSizeDoneByEmployee.TotalValuesDone;
                        colorSizeDoneByEmployee.TotalValuesPercent = colorSizeDoneByEmployee.TotalValuesDone != 0
                            ? Math.Round((colorSizeDoneByEmployee.TotalValuesDone / colorSizeDoneByEmployee.TotalValues * 100), 3)
                            : 0;

                        // Assign the correct EmployeeCode
                        colorSizeDoneByEmployee.EmployeeName = employeeName;

                        stage.ColorSizeDoneValue.Add(colorSizeDoneByEmployee);
                    }
                }
            }


            foreach (var stage in PSOTMNStages)
            {
                foreach (var colorSizeValue in stage.ColorSizeValues)
                {
                    var sizeValueRemain = new Dictionary<string, double>();
                    var sizeValuePercent = new Dictionary<string, double>();

                    foreach (var key in colorSizeValue.SizeValue.Keys)
                    {
                        double value = colorSizeValue.SizeValue[key];
                        double doneValue = colorSizeValue.SizeValueDone.ContainsKey(key)
                            ? colorSizeValue.SizeValueDone[key]
                            : 0;

                        sizeValueRemain[key] = value - doneValue;
                        sizeValuePercent[key] = doneValue != 0 ? Math.Round((doneValue / value * 100), 3) : 0;
                    }
                    colorSizeValue.SizeValueRemain = sizeValueRemain;
                    colorSizeValue.SizeValuePercent = sizeValuePercent;
                    colorSizeValue.TotalValuesRemaining = colorSizeValue.TotalValues - colorSizeValue.TotalValuesDone;
                    colorSizeValue.TotalValuesPercent = colorSizeValue.TotalValuesDone != 0 ? Math.Round((colorSizeValue.TotalValuesDone / colorSizeValue.TotalValues * 100), 3) : 0;
                }
            }
            var Data = new
            {
                ColorList,
                SizeList,
                PSOTMNStages,
            };
            JsonResult Res = Json(Data, JsonRequestBehavior.AllowGet);
            Res.MaxJsonLength = int.MaxValue;
            return Res;
        }
     
	}
}