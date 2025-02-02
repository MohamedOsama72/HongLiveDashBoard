var StockReceipt = angular.module("StockReceipt", ["ngRoute", "ui.tree", "ui.bootstrap", "kendo.directives"
, "datatables", "datatables.columnfilter", , "datatables.buttons"]);
StockReceipt.config(function ($routeProvider) {

 
    $routeProvider
        .when("/Gates1", {
            templateUrl: "/StoresManag/Gates1",
            controller: "Receipt1",
           

        })
         .when("/GatesReport", {
             templateUrl: "/StoresManag/GatesReport",
             controller: "NewReceipt1",


         })
       
});
StockReceipt.controller("ActiveClassController", function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});

StockReceipt.service("myservice", function ($http) {
    this.getdata = function (controller, action) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        };
        return $http(req);
    }
    this.SendMessage = function (controller, action, zz) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { zz: zz }
        };
        return $http(req);
    }
    this.SendMessage2 = function (controller, action, OldData,NewData) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { OldData: OldData, NewData: NewData }
        };
        return $http(req);
    }
    this.LoadByItemName = function (controller, action, ItemName) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { ItemName: ItemName }
        };
        return $http(req);
    }
    this.LoadDataByTypeAndStockId = function (controller, action, Type, StockId) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Type: Type, StockId: StockId }
        };
        return $http(req);
    }
    this.LoadByItemAnd2DatesAndStock = function (controller, action, Item, Stock_Id, ExchangeDate, Time) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Item: Item, Stock_Id: Stock_Id, ExchangeDate: ExchangeDate, Time: Time }
        };
        return $http(req);
    }
    this.getdatabyIdAndTwoDates = function (controller, action, From, To, Stock_Id) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { From: From, To: To, Stock_Id: Stock_Id }
        };
        return $http(req);
    }
    this.LoadByThreeIdsAndString = function (controller, action, Id1, Id2, Id3, Match) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id1: Id1, Id2: Id2, Id3: Id3, Match: Match }
        };
        return $http(req);
    }
    this.LoadByTwoIds = function (controller, action, Id1, Id2) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id1: Id1, Id2: Id2 }
        };
        return $http(req);
    }
    this.LoadById = function (controller, action, Id) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id: Id }
        };
        return $http(req);
    }
    this.getdataby = function (controller, action, data) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id: data }
        };
        return $http(req);
    }
    this.GetByThreeIdsAndNameAndObject = function (controller, action, Id1, Id2, Id3, Name, data) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id1: Id1, Id2: Id2, Id3: Id3, Name: Name, objectData: data }
        };
        return $http(req);
    }
    this.setdata = function (controller, action, data) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { objectData: data }
        };
        return $http(req);
    }
    this.setdata2 = function (controller, action, data1, data2) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { objectData: data1, objectData2: data2 }
        };
        return $http(req);
    }
    this.CheckIfExist = function (controller, action, UnitName, MainGroupId, Group_Id) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { UnitName: UnitName, MainGroupId: MainGroupId, Group_Id: Group_Id }
        };
        return $http(req);
    }
    //
    this.LoadDataByTypeAndTwoIds = function (controller, action, Type, Id, Group_Id) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Type: Type, Id: Id, Group_Id: Group_Id }
        };
        return $http(req);
    }
    this.LoadDataByTypeAndGroupId = function (controller, action, Id, Group_Id) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id: Id, Group_Id: Group_Id }
        };
        return $http(req);
    }
    this.LoadByThreeIds = function (controller, action, Id1, Id2, Id3) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id1: Id1, Id2: Id2, Id3: Id3 }
        };
        return $http(req);
    }
    this.getdatabyTwoIds = function (controller, action, Id, ParentId) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id: Id, ParentId: ParentId }
        };
        return $http(req);
    }
    this.getdatabyThreeIdsAndString = function (controller, action, Id, ParentId, Match, Type) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id: Id, ParentId: ParentId, Match: Match, Type: Type }
        };
        return $http(req);
    }
    this.getdatabyThreeIdss = function (controller, action, Id1, Id2, Id3) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id1: Id1, Id2: Id2, Id3: Id3 }
        };
        return $http(req);
    }
    this.deldata = function (controller, action, data) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Ids: data }
        };
        return $http(req);
    }

    this.LoadDataById = function (controller, action, Id) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id: Id }
        };
        return $http(req);
    }
    this.LoadDataByIdSearch = function (controller, action, Id, SearchValue) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id: Id, SearchValue: SearchValue }
        };
        return $http(req);
    }
    this.LoadDataByTwoIds = function (controller, action, Supplier_Id, Group_Id) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Supplier_Id: Supplier_Id, Group_Id: Group_Id }
        };
        return $http(req);
    }
    this.LoadDataByThreeIds = function (controller, action, Id, Group_Id, Status) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id: Id, Group_Id: Group_Id, Status: Status }
        };
        return $http(req);
    }
    this.LoadDataBy3Ids = function (controller, action, StoreName_Id, Group_Id, MainGroup_Id) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { StoreName_Id: StoreName_Id, Group_Id: Group_Id, MainGroup_Id: MainGroup_Id }
        };
        return $http(req);
    }
    this.LoadDataByTypeAndId = function (controller, action, Type, Id) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Type: Type, Id: Id }
        };
        return $http(req);
    }
    this.LoadDataByThreeId = function (controller, action, From, To, ClassId) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { From: From, To: To, ClassId: ClassId }
        };
        return $http(req);
    }
    this.LoadDataByTwoId = function (controller, action, Id, Group_Id) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Id: Id, Group_Id: Group_Id }
        };
        return $http(req);
    }
    this.LoadOfferByDate = function (controller, action, From, To, Group_Id) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { From: From, To: To, Group_Id: Group_Id }

        };
        return $http(req);
    }
    this.LoadOfferByDateAndStock_Id = function (controller, action, OfferStartDate, OfferEndDate, Stock_Id) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { OfferStartDate: OfferStartDate, OfferEndDate: OfferEndDate, Stock_Id: Stock_Id }

        };
        return $http(req);
    }
    this.LoadOfferByDatee = function (controller, action, From, To, Group_Id,Stock) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { From: From, To: To, Group_Id: Group_Id, Stock: Stock }

        };
        return $http(req);
    }
    this.LoadOfferByDate2 = function (controller, action, OfferStartDate, OfferEndDate) {

        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { OfferStartDate: OfferStartDate, OfferEndDate: OfferEndDate }

        };
        return $http(req);
    }
    this.LoadOrderClassifications = function (controller, action, OrderId) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { OrderId: OrderId }
        };
        return $http(req);
    }

    this.LoadStockPurchaseOrders = function (controller, action, StockId) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { StockId: StockId }
        };
        return $http(req);
    }

    //this.LoadRegisteredCompanies = function (controller, action, year) {
    //    var req = {
    //        method: "POST",
    //        url: controller + "/" + action,
    //        headers: {
    //            'Content-Type': 'application/json; charset=utf-8'
    //        },
    //        data: { Year: year }
    //    };
    //    return $http(req);
    //}

});
StockReceipt.factory('AllBetweenSharedFunction', function (myservice) {
    return {
        GetNextId: function (Id, scope) {
            return myservice.LoadById("TransferOrders", "GetNextIdCode", Id)
            .then(function (data) {
                scope.IdCode = data.data;
            });
        }

    }
});

StockReceipt.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value);
            });
        }
    };
});


StockReceipt.filter('unique', function () {

    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});
//StockReceipt.filter('customFilter', function (filterFilter) {
//    return function (input, filterEach, exclude) {
//        filterEach.forEach(function (item) {
//            if (angular.equals(item.SubElementId, exclude)) { return; }
//            item.SubElementId == "" ? input = input : input = filterFilter(input, function (d) { return d.Element_Id !== item.SubElementId });
//        });
//        return input;
//    };
//});