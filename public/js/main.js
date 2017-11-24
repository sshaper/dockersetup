"use strict";
var user = {}

/* CHECKS TO SEE IF THE ELEMENTS EXIST AND IF SO ADDS LISTENERS TO THEM. */
user.init = function(){
    if(Util.getEl('#addNameBtn').length != 0){
        Util.addLis(Util.getEl('#addNameBtn')[0], 'click', user.addName);
    }
    if(Util.getEl('#updatedeletetable').length != 0){
        Util.addLis(Util.getEl('#updatedeletetable')[0], 'click', user.updatedelete);
    }
    if(Util.getEl('#loginBtn').length != 0){
        Util.addLis(Util.getEl('#loginBtn')[0], 'click', user.login);
    }
}

user.login = function(){
    var data = {}
    data.username = Util.getEl('#username')[0].value;
    data.password = Util.getEl('#password')[0].value;

    data = JSON.stringify(data);

    Util.sendRequest('login', function(res){
        user.msgoutput(res.response);
    }, data);


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
        /* CLEAR INPUT FIELDS */
        fname[0].value = "";
        lname[0].value = ""; 
    }, data);
}

user.updatedelete = function(e){
    var id, data = {}, rowid;
    /* I ADD THE FLAG PROPERTY TO THE DATA OBJECT SO WHEN THE SCRIPT GETS SENT TO THE SERVER IT KNOWS HOW TO HANDLE THE REQUEST. */
    if(e.target.value === "Delete"){
        Util.msgBox({
            heading: {text: 'You are about to delete this entery', background: 'red', color: 'white'},
            body: {text: 'You are about to permentally delete this record.  If this is what you want to do click "OK", otherwise click "Cancel" '},
            leftbtn: {text: 'OK', background: 'green', display: 'block'},
            rightbtn: {text: 'Cancel', background: 'red', display: 'block'}
        });

        Util.addLis(Util.getEl('#leftbtn')[0], 'click', function(){
            data.id = e.target.id.substring(1);
            data.flag = "delete";
            rowid = e.target.parentNode.parentNode.rowIndex;
            data = JSON.stringify(data);
            Util.sendRequest('/updatedeletename', function(res){
                Util.getEl('.table')[0].deleteRow(rowid);
                user.msgoutput(res.response);
                Util.closeMsgBox(); 
            }, data);
         });
        
        Util.addLis(Util.getEl('#rightbtn')[0], 'click', function(){
            Util.closeMsgBox();
            return;
        });
         
    }
    else if(e.target.value === "Update"){
        data.id = e.target.id.substring(1);
        data.flag = "update";
        /* THE FOLLOWING LINES START FROM THE BUTTON GO UP TO THE TD THEN GETS THE VALUES OF THE FIRST AND SECOND PREVIOUS SIBLINGS OF THE TD. DOING THIS GIVES ME THE VALUE OF THE INPUT ELEMENTS FOR THE ROWS.  */
        data.fname = e.target.parentNode.previousSibling.previousSibling.firstChild.value;
        data.lname = e.target.parentNode.previousSibling.firstChild.value;

        data = JSON.stringify(data);
        Util.sendRequest('/updatedeletename', function(res){
            user.msgoutput(res.response); 
         }, data);
    }

}

user.msgoutput = function(response){
    switch (response) {
        case "error" : Util.getEl('#msg')[0].innerHTML = "There was an error could not process request"; break;
        case "addname" : Util.getEl('#msg')[0].innerHTML = "The name has been added"; break;
        case "deleted" : Util.getEl('#msg')[0].innerHTML = "The name has been deleted"; break;
        case "updated" : Util.getEl('#msg')[0].innerHTML = "The name has been updated"; break;
        case "loginError" : Util.getEl('#msg')[0].innerHTML = "There has been an error logging in"; break;
        case "loginNoInfo" : Util.getEl('#msg')[0].innerHTML = "There are no records found matching your entry";break;
        case "loginSuccess" : window.location = "/home";break;
        default : Util.getEl('#msg')[0].innerHTML = "There was an error could not process request"; break;
    }
}

user.init();


