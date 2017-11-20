"use strict";
var user = {}

user.init = function(){
    if(Util.getEl('#addNameBtn').length != 0){
        Util.addLis(Util.getEl('#addNameBtn')[0], 'click', user.addName);
    }
    if(Util.getEl('#updatedeletetable').length != 0){
        Util.addLis(Util.getEl('#updatedeletetable')[0], 'click', user.updatedelete);
    }
}

user.addName = function(){
    /* DECLARE VARIABLES */
    var data, fname, lname;
    
    /* SET DATA TO AN OBJECT */
    data = {}

    /* GET THE ELEMENTS AND PUT THEM INTO VARIABLES I DO THIS SO I CAN CLEAR THEM LATER */
    fname = Util.getEl('#firstname');
    lname = Util.getEl('#lastname');

    /* GET THE ELEMENT VALUES AND ADD THEM TO THE DATA OBJECT */
    data.fname = fname[0].value;
    data.lname = lname[0].value;


    /* STRINGIFY THE DATA SO I CAN SEND IT TO THE SERVER. */
    data = JSON.stringify(data);
    Util.sendRequest('/addname', function(res){
        user.msgoutput(res.response); 
    }, data);
}

user.updatedelete = function(e){
    var id, data = {}, rowid;
    /* I ADD THE FLAG PROPERTY TO THE DATA OBJECT SO WHEN THE SCRIPT GETS SENT TO THE SERVER IT KNOWS HOW TO HANDLE THE REQUEST. */
    if(e.target.value === "Delete"){
        data.id = e.target.id.substring(1);
        data.flag = "delete";
        rowid = e.target.parentNode.parentNode.rowIndex;
 
        data = JSON.stringify(data);
    }
    else if(e.target.value === "Update"){
        data.id = e.target.id.substring(1);
        data.flag = "update";
        /* THE FOLLOWING LINES START FROM THE BUTTON GO UP TO THE TD THEN GETS THE VALUES OF THE FIRST AND SECOND PREVIOUS SIBLINGS OF THE TD. DOING THIS GIVES ME THE VALUE OF THE INPUT ELEMENTS FOR THE ROWS.  */
        data.fname = e.target.parentNode.previousSibling.previousSibling.firstChild.value;
        data.lname = e.target.parentNode.previousSibling.firstChild.value;

        data = JSON.stringify(data);
    }
    
    Util.sendRequest('/updatedeletename', function(res){
        /* THIS DELETES THE TABLE ROW ON THE FRONT END, BUT WHEN THE PAGE RELOADS THE TABLE ROW WILL BE DELETED FROM THE DATABASE */
        Util.getEl('.table')[0].deleteRow(rowid);
        user.msgoutput(res.response); 
        
    }, data);

    
}

user.msgoutput = function(response){
    switch (response) {
        case "error" : Util.getEl('#msg')[0].innerHTML = "There was an error could not process request"; break;
        case "addname" : Util.getEl('#msg')[0].innerHTML = "The name has been added"; break;
        case "deleted" : Util.getEl('#msg')[0].innerHTML = "The name has been deleted"; break;
        case "updated" : Util.getEl('#msg')[0].innerHTML = "The name has been updated"; break;
        default : Util.getEl('#msg')[0].innerHTML = "There was an error could not process request"; break;
    }
}

user.init();


