var HongReport = angular.module("HongReport", ["ngRoute", "kendo.directives"]);

HongReport.controller("ActiveClassController", function ($scope, $location) {
    $scope.isActive = function (route) {
        return route === $location.path();
    }
});
HongReport.service("myservice", function ($http) {
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
    //-------------------------------------------------------------------------------
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
    this.LoadCustomerById = function (controller, action, CustomerId) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { CustomerId: CustomerId }
        };
        return $http(req);
    }
    this.LoadBy3Id = function (controller, action, Id1, Id2,Id3) {
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
    this.GetPrintButtonText = function (Lang) {
        if (Lang == "en-GB") {
            return "Print";
        }
        else {
            return "طباعة";
        }
    }
    this.GetColumnVisibilityButtonText = function (Lang) {
        if (Lang == "en-GB") {
            return "Hidden and visible columns";
        }
        else {
            return "اخفاء واظهار الاعمدة";
        }
    }
    this.GetCollectionButtonText = function (Lang) {
        if (Lang == "en-GB") {
            return "Export";
        }
        else {
            return "تصدير الى";
        }
    }
    this.GetPdfButtonText = function (Lang) {
        if (Lang == "en-GB") {
            return "Pdf";
        }
        else {
            return "قارئ الملفات";
        }
    }
    this.GetExcelButtonText = function (Lang) {

        if (Lang == "en-GB") {

            return "Excel";
        }
        else {

            return "اكسيل";
        }
    }
    this.GetLanguageFile = function (Lang) {
        if (Lang == "en-GB") {
            return "../../../../Content/Json/DatatableEnglish.json";
        }
        else {
            return "../../../../Content/Json/DatatableArabic.json";
        }
    }

    this.GetCopyButtonText = function (Lang) {
        if (Lang == "en-GB") {
            return "Copy";
        }
        else {
            return "نسخ";
        }
    }
    this.GetCSVButtonText = function (Lang) {
        if (Lang == "en-GB") {
            return "CSV";
        }
        else {
            return "قيم مفصولة بفاصلة";
        }
    }
    this.LoadCustomersById = function (controller, action, Ids) {
        var req = {
            method: "POST",
            url: controller + "/" + action,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: { Ids: Ids }
        };
        return $http(req);
    }
    //------------------------------------------------------------------------------------
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

});

HongReport.directive('stringToNumber', function () {
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