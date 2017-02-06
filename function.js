$(function(){
	var operation ="A"; 
	var selected_index = -1;
	var tbClients = localStorage.getItem("tbClients");
	tbClients = JSON.parse(tbClients);
	if(tbClients == null)
	   tbClients = [];

// $("#txtID").val(tbClients.length+1);

/*function Date () {
    $( "#datepicker" ).datepicker();
  };
*/
var d = new Date();
d = d.getDate() + "-" + (d.getMonth() + 1 ) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes();

function Add (){
	var client =JSON.stringify({
		Title : $("#txtID").val(),
		Note : $("#txtNT").val(),
		Date :  d.toString()
	});
	tbClients.push(client);
	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	alert("sending to the Post man...");
	return true;
}

function Edit(){
	tbClients[selected_index] = JSON.stringify({
		Title : $("#txtID").val(),
		Note : $("#txtNT").val(),
		Date :  d.toString()
	});
	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	alert("Note was remixed.");
	operation = "A";
	return true;
}

function Delete(){
	tbClients.splice(selected_index, 1);
	localStorage.setItem("tbClients", JSON.stringify(tbClients));
	alert("to be wiped out... !");
}

function List(){		
	$("#tblList").html("");
	$("#tblList").html(
		"<thead>"+
		"	<tr>"+
		"	<th></th>"+
		"	<th>Titles</th>"+
		"	<th>Notes</th>"+
		"	<th>Dates</th>"+
		"	</tr>"+
		"</thead>"+
		"<tbody>"+
		"</tbody>"
		);
	for(var i in tbClients){
		var cli = JSON.parse(tbClients[i]);
	  	$("#tblList tbody").append("<tr>"+
								 	 "	<td><img src='img/edit2.png' alt='Edit"+i+"' class='btnEdit'/><img src='img/delete2.png' alt='Delete"+i+"' class='btnDelete'/></td>" + 
									 "	<td>"+cli.Title+"</td>" + 
									 "	<td>"+cli.Note+"</td>" + 
									  "	<td>"+cli.Date+"</td>" + 
	  								 "</tr>");
	}
}
$("#frmCadastre").bind("submit",function(){
	if(operation == "A")
		return Add();
	else
		return Edit();	

	});	

$(document).on( "click", ".btnEdit", function(){
    operation = "E";
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    var cli = JSON.parse(tbClients[selected_index]);
    $("#txtID").val(cli.Title);
    $("#txtNT").val(cli.Note);
    $("#txtDate").val(cli.Date);
    $("#txtID").attr("readonly","readonly");
    $("#txtNT").focus();
});

$(document).on( "click", ".btnDelete", function(e){
    selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
    Delete();
    List();
});

$(document).bind("onload",List());
   
function List(){        
    $("#tblList").html("");
    $("#tblList").html(
        "<thead>"+
        "<tr>"+
        "<th></th>"+
        "<th>Titles</th>"+
        "<th>Notes</th>"+
        "<th>Dates</th>"+
        "</tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>" );
    for(var i in tbClients){
        var cli = JSON.parse(tbClients[i]);
        $("#tblList tbody").append("<tr>"+
        "<td><img src='img/edit2.png' alt='Edit"+i+"' class='btnEdit'/>"+ "  " +
        "<img src='img/delete2.png' alt='Delete"+i+"' class='btnDelete'/>"+
        "</td>" +
        "<td>"+
        cli.Title+"</td>"+"<td>"+
        cli.Note+"</td>"+"<td>"+
        cli.Date+"</td>"+"<td>");
    }
}
});

