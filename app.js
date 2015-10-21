var employeeArray = [];
var totalCashMoney = 0;

var employeeIndex = 0;

$(document).ready(function(){
	$("#employeeinfo").submit(function(event){
		event.preventDefault();

		gatherEmployee();
	});

	$("#employeeContainer").on('click', '.deleteButton', function(){
		var $el = $(this).parent();
		var deletedIndex = $el.data("employeeIndex");

		for(var i = 0; i < employeeArray.length; i++){
			if(employeeArray[i].employeeIndex == deletedIndex){
				employeeArray.splice(i, 1);
			}
		}

		$el.remove();
		totalSalaries();
	});
});

function gatherEmployee(){
	employeeIndex++;
	var values = {};

	$.each($("#employeeinfo").serializeArray(), function(i, field){
		values[field.name] = field.value;
	})
	
	$("#employeeinfo").find("input[type=text]").val("");
	employeeArray.push(values);
	console.log("Here is the Employee List: ", employeeArray);
	totalSalaries();
	appendDom(values);
}

function appendDom(employee){
	console.log(employee);
	$("#employeeContainer").append("<div class='employee well col-md-3'></div>");
	var $el = $("#employeeContainer").children().last();
	$("#employeeContainer").append("<div class='col-md-1></div>")
	$el.data("employeeIndex", employeeIndex);
	employee.employeeIndex = $el.data("employeeIndex");

	$el.append("<p>First Name: " + employee.employeefirstname + "</p>");
	$el.append("<p>Last Name: " + employee.employeelastname + "</p>");
	$el.append("<p>Employee Number: " + employee.employeenumber + "</p>");
	$el.append("<p>Position: " + employee.employeejob + "</p>");
	$el.append("<p>Salary: " + employee.employeecashmoney + "</p>");
	$el.append("<button class='deleteButton btn btn-danger'>Fire Employee</button>");
}

function totalSalaries(){
	totalCashMoney = 0;

	for(var i = 0; i < employeeArray.length; i++){
		totalCashMoney += parseInt(employeeArray[i].employeecashmoney);
	}

	$("#totalcash").empty();
	$("#totalcash").append("<p>Monthly Corporate Payroll: " + totalCashMoney/12);


	return totalCashMoney;
}
