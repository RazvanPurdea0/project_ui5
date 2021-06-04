sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"../model/formatter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",

], function (Controller, MessageToast, Sorter, Filter, formatter, FilterOperator, FilterType) {
    "use strict";
    return Controller.extend("Quickstart.controller.CheckedBooksList", {
		formatter: formatter,
		onFilterFirstName : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var oView = this.getView();
			var sQuery = oView.byId("SearchFieldFirstName").getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("First_Name", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
	
			// update list binding
			var list = this.getView().byId("checkedBooksList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, FilterType.Application);
		},
		onFilterLastName : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var oView = this.getView();
			var sQuery = oView.byId("SearchFieldLastName").getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Last_Name", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
	
			// update list binding
			var list = this.getView().byId("checkedBooksList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, FilterType.Application);
		},
		onFilterTitle : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var oView = this.getView();
			var sQuery = oView.byId("SearchFieldTitle").getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Title", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
	
			// update list binding
			var list = this.getView().byId("checkedBooksList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, FilterType.Application);
		},

		onFilterAuthor : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var oView = this.getView();
			var sQuery = oView.byId("SearchFieldAuthor").getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Author", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
	
			// update list binding
			var list = this.getView().byId("checkedBooksList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, FilterType.Application);
		},

		onSort : function () {
			var oView = this.getView(),
				aStates = [undefined, "asc", "desc"],
				aStateTextIds = ["sortNone", "sortAscending", "sortDescending"],
				sMessage,
				iOrder = oView.getModel("appView").getProperty("/order");

			iOrder = (iOrder + 1) % aStates.length;
			var sOrder = aStates[iOrder];

			oView.getModel("appView").setProperty("/order", iOrder);
			oView.byId("peopleList").getBinding("items").sort(sOrder && new Sorter("LastName", sOrder === "desc"));

			sMessage = this._getText("sortMessage", [this._getText(aStateTextIds[iOrder])]);
			MessageToast.show(sMessage);
		},
    });
});
