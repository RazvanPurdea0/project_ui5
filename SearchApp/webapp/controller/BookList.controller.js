sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"

], function (Controller, MessageToast, Sorter, Filter, FilterOperator, FilterType) {
    "use strict";
    return Controller.extend("Quickstart.controller.BookList", {

        onCheckout: function () {
            /*Insert operation*/
            var oSelected = this.byId("booksList").getSelectedItem();
            var oModel = this.getView().getModel();
            if (oSelected) {
            var oEntry = {
                ISBN: parseInt(oSelected.getBindingContext().getProperty("ISBN"))
            }
                oModel.create("/CheckedBooksSet", oEntry, {
                    method: "POST",
                    success: function (data) {
                        MessageToast.show("Book checked out successfully!");
                    },
                    exception: function (e) {
                        MessageToast.show("Error checking out book!");
                    }
                });
        } else {
            MessageToast.show("Please select a book first in order to check out");
        }
    },
    onSearchIsbn : function () {
        // add filter for search
			var aFilters = [];
			var oView = this.getView();
			var sQuery = oView.byId("isbnSearchField").getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("ISBN", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
	
			// update list binding
			var list = this.getView().byId("booksList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, FilterType.Application);
    },
    onSearchAuthor : function () {
        // add filter for search
			var aFilters = [];
			var oView = this.getView();
			var sQuery = oView.byId("authorSearchField").getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Author", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
	
			// update list binding
			var list = this.getView().byId("booksList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, FilterType.Application);
    },
    onSearchTitle : function () {
        // add filter for search
			var aFilters = [];
			var oView = this.getView();
			var sQuery = oView.byId("titleSearchField").getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Title", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
	
			// update list binding
			var list = this.getView().byId("booksList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, FilterType.Application);
    },
    onSearchLanguage : function () {
        // add filter for search
			var aFilters = [];
			var oView = this.getView();
			var sQuery = oView.byId("languageSearchField").getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Language", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
	
			// update list binding
			var list = this.getView().byId("booksList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, FilterType.Application);
    }
    
    });
});
