StockReceipt.controller("Receipt1", function ($scope, myservice, $compile, $filter, $route) {
    var ParameterInLink = window.location.hash.split("#I_");
    var PageIdToView = ParameterInLink[1];
    $scope.CheckReceiptNo = function (Type, Number) {
        if (($scope.CompanyName.includes('techno') || $scope.CompanyName.includes('fouad')) && ($scope.Transaction == 0 || ($scope.Transaction == 1 && $scope.CheckIdCode != Number))) {
            myservice.LoadByThreeIds("StockReceiptPurchOrder", "CheckReceiptNo", Type, Number).then(function (data) {
                debugger
                console.log(data.data);
                if (data.data != null && data.data != "") {
                    $scope.ReceiptOrderNumber = null;
                    $scope.EditRow.Code = null;
                    $scope.Info_Message = "هذا الرقم موجود من قبل";
                    $scope.Status_Class = "red";
                    $("#show").modal("show");
                } else {
                    $scope.Description = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
             : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;
                    $scope.Desc = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
                                : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;


                }
            });

        } else if (!$scope.CompanyName.includes('techno') && !$scope.CompanyName.includes('fouad')) {
            myservice.LoadByThreeIds("StockReceiptPurchOrder", "CheckReceiptNo", Type, Number).then(function (data) {
                debugger
                console.log(data.data);
                if (data.data != null && data.data != "") {
                    $scope.ReceiptOrderNumber = null;
                    $scope.Info_Message = "هذا الرقم موجود من قبل";
                    $scope.Status_Class = "red";
                    $("#show").modal("show");
                } else {
                    $scope.Description = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
             : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;
                    $scope.Desc = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
                                : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;


                }
            });

        }
    }
    $scope.CheckPrivateNo = function (Type, Number) {
        if (($scope.CompanyName.includes('techno') || $scope.CompanyName.includes('fouad')) && ($scope.Transaction == 0 || ($scope.Transaction == 1 && $scope.CheckPrivateNum != Number))) {
            myservice.LoadByThreeIds("StockReceiptPurchOrder", "CheckPrivateNo", Type, Number, $scope.StoreName_Id).then(function (data) {
                debugger
                console.log(data.data);
                if (data.data != null && data.data != "") {
                    $scope.PrivateNumber = null;
                    $scope.EditRow.PrivateNumber = null;
                    $scope.Info_Message = "هذا الرقم موجود من قبل";
                    $scope.Status_Class = "red";
                    $("#show").modal("show");
                } else {
                    $scope.Description = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
          : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;
                    $scope.Desc = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
                                : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;

                }
            });

        } else if (!$scope.CompanyName.includes('techno') && !$scope.CompanyName.includes('fouad')) {
            myservice.LoadByThreeIds("StockReceiptPurchOrder", "CheckPrivateNo", Type, Number, $scope.StoreName_Id).then(function (data) {
                debugger
                console.log(data.data);
                if (data.data != null && data.data != "") {
                    $scope.PrivateNumber = null;
                    $scope.Info_Message = "هذا الرقم موجود من قبل";
                    $scope.Status_Class = "red";
                    $("#show").modal("show");
                } else {
                    $scope.Description = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
          : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;
                    $scope.Desc = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
                                : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;

                }
            });

        }
    }
    $scope.CalcEquation = function (item, StoringProvision, Parent) {
        debugger
        var arr = [];
        var obj = $filter('filter')(StoringProvision, { StoringTypes: 5 });
        if (obj != null && obj != undefined) {
            for (var i = 0; i < obj.length; i++) {
                child = obj[i];
                child.NewEquation = child.Equation;
                for (var j = 0; j < StoringProvision.length; j++) {
                    Prov = StoringProvision[j];
                    if (Prov.StoringTypes == 3 || Prov.StoringTypes == 4) {
                        child.NewEquation = child.NewEquation.replace(Prov.Symbol, Prov.Value);
                    }
                }
                regex = /[a-zA-Z]/;
                var check = regex.test(child.NewEquation);
                if (check == false)
                    child.Value = eval(child.NewEquation);
                child.Value = number(parseFloat(child.Value).toFixed(2));
                console.log(child.Value);

                //    item = {};
                //item.Equation = "x * y * z";
                //if (item.Equation != null && item.Equation != undefined && item.Equation != '') {
                //    var x = 5;
                //    var y = 3; var z = 4;
                //    res = "1+(1+x)";
                //    zz = 'x';
                //    // ^([-+/*]\d+(\.\d+)?)*
                //    item.NewEquation = '';
                //    let result = res.replace('x', x);
                //    console.log(result);
                //    regex = /[a-zA-Z]/;
                //    var check = regex.test(result);
                //    if (check == false)
                //        var result2 = eval(result);
                //    console.log(result2);
                //}
            }
        }
    }

    $scope.CreateDate = ''; // This will hold the date and time selected
    // Once the document is ready, initialize the DateTimePicker
    var currentDateTime = moment().format('YYYY-MM-DD hh:mm A');
    $scope.CreateDate = currentDateTime;
    $scope.activateDateTimePicker = function () {
        debugger
        // Initialize the DateTimePicker if it's not already initialized
        if (!$('#datetimepicker1').data("DateTimePicker")) {
            $('#datetimepicker1').datetimepicker({
                format: 'YYYY-MM-DD hh:mm A', // Date and time format
                minDate: moment("1990-01-01"), // Minimum date is January 1, 1990
                maxDate: moment("2099-12-31"), // Maximum date is December 31, 2099
                showClose: true, // Show close button
                showTodayButton: true, // Show "Today" button
                icons: {
                    time: 'glyphicon glyphicon-time',
                    date: 'glyphicon glyphicon-calendar',
                    up: 'glyphicon glyphicon-chevron-up',
                    down: 'glyphicon glyphicon-chevron-down',
                    previous: 'glyphicon glyphicon-chevron-left',
                    next: 'glyphicon glyphicon-chevron-right',
                    today: 'glyphicon glyphicon-screenshot',
                    clear: 'glyphicon glyphicon-trash',
                    close: 'glyphicon glyphicon-remove'
                }
            }).on('dp.change', function (e) {
                // Apply the change to AngularJS scope
                $scope.$apply(function () {
                    // Format the date using the specified format and assign it to CreateDate
                    $scope.CreateDate = e.date.format('YYYY-MM-DD hh:mm A');
                });
            });
        }

        // Set the current date/time if CreateDate is empty
        if (!$scope.CreateDate) {
            var currentDateTime = moment().format('YYYY-MM-DD hh:mm A');

            $scope.CreateDate = currentDateTime;

            $('#datetimepicker1').data("DateTimePicker").date(currentDateTime);
        }

        // Manually open the DateTimePicker popup
        $('#datetimepicker1').data("DateTimePicker").show();
    };

    function GetCampanyNameAndLogo() {
        debugger
        myservice.getdata("FinalExchangeOrder", "GetCampanyNameAndLogo").then(function (data) {


            $scope.Logo = data.data.CompanyHeader;

            $scope.CompanyName = data.data.CompanyName;
            $scope.Footer = data.data.CompanyFooter;
            $scope.UserName = data.data.UserName;
            $scope.Find2M = $scope.CompanyName.includes('2m');
            $scope.FindTechno = $scope.CompanyName.includes('techno');

        }).finally(function () {
            debugger
            console.log($scope.Logo)
            console.log($scope.CompanyName)
        });
    }
    GetCampanyNameAndLogo();

    var counter = 0;
    var modes = { iframe: "iframe", popup: "popup" };
    var standards = { strict: "strict", loose: "loose", html5: "html5" };
    var defaults = {
        mode: modes.iframe,
        standard: standards.html5,
        popHt: 500,
        popWd: 400,
        popX: 200,
        popY: 200,
        popTitle: '',
        popClose: false,
        extraCss: '',
        extraHead: '',
        retainAttr: ["id", "class", "style"]
    };

    var settings = {};//global settings


    $.fn.printArea2 = function (options) {
        $.extend(settings, defaults, options);

        counter++;
        var idPrefix = "printArea_";
        $("[id^=" + idPrefix + "]").remove();

        settings.id = idPrefix + counter;

        var $printSource = $(this);


        var PrintAreaWindow = PrintArea.getPrintWindow();

        PrintArea.write(PrintAreaWindow.doc, $printSource);

        setTimeout(function () {

            PrintArea.print(PrintAreaWindow);

        }, 1000);

    };

    var PrintArea = {
        print: function (PAWindow) {
            var paWindow = PAWindow.win;
            console.log("PaWindo");
            console.log(paWindow);
            $(PAWindow.doc).ready(function () {




                paWindow.focus();
                paWindow.print();






                if (settings.mode == modes.popup && settings.popClose)
                    setTimeout(function () { paWindow.close(); }, 2000);
            });
        },
        write: function (PADocument, $ele) {
            PADocument.open();


            PADocument.write(PrintArea.docType() + "<html>" + PrintArea.getHead() + PrintArea.getBody($ele) + "</html>");


            PADocument.close();
        },
        docType: function () {
            if (settings.mode == modes.iframe) return "";

            if (settings.standard == standards.html5) return "<!DOCTYPE html>";

            var transitional = settings.standard == standards.loose ? " Transitional" : "";
            var dtd = settings.standard == standards.loose ? "loose" : "strict";

            return '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01' + transitional + '//EN" "http://www.w3.org/TR/html4/' + dtd + '.dtd">';

        },
        getHead: function () {
            var extraHead = "";
            var links = "";
            function getCompanyName() {

                var CompanyName;
                if ($("#langsession").val() == "ar-EG") {

                    CompanyName = GS_CompanyName;

                }
                if ($("#langsession").val() == "en-GB") {
                    CompanyName = GS_CompanyName;
                }


                if (InitialCatalog.toLowerCase().includes("letraco")) {
                    CompanyName = " <div class='text-right' style='position:relative; right:20; top:10;bottom:100px;  width:120;height:60; ' ><h2 class='text-center' style='font-weight: bolder; letter-spacing: .01rem; line-height: 50%; font-size: x-large; '>لــتراكـو</h2><h5 class='text-center' style='font-weight: bold; line-height: 30%;'>(ر-ي-كيال وشركاه)</h5><h5 class='text-center' style='font-weight: bold; line-height: 30%;'>س.ت :178882</h5><h5></h5></div>";
                }
                return CompanyName;

            };
            function getDate() {
                var date = new Date();
                dateOptions = {
                    //weekday: 'long',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                };
                timeOptions = {

                }
                var dateString;
                if ($("#langsession").val() == "ar-EG") {
                    dateString = '	\t التاريخ  ' + date.getDate() + '\t- ' + (parseInt(date.getMonth()) + 1) + '\t -' + date.getFullYear() + '              ' + '	\t  الوقت ' + '              ' + date.toLocaleTimeString('ar-EG', { hour12: true });
                }
                if ($("#langsession").val() == "en-GB") {
                    dateString = '              ' + '	\t Date  ' + date.getDate('en-GB', dateOptions) + '\t- ' + date.getMonth('en-GB', dateOptions) + 1 + '\t-' + date.getMonth('en-GB', dateOptions) + '              ' + '<br/>' + '	\t  Time ' + '              ' + date.toLocaleTimeString('en-GB', { hour12: true });
                }

                return dateString;
            };


            if (settings.extraHead) settings.extraHead.replace(/([^,]+)/g, function (m) { extraHead += m });

            $(document).find("link")
                .filter(function () { // Requirement: <link> element MUST have rel="stylesheet" to be considered in print document
                    var relAttr = $(this).attr("rel");
                    return ($.type(relAttr) === 'undefined') == false && relAttr.toLowerCase() == 'stylesheet';
                })
                //.filter(function () { // Include if media is undefined, empty, print or all
                //    var mediaAttr = $(this).attr("media");
                //    return $.type(mediaAttr) === 'undefined' || mediaAttr == "" || mediaAttr.toLowerCase() == 'print' || mediaAttr.toLowerCase() == 'all'
                //})
                .each(function () {
                    links += '<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '" >';
                });
            if (settings.extraCss) settings.extraCss.replace(/([^,\s]+)/g, function (m) { links += '<link type="text/css" rel="stylesheet" href="' + m + '">' });

            return "<head>" + extraHead + '<span class="text-center" style="display:block">' + links + "</span>" + "</head>"; //+ "&nbsp;<h2 style='border:none;margin-top:20px;margin-right:15px;display:inline-block;'>" + getCompanyName() + links + "</h2>" + "&nbsp;<lable style='border:none;margin-top:40px;margin-left:15px;left:0px;position:absolute;'>" + getSupplierData().SupplierName + "</lable><br><lable style='border:none;margin-top:0px;margin-left:15px;left:0px;position:absolute;'>" + getSupplierData().SupplierAddress + "</lable><br><lable style='border:none;margin-top:0px;margin-left:15px;left:0px;position:absolute;'>" + getSupplierData().Email + "</lable><br><lable style='border:none;margin-top:0px;margin-left:15px;left:0px;position:absolute;'>" + getSupplierData().Telephone + "</lable><br><lable style='border:none;margin-top:0px;margin-left:15px;left:0px;position:absolute;'>" + getSupplierData().Fax + "</lable></head>";
        },
        getBody: function (elements) {
            var htm = "";
            var img = new Image();
            var attrs = settings.retainAttr;
            elements.each(function () {
                var ele = PrintArea.getFormData($(this));

                var attributes = ""
                for (var x = 0; x < attrs.length; x++) {
                    var eleAttr = $(ele).attr(attrs[x]);
                    if (eleAttr) attributes += (attributes.length > 0 ? " " : "") + attrs[x] + "='" + eleAttr + "'";
                }
                var url = window.location.href;
                var arr = url.split("/");
                /// var result = arr[0] + "//" + arr[2] + "/Content/Images/Alpha_Omega.PNG";
                //var result = arr[0] + "//" + arr[2] + "/Content/Images/ITIS.png";
                //if (InitialCatalog.toLowerCase().includes("pwt"))
                //{
                var result = arr[0] + "//" + arr[2] + LogoPath;
                console.log("")

                htm += '<div ' + attributes + '>' + $(ele).html() + '</div>';
                //}
                //else
                //{
                //    htm += '<div ' + attributes + '>' + $(ele).html() + '</div>';
                //}



            });
            console.log("htm");
            console.log(htm);




            return "<body class='smart-rtl'>" + htm + "</body>";






        },
        getFormData: function (ele) {
            var copy = ele.clone();
            var copiedInputs = $("input,select,textarea", copy);
            $("input,select,textarea", ele).each(function (i) {
                var typeInput = $(this).attr("type");
                if ($.type(typeInput) === 'undefined') typeInput = $(this).is("select") ? "select" : $(this).is("textarea") ? "textarea" : "";
                var copiedInput = copiedInputs.eq(i);

                if (typeInput == "radio" || typeInput == "checkbox") copiedInput.attr("checked", $(this).is(":checked"));
                else if (typeInput == "text") copiedInput.attr("value", $(this).val());
                else if (typeInput == "select")
                    $(this).find("option").each(function (i) {
                        if ($(this).is(":selected")) $("option", copiedInput).eq(i).attr("selected", true);
                    });
                else if (typeInput == "textarea") copiedInput.text($(this).val());
            });
            return copy;
        },
        getPrintWindow: function () {
            switch (settings.mode) {
                case modes.iframe:
                    var f = new PrintArea.Iframe();
                    return { win: f.contentWindow || f, doc: f.doc };
                case modes.popup:
                    var p = new PrintArea.Popup();
                    return { win: p, doc: p.doc };
            }
        },
        Iframe: function () {
            var frameId = settings.id;
            var iframeStyle = 'border:1px;position:relative;width:0px;height:0px;right:0px;top:0px;';
            var iframe;

            try {
                iframe = document.createElement('iframe');
                document.body.appendChild(iframe);
                $(iframe).attr({ style: iframeStyle, id: frameId, src: "#" + new Date().getTime() });
                iframe.doc = null;
                console.log("Iframe.contentDocument");
                console.log(iframe.contentDocument);
                iframe.doc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
            }
            catch (e) { throw e + ". iframes may not be supported in this browser."; }

            if (iframe.doc == null) throw "Cannot find document.";

            return iframe;
        },
        Popup: function () {
            var windowAttr = "location=yes,statusbar=no,directories=no,menubar=no,titlebar=no,toolbar=no,dependent=no";
            windowAttr += ",width=" + settings.popWd + ",height=" + settings.popHt;
            windowAttr += ",resizable=yes,screenX=" + settings.popX + ",screenY=" + settings.popY + ",personalbar=no,scrollbars=yes";

            var newWin = window.open("", "_blank", windowAttr);

            newWin.doc = newWin.document;

            return newWin;
        }
    };


    $scope.Print = function () {
        console.log($scope.ChequeList);
        debugger
        $scope.EditRow.SourceOfSupplyName = $filter('filter')($scope.SourceOfSupply, { Id: $scope.EditRow.SourceOfSupply_Id }) != null ?
              $filter('filter')($scope.SourceOfSupply, { Id: $scope.EditRow.SourceOfSupply_Id })[0].Name : "";
        if ($scope.Transaction == 1) {
            $scope.ReceiptOrderNumber = $scope.EditRow.Code;
            $scope.PrivateNumber = $scope.EditRow.PrivateNumber;
            //$scope.ReceiptOrderDate = kendo.toString(kendo.parseDate($scope.EditRow.ReceiptOrderDate), 'dd/MM/yyyy');
            var hours = $scope.EditRow.Time.getHours();
            var min = $scope.Time.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            $scope.TimeToShow = hours + ":" + min + " " + ampm;
            if ($scope.Supplier2 != null && $scope.Supplier2 != undefined && $scope.Supplier2.Name != null && $scope.Supplier2.Name != undefined)
                $scope.EditRow.SuppliedSectorName = $scope.Supplier2.Name;
            else
                $scope.EditRow.SuppliedSectorName = $scope.EditRow.SuppliedSectorName;
        } else {

            //$scope.ReceiptOrderDate = kendo.toString(kendo.parseDate($scope.ReceiptOrderDate), 'dd/MM/yyyy');
            $scope.EditRow.Description = $scope.Description;
            var hours = $scope.Time.getHours();
            var min = $scope.Time.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            $scope.TimeToShow = hours + ":" + min + " " + ampm;
            if ($scope.Supplier != null && $scope.Supplier != undefined && $scope.Supplier.Name != null && $scope.Supplier.Name != undefined)
                $scope.EditRow.SuppliedSectorName = $scope.Supplier.Name;
            else
                $scope.EditRow.SuppliedSectorName = $scope.EditRow.SuppliedSectorName;
        }
        setTimeout(function () {
            if ($("#Lang").val() == "ar-EG") {
                $("#PrintDir").attr("dir", "rtl").addClass("smart-rtl");
            }

            var options = { mode: "iframe" };


            $("#DivToPrint").printArea2(options);
        }, 1000);



    };
    ////////////////////////////////////////////////////////
    $scope.GetAllData = function (Id) {
        if (Id > 0) {
            $scope.CostCenterList = [];
            $scope.EditRow.AccountName = "";
            $scope.Total = 0;
            myservice.LoadDataById("StockReceiptPurchOrder", "GetAllDataForReceipt", Id).then(function (data) {

                $scope.ReceiptsOrders = data.data;
                $scope.EditTable = 100;
                $scope.receiptdata = $scope.ReceiptsOrders;
                var grid = $("#OfferTable22").data("kendoGrid");
                if (grid !== undefined) {
                    grid.wrapper.empty();
                    grid.destroy();
                    $("#Offer22").html($scope.outergrid);
                    $compile($('#Offer22'))($scope);
                    CreateGridGetList22($scope.receiptdata);

                }
                else {
                    $scope.outergrid = $("#Offer22").html();
                    CreateGridGetList22($scope.receiptdata);

                }
                $scope.SourceOfSupply = [
                     { Id: 1, Name: "إدارة الإنتاج " },
                      { Id: 2, Name: "مرتجع من عميل " },
                         { Id: 3, Name: "تحويل من مخزن أخر " },
                          { Id: 4, Name: "أخرى " },
                      { Id: 5, Name: "مورد" },
                       { Id: 19, Name: "أمر ارتجاع" },
                       { Id: 100, Name: "مرتجع من الإنتاج " },
                ];
            }).finally(function () {
                myservice.LoadDataById("StockReceiptPurchOrder", "GetPrivateNumber", Id).then(function (data) {

                    $scope.PrivateNumber = data.data;

                });
            })

        }
    }

    //////////////////////////////////////////////////////////////////////////
    $scope.getFilterAccount = function (Id) {
        debugger
        $scope.resultAccount = [];
        for (i = 0; i < $scope.AccountNames.length; i++) {
            if ($scope.resultAccount.length <= 5) {
                if ($scope.AccountNames[i].toLowerCase().includes(
                       $scope.EditRow.AccountName.toLowerCase()))
                    $scope.resultAccount.push($scope.AccountNames[i]);
            } else {
                break;
            }
        }

        $("#" + Id).autocomplete({

            source: $scope.resultAccount, minLength: 0
        })


        $("#" + Id).keydown();
        console.log($(this));
    }
    $scope.searchchangeAccount = function (Id) {
        var x = findIndexInData($scope.Accounts, "Name", $('#' + Id).val());
        if (x == -1 && $('#' + Id).val() != "" && $('#' + Id).val() != null) {
            $scope.Info_Message = $scope.lang == 'ar-EG' ?
                'خطا فى اختار العنصر' : "Error in selected element";
            $scope.Status_Class = "red";
            $("#show").modal("show");

            $scope.EditRow.AccountName = "";

        }
        else {

            $scope.EditRow.AccountId = $scope.Accounts[x].Id;
            $scope.EditRow.AccountName = $scope.Accounts[x].Name;

        }

    }
    $scope.ClickAccount = function (Id) {
        debugger
        var result = $scope.AccountNames;
        $("#" + Id).autocomplete({

            source: result.slice(0, 10), minLength: 0
        })


        $("#" + Id).keydown();
        console.log($(this));

    }
    //////////////////////////////////////////////////////////////////////////
    $scope.getFilterAutoComplete = function (item, Id, Type) {
        debugger
        if (Type == 1) {
            item.ItemCode = "";
            $scope.resultNameList = [];

            //for (i = 0; i < item.resultNameList.length; i++) {
            //    if ($scope.resultNameList.length <= 5) {
            //        if (item.Names[i].substr(0,
            //            item.GroupName2.length).toLowerCase() ==
            //            item.GroupName2.toLowerCase())
            //            $scope.resultNameList.push(item.Names[i]);
            //    } else {
            //        break;
            //    }
            //}
            $scope.GetChildAutoComplete(item, $scope.Group_Id, item.MainGroup_Id, Type, item.ItemName, Id);

        } else if (Type == 2) {
            $scope.resultCodeList = [];
            item.ItemName = "";

            $scope.GetChildAutoComplete(item, $scope.Group_Id, item.MainGroup_Id, Type, item.ItemCode, Id);
        }
        console.log($(this));
    }
    $scope.GetChildAutoComplete = function (item, Group_Id, MainGroup_Id, Type, Match, SelectorId) {
        debugger
        if (SelectorId != undefined && SelectorId != null && SelectorId != "") {
            Match = $('#' + SelectorId).val();
        }
        if (MainGroup_Id == 0)
            MainGroup_Id = item.ParentGroupId;
        myservice.LoadByThreeIdsAndString("StockReceiptPurchOrder", "GetOtherChildAutoComplete", item.Group_Id, MainGroup_Id, Type, Match).then(function (data) {
            item.MainGroup_Id = MainGroup_Id;
            item.Names = data.data.Names;
            item.Codes = data.data.Codes;
            item.GroupList = data.data.GroupList;
            if (SelectorId != undefined && SelectorId != null && SelectorId != "") {
                if (Type == 1) {
                    $scope.resultNameList = item.Names != null ?
                       item.Names.slice() : [];
                } else if (Type == 2) {
                    $scope.resultNameList = item.Codes != null ?
                        item.Codes.slice() : [];
                }
                $("#" + SelectorId).autocomplete({

                    source: $scope.resultNameList, minLength: 0
                })


                $("#" + SelectorId).keydown();
            }
        });
    }
    $scope.ChangedAutoComplete2 = function (item, index, Id, list, Type) {
        debugger

        //for (var i = 0; i < $scope.AllItemUnits.length; i++) {
        //    $scope.AllItemUnits[i].Id = $scope.AllItemUnits[i].UnitId;
        //    $scope.AllItemUnits[i].Name = $scope.AllItemUnits[i].UnitName;
        //}
        if ($('#' + Id).val() != null && $('#' + Id).val() != "") {
            if (Type == 1) {
                var x = -1;
                item.ItemCode = "";
                item.InventoryQuantity = "";
                console.log($('#' + Id).val());
                console.log($('#' + Id).val().trim().toLowerCase());
                for (i = 0; i < item.Names.length; i++) {
                    console.log(item.Names[i]);
                    console.log(item.Names[i].trim().toLowerCase());
                    console.log(item.Names[i].replace(/[\n\r]/g, ''));

                    if (item.Names[i].replace(/[\n\r]/g, '').trim().toLowerCase() == $('#' + Id).val().trim().toLowerCase()) {
                        x = i;
                        break;
                    }
                }
                if (x == -1) {
                    $scope.Info_Message =
              'خطا فى اختار العنصر';
                    $scope.Status_Class = "red";
                    $("#SharedShow").modal("show");
                    item.ItemName = "";
                    item.ItemCode = "";
                    item.Name = "";
                    item.BasicCode = "";
                    item.Quantity = "";
                    item.UnitId = "";
                    item.UnitPrice = "";
                    item.Totally = "";
                    $('#' + Id).val = "";
                    item.Quantity = "";
                } else {
                    //item.ItemName = item.Names[x];
                    //item.ItemCode = item.Codes[x];
                    //item.ClassId = item.GroupList[x].ClassId;
                    //item.InventoryQuantity = item.GroupList[x].TotalBalance;
                    var found = false;

                    if (found == false) {
                        item.ItemName = item.Names[x];
                        item.ItemCode = item.Codes[x];
                        item.ClassId = item.GroupList[x].ClassId;
                        item.ParentGroupId = item.GroupList[x].MainGroup_Id;
                        item.Name = item.Names[x];
                        item.BasicCode = item.Codes[x];
                        myservice.LoadByTwoIds("StockReceiptPurchOrder", "GetEnglishName", item.Group_Id, item.ClassId).then(function (data) {
                            item.EnglishName = data.data;
                        });
                        myservice.LoadByItemName("StockReceiptPurchOrder", "GetWeightAverage", item.ItemName).then(function (data) {
                            item.UnitPrice = data.data;
                        }).finally(function () {
                            myservice.LoadByTwoIds("StockReceiptPurchOrder", "GetAllUnitsAndStoringProvisionsByClassId", item.ClassId, item.Group_Id).then(function (data) {
                                debugger
                                console.log(data.data)
                                item.ItemUnit = data.data.ItemUnit;
                                item.StoringProvision = data.data.StoringProvisions;
                            });
                        })

                    } else if (found == true) {
                        $scope.Info_Message = "لا يمكن عمل طلبية لنفس الصنف  ";
                        $scope.Status_Class = "red";

                        $scope.Info_Message = "لا يمكن عمل طلبية لنفس الصنف  ";
                        $scope.Status_Class = "red";
                        $("#SharedShow").modal("show");
                        item.ItemName = "";
                        item.ItemCode = "";
                        item.Name = "";
                        item.BasicCode = "";
                        item.Quantity = "";
                        item.UnitId = "";
                        item.UnitPrice = "";
                        item.Totally = "";
                        $('#' + Id).val = "";
                    }

                }
            } else if (Type == 2) {
                var x = -1;
                item.ItemName = "";
                console.log($('#' + Id).val());
                item.InventoryQuantity = "";
                for (i = 0; i < item.Codes.length; i++) {
                    if (item.Codes[i].toLowerCase() == $('#' + Id).val().toLowerCase()) {
                        x = i;
                        break;
                    }
                }
                if (x == -1) {
                    $scope.Info_Message =
          'خطا فى اختار العنصر';
                    $scope.Status_Class = "red";
                    $("#SharedShow").modal("show");
                    item.ItemName = "";
                    item.ItemCode = "";
                    item.Name = "";
                    item.BasicCode = "";
                    item.Quantity = "";
                    item.UnitId = "";
                    item.UnitPrice = "";
                    item.Totally = "";
                    $('#' + Id).val = "";

                } else {
                    ////item.ItemName = item.Names[x];
                    ////item.ClassId = item.GroupList[x].ClassId;
                    ////item.InventoryQuantity = item.GroupList[x].TotalBalance;
                    var found = false;

                    if (found == false) {
                        item.ItemName = item.Names[x];
                        item.ItemCode = item.Codes[x];
                        item.ClassId = item.GroupList[x].ClassId;
                        item.ParentGroupId = item.GroupList[x].MainGroup_Id;
                        item.InventoryQuantity = item.GroupList[x].TotalBalance;
                        item.Name = item.Names[x];
                        item.BasicCode = item.Codes[x];
                        myservice.LoadByTwoIds("StockReceiptPurchOrder", "GetEnglishName", item.Group_Id, item.ClassId).then(function (data) {
                            item.EnglishName = data.data;
                        });
                        myservice.LoadByItemName("StockReceiptPurchOrder", "GetWeightAverage", item.ItemName).then(function (data) {
                            item.UnitPrice = data.data;
                        }).finally(function () {
                            myservice.LoadByTwoIds("StockReceiptPurchOrder", "GetAllUnitsAndStoringProvisionsByClassId", item.ClassId, item.Group_Id).then(function (data) {
                                debugger
                                console.log(data.data)
                                item.ItemUnit = data.data.ItemUnit;
                                item.StoringProvision = data.data.StoringProvisions;
                            });
                        })
                    } else if (found == true) {
                        $scope.Info_Message = "لا يمكن عمل طلبية لنفس الصنف  ";
                        $scope.Status_Class = "red";

                        $scope.Info_Message = "لا يمكن عمل طلبية لنفس الصنف  ";
                        $scope.Status_Class = "red";
                        $("#SharedShow").modal("show");
                        item.ItemName = "";
                        item.ItemCode = "";
                        item.Name = "";
                        item.BasicCode = "";
                        item.Quantity = "";
                        item.UnitId = "";
                        item.UnitPrice = "";
                        item.Totally = "";
                        $('#' + Id).val = "";
                    }
                }
            }
        }

    }
    $scope.ClickAutoComplete = function (Id, item, Type) {
        debugger
        if (Type == 1) {
            if (item.Names == undefined || item.Names == null || item.Names == "") {
                myservice.LoadByThreeIdsAndString("StockReceiptPurchOrder", "GetOtherChildAutoComplete", item.Group_Id, item.ParentGroupId, Type, "").then(function (data) {
                    item.Names = data.data.Names;
                    item.Codes = data.data.Codes;
                    item.GroupList = data.data.GroupList;
                }).finally(function () {
                    $scope.resultNameList = [];
                    $scope.resultNameList = item.Names;
                    $("#" + Id).autocomplete({

                        source: $scope.resultNameList.slice(0, 10), minLength: 0
                    })


                    $("#" + Id).keydown();
                    console.log($(this));
                });
            } else {
                $scope.resultNameList = [];
                $scope.resultNameList = item.Names;
                $("#" + Id).autocomplete({

                    source: $scope.resultNameList.slice(0, 10), minLength: 0
                })


                $("#" + Id).keydown();
                console.log($(this));
            }


        } else if (Type == 2) {

            if (item.Codes == undefined || item.Codes == null || item.Codes == "") {
                myservice.LoadByThreeIdsAndString("StockReceiptPurchOrder", "GetOtherChildAutoComplete", item.Group_Id, item.ParentGroupId, Type, "").then(function (data) {
                    item.Names = data.data.Names;
                    item.Codes = data.data.Codes;
                    item.GroupList = data.data.GroupList;
                }).finally(function () {
                    $scope.resultCodeList = [];
                    $scope.resultCodeList = item.Codes;
                    $("#" + Id).autocomplete({

                        source: $scope.resultCodeList.slice(0, 10), minLength: 0
                    })


                    $("#" + Id).keydown();
                    console.log($(this));
                });
            }
            else {
                $scope.resultCodeList = [];
                $scope.resultCodeList = item.Codes;
                $("#" + Id).autocomplete({

                    source: $scope.resultCodeList.slice(0, 10), minLength: 0
                })


                $("#" + Id).keydown();
                console.log($(this));
            }

        }


    }
    $scope.SourceOfSupply = [
                     { Id: 1, Name: "إدارة الإنتاج " },
                      { Id: 2, Name: "مرتجع من عميل " },
                         { Id: 3, Name: "تحويل من مخزن أخر " },
                          { Id: 4, Name: "أخرى " },
                      { Id: 5, Name: "مورد" },
                       { Id: 19, Name: "أمر ارتجاع" },
                       { Id: 100, Name: "مرتجع من الإنتاج " },
    ];
    function CreateGridGetList22(data) {
        window.record = 0;

        $("#OfferTable22").kendoGrid({
            dataSource: {
                data: data,
                schema: {
                    model: {

                    }
                },
                pageSize: 10
            },
            groupable: false,
            //resizable:true,
            columnMenu: true,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5,
                input: true,
                numeric: true
            },
            dataBinding: function () { record = (this.dataSource.page() - 1) * this.dataSource.pageSize(); },
            columns: [
               { template: "#= ++record  #", width: 20 },
               //{ field: "InternalSupplyOrderNumber", width: 100 },
               //   { field: "CustomerSupplyOrderNumber", width: 100 },
               // { field: "AssayNumber", width: 100 },
               // { field: "Name", width: 100 },
                { field: "Code", width: 100 },
                  { field: "PrivateNumber", width: 100 },
                { field: "ReceiptOrderDateString", width: 100 },
                { field: "OtherCode", width: 100 },
                { field: "CreationDateString", width: 100 },
                 { field: "Side", width: 100 },
                   { field: "Type", width: 100 },
                   { field: "WorkOrderNo", width: 100 },
                  { field: "PurchaseOrder", width: 100 },
                   { field: "Name", width: 200 },
                      { field: "AssayNumber", width: 100 },
                         {
                             title: "Show",
                             template: "<input  name='Check'  type='radio' value='#:Id#' />",
                             filterable: false, sortable: false, menu: false, width: 70, attributes: { "class": "center" }
                         }
            ]
        });

        $scope.AddincreaseQuotation1 = $scope.AddincreaseQuotation1 + 1;
    }
    $scope.GetAllReceiptOrderDataById = function (Id) {
        myservice.LoadDataById("StockReceiptPurchOrder", "GetReceiptsOrderData", Id).then(function (data) {
            $scope.ReceiptOrderDataa = data.data;


            $scope.EditTable = 1;
            var grid = $("#OfferTable").data("kendoGrid");
            if (grid !== undefined) {
                grid.wrapper.empty();
                grid.destroy();
                $("#Offer").html($scope.outergrid);
                $compile($('#Offer'))($scope);
                CreateGridGetList($scope.ReceiptOrderDataa);

            }
            else {
                $scope.outergrid = $("#Offer").html();
                CreateGridGetList($scope.ReceiptOrderDataa);

            }

        });
    }
    function CreateGridGetList(data) {
        window.record = 0;

        $("#OfferTable").kendoGrid({
            dataSource: {
                data: data,
                schema: {
                    model: {

                    }
                },
                pageSize: 10
            },
            groupable: false,
            //resizable:true,
            columnMenu: true,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5,
                input: true,
                numeric: true
            },
            dataBinding: function () { record = (this.dataSource.page() - 1) * this.dataSource.pageSize(); },
            columns: [
                { template: "#= ++record  #", width: 20 },
                { field: "Code", width: 100 },
                 { field: "PrivateNumber", width: 100 },
                { field: "ReceiptOrderDate", width: 100 },
                { field: "SourceOfSupply", width: 100 },
                { field: "SuppliedSectorName", width: 100 },


            ]
        });

        $scope.AddincreaseQuotation1 = $scope.AddincreaseQuotation1 + 1;
    }
    $("#Offer").on("click", "#OfferTable tbody tr td", function (e) {
        debugger
        var row = $("#OfferTable").data('kendoGrid').dataItem($(e.currentTarget).closest("tr"));
        var Id = row.Id;
        $scope.GetReceiptsOrders(row.Id, $scope.Group_Id);
        $scope.EditTable = 0;
    });
    $scope.ChangeInBatchNumber = function (Item) {
        if (Item.StoringProvision != null && Item.StoringProvision != undefined && Item.StoringProvision.length > 0) {
            Item.BatchNumber = '';
            for (var i = 0; i < Item.StoringProvision.length; i++) {
                if (Item.StoringProvision[i].Value != null && Item.StoringProvision[i].Value != undefined && Item.StoringProvision[i].Value != '' && Item.StoringProvision[i].Value != "") {
                    {
                        if (i != Item.StoringProvision.length - 1)
                            Item.BatchNumber += Item.StoringProvision[i].Symbol + ':' + Item.StoringProvision[i].Value + " , ";
                        else
                            Item.BatchNumber += Item.StoringProvision[i].Symbol + ':' + Item.StoringProvision[i].Value;
                    }
                }
            }
        }
    }
    $scope.GetReceiptsOrders = function (Id, Group_Id) {
        $scope.IsActive = true;

        myservice.LoadDataByTwoId("StockReceiptPurchOrder", "GetGeneralData3", Id, Group_Id).then(function (data) {
            debugger

            $scope.ReceiptsOrderForAddData = data.data;
            $scope.EditRow = data.data;
            $scope.MainGroupId = $scope.ReceiptsOrderForAddData.MainGroupId;
            $scope.MaintableList = $scope.ReceiptsOrderForAddData.MaintableList;
            for (var i = 0; i < $scope.MaintableList.length; i++) {
                if ($scope.MaintableList[i].IsActive == 1) {
                    $scope.IsActive = false;
                }
                var Item = $scope.MaintableList[i];
                if (Item.StoringProvision != null && Item.StoringProvision != undefined && Item.StoringProvision.length > 0) {
                    if (Item.BatchNumber != '' && Item.BatchNumber != "" && Item.BatchNumber != null && Item.BatchNumber != undefined) {
                        var arr = Item.BatchNumber.split(',');
                        if (arr != null && arr != undefined && arr.length > 0) {
                            for (var s = 0; s < arr.length; s++) {
                                var obj = arr[s];
                                for (var j = 0; j < Item.StoringProvision.length; j++) {
                                    if (Item.StoringProvision[j].Symbol == obj.split(':')[0].trim())
                                        Item.StoringProvision[j].Value = obj.split(':')[1].trim();
                                    if (Item.StoringProvision[j].StoringTypes == 3 || Item.StoringProvision[j].StoringTypes == 4)
                                        Item.StoringProvision[j].Value = Number(Item.StoringProvision[j].Value);
                                }
                            }
                        }
                    }
                }
                //for (var g = 0; g < $scope.AllItemUnits.length; g++) {
                //    $scope.AllItemUnits[g].Id = $scope.AllItemUnits[g].UnitId;
                //    $scope.AllItemUnits[g].Name = $scope.AllItemUnits[g].UnitName;
                //}
                //$scope.MaintableList[i].ItemUnit = angular.copy($filter('filter')($scope.AllItemUnits, function (d) { return d.group_Id == $scope.MaintableList[i].MainGroup_Id }));
            }



            $scope.Description = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
      : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;
            $scope.EditRow.Desc = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
                        : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;

            var Id2 = 0;
            if ($scope.EditRow.SourceOfSupply_Id == 4)
                Id2 = 5;
            else if ($scope.EditRow.SourceOfSupply_Id == 1)
                Id2 = 2;
            else if ($scope.EditRow.SourceOfSupply_Id == 6)
                Id2 = 1;
            else Id2 = 0;
            LoadDropDownMenussss(Id2);
            for (var i = 0; i < $scope.Suppliers.length; i++) {
                if ($scope.Suppliers[i].Id == $scope.EditRow.Supplier_Id) {
                    $scope.Supplier = angular.copy($scope.Suppliers[i]);
                    break;
                }
            }
        });
    }
    $scope.ShowDetails = function () {
        debugger
        $("#Details").modal('show');
    }
    $("#Offer22").on("click", "#OfferTable22 tbody tr td:last-child", function (e) {
        debugger
        $scope.DataToShow = null;
        var row = $("#OfferTable22").data('kendoGrid').dataItem($(e.currentTarget).closest("tr"));
        if (row.ReceiptOrderId > 0) {
            var Id = row.Id;
            myservice.LoadDataById("StockReceiptPurchOrder", "GetItemsFromReceiptsOrderData", Id).then(function (data) {
                $scope.DataToShow = data.data;
            });


        } else if (row.ConvertNo > 0) {
            $scope.ReceiptOrderDate = row.CreationDate;
            myservice.LoadDataById("StockReceiptPurchOrder", "GetItemsTransferOrder", row.ConvertNo).then(function (data) {
                $scope.DataToShow = data.data;



            });
        } else if (row.ReturnOrderNo > 0) {

            myservice.LoadDataByTwoId("StockReceiptPurchOrder", "GetItemsForReturnOrder", row.ReturnOrderNo).then(function (data) {

                $scope.DataToShow = data.data;


            });

        }

    });


    $("#Offer22").on("click", "#OfferTable22 tbody tr td:not(:last-child)", function (e) {
        debugger
        var row = $("#OfferTable22").data('kendoGrid').dataItem($(e.currentTarget).closest("tr"));
        if (row.ReceiptOrderId > 0) {
            var Id = row.Id;
            $scope.ReceiptOrderId = Id;
            $scope.ReceiptOrderDate = row.CreationDate;
            $scope.GetAllReceiptOrderDataById(row.Id);
            $scope.EditTable = 0;
            $scope.$apply();

        } else if (row.ConvertNo > 0) {
            $scope.ReceiptOrderDate = row.CreationDate;
            myservice.LoadDataById("StockReceiptPurchOrder", "GetGeneralDataFormTransferOrder", row.ConvertNo).then(function (data) {
                $scope.ConvertOrderDataaa = data.data;
                $scope.OtherGroup_Id = $scope.ConvertOrderDataaa.ToStock;
                $scope.ReceiptsOrderForAddData = data.data;
                $scope.ConvertNo = row.ConvertNo;
                $scope.ConvertDate = row.CreationDate;
                $scope.EditRow = data.data;
                $scope.EditTable = 0;
                $scope.MaintableList = [];
                $scope.MaintableList = $scope.ConvertOrderDataaa.MaintableList;
                for (var t = 0; t < $scope.MaintableList.length; t++) {
                    if ($scope.MaintableList[t].IsActive == 1) {
                        $scope.IsActive = false;
                    }
                    var Item = $scope.MaintableList[i];
                    if (Item.StoringProvision != null && Item.StoringProvision != undefined && Item.StoringProvision.length > 0) {
                        if (Item.BatchNumber != '' && Item.BatchNumber != "" && Item.BatchNumber != null && Item.BatchNumber != undefined) {
                            var arr = Item.BatchNumber.split(',');
                            if (arr != null && arr != undefined && arr.length > 0) {
                                for (var s = 0; s < arr.length; s++) {
                                    var obj = arr[s];
                                    for (var j = 0; j < Item.StoringProvision.length; j++) {
                                        if (Item.StoringProvision[j].Symbol == obj.split(':')[0].trim())
                                            Item.StoringProvision[j].Value = obj.split(':')[1].trim();
                                        if (Item.StoringProvision[j].StoringTypes == 3 || Item.StoringProvision[j].StoringTypes == 4)
                                            Item.StoringProvision[j].Value = Number(Item.StoringProvision[j].Value);
                                    }
                                }
                            }
                        }
                    }
                    //for (var i = 0; i < $scope.AllItemUnits.length; i++) {
                    //    $scope.AllItemUnits[i].Id = $scope.AllItemUnits[i].UnitId;
                    //    $scope.AllItemUnits[i].Name = $scope.AllItemUnits[i].UnitName;
                    //}
                    //$scope.MaintableList[t].ItemUnit = angular.copy($filter('filter')($scope.AllItemUnits, function (d)
                    //{ return d.group_Id == $scope.MaintableList[t].MainGroup_Id }));
                    $scope.MaintableList[t].PlanningReceiptQuantity = $scope.MaintableList[t].Quantity;
                    //myservice.LoadDataByTwoIds("StockReceiptPurchOrder", "GetOtherStocksById", $scope.MaintableList[t].Group_Id, $scope.Store.Id).then(function (data) {
                    //    $scope.OtherGroups = data.data;


                    //});
                }

                $scope.createTable = true;

                LoadDropDownMenussss(3);

            });
        } else if (row.ReturnOrderNo > 0) {
            $scope.ReturnOrderDate = row.CreationDate;
            $scope.ReturnOrderNo = row.ReturnOrderNo;
            $scope.ReceiptOrderDate = row.CreationDate;
            myservice.LoadDataByTwoId("StockReceiptPurchOrder", "GetGeneralDataForReturnOrder", row.ReturnOrderNo).then(function (data) {
                $scope.returnsdataa = data.data;
                $scope.ReceiptsOrderForAddData = data.data;
                $scope.EditRow = data.data;
                $scope.EditTable = 0;
                $scope.MaintableList = $scope.ReceiptsOrderForAddData.MaintableList;

                for (var i = 0; i < $scope.MaintableList.length; i++) {
                    if ($scope.MaintableList[i].IsActive == 1) {
                        $scope.IsActive = false;
                    }
                    var Item = $scope.MaintableList[i];
                    if (Item.StoringProvision != null && Item.StoringProvision != undefined && Item.StoringProvision.length > 0) {
                        if (Item.BatchNumber != '' && Item.BatchNumber != "" && Item.BatchNumber != null && Item.BatchNumber != undefined) {
                            var arr = Item.BatchNumber.split(',');
                            if (arr != null && arr != undefined && arr.length > 0) {
                                for (var s = 0; s < arr.length; s++) {
                                    var obj = arr[s];
                                    for (var j = 0; j < Item.StoringProvision.length; j++) {
                                        if (Item.StoringProvision[j].Symbol == obj.split(':')[0].trim())
                                            Item.StoringProvision[j].Value = obj.split(':')[1].trim();
                                        if (Item.StoringProvision[j].StoringTypes == 3 || Item.StoringProvision[j].StoringTypes == 4)
                                            Item.StoringProvision[j].Value = Number(Item.StoringProvision[j].Value);
                                    }
                                }
                            }
                        }
                    }
                    //for (var g = 0; g < $scope.AllItemUnits.length; g++) {
                    //    $scope.AllItemUnits[g].Id = $scope.AllItemUnits[g].UnitId;
                    //    $scope.AllItemUnits[g].Name = $scope.AllItemUnits[g].UnitName;
                    //}
                    //$scope.MaintableList[i].ItemUnit = angular.copy($filter('filter')($scope.AllItemUnits,
                    //    function (d) { return d.group_Id == $scope.MaintableList[i].MainGroup_Id }));
                    for (var t = 0; t < $scope.MaintableList.length; t++) {
                        $scope.MaintableList[t].ReceiptsQuantity = $scope.MaintableList[t].Quantity;
                        $scope.MaintableList[t].PlanningReceiptQuantity = $scope.MaintableList[t].Quantity;
                        //$scope.MaintableList[t].ItemUnit = angular.copy($filter('filter')($scope.AllItemUnits, function (d) { 
                        //    return d.group_Id == $scope.MaintableList[t].MainGroup_Id }));
                    }
                }

                //   $scope.EditRow = data.data;
                console.log($scope.returnsdataa);

                $scope.createTable = true;
                LoadDropDownMenussss(0);
            });

        }
        //  $scope.GetAllReceiptOrderDataById(row.Id);
        //  $scope.EditTable = 0;
    });
    function CreateGridGetList2(data) {
        window.record = 0;

        $("#OfferTable2").kendoGrid({
            dataSource: {
                data: data,
                schema: {
                    model: {

                    }
                },
                pageSize: 10
            },
            groupable: false,
            //resizable:true,
            columnMenu: true,
            scrollable: true,
            sortable: true,
            filterable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5,
                input: true,
                numeric: true
            },
            dataBinding: function () { record = (this.dataSource.page() - 1) * this.dataSource.pageSize(); },
            columns: [
                { template: "#= ++record  #", width: 20 },
                //    { field: "InternalSupplyOrderNumber", width: 100 },
                //       { field: "CustomerSupplyOrderNumber", width: 100 },
                //     { field: "AssayNumber", width: 100 },
                //{ field: "SuppliedSectorName", width: 100 },

                { field: "Code", width: 100 },
                { field: "PrivateNumber", width: 100 },
                { field: "ReceiptOrderDateString", width: 100 },
                { field: "PurchRequestedQuotationOrderId", width: 100 },
                { field: "SourceOfSupply", width: 100 },

                               { field: "SuppliedSectorName", width: 200 },

            ]
        });

        $scope.AddincreaseQuotation1 = $scope.AddincreaseQuotation1 + 1;
    }
    $scope.RemoveItemInDetailsTable = function (Item, PaerntIndex, childindex) {

        $scope.MaintableList.splice($scope.MaintableList.indexOf(Item), 1);
        $scope.Total = $scope.MaintableList.reduce(function (a, b) {
            if (b.UnitPrice > 0 && b.ReceiptsQuantity > 0 && b.UnitPrice != '' && b.ReceiptsQuantity != '')
                return a + parseFloat((b.ReceiptsQuantity * b.UnitPrice).toFixed(3))
        }, 0);

    }
    $("#Offer2").on("click", "#OfferTable2 tbody tr td", function (e) {
        debugger
        var row = $("#OfferTable2").data('kendoGrid').dataItem($(e.currentTarget).closest("tr"));
        $scope.CheckPrivateNum = row.PrivateNumber;
        $scope.CheckIdCode = row.Code;
        var Id = row.Id;
        $scope.GetReceiptsOrders2(row.Id);
        $scope.EditTable = 0;
    });
    $scope.GetReceiptsOrders2 = function (Id) {
        $scope.IsActive = true;
        $scope.AgriIsActive = true;
        $scope.IndustIsActive = true;
        myservice.LoadDataById("StockReceiptPurchOrder", "GetGeneralDataForEdit", Id).then(function (data) {
            debugger

            $scope.ReceiptsOrderForEditData = data.data;
            $scope.EditRow = data.data;
            $scope.EditRow.PrivateNumber = $scope.CheckPrivateNum;


            $scope.MainGroupId = $scope.ReceiptsOrderForEditData.MainGroupId;
            $scope.MaintableList = $scope.ReceiptsOrderForEditData.MaintableList;
            for (var i = 0; i < $scope.MaintableList.length; i++) {
                if ($scope.MaintableList[i].IsActive == 1) {
                    $scope.IsActive = false;
                }
                $scope.Total = 0;
                //for (var g = 0; g < $scope.AllItemUnits.length; g++) {
                //    $scope.AllItemUnits[g].Id = $scope.AllItemUnits[g].UnitId;
                //    $scope.AllItemUnits[g].Name = $scope.AllItemUnits[g].UnitName;
                //}
                //$scope.MaintableList[i].ItemUnit = angular.copy($filter('filter')($scope.AllItemUnits, function (d) { return d.group_Id == $scope.MaintableList[i].MainGroup_Id }));
                $scope.Total = $scope.MaintableList.reduce(function (a, b) {
                    if (b.UnitPrice > 0 && b.ReceiptsQuantity > 0 && b.UnitPrice != '' && b.ReceiptsQuantity != '')
                        return a + parseFloat((b.ReceiptsQuantity * b.UnitPrice).toFixed(3))
                }, 0);
                var Item = $scope.MaintableList[i];
                if (Item.StoringProvision != null && Item.StoringProvision != undefined && Item.StoringProvision.length > 0) {
                    if (Item.BatchNumber != '' && Item.BatchNumber != "" && Item.BatchNumber != null && Item.BatchNumber != undefined) {
                        var arr = Item.BatchNumber.split(',');
                        if (arr != null && arr != undefined && arr.length > 0) {
                            for (var k = 0; k < arr.length; k++) {
                                var obj = arr[k];
                                for (var j = 0; j < Item.StoringProvision.length; j++) {
                                    if (Item.StoringProvision[j].Symbol == obj.split(':')[0].trim())
                                        Item.StoringProvision[j].Value = obj.split(':')[1].trim();
                                    if (Item.StoringProvision[j].StoringTypes == 3 || Item.StoringProvision[j].StoringTypes == 4)
                                        Item.StoringProvision[j].Value = Number(Item.StoringProvision[j].Value);
                                }
                            }
                        }
                    }
                }
            }


            if ($scope.EditRow.ReceiptOrderId > 0 && $scope.EditRow.ReceiptOrderId != null && $scope.EditRow.ReceiptOrderId != undefined) {
                var Id2 = 0;
                if ($scope.EditRow.SourceOfSupply_Id == 4)
                    Id2 = 5;
                else if ($scope.EditRow.SourceOfSupply_Id == 1)
                    Id2 = 2;
                else if ($scope.EditRow.SourceOfSupply_Id == 6)
                    Id2 = 1;
                LoadDropDownMenussss(Id2);
            } else if ($scope.EditRow.ConvertNo > 0 && $scope.EditRow.ConvertNo != null && $scope.EditRow.ConvertNo != undefined) {
                LoadDropDownMenussss(3);
            } else
                LoadDropDownMenussss(0);
            $scope.EditRow.Time = kendo.parseDate(data.data.Time, 't');
            $scope.EditRow.TimeTxt = (data.data.Time).toLocaleTimeString();;
            for (var i = 0; i < $scope.Suppliers.length; i++) {
                if ($scope.Suppliers[i].Id == $scope.EditRow.Supplier_Id) {
                    $scope.Supplier2 = angular.copy($scope.Suppliers[i]);
                    break;
                }
            }
            for (var i = 0; i < $scope.Employees.length; i++) {
                if ($scope.Employees[i].Id == $scope.EditRow.Employee_Id) {
                    $scope.Employee2 = angular.copy($scope.Employees[i]);
                    break;
                }
            }


        }).finally(function () {
            //    $scope.Description = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
            //: "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;
            //    $scope.EditRow.Desc = $("#langsession").val() == "ar-EG" ? " اذن استلام رقم عام " + $scope.ReceiptOrderNumber + "  رقم خاص " + $scope.PrivateNumber
            //                : "  Receipt Permission Public Number " + $scope.ReceiptOrderNumber + "  Private Number " + $scope.PrivateNumber;
        });
    }
    $scope.GetAllReceiptById = function (Id, Group) {
        $scope.loader2 = true;
        myservice.LoadDataById("StockReceiptPurchOrder", "GetReceiptsOrdersDataForEdit2", $scope.StoreName_Id).then(function (data) {
            $scope.loader2 = false;
            $scope.ReceiptsOrderForEditDataa = data.data;
            $scope.EditTable = 2;
            $scope.MaintableList = [];
            $scope.CostCenterList = [];
            $scope.Total = 0;

            $scope.Listaa = [];
            for (var i = 0; i < data.data.length; i++) {
                $scope.Listaa.push({
                    Code: data.data[i].Code,
                    PrivateNumber: data.data[i].PrivateNumber,
                    PurchRequestedQuotationOrderId: data.data[i].PurchRequestedQuotationOrderId,
                    ReceiptOrderDateString: data.data[i].ReceiptOrderDateString,
                    SourceOfSupply: data.data[i].SourceOfSupply,
                    SuppliedSectorName: data.data[i].SuppliedSectorName,
                    Id: data.data[i].Id,
                });
            }
            var grid = $("#OfferTable2").data("kendoGrid");
            if (grid !== undefined) {
                grid.wrapper.empty();
                grid.destroy();
                $("#Offer2").html($scope.outergrid);
                $compile($('#Offer2'))($scope);
                CreateGridGetList2($scope.Listaa);

            }
            else {
                $scope.outergrid = $("#Offer2").html();
                CreateGridGetList2($scope.Listaa);

            }

        });
    }
    $('#searchBoxEdit554545454').on('input', function (e) {

        debugger
        var grid = $('#OfferTable2').data('kendoGrid');

        if ($("#searchBoxEdit554545454").val() != null && $("#searchBoxEdit554545454").val() != undefined) {
            debugger
            var newArray = [];
            $scope.SearchResult = $("#searchBoxEdit554545454").val();
            $scope.Listaa.forEach(function (el) {

                if ((el.Code != null && el.Code != undefined && el.Code != "" &&
                    el.Code.toLowerCase().includes($scope.SearchResult.toLowerCase())) ||
                    //(el.InternalSupplyOrderNumber != null && el.InternalSupplyOrderNumber != undefined && el.InternalSupplyOrderNumber != "" &&
                    //el.InternalSupplyOrderNumber.toLowerCase().includes($scope.SearchResult.toLowerCase())) ||



                    //(el.CustomerSupplyOrderNumber != null && el.CustomerSupplyOrderNumber != undefined && el.CustomerSupplyOrderNumber != "" &&
                    //el.CustomerSupplyOrderNumber.toString().toLowerCase().includes($scope.SearchResult.toLowerCase())) ||

                    //(el.AssayNumber != null && el.AssayNumber != undefined && el.AssayNumber != "" &&
                    //el.AssayNumber.toLowerCase().includes($scope.SearchResult.toLowerCase())) ||


                    (el.PrivateNumber != null && el.PrivateNumber != undefined && el.PrivateNumber != "" &&
                    el.PrivateNumber.toString().toLowerCase().includes($scope.SearchResult.toLowerCase())) ||

                    (el.ReceiptOrderDateString != null && el.ReceiptOrderDateString != undefined && el.ReceiptOrderDateString != "" &&
                    el.ReceiptOrderDateString.toLowerCase().includes($scope.SearchResult.toLowerCase())) ||

                     (el.PurchRequestedQuotationOrderId != null && el.PurchRequestedQuotationOrderId != undefined && el.PurchRequestedQuotationOrderId != "" &&
                    el.PurchRequestedQuotationOrderId.toString().toLowerCase().includes($scope.SearchResult.toLowerCase())) ||

                     (el.SourceOfSupply != null && el.SourceOfSupply != undefined && el.SourceOfSupply != "" &&
                    el.SourceOfSupply.toLowerCase().includes($scope.SearchResult.toLowerCase())) ||

                    (el.SuppliedSectorName != null && el.SuppliedSectorName != undefined && el.SuppliedSectorName != "" &&
                    el.SuppliedSectorName.toLowerCase().includes($scope.SearchResult.toLowerCase())))
                    newArray.push(el);


            });
            $("#OfferTable2").data('kendoGrid').dataSource.data(newArray);
            $('#OfferTable2').data("kendoGrid").dataSource.read();
            $("#OfferTable2").data('kendoGrid').dataSource.data(newArray);
        } else {
            $("#OfferTable2").data('kendoGrid').dataSource.data($scope.Listaa);
            $('#OfferTable2').data("kendoGrid").dataSource.read();
            $("#OfferTable2").data('kendoGrid').dataSource.data($scope.Listaa);


        }

    });
    $scope.GetChildAutoComplete2 = function (item, Group_Id, MainGroup_Id, Type, Match, SelectorId) {
        debugger
        if (SelectorId != undefined && SelectorId != null && SelectorId != "") {
            Match = $('#' + SelectorId).val();
        }

        myservice.LoadByThreeIdsAndString("StockReceiptPurchOrder", "GetOtherChildAutoComplete", Group_Id, MainGroup_Id, Type, Match).then(function (data) {
            item.MainGroup_Id = MainGroup_Id;
            item.Names = data.data.Names;
            item.Codes = data.data.Codes;
            item.GroupList = data.data.GroupList;
            if (SelectorId != undefined && SelectorId != null && SelectorId != "") {
                if (Type == 1) {
                    $scope.resultNameList = item.Names != null ?
                       item.Names.slice() : [];
                } else if (Type == 2) {
                    $scope.resultNameList = item.Codes != null ?
                        item.Codes.slice() : [];
                }
                $("#" + SelectorId).autocomplete({

                    source: $scope.resultNameList, minLength: 0
                })


                $("#" + SelectorId).keydown();
            }
        });
    }
    $scope.getFilterAutoComplete2 = function (item, Id, Type) {
        debugger
        if (Type == 1) {
            item.BasicCode = "";
            $scope.resultNameList = [];
            $scope.GetChildAutoComplete2(item, $scope.Group_Id, item.MainGroup_Id, Type, item.Name, Id);

        } else if (Type == 2) {
            $scope.resultCodeList = [];
            item.Name = "";
            $scope.GetChildAutoComplete2(item, $scope.Group_Id, item.MainGroup_Id, Type, item.BasicCode, Id);
        }
        console.log($(this));
    }

    $scope.ClickAutoComplete2 = function (Id, item, Type) {
        debugger

        if (Type == 1) {
            if (item.Names == undefined || item.Names == null || item.Names == "") {
                myservice.LoadByThreeIdsAndString("SupplyPurchaseOrdersLocalSale", "GetChildAutoComplete", item.Group_Id, item.MainGroup_Id, Type, "").then(function (data) {
                    item.Names = data.data.Names;
                    item.Codes = data.data.Codes;
                    item.GroupList = data.data.GroupList;
                }).finally(function () {
                    $scope.resultNameList = [];
                    $scope.resultNameList = item.Names;
                    $("#" + Id).autocomplete({

                        source: $scope.resultNameList.slice(0, 10), minLength: 0
                    })


                    $("#" + Id).keydown();
                    console.log($(this));
                });
            } else {
                $scope.resultNameList = [];
                $scope.resultNameList = item.Names;
                $("#" + Id).autocomplete({

                    source: $scope.resultNameList.slice(0, 10), minLength: 0
                })


                $("#" + Id).keydown();
                console.log($(this));
            }


        } else if (Type == 2) {

            if (item.Codes == undefined || item.Codes == null || item.Codes == "") {
                myservice.LoadByThreeIdsAndString("SupplyPurchaseOrdersLocalSale", "GetChildAutoComplete", item.Group_Id, item.MainGroup_Id, Type, "").then(function (data) {
                    item.Names = data.data.Names;
                    item.Codes = data.data.Codes;
                    item.GroupList = data.data.GroupList;
                }).finally(function () {
                    $scope.resultCodeList = [];
                    $scope.resultCodeList = item.Codes;
                    $("#" + Id).autocomplete({

                        source: $scope.resultCodeList.slice(0, 10), minLength: 0
                    })


                    $("#" + Id).keydown();
                    console.log($(this));
                });
            }
            else {
                $scope.resultCodeList = [];
                $scope.resultCodeList = item.Codes;
                $("#" + Id).autocomplete({

                    source: $scope.resultCodeList.slice(0, 10), minLength: 0
                })


                $("#" + Id).keydown();
                console.log($(this));
            }

        }


    }
    ////////////////////////////////////////////////////////
    //checkview();
    function checkview() {

        $.ajax({
            type: "POST",
            url: "Priv/getcurrentrole",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result1) {
                $.ajax({
                    type: "POST",
                    url: "Priv/getoutview",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({ "xx": result1, "yy": PageIdToView }),
                    async: true,
                    cache: false,
                    success: function (data) {

                        if (data.length == 0) {
                            window.location.href = "Home/index";
                        }
                        else {

                        }
                    }
                });

            }
        });
    }
    // LoadDropDownMenus2();

    // LoadDropDownMenussss();

    LoadDropDownMenusCustomer();
    function LoadDropDownMenussss(Id) {

        $scope.AccountNames = [];
        myservice.LoadById("Stocks", "LoadAccountsBySideId", Id).then(function (data) {
            $scope.Accounts = data.data;

            for (var i = 0; i < $scope.Accounts.length; i++) {
                $scope.AccountNames.push($scope.Accounts[i].Name)
            }
        }).finally(function () {
        });

    }
    $scope.StatusOptions = [

              { Id: 1, Name: "امر استلام" },
              { Id: 2, Name: "امر تحويل " },
              { Id: 3, Name: "امر ارتجاع " }
    ];

    function LoadDropDownMenusCustomer() {
        debugger
        myservice.getdata("FinalExchangeOrder", "LoadDropDownMenusCustomer").then(function (data) {
            debugger
            $scope.Stocks = data.data.Stocks;
            $scope.Prod_Colors = data.data.Prod_Color;
            $scope.QualityDegreeCodes = data.data.QualityDegreeCodes;
            $scope.RoofsTypes = data.data.RoofsTypes;
            //$scope.Customers = data.data.Customer.concat(data.data.ExpectedCustomer);
            $scope.ShowCustomers = $scope.Customers.slice();
            $scope.lang = data.data.lang;
            $scope.AllItemUnits = data.data.AllItemUnits;
            //  $scope.Customers = data.data.Customers;
        }).finally(function () {
        });

    }

    $scope.DateNow = new Date();
    function LoadDropDownMenus2() {
        debugger
        $scope.QuotationOrder = [];
        $scope.Customers = [];
        $scope.Stores_Group = [];
        $scope.QualityDegree = [];
        $scope.FinishLevels = [];
        $scope.MeasureUnit = [];
        $scope.AllProductColors = [];
        $scope.SizeType = [];
        $scope.UnitSize = [];
        $scope.MaterialType = [];
        $scope.Stors_Cnfg_GroupsChild = [];
        $scope.RoofTypes = [];
        $scope.SizesPackagingBoxes = [];
        $scope.Allcm = [];
        $scope.AllInch = [];
        $scope.tatus = [];
        $scope.CustomersNames = [];
        $scope.ExpectedCustomersNames = [];
        $scope.Sel_SizeTypeOrder = [];
        $scope.CmNames = [];
        $scope.InchNames = [];
        myservice.getdata("PurchaseOrders", "LoadDropDownMenusByGroupId").then(function (data) {
            debugger
            console.log(data.data);
            $scope.Customers = data.data['Customers'];
            for (var i = 0; i < $scope.Customers.length; i++) {
                $scope.Customers[i].Name = $scope.Customers[i].Name.trim();
                $scope.CustomersNames.push($scope.Customers[i].Name);
            }
            $scope.MaximumDirectSale = data.data.MaximumDirectSale;
            $scope.Sel_SizeTypeOrder = data.data.Sel_SizeTypeOrder,
            $scope.Stores_GroupMaterial = data.data['Stores_GroupMaterial'];
            $scope.Stores_GroupMontag = data.data['Stores_GroupMontag'];
            $scope.QualityDegreeMontag = data.data['QualityDegree'];
            $scope.DegreeMaterial = data.data['DegreeMaterial'];
            $scope.FinishLevels = data.data['FinishLevels'];
            $scope.MeasureUnit = data.data['MeasureUnit'];
            $scope.Edges = data.data["Edges"];
            $scope.SizeType = data.data["SizeType"];
            $scope.UnitSize = data.data["UnitSize"];
            $scope.Assemblies = data.data["Assemblies"];
            $scope.Currency = data.data["Currency"];
            $scope.lang = data.data.lang;
            //////////////////////////////////////
            //
            $scope.OTQualityUnit = data.data.OTQualityUnit;
            $scope.BQualityUnit = data.data["BQualityUnit"];
            $scope.SQualityUnit = data.data["SQualityUnit"];
            $scope.TQualityUnit = data.data["TQualityUnit"];
            //for(i=0;i<) />/
            //1
            $scope.SupplyConditionTypes = data.data['SupplyConditions'];
            //2
            $scope.PaymentTypes = data.data["PaymentType"];
            //3
            $scope.PaymentingSystems = data.data["PaymentSystem"];
            // $scope.SizesPackagingBoxes = data.data["SizesPackagingBoxes"];
            //$scope.QualityPacking = data.data["QualityPacking"];
            $scope.QualityUnit = data.data["QualityUnit"];
            $scope.Q_Thickness = data.data["Q_Thickness"];
            $scope.Typicalcm = data.data['Typicalcm'];
            $scope.Typicalinch = data.data['Typicalinch'];

            $scope.freecmWidth = data.data['freecmWidth'];
            $scope.freeinchWidth = data.data['freeinchWidth'];
            $scope.freecmLenght = data.data['freecmLenght'];
            $scope.freeinchLenght = data.data['freeinchLenght'];
            $scope.AssembliesGlobalSizecm = data.data['AssembliesGlobalSizecm'];
            $scope.AssembliesGlobalSizeinch = data.data['AssembliesGlobalSizeinch'];
            $scope.Country = data.data["Country"];
            $scope.GovermentalEntity = data.data["GovermentalEntity"];
            $scope.tatus = data.data["tatus"];
            $scope.WeightSize = data.data.WeightSize;
            // $scope.AssembliesSize = data.data['AssembliesSize'];
            /////////////////////////////////////Allcm
            //for (i = 0; i < $scope.Typicalcm.length; i++) {
            //    console.log($scope.Typicalcm[i]);
            //    $scope.Allcm.push($scope.Typicalcm[i]);
            //    $scope.CmNames.push($scope.Typicalcm[i].Name.trim());

            //}
            //for (i = 0; i < $scope.freecmLenght.length; i++) {
            //    console.log($scope.freecmLenght[i]);
            //    $scope.Allcm.push($scope.freecmLenght[i]);
            //    $scope.CmNames.push($scope.freecmLenght[i].Name.trim());
            //}
            //for (i = 0; i < $scope.freecmWidth.length; i++) {
            //    console.log($scope.freecmWidth[i]);
            //    $scope.Allcm.push($scope.freecmWidth[i]);
            //    $scope.CmNames.push($scope.freecmWidth[i].Name.trim());
            //}
            //for (i = 0; i < $scope.AssembliesGlobalSizecm.length; i++) {
            //    console.log($scope.AssembliesGlobalSizecm[i]);
            //    $scope.Allcm.push($scope.AssembliesGlobalSizecm[i]);
            //    $scope.CmNames.push($scope.AssembliesGlobalSizecm[i].Name.trim());
            //}
            /////////////////////////////////////////////AllInch
            //for (i = 0; i < $scope.Typicalinch.length; i++) {
            //    console.log($scope.Typicalinch[i]);
            //    $scope.AllInch.push($scope.Typicalinch[i]);
            //    $scope.InchNames.push($scope.Typicalinch[i].Name.trim());
            //}
            //for (i = 0; i < $scope.freeinchWidth.length; i++) {
            //    console.log($scope.freeinchWidth[i]);
            //    $scope.AllInch.push($scope.freeinchWidth[i]);
            //    $scope.InchNames.push($scope.freeinchWidth[i].Name.trim());
            //}
            //for (i = 0; i < $scope.freeinchLenght.length; i++) {
            //    console.log($scope.freeinchLenght[i]);
            //    $scope.AllInch.push($scope.freeinchLenght[i]);
            //    $scope.InchNames.push($scope.freeinchLenght[i].Name.trim());
            //}
            //for (i = 0; i < $scope.AssembliesGlobalSizeinch.length; i++) {
            //    console.log($scope.AssembliesGlobalSizeinch[i]);
            //    $scope.AllInch.push($scope.AssembliesGlobalSizeinch[i]);
            //    $scope.InchNames.push($scope.AssembliesGlobalSizeinch[i].Name.trim());
            //}
        }).finally(function () {
            $scope.loader = false;
        });

    }
    LoadDropMeun();

    LoadDropDownMenus();
    function LoadDropDownMenus() {
        myservice.LoadDataById("StockReceiptPurchOrder", "GetSuppliersOrCustomersNames").then(function (data) {
            $scope.SupplierNames = data.data['data2'];
            $scope.Suppliers = data.data['data2'];
            $scope.Supplierda = data.data['data2'];
            $scope.EmployeeNames = data.data['Employees'];
            $scope.Employees = data.data['Employees'];
            $scope.Employeeda = data.data['Employees'];
            $scope.SuppliersNames = [];
            $scope.EmployeesNames = [];
            for (var i = 0; i < $scope.Suppliers.length; i++) {
                $scope.Suppliers[i].Name = $scope.Suppliers[i].Name.trim();
                $scope.SuppliersNames.push($scope.Suppliers[i].Name);
            }
            for (var i = 0; i < $scope.Supplierda.length; i++) {
                $scope.Supplierda[i].Name = $scope.Supplierda[i].Name.trim();
            }
            for (var i = 0; i < $scope.Employees.length; i++) {
                $scope.Employees[i].Name = $scope.Employees[i].Name.trim();
                $scope.EmployeesNames.push($scope.Employees[i].Name);
            }
            $scope.StoresNames = data.data['GroupsWithMontegs'];
            $scope.OtherGroups = data.data['GroupsWithMontegs'];
            $scope.Groups = data.data['StoresType'];
            $scope.RoofType = data.data['RoofType'];
            $scope.ProductionList = data.data['ProductionList'];
            $scope.MaxBlockFactoryNum = data.data['MaxBlockFactoryNum'];
        });
    }

    function findIndexInData(data, property, value) {
        var result = -1;
        data.some(function (item, i) {
            if (item[property] == value) {
                result = i;
                return true;
            }
        });
        return result;
    }

    function LoadDropMeun() {

        $scope.Customers = [];
        $scope.GeneralData = [];
        $scope.SupplyConditionTypes = [];
        $scope.OrderWays = [];
        $scope.Currency = [];
        $scope.PaymentTypes = [];
        $scope.PaymentingSystems = [];
        $scope.PurchaseOrderStatus = [];
        $scope.Allcm = [];
        $scope.AllInch = [];
        myservice.getdata("DirectRequestedPurchases", "LoadDropDownMenu").then(function (data) {
            $scope.PriceOffers = data.data["PriceOffers"];
            $scope.DateNow = data.data["DateNow"];
            // $scope.Groups = data.data['Groups'];
            $scope.Prod_Color = data.data.Prod_Color,
            $scope.AllParentGroups = data.data["AllParentGroups"];
            $scope.AllItemUnits = data.data["AllItemUnits"];
            $scope.SupplyingCondetions = data.data['SupplyingCondetions'];
            $scope.MeasureUnits = data.data['MeasureUnits'];
            $scope.ItemsOfSuppliers = data.data["ItemsOfSuppliers"];
            ////////////////////////////////////////////////////
            $scope.Customers = data.data['Customers'];
            $scope.SupplyConditionTypes = data.data['SupplyConditions'];
            $scope.OrderWays = data.data['OrderWays'];
            $scope.SupplierDocumentTypes = data.data['SupplierDocument'];
            $scope.Currency = data.data["Currency"];
            $scope.PaymentTypes = data.data["PaymentType"];
            $scope.PaymentingSystems = data.data["PaymentSystem"];
            $scope.PurchaseOrderStatus = data.data["PurchaseOrderStatus"];
            console.log('rrrrr');
            console.log($scope.SupplierDocumentTypes);
            ////////////////////////////////////////
            $scope.Stores_Group = data.data['Stores_Group'];
            $scope.QualityDegree = data.data['QualityDegree'];
            //  $scope.FinishLevels = data.data['FinishLevels'];
            $scope.MeasureUnit = data.data['MeasureUnit'];
            $scope.Edges = data.data["Edges"];
            $scope.SizeType = data.data["SizeType"];
            $scope.UnitSize = data.data["UnitSize"];
            $scope.Assemblies = data.data["Assemblies"];
            //$scope.Currency = data.data["Currency"];
            // $scope.SizesPackagingBoxes = data.data["SizesPackagingBoxes"];
            //$scope.QualityPacking = data.data["QualityPacking"];
            $scope.OTQualityUnit = data.data.OTQualityUnit;
            $scope.BQualityUnit = data.data["BQualityUnit"];
            $scope.SQualityUnit = data.data["SQualityUnit"];
            $scope.TQualityUnit = data.data["TQualityUnit"];
            //for(i=0;i<) />/
            $scope.Q_Thickness = data.data["Q_Thickness"];
            $scope.Typicalcm = data.data['Typicalcm'];
            $scope.Typicalinch = data.data['Typicalinch'];

            $scope.freecmWidth = data.data['freecmWidth'];
            $scope.freeinchWidth = data.data['freeinchWidth'];
            $scope.freecmLenght = data.data['freecmLenght'];
            $scope.freeinchLenght = data.data['freeinchLenght'];
            $scope.AssembliesGlobalSizecm = data.data['AssembliesGlobalSizecm'];
            $scope.AssembliesGlobalSizeinch = data.data['AssembliesGlobalSizeinch'];
            $scope.Country = data.data["Country"];
            $scope.GovermentalEntity = data.data["GovermentalEntity"];
            $scope.PurchaseOrderStatus = data.data["PurchaseOrderStatus"];
            // $scope.AssembliesSize = data.data['AssembliesSize'];
            /////////////////////////////////////Allcm
            for (i = 0; i < $scope.Typicalcm.length; i++) {

                $scope.Allcm.push($scope.Typicalcm[i]);

            }
            for (i = 0; i < $scope.freecmLenght.length; i++) {

                $scope.Allcm.push($scope.freecmLenght[i]);
            }
            for (i = 0; i < $scope.freecmWidth.length; i++) {

                $scope.Allcm.push($scope.freecmWidth[i]);
            }
            for (i = 0; i < $scope.AssembliesGlobalSizecm.length; i++) {

                $scope.Allcm.push($scope.AssembliesGlobalSizecm[i]);
            }
            ///////////////////////////////////////////AllInch
            for (i = 0; i < $scope.Typicalinch.length; i++) {

                $scope.AllInch.push($scope.Typicalinch[i]);

            }
            for (i = 0; i < $scope.freeinchWidth.length; i++) {

                $scope.AllInch.push($scope.freeinchWidth[i]);
            }
            for (i = 0; i < $scope.freeinchLenght.length; i++) {

                $scope.AllInch.push($scope.freeinchLenght[i]);
            }
            for (i = 0; i < $scope.AssembliesGlobalSizeinch.length; i++) {

                $scope.AllInch.push($scope.AssembliesGlobalSizeinch[i]);
            }
        });
    }
    $scope.ClearForm = function () {
        $scope.ClosingBatch = false;
        $scope.PrivateNumber = 0;
        $scope.ReceiptOrderDate = '';
        $scope.Sel_QuotationOrderDetailModel = [];
        $scope.Listaa = [];
        $scope.Sel_QuotationOrderDetailModel2 = [];
        $scope.MaintableList = [];
        $scope.CostCenterList = [];
        $scope.Total = 0;
        $scope.OrderData = [];
        $scope.ReceiptsOrderForEditData = [];
        $scope.ReceiptsOrderForAddData = [];
        $scope.Supplier_Id = null;
        $scope.ProductionStoreFloorId = null;
        $scope.Group_Id = null;
        $scope.Group_Id = null;
        $scope.MaintanceTypeId = null;
        $scope.MaintanceOrderId = null;
        $scope.MaintanceDate = null;
        $scope.ReceiptOrderId = null;
        $scope.ReceiptsOrders = null;
        $scope.ReceiptOrderNumber = null;

        $scope.Transaction = null;
        $scope.ManualMaintanceOrder = null;
        $scope.ManualMaintanceDate = null;
        $scope.orderId = null;
        $scope.PurchRequestedQuotationOrderId = null;
        $scope.Store = null;
        $scope.SourceOfSupply_Id = null;
        $scope.PurchaseOrderData = null;
        $scope.mechanical = null;
        $scope.manual = null;
        $scope.Purch_RequestedPurchasesQuotationOrderId = null;
        $scope.PurchaseOrderDate = null;
        $scope.createTable = false;
        $scope.SuppliedSectorName = null;
        $scope.SourceOfSupply_Id = null;
        $scope.ManunaulPurchRequestedQuotationOrderId = null;
        $scope.ProductionOrderNo = null;
        $scope.EditRow = {};
        $scope.Transaction = 5;
        var hours = new Date().getHours();
        var ampm = hours >= 12 ? 'pm' : 'am';
        var s = '01-01-1970 ' + moment().format("hh:mm ") + ampm;
        var d = new Date(s);
        $scope.Time = d;
    }
    function SetData(DataToSet) {
        debugger
        myservice.setdata("Gates", "AddGateData", DataToSet).then(function (data) {
            debugger
            var RetMessage = data.data;
            $scope.Info_Message = RetMessage.Message;
            if (RetMessage.Status == 0) {
                $scope.DoAdd = false;
                $scope.zz = {
                    RegisterDate: $scope.CreateDate,
                    DestinationName: $scope.DestinationName,
                    Name: $scope.Name,
                    PermissionNumber: $scope.PermissionNumber,
                    NationalID: $scope.NationalID,
                    Notes: $scope.Notes,
                    CheckIn: $scope.CheckIn,
                };
                myservice.SendMessage("Gates", "SendWhatsAppMessage", $scope.zz).then(function (data) {


                });

               

            }
            else if (RetMessage.Status == 2) {
                $("#SubmitButton").attr("disabled", false);
                $scope.Status_Class = "red";
                // $scope.Print();
                //$scope.Transaction = 5;
            }
            else if (RetMessage.Status == 3) {
                $("#SubmitButton").attr("disabled", false);
                $scope.Status_Class = "orange";
                // $scope.Print();
                // $scope.Transaction = 5;
            }
            else {
                $("#SubmitButton").attr("disabled", false);
                $scope.Status_Class = "red";
                // $scope.Print();
                //  $scope.Transaction == 5;
            }
        }, function (responce) {
            alert("error in saving data");
        }).finally(function () {

            $("#show").modal("show");
            // $scope.Transaction = 5;
            setTimeout(function () {
                $("#show").modal("hide");
                location.reload();
            }, 3000);
        });

    }

    function SetData22(DataToSet) {
        debugger
        myservice.setdata("Gates", "EditGateData", DataToSet).then(function (data) {
            debugger
            var RetMessage = data.data;
            $scope.Info_Message = RetMessage.Message;
            if (RetMessage.Status == 0) {
                $scope.DoAdd = false;
                $scope.NewData = {
                   
                    RegisterDate: $scope.CreateDate,
                    DestinationName: $scope.DestinationName,
                    Name: $scope.Name,
                    PermissionNumber: $scope.PermissionNumber,
                    NationalID: $scope.NationalID,
                    Notes: $scope.Notes,
                    CheckIn: $scope.CheckIn,
                };
                myservice.SendMessage2("Gates", "SendWhatsAppMessage2", $scope.OldData, $scope.NewData).then(function (data) {


                });

               

            }
            else if (RetMessage.Status == 2) {
                $("#SubmitButton").attr("disabled", false);
                $scope.Status_Class = "red";
                // $scope.Print();
                //$scope.Transaction = 5;
            }
            else if (RetMessage.Status == 3) {
                $("#SubmitButton").attr("disabled", false);
                $scope.Status_Class = "orange";
                // $scope.Print();
                // $scope.Transaction = 5;
            }
            else {
                $("#SubmitButton").attr("disabled", false);
                $scope.Status_Class = "red";
                // $scope.Print();
                //  $scope.Transaction == 5;
            }
        }, function (responce) {
            alert("error in saving data");
        }).finally(function () {

            $("#show").modal("show");
            // $scope.Transaction = 5;
            setTimeout(function () {
                $("#show").modal("hide");
                location.reload();
            }, 3000);
        });

    }


    $scope.EditGate = function () {
        $scope.Checkk = true;
        $scope.GetEditData();
    }
    $scope.GetEditData = function () {
        debugger
        $scope.loader2 = true;
        myservice.getdata("Gates", "GetDataForEdit").then(function (data) {
            debugger
            console.log(data.data);
            $scope.Retdata = data.data;
            var grid = $("#OfferTableEdit").data("kendoGrid");
            if (grid !== undefined) {
                grid.wrapper.empty();
                grid.destroy();
                $("#OfferEdit").html($scope.outergridEdit);
                $compile($('#OfferEdit'))($scope);
                CreateGridEdit();
            }
            else {
                $scope.outergridEdit = $("#OfferEdit").html();
                CreateGridEdit();
            }
        }).finally(function () {
            $scope.loader2 = false;
        });


    }


    // Initialize the active button
    $scope.activeButton = null;

    // Function to set the active button
    $scope.setActive = function (buttonId) {
        debugger
        $scope.activeButton = buttonId;

        // Optional: Set SignIn and SignInOut values
        if (buttonId === 0) {
            $scope.CheckIn = 0;
            $scope.SignIn = 0;
            $scope.SignInOut = 1;
        } else if (buttonId === 1) {
            $scope.CheckIn = 1;

            $scope.SignIn = 1;
            $scope.SignInOut = 1;
        }
    };


    $("#OfferEdit").on("click", "#OfferTableEdit tbody tr td", function (e) {
        debugger
        var row = $("#OfferTableEdit").data('kendoGrid').dataItem($(e.currentTarget).closest("tr"));
        $scope.GateId = row.Id;
        $scope.SignInOut = 1;
        $scope.CreateDate = moment(row.RegisterDate).format('DD/MM/YYYY HH:mm'); // Includes time
        $scope.DestinationName = row.Destination;
        $scope.Name = row.Name;
        $scope.PermissionNumber = row.PermisionNumber;
        $scope.CheckIn = row.CheckIn;
        $scope.Notes = row.Note;
        $scope.NationalID = row.NationalID;
        $scope.Checkk = false;
        //Prepare the data for Whatsapp
        $scope.OldData = {
            CreationDate: moment(row.CreationDate).format('DD/MM/YYYY HH:mm'),
            RegisterDate: moment(row.RegisterDate).format('DD/MM/YYYY HH:mm'),
            DestinationName: row.Destination,
            Name: row.Name,
            PermissionNumber: row.PermisionNumber,
            CheckIn: row.CheckIn,
            Notes: row.Note,
            NationalID: row.NationalID,
            UserId: row.UserId
        }



        $scope.$evalAsync();

    });


    function CreateGridEdit() {
        debugger
        window.record = 0;
        $("#OfferTableEdit").kendoGrid({
            dataSource: {
                data: $scope.Retdata,
                pageSize: 10
            },
            groupable: true,
            //resizable:true,
            columnMenu: true,
            scrollable: true,
            //sortable: true,
            editable: "inline",
            filterable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5,
                input: true,
                numeric: true
            },
            dataBinding: function () { record = (this.dataSource.page() - 1) * this.dataSource.pageSize(); },
            columns: [

                { template: "#= ++record #", attributes: { "class": "center" }, width: 30 },
                { field: "Process", width: 130 },
                { field: "Employee", width: 130, "type": "string" },
                { field: "Destination", width: 130 },
                { field: "Name", width: 130 },
                { field: "RegisterDateStr", width: 130 },
                { field: "PermisionNumber", width: 130 },


            ]
        });
    }


    function SetData2(DataToSet) {
        debugger
        myservice.setdata2("StockReceiptPurchOrder", "UpdateStoresReceiptsProduct_Data", DataToSet, $scope.CostCenterList).then(function (data) {
            var RetMessage = data.data;
            $scope.Info_Message = RetMessage.Message;
            if (RetMessage.Status == 1) {
                $scope.Status_Class = "green";
                $scope.ReceiptData = JSON.parse(RetMessage.OtherData);
                $scope.OrderSaved = true;
                $scope.EditRow.ReceiptOrderDate = kendo.toString(kendo.parseDate($scope.EditRow.ReceiptOrderDate), ' dd/MM/yyyy');

                $scope.Print();
                $scope.Transaction = 5;
            }
            else if (RetMessage.Status == 2) {
                $scope.Status_Class = "red";
                //   $scope.Print();
            }
            else if (RetMessage.Status == 3) {
                $scope.Status_Class = "orange";
                //  $scope.Print();
            }
            else {
                $("#SubmitButton").attr("disabled", false);
                $scope.Status_Class = "red";
                //   $scope.Print();
            }
        }, function (responce) {
            alert("error in saving data");
        }).finally(function () {

            $("#show").modal("show");

            setTimeout(function () {
                $("#show").modal("hide");
                location.reload();
            }, 3000);
        });

    }

    $scope.DoAdd = false;
    $scope.SubmitOrder = function () {
        $scope.DoAdd = true;
        debugger
        $scope.Obj = {
            ID: $scope.GateId,
            RegisterDate: $scope.CreateDate,
            DestinationName: $scope.DestinationName,
            Name: $scope.Name,
            PermissionNumber: $scope.PermissionNumber,
            NationalID: $scope.NationalID,
            Notes: $scope.Notes,
            CheckIn: $scope.CheckIn,

        };
        if ($scope.Transaction == 0) {

            SetData($scope.Obj);
        }
        else {
            SetData22($scope.Obj);

        }


    };

    $scope.DeleteGate = function () {
        debugger
        $scope.Data = {};
        $scope.DataList = [];

        $scope.listdeletedata = [];
        $scope.GetDeleteDataGate();
    }
    $scope.GetDeleteDataGate = function () {
        debugger
        $scope.DataList = [];
        $scope.loader2 = true;
        myservice.getdata("Gates", "GetDataForEdit").then(function (data) {
            debugger
            console.log(data.data);
            $scope.DataList = data.data;
            var grid = $("#OfferTableDelete").data("kendoGrid");
            if (grid !== undefined) {
                grid.wrapper.empty();
                grid.destroy();
                $("#OfferDelete").html($scope.outergridDel);
                $compile($('#OfferDelete'))($scope);
                CreateDeleteGrid();
            }

            else {
                $scope.outergridDel = $("#OfferDelete").html();
                CreateDeleteGrid();
            }
        }).finally(function () {
            $scope.loader2 = false;
        });


    }

    $("#OfferDelete").on("click", "#OfferTableDelete tbody tr td:last-child input", function (e) {
        debugger
        var dataItem = $("#OfferTableDelete").data('kendoGrid').dataItem($(e.currentTarget).closest("tr"));
        $scope.listdeletedata = [dataItem.Id];
        $scope.DeletedDataWhats = {
            CreationDate: moment(dataItem.CreationDate).format('DD/MM/YYYY HH:mm'),
            RegisterDate: moment(dataItem.RegisterDate).format('DD/MM/YYYY HH:mm'),
            DestinationName: dataItem.Destination,
            Name: dataItem.Name,
            PermissionNumber: dataItem.PermisionNumber,
            CheckIn: dataItem.CheckIn,
            Notes: dataItem.Note,
            NationalID: dataItem.NationalID,
            UserId: dataItem.UserId
        }
    });
    $scope.listdeletedata = [];


    function CreateDeleteGrid() {
        debugger
        window.record = 0;
        $("#OfferTableDelete").kendoGrid({
            dataSource: {
                data: $scope.DataList,
                pageSize: 10
            },
            groupable: true,
            //resizable:true,
            columnMenu: true,
            scrollable: true,
            //sortable: true,
            editable: "inline",
            filterable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5,
                input: true,
                numeric: true
            },
            dataBinding: function () { record = (this.dataSource.page() - 1) * this.dataSource.pageSize(); },
            columns: [

                { template: "#= ++record #", attributes: { "class": "center" }, width: 30 },
                { field: "Process", width: 130 },
                { field: "Employee", width: 130, "type": "string" },
                { field: "Destination", width: 130 },
                { field: "Name", width: 130 },
                { field: "RegisterDateStr", width: 130 },
                { field: "PermisionNumber", width: 130 },



                 {
                     title: "Select",
                     template: "<input type='radio' name='selectedRow' value='#: Id #' />",
                     filterable: false,
                     sortable: false,
                     menu: false,
                     width: 70,
                     attributes: { "class": "center" }
                 },
            ]
        });
    }







    $scope.SubmitDeleteGate = function () {
        debugger;


        $scope.Info_Message = null;
        if ($scope.listdeletedata.length > 0) {
            $scope.checkdelete = false;
        } else {
            $scope.checkdelete = true;
        }
        $("#DeleteModal").modal("show"); // Show the confirmation modal
    };

    // Confirm delete handler
    $scope.ConfirmDelete = function () {
        debugger;
        $("#DeleteModal").modal("hide");

        if ($scope.listdeletedata.length === 1) {
            DeleteOrder($scope.listdeletedata); // Call delete function with the single selected ID
        } else {
            console.error("No item selected for deletion.");
        }
    };

    GetCampanyNameAndLogo();
    function GetCampanyNameAndLogo() {
        debugger
        $scope.Isyasmo = false;
        myservice.getdata("FinalExchangeOrder", "GetCampanyNameAndLogo").then(function (data) {
            $scope.Logo = data.data.CompanyLogo;
            $scope.UserRoleID = data.data.UserRoleID;
            $scope.CompanyHeader = data.data.CompanyHeader;
            $scope.CompanyFooter = data.data.CompanyFooter;
            $scope.CompanyName = data.data.CompanyName;
            if ($scope.CompanyName.toLowerCase().includes("yasmo"))
                $scope.Isyasmo = true;

            $scope.UserName = data.data.UserName;
            console.log("foooooootr");
            console.log($scope.CompanyFooter)

        });
    }



    function DeleteOrder(DataToDelete) {
        debugger
        myservice.deldata("Gates", "DeleteGateData", DataToDelete).then(function (data) {
            debugger
            var RetMessage = data.data;
            $scope.Info_Message = RetMessage.Message;
            if (RetMessage.Status == 1) {
                myservice.SendMessage("Gates", "SendWhatsAppMessage3", $scope.DeletedDataWhats).then(function (data) {


                });

              
                $scope.Status_Class = "green";
                $("#show").modal("show");

                setTimeout(function () {
                    $("#show").modal("hide");
                }, 3000);
                $scope.GetDeleteData();
                $scope.listdeletedata = [];
            }
            else if (RetMessage.Status == 2) {
                $scope.Status_Class = "red";
                $("#show").modal("show");

                setTimeout(function () {
                    $("#show").modal("hide");
                }, 3000);
                $scope.GetDeleteData();

                $scope.listdeletedata = [];
            }
            else if (RetMessage.Status == 3) {
                $scope.Status_Class = "orange";
                $("#show").modal("show");

                setTimeout(function () {
                    $("#show").modal("hide");
                }, 3000);
                $scope.GetDeleteData();

                $scope.listdeletedata = [];
            }
        }, function (responce) {
            alert("error in editing data");
        }).finally(function () {
        });
    }

    $scope.GetDeleteData = function (OfferStartDate, OfferEndDate) {

        if ($scope.OfferStartDate != null && $scope.OfferStartDate != undefined && $scope.OfferStartDate != '' &&
            $scope.OfferEndDate != null && $scope.OfferEndDate != undefined && $scope.OfferEndDate != '') {
            $scope.ReceiptsList = [];
            $scope.loader2 = true;
            myservice.getdatabyIdAndTwoDates("StockReceiptPurchOrder", "GetReceiptsPermissionsDatas", $scope.OfferStartDate, $scope.OfferEndDate, $scope.StockId).then(function (data) {
                debugger
                console.log(data.data);
                $scope.ReceiptsList = data.data;
                for (var i = 0; i < data.data.length; i++) {

                    if (data.data[i].Active == 1) {
                        data.data[i].Active = true;
                    }
                    else {
                        data.data[i].Active = false;
                    }
                }
            }).finally(function () {
                $scope.loader2 = false;
            });
        }

    }
    $scope.ChangeStatus = function () {
        // console.log($scope.DeleteGeneralData);
        var DataToEdit = [];
        for (i = 0; i < $scope.ReceiptsList.length; i++) {
            var Object = {
                Id: $scope.ReceiptsList[i].Id,

                Active: $scope.ReceiptsList[i].Active,
                // Sel_PurchaseOrderId: $scope.ReceiptsList[i].Sel_PurchaseOrderId,
            }
            DataToEdit.push(Object);
        }
        console.log(DataToEdit);
        EditStates(DataToEdit);
    }
    function EditStates(DataToEdit) {
        console.log(DataToEdit);
        myservice.setdata("StockReceiptPurchOrder", "EditReceiptsStatus", DataToEdit).then(function (data) {
            var RetMessage = data.data;
            $scope.Info_Message = RetMessage.Message;
            if (RetMessage.Status == 1) {
                $scope.Status_Class = "green";
                $("#show").modal("show");
                setTimeout(function () {
                    $("#show").modal("hide");
                }, 3000);
                $scope.GetDeleteData($scope.OfferStartDate, $scope.OfferEndDate);

            }
            else if (RetMessage.Status == 2) {
                $scope.Status_Class = "red";
                $("#show").modal("show");
                setTimeout(function () {
                    $("#show").modal("hide");
                    $("#StatusModal").modal("hide");

                }, 3000);
                $scope.GetDeleteData($scope.OfferStartDate, $scope.OfferEndDate);
            }
            else if (RetMessage.Status == 3) {
                $scope.Status_Class = "orange";
                $("#show").modal("show");

                setTimeout(function () {
                    $("#show").modal("hide");
                }, 3000);
                $scope.GetDeleteData($scope.OfferStartDate, $scope.OfferEndDate);
            }
        }, function (responce) {

            alert("error in editing data");
        }).finally(function () {
        });
    }
    $scope.listdeletedata = [];

    $scope.SubmitDelete = function () {
        console.log('SubmitDelete');
        console.log($scope.listdeletedata);
        $scope.Info_Message = null;
        if ($scope.listdeletedata.length > 0) {
            $scope.checkdelete = false;
        } else {
            $scope.checkdelete = true;
        }
        $("#DeleteModal").modal("show");
    }


    $scope.Add = function () {
        $scope.ClosingBatch = false;
        $scope.ClearForm();
        $scope.PrivateNumber = 0;
        $scope.EditTable = undefined;
        $scope.ReceiptOrderDate = '';
        $scope.ReceiptOrderNumber = null;
        myservice.getdata("StockReceiptPurchOrder", "GetMaximumReceiptNumber").then(function (data) {
            $scope.ReceiptOrderNumber = data.data + 1;


        }).finally(function () {

        });
        //myservice.getdata("StockReceiptPurchOrder", "GetMaximumReceiptOrderNumber").then(function (data) {
        //    $scope.ReceiptOrderNumber = data.data + 1;
        //    myservice.getdata("StockReceiptPurchOrder", "GetMaximumReceiptNumber").then(function (data) {
        //        $scope.ReceiptPermissionNumber = data.data + 1;


        //    }).finally(function () {
        //        $scope.EditRow.Desc = $("#langsession").val() == "ar-EG" ? "امر استلام رقم" + $scope.ReceiptOrderNumber + " لاذن استلام رقم " + $scope.ReceiptPermissionNumber
        //            : "Receipt Order Number" + $scope.ReceiptOrderNumber + " For Receipt Permission Number " + $scope.ReceiptPermissionNumber;
        //    });

        //}).finally(function () {
        //});
        $scope.Listaa = [];
        $scope.Sel_QuotationOrderDetailModel2 = [];
        $scope.Group_Id = null;
        $scope.Store = null;
        $scope.SourceOfSupply_Id = null;
        $scope.manual = null;
        $scope.mechanical = [];
        $scope.Store = null;
        $scope.Group_Id = null;
        $scope.OfferStartDate = null;
        $scope.OfferEndDate = null;
        $scope.ReceiptOrderId = null;
        $scope.ReceiptsOrders = null;
        $scope.listdeletedata = [];
        $scope.ReceiptsList = [];
        $scope.MaintanceTypeId = null;
        $scope.MaintanceOrderId = null;
        $scope.MaintanceDate = null;
        $scope.ManualMaintanceOrder = null;
        $scope.ManualMaintanceDate = null;

        $scope.OrderData = [];
        $scope.ReceiptsOrderForEditData = [];
        $scope.ReceiptsOrderForAddData = [];
        $scope.EditTable = 5;
        $scope.ProductionStoreFloorId = null;
        $scope.EditRow = {};
        var hours = new Date().getHours();
        var ampm = hours >= 12 ? 'pm' : 'am';
        var s = '01-01-1970 ' + moment().format("hh:mm ") + ampm;
        var d = new Date(s);
        $scope.Time = d;
        $scope.ReceiptOrderDate = kendo.toString(kendo.parseDate(new Date()), 'dd/MM/yyyy');
    }

    $scope.getFilterEmployee = function (Id) {
        debugger
        $scope.resultEmployee = [];
        for (i = 0; i < $scope.EmployeesNames.length; i++) {
            if ($scope.resultEmployee.length <= 5) {
                if ($scope.EmployeesNames[i].toLowerCase().includes(
                       $scope.Employee.Name.toLowerCase()))
                    $scope.resultEmployee.push($scope.EmployeesNames[i]);
            } else {
                break;
            }
        }
        $("#" + Id).autocomplete({

            source: $scope.resultEmployee, minLength: 0
        })


        $("#" + Id).keydown();
        console.log($(this));
    }
    $scope.searchchange = function (Id) {
        var x = findIndexInData($scope.Employeeda, "Name", $('#' + Id).val());
        if (x == -1 && $('#' + Id).val() != "" && $('#' + Id).val() != null) {
            $scope.Info_Message = $scope.lang == 'ar-EG' ?
                'خطا فى اختار العنصر' : "Error in selected element";
            $scope.Status_Class = "red";
            $("#show").modal("show");

            $scope.Employee.Name = "";

        }
        else {
            // $scope.Employee.Id = $scope.Employees[x].Id;
            $scope.Employee = angular.copy($scope.Employees[x]);
            $scope.Employee_Id = $scope.Employees[x].Id;
        }

    }
    $scope.ClickEmployee = function (Id) {
        debugger
        var result = $scope.EmployeesNames;
        $('#' + Id).autocomplete({

            source: result.slice(0, 10), minLength: 0
        })


        $('#' + Id).keydown();
        console.log($(this));

    }
    $scope.getFilterEmployee2 = function () {
        debugger
        $scope.resultEmployee = [];
        for (i = 0; i < $scope.EmployeesNames.length; i++) {
            if ($scope.resultEmployee.length <= 5) {
                if ($scope.EmployeesNames[i].toLowerCase().includes(
                       $scope.Employee2.Name.toLowerCase()))
                    $scope.resultEmployee.push($scope.EmployeesNames[i]);
            } else {
                break;
            }
        }
        $("#EmployeeName2").autocomplete({

            source: $scope.resultEmployee, minLength: 0
        })


        $("#EmployeeName2").keydown();
        console.log($(this));
    }
    $scope.searchchange2 = function (Id) {
        var x = findIndexInData($scope.Employeeda, "Name", $('#EmployeeName2').val());
        if (x == -1 && $('#EmployeeName2').val() != "" && $('#EmployeeName2').val() != null) {
            $scope.Info_Message = $scope.lang == 'ar-EG' ?
                'خطا فى اختار العنصر' : "Error in selected element";
            $scope.Status_Class = "red";
            $("#show").modal("show");

            $scope.Employee2.Name = "";

        }
        else {
            // $scope.Employee.Id = $scope.Employees[x].Id;
            $scope.Employee2 = angular.copy($scope.Employees[x]);
            $scope.EditRow.Employee_Id = $scope.Employees[x].Id;
        }

    }
    $scope.ClickEmployee2 = function () {
        debugger
        var result = $scope.EmployeesNames;
        $("#EmployeeName2").autocomplete({

            source: result.slice(0, 10), minLength: 0
        })


        $("#EmployeeName2").keydown();
        console.log($(this));

    }
    //////////////////////////////////////////////////////////////////////////
    $scope.ItemCodeTypeChanged = function (ItemCode, Id, event) {
        debugger
        $scope.Found = false;
        $('#' + Id).val = $('#' + Id).val() != undefined || $('#' + Id).val() == null ? "" : $('#' + Id).val();
        if (event.which != 13 && event.relatedTarget != undefined) {
            var ele = $('#ItemCodeD1')[0];
            ele.blur();
        } else {
            // var f=$('#CustomerName').val();
            //$scope.CountryPort = [];
            // $scope.AccountId = undefined;
            //$scope.LabelAccountName = "";
            if ($('#' + Id).val() != undefined && $('#' + Id).val() != null && $('#' + Id).val().length > 0) {
                var x = findIndexInData($scope.MaintableList, "BasicCode", $('#' + Id).val().toLowerCase());
                if (x == -1) {
                    $scope.Info_Message = "هذا الصنف غير موجود بالأمر";
                    $scope.Status_Class = "red";


                    $('#ItemCodeD1').val = "";
                    $scope.ItemCode = null;
                    $("#show").modal("show");
                    setTimeout(function () {
                        $("#show").modal("hide");
                        $('#ItemCodeD1').val = "";
                        $scope.ItemCode = null;
                    }, 3000);
                    $('#ItemCodeD1').val = "";
                    $scope.ItemCode = null;
                } else {
                    debugger

                    $scope.Indexx = x;
                    $scope.MaintableList[$scope.Indexx].ReceiptsQuantity =
                        $scope.MaintableList[$scope.Indexx].ReceiptsQuantity == undefined || $scope.MaintableList[$scope.Indexx].ReceiptsQuantity == null ?
                       0 : $scope.MaintableList[$scope.Indexx].ReceiptsQuantity;
                    $scope.MaintableList[$scope.Indexx].ReceiptsQuantity = $scope.MaintableList[$scope.Indexx].ReceiptsQuantity + 1;
                    $('#ItemCodeD1').val = "";
                    $scope.ItemCode = null;


                }
                var ele = $('#ItemCodeD1')[0];
                // var ele = $('#ItemCodeD
                ele.focus();
                ele.setSelectionRange(0, 0);
                if (event != undefined && event != null) {
                    event.preventDefault(); // Doesn't work at all
                    window.stop(); // Works in all browsers but IE...
                    document.execCommand('Stop'); // Works in IEv
                    $scope.$apply();
                    return false;
                }
            }
        }
    }
    $scope.ClickItemCodeType = function (Id) {
        debugger
        //$scope.LabelAccountName = "";
        $scope.ItemCode = $scope.ItemCode == undefined ? "" : $scope.ItemCode;
        $scope.ItemCodes = [];
        if ($scope.MaintableList != null && $scope.MaintableList.length > 0)
            for (var i = 0; i < $scope.MaintableList.length; i++) {
                $scope.ItemCodes.push($scope.MaintableList[i].BasicCode);
            }

        $scope.resultAccountName = [];
        for (i = 0; i < $scope.ItemCodes.length; i++) {
            if ($scope.resultAccountName.length <= 5) {
                if ($scope.ItemCodes[i].substr(0,
                    $scope.ItemCode.length).toLowerCase() ==
                    $scope.ItemCode.toLowerCase())
                    $scope.resultAccountName.push($scope.ItemCodes[i]);
            } else {
                break;
            }
        }
        var result = angular.copy($scope.resultAccountName);
        $("#" + Id).autocomplete({

            source: result.slice(0, 10), minLength: 0
        })


        $("#" + Id).keydown();
        console.log($(this));

    }
    $scope.ChangeGroupList = function (readtype) {
        debugger

        $scope.MaintableList.forEach(function (item) {
            if (readtype == 1) item.ReceiptsQuantity = item.Quantity;
            else if (readtype == 2) {
                item.ReceiptsQuantity = 0;
                found = true;
            }
        });
        if (readtype == 2) {
            $('#ItemCodeD1').removeClass('hide');
            var ele = $('#ItemCodeD1')[0];
            // var ele = $('#ItemCodeD
            ele.focus();
            ele.setSelectionRange(0, 0);

            window.stop(); // Works in all browsers but IE...
            document.execCommand('Stop'); // Works in IEv

        }


    }
    $scope.ItemCodeTypeChanged2 = function (ItemCode, Id, event) {
        debugger
        $scope.Found = false;
        $('#' + Id).val = $('#' + Id).val() != undefined || $('#' + Id).val() == null ? "" : $('#' + Id).val();
        if (event.which != 13 && event.relatedTarget != undefined) {
            var ele = $('#ItemCodeD2')[0];
            ele.blur();
        } else {
            // var f=$('#CustomerName').val();
            //$scope.CountryPort = [];
            // $scope.AccountId = undefined;
            //$scope.LabelAccountName = "";
            if ($('#' + Id).val() != undefined && $('#' + Id).val() != null && $('#' + Id).val().length > 0) {
                var x = findIndexInData($scope.MaintableList, "BasicCode", $('#' + Id).val().toLowerCase());
                if (x == -1) {
                    $scope.Info_Message = "هذا الصنف غير موجود بالأمر";
                    $scope.Status_Class = "red";


                    $('#ItemCodeD2').val = "";
                    $scope.ItemCode = null;
                    $("#show").modal("show");
                    setTimeout(function () {
                        $("#show").modal("hide");
                        $('#ItemCodeD2').val = "";
                        $scope.ItemCode = null;
                    }, 3000);
                    $('#ItemCodeD2').val = "";
                    $scope.ItemCode = null;
                } else {
                    debugger

                    $scope.Indexx = x;
                    $scope.MaintableList[$scope.Indexx].ReceiptsQuantity =
                        $scope.MaintableList[$scope.Indexx].ReceiptsQuantity == undefined || $scope.MaintableList[$scope.Indexx].ReceiptsQuantity == null ?
                       0 : $scope.MaintableList[$scope.Indexx].ReceiptsQuantity;
                    $scope.MaintableList[$scope.Indexx].ReceiptsQuantity = $scope.MaintableList[$scope.Indexx].ReceiptsQuantity + 1;
                    $('#ItemCodeD2').val = "";
                    $scope.ItemCode = null;


                }
                var ele = $('#ItemCodeD2')[0];
                // var ele = $('#ItemCodeD
                ele.focus();
                ele.setSelectionRange(0, 0);
                if (event != undefined && event != null) {
                    event.preventDefault(); // Doesn't work at all
                    window.stop(); // Works in all browsers but IE...
                    document.execCommand('Stop'); // Works in IEv
                    $scope.$apply();
                    return false;
                }
            }
        }
    }
    $scope.ClickItemCodeType2 = function (Id) {
        debugger
        //$scope.LabelAccountName = "";
        $scope.ItemCode = $scope.ItemCode == undefined ? "" : $scope.ItemCode;
        $scope.ItemCodes = [];
        if ($scope.MaintableList != null && $scope.MaintableList.length > 0)
            for (var i = 0; i < $scope.MaintableList.length; i++) {
                $scope.ItemCodes.push($scope.MaintableList[i].BasicCode);
            }

        $scope.resultAccountName = [];
        for (i = 0; i < $scope.ItemCodes.length; i++) {
            if ($scope.resultAccountName.length <= 5) {
                if ($scope.ItemCodes[i].substr(0,
                    $scope.ItemCode.length).toLowerCase() ==
                    $scope.ItemCode.toLowerCase())
                    $scope.resultAccountName.push($scope.ItemCodes[i]);
            } else {
                break;
            }
        }
        var result = angular.copy($scope.resultAccountName);
        $("#" + Id).autocomplete({

            source: result.slice(0, 10), minLength: 0
        })


        $("#" + Id).keydown();
        console.log($(this));

    }
    $scope.ChangeGroupList2 = function (readtype) {
        debugger

        $scope.MaintableList.forEach(function (item) {
            if (readtype == 1) item.ReceiptsQuantity = item.AcceptedQuantity;
            else if (readtype == 2) {
                item.ReceiptsQuantity = 0;
                found = true;
            }
        });
        if (readtype == 2) {
            $('#ItemCodeD2').removeClass('hide');
            var ele = $('#ItemCodeD2')[0];
            // var ele = $('#ItemCodeD
            ele.focus();
            ele.setSelectionRange(0, 0);

            window.stop(); // Works in all browsers but IE...
            document.execCommand('Stop'); // Works in IEv

        }


    }



    $scope.CostCenterList = [];

    $scope.AddCostCenter = function () {
        debugger

        $scope.CostCenterList.push({});
    }
    $scope.RemoveCostCenter = function (list, index) {
        list.splice(index, 1);


    }
    LoadCostCenterMenus();
    function LoadCostCenterMenus() {

        myservice.LoadDataById("StockReceiptPurchOrder", "LoadCostCenterNames").then(function (data) {
            $scope.CostCenterNames = data.data.Data;

        });
    }

    $scope.GetCostCenterCode = function (Id, obj) {
        debugger;
        $scope.Cost_Center_Code = [];
        myservice.LoadById("StockReceiptPurchOrder", "GetCostCenterCode", Id).then(function (data) {
            $scope.CostCenter = { CostCentercode: 0 };
            obj.CostCentercode = data.data.Data;
            $scope.$apply();

        }).finally(function () {
        });
    }

    $scope.MyList = [];



    //$scope.SetTotalAmount = function (details, index) {
    //    $scope.TotalAmount = 0;
    //    debugger;
    //    if (details.Quantity && details.ExpectedUnitPrice) {
    //        details.Total = parseFloat((details.Quantity * details.ExpectedUnitPrice).toFixed(3));
    //        $scope.MyList[index] = details.Total;
    //        $scope.TotalAmount = ListSum($scope.MyList);
    //    }
    //}
    //SetTotalAmount();

    $scope.SetTotalAmount = function () {
        $scope.Total = 0;
        debugger;
        if ($scope.MaintableList[0].UnitPrice && $scope.MaintableList[0].ReceiptsQuantity) {
            $scope.Total = parseFloat(($scope.MaintableList[0].UnitPrice * $scope.MaintableList[0].ReceiptsQuantity).toFixed(3));
            //$scope.MyList[index] = $scope.Total;
            //$scope.TotalAmount = ListSum($scope.MyList);
        }
        $scope.Total = $scope.MaintableList.reduce(function (a, b) {
            if (b.UnitPrice > 0 && b.PlanningReceiptQuantity > 0 && b.UnitPrice != '' && b.PlanningReceiptQuantity != '')
                return a + parseFloat((b.PlanningReceiptQuantity * b.UnitPrice).toFixed(3))
        }, 0);
    }


    $scope.CalculatePercentage = function (Amount, Obj) {
        debugger;
        if ($scope.Total)
            Obj.percentage = (Amount * 100) / $scope.Total;
        else
            Obj.percentage = 0;
        //$scope.$apply();
    }

    //function ListSum(list) {
    //    let Sum = 0;
    //    for (var i = 0; i < list.length; i++) {
    //        if (list[i]) {
    //            Sum += list[i];
    //        }

    //    }
    //    return Sum;
    //}
    $scope.CalculateQuantityAfterDeviation = function (item) {
        if (item.ReceiptsQuantity > 0 && item.ReceiptsQuantity < item.Quantity) {
            item.Deviation = Number(parseFloat(item.Quantity - item.ReceiptsQuantity).toFixed(3));
        } else {
            item.Deviation = 0;
        }
    }
    $scope.CalculateQuantityAfterDeviationForEdit = function (item) {
        if (item.ReceiptsQuantity > 0 && item.ReceiptsQuantity < item.Quantity) {
            item.Deviation = Number(parseFloat(item.Quantity - item.ReceiptsQuantity).toFixed(3));
        } else {
            item.Deviation = 0;
        }
    }
    showIcons();
    function showIcons() {
        debugger
        myservice.LoadDataById("StockReceiptPurchOrder", "getUserdata", PageIdToView).then(function (data) {
            $scope.checkAddButton = data.data['checkadd'];
            $scope.checkediteButton = data.data['checkedite'];
            $scope.checkdeleteButton = data.data['checkdelete'];

        }).finally(function () {
        });
    }
});
StockReceipt.directive('autoCompNamesDirect', function () {

    return {
        restrict: 'AEC',
        link: function (scope, element, attrs) {


            element.autocomplete({
                source: function (request, response) {

                    var results = $.ui.autocomplete.filter(scope.ItemNames, request.term);

                    response(results.slice(0, 10));
                },

                select: function (event, ui) {
                    function findIndexInData(data, property, value) {
                        var result = -1;
                        data.some(function (item, i) {
                            if (item[property] == value) {
                                result = i;
                                return true;
                            }
                        });
                        return result;
                    }

                    GetNode();
                    function GetNode() {

                        for (var i = 0; i < scope.AllData.length; i++) {


                            if (ui.item.value == scope.AllData[i].Name) {

                                var x = findIndexInData(scope.MaintableList, "TableId", scope.AllData[i].Id);
                                if (x == -1) {
                                    scope.Details.TableId = scope.AllData[i].Id;

                                    //scope.Details.SecondLevelGroup_Id = scope.

                                    scope.Details.Name = scope.AllData[i].Name;
                                    scope.Details.BasicCode = scope.AllData[i].Basic_Code;
                                    scope.Details.Classtype = scope.Group_Id;
                                    scope.Details.NameWritten = true;
                                    var CheckSecondGroupDetails = findIndexInData(scope.AllParentGroups, "Group_Id", scope.AllData[i].Group_Id);

                                    scope.Details.SecondLevelGroup_Id = scope.AllParentGroups[CheckSecondGroupDetails].Group_Id;
                                    scope.Details.GroupName = scope.AllParentGroups[CheckSecondGroupDetails].Group_Name;

                                    scope.Details.SameItem = false;
                                    //scope.Item.Group_Id = scope.AllData[i].Group_Id;


                                    break;
                                }
                                if (x >= 0) {

                                    scope.Details.Name = null;
                                    scope.Details.BasicCode = null;
                                    scope.Details.Classtype = undefined;
                                    scope.Details.NameWritten = false;

                                    scope.Details.SameItem = true;

                                }




                            }









                        };
                    }


                },
                delay: 0,

            });
        }
    }

});

