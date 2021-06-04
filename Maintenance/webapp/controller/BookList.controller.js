sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("Quickstart.controller.BookList", {

        onCreate: function () {
            /*Insert operation*/
            var oModel = this.getView().getModel();
            if (this.byId("newBookIsbn").getValue().toString() != "" && this.byId("newBookDataPublished").getValue().toString() != "" ) {
            var oEntry = {
                ISBN: parseInt(this.byId("newBookIsbn").getValue()),
                Author: this.byId("newBookAuthor").getValue().toString(),
                Title: this.byId("newBookTitle").getValue().toString(),
                Data_Published: new Date(this.byId("newBookDataPublished").getValue().toString()),
                Language: this.byId("newBookLanguage").getValue().toString(),
                Total_Nr_Books: parseInt(this.byId("newBookTotalNumber").getValue()),
                Available_Books: parseInt(this.byId("newBookTotalNumber").getValue())
            }
                oModel.create("/BooksSet", oEntry, {
                    method: "POST",
                    success: function (data) {
                        MessageToast.show("Book inserted successfully!");
                    },
                    error: function (e) {
                        MessageToast.show("Error inserting book!");
                    }
                });
            } else {
                MessageToast.show("Please enter a valid ISBN and a valid date");
            }    
        },
        onUpdate: function () {
            /*update operation*/
            var oSelected = this.byId("booksList").getSelectedItem();
            var oModel = this.getView().getModel();
            if(oSelected) {
            var oEntry = {
                ISBN: parseInt(oSelected.getBindingContext().getProperty("ISBN")),
                Author: oSelected.getBindingContext().getProperty("Author").toString(),
                Title: oSelected.getBindingContext().getProperty("Title").toString(),
                Data_Published: new Date(oSelected.getBindingContext().getProperty("Data_Published").toString()),
                Language: oSelected.getBindingContext().getProperty("Language").toString(),
                Total_Nr_Books: parseInt(oSelected.getBindingContext().getProperty("Total_Nr_Books")),
                Available_Books: parseInt(oSelected.getBindingContext().getProperty("Available_Books"))
            };
            oModel.update("/BooksSet(" + oEntry.ISBN + ")", oEntry, {
                method: "PUT",
                success: function (data) {
                    MessageToast.show("Book updated successfully!");
                },
                error: function (e) {
                    MessageToast.show("Error updating book!");
                }
            });
        } else {
            MessageToast.show("Please select a book to update.");
        }
        },
        onDelete: function () {
            /*Delete operation*/
        var oSelected = this.byId("booksList").getSelectedItem();
        if (oSelected) {
            var selectedBook = oSelected.getBindingContext().getPath();
            this.getView().getModel().remove(selectedBook, {
                success: function () {
                    MessageToast.show("Book deleted!");
                },
                error: function () {
                    MessageToast.show("Error deleting book!");
                }
            });
        } 
        else {
        MessageToast.show("Please select a book to delete");
        }
    }
    });
});
