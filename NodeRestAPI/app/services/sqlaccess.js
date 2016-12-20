

var Connection = require('tedious').Connection;
var config = {  
        userName: 'gisappserverdev',  
        password: 'GISAPPSERVERDEVAdmin!',  
        server: 'gisappserverdev\sqlexpress',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'TEST'}  
    };  


function executeStatement1(name, number) {  
        request = new Request("INSERT SalesLT.Product (Name, Phone) OUTPUT INSERTED.ProductID VALUES (@Name, @Number);", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('Name', TYPES.NVarChar,name);  
        request.addParameter('Number', TYPES.Int , number);  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                console.log("Product id of inserted item is " + column.value);  
              }  
            });  
        });       
        connection.execSql(request);  
    }  