StockReceipt.directive('autoCompCodesDirect', function () {

    return {
        restrict: 'AEC',
        link: function (scope, element, attrs) {


            element.autocomplete({
                source: function (request, response) {

                    var results = $.ui.autocomplete.filter(scope.ItemCodes, request.term);

                    response(results.slice(0, 10));
                },

                select: function (event, ui) {

                    function findIndexInData(data, property, value) {
                        var result = -1;
                        data.some(function (item, i) {
                            if (item[property] == value) {
                                result = i;
                                return true;
                            }
                        });
                        return result;
                    }

                    GetNode();
                    function GetNode() {

                        for (var i = 0; i < scope.AllData.length; i++) {


                            if (ui.item.value == scope.AllData[i].Basic_Code) {

                                var x = findIndexInData(scope.MaintableList, "TableId", scope.AllData[i].Id);
                                if (x == -1) {
                                    scope.Details.TableId = scope.AllData[i].Id;


                                    scope.Details.Name = scope.AllData[i].Name;
                                    scope.Details.BasicCode = scope.AllData[i].Basic_Code;
                                    scope.Details.Classtype = scope.Group_Id;
                                    scope.Details.CodeWritten = true;
                                    var CheckSecondGroupDetails = findIndexInData(scope.AllParentGroups, "Group_Id", scope.AllData[i].Group_Id);

                                    scope.Details.SecondLevelGroup_Id = scope.AllParentGroups[CheckSecondGroupDetails].Group_Id;
                                    scope.Details.GroupName = scope.AllParentGroups[CheckSecondGroupDetails].Group_Name;

                                    scope.Details.SameItem = false;



                                    break;
                                }
                                if (x >= 0) {

                                    scope.Details.Name = null;
                                    scope.Details.BasicCode = null;
                                    scope.Details.Classtype = undefined;
                                    scope.Details.CodeWritten = false;

                                    scope.Details.SameItem = true;

                                }
                            }
                        };
                    }

                },
                delay: 0,

            });
        }
    }

});
StockReceipt.directive('preventEnterSubmit', function () {
    return function (scope, el, attrs) {
        el.bind('keydown', function (event) {

            console.log(attrs);
            console.log(el);
            console.log(event);
            if (13 == event.which) {

                event.preventDefault(); // Doesn't work at all
                window.stop(); // Works in all browsers but IE...
                document.execCommand('Stop'); // Works in IE
                if (event.target.id == "ItemCodeD1") {
                    scope.ItemCodeTypeChanged(scope.ItemCode, "ItemCodeD1", event);
                }
                if (event.target.id == "ItemCodeD2") {
                    scope.ItemCodeTypeChanged(scope.ItemCode, "ItemCodeD2", event);
                }
                return false; // Don't even know why it's here. Does nothing.
            }
        });
    };
});
StockReceipt.directive('focusOn', function ($timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attr) {
            $scope.$watch($attr.focusOn, function (_focusVal) {
                $timeout(function () {
                    _focusVal == false ? $element[0].focus() :
                        $element[0].blur();
                });
            });

        }
    }
});