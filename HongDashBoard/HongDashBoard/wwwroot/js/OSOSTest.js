HongReport.controller("OSOSTestController", function ($scope, myservice, $compile, $filter) {
    var ParameterInLink = window.location.hash.split("#I_");
    var PageIdToView = ParameterInLink[1];

   
	$scope.ShowTable = true;
	$scope.showdetaileddata = false;
	$scope.CurrentItem = 0;
	GetDropdownMenuData();
	$scope.ItemSelected = [];
	$scope.GetCompanyData = function ($event, z) {
		if (event.target.checked == true) {
			$scope.ItemSelected.push(z);
		}
		else if (event.target.checked == false) {
			$scope.ItemSelected.splice($scope.ItemSelected.indexOf(z), 1);
		}

	}
	$scope.Stages = [{ Name: "Stages", Id: 1 }, { Name: "Employees", Id: 2 }];
	$scope.SpecificStages = [{ Name: "T7der", Id: 1 }, { Name: "Seir", Id: 2 }, { Name: "T3b2a", Id: 3 }, { Name: "All", Id: 4 }];
	var GetModelData = myservice.getdata("OSOSTest", "GetModelData").then(function (data) {
        debugger
	        $scope.ModelList = data.data;
	       
	    });
	$scope.ShowData = false;
	$scope.loader = false;
	$scope.GetData = function (SizeGroupingNameId, ModelId, SpecificStageId) {
	    debugger
	    $scope.loader = true;
	    if ($scope.StageId==1) {
	        myservice.LoadBy3Id("OSOSTest", "GetData", SizeGroupingNameId, ModelId, SpecificStageId).then(function (data) {
	            $scope.Data = data.data;
	            $scope.loader = false;
	            $scope.ShowData = true;

	        });
	    } else if ($scope.StageId == 2) {
	        myservice.LoadBy3Id("OSOSTest", "GetData2", SizeGroupingNameId, ModelId, SpecificStageId).then(function (data) {
	            $scope.Data = data.data;
	            $scope.loader = false;
	            $scope.ShowData = true;

	        });
	    }
	  
	}
    // SignalR Setup
	var dashboardHub = $.connection.dashboardHub;

    // Handle SignalR notification
	dashboardHub.client.refreshDashboard = function () {
        debugger
	    console.log("SignalR triggered: refreshing dashboard...");

	    // Ensure valid dropdown selections before calling GetData
	    if ($scope.ModelId && $scope.Model && $scope.Model.SizeGroupingNameId && $scope.SpecificStage && $scope.SpecificStageId) {
	        $scope.GetData($scope.Model.SizeGroupingNameId, $scope.ModelId, $scope.SpecificStageId);
	    } else {
	        console.warn("Dropdown selections are not set. Skipping GetData.");
	    }
	};

    // Start the SignalR connection
    $.connection.hub.start().done(function () {
        debugger
	    console.log("Connected to SignalR Hub For Dash");
    }).fail(function (error) {
        debugger
	    console.error("SignalR connection failed: " + error);
	});
	$scope.showALLDetails = function () {
	    if ($scope.ItemSelected.length == 0) {
	        //$scope.Info_Message = "برجاء اختيار عنصر من القائمه";
	        $("#showid").modal("show");

	        setTimeout(function () {
	            $("#showid").modal("hide");
	        }, 4000);
	    } else {

	        GetCompanyDataById($scope.ItemSelected);
	        $scope.ShowTable = false;
	        $scope.showdetaileddata = true;

	    }

	}
	$scope.Close = function () {
		$scope.ItemSelected = [];

		angular.forEach($scope.customer, function (item) {
			item.checked = false;
		});
		$scope.ShowTable = true;
		$scope.showdetaileddata = false;
	}
	function GetCompanyDataById(Ids) {
		myservice.LoadCustomersById("ReCustomer", "GETTotalReportData", Ids).then(function (data) {
			$scope.Info_Message = "";
			$scope.EditRow = angular.copy(data.data);
			

		}, function (responce) {
			alert("error in loading data");
		}).finally(function () {
			$scope.ShowCompanyDataForm = true;
		});
	}
	$scope.printtocart = function () {
		if ($("#Lang").val() == "ar-EG") {
			$("#PrintDir").attr("dir", "rtl").addClass("smart-rtl");;
		}
		var options = { mode: "iframe" };
		$("#printdata").printArea(options);
	};

	function GetDropdownMenuData() {
		myservice.getdata("ReCustomer", "GetCompanies").then(function (data) {
			var retdata = data.data;
			$scope.customer = data.data['customer'];
			$scope.customer = $filter('filter')($scope.customer, function (d) { return d.DealingStatus === false; })
		});
	}
    ///////////////////////select all/////
	$('#selectAll').click(function (e) {
	    var table = $(e.target).closest('table');
	    $('td input:checkbox', table).prop('checked', this.checked);
	});
	$scope.SelectAll = function () {
	    debugger

	    if ($scope.CheckeAll) {
	        $scope.ItemSelected = [];
	        for (var i = 0; i < $scope.customer.length; i++) {
	            id = $scope.customer[i].Id;
	            $scope.ItemSelected.push(id);
	        }
	    }
	    else {
	        for (var i = 0; i < $scope.customer.length; i++) {
	            id = $scope.customer[i].Company_Id;
	            $scope.ItemSelected.splice($scope.ItemSelected.indexOf(id), 1);
	        }
	    }
	}
    ////////////////////////
});
