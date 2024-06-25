
var myarray = [
    {id: 1, Title: 'Example#1', Teacher: userInput, Priority: 'high', Description: 'Develop a new feature for the school management system to automate student attendance tracking.', Details: "This task involves implementing a new feature for the website, allowing teachers to mark attendance more efficiently.", completed: false, view: "ViewDetails"},
    {id: 2, Title: 'Example#2', Teacher: userInput, Priority: 'low', Description: 'Create a lesson plan for the upcoming biology class focusing on photosynthesis.', Details: "The task involves preparing a detailed lesson plan covering the topic of photosynthesis, including interactive activities and assessments.", completed: false, view: "ViewDetails"},
    {id: 3, Title: 'Example#3', Teacher: userInput, Priority: 'medium', Description: 'Review and provide feedback on student essays for the English composition assignment.', Details: "This task requires reviewing and providing constructive feedback on student essays submitted for the English composition assignment.", completed: false, view: "ViewDetails"},
    {id: 4, Title: 'Example#4', Teacher: userInput, Priority: 'high', Description: 'Organize a science fair event for the school showcasing student projects and experiments.', Details: "This task involves planning and coordinating a science fair event, including selecting judges, setting up booths, and managing logistics.", completed: false, view: "ViewDetails"},
    {id: 5, Title: 'Example#5', Teacher: userInput, Priority: 'medium', Description: 'Prepare and deliver a lecture on the history of ancient civilizations for the World History class.', Details: "The task requires preparing an engaging lecture on ancient civilizations, covering key events, cultures, and contributions.", completed: false, view: "ViewDetails"},
    {id: 6, Title: 'Example#6', Teacher: userInput, Priority: 'low', Description: 'Conduct a review session for students preparing for the upcoming mathematics quiz on algebraic equations.', Details: "This task involves conducting a review session covering topics related to algebraic equations to help students prepare for the quiz.", completed: false, view: "ViewDetails"}
];


function DislayTableData() {
    var html = "";
    for (var i = 0; i < myarray.length; i++) {
        html += '<tr>';
        html += '<td>' + myarray[i].id + '</td>';
        html += '<td>' + myarray[i].Title + '</td>';
        html += '<td>' + myarray[i].Teacher + '</td>';
        html += '<td>' + myarray[i].Priority + '</td>';
        html += '<td>' + myarray[i].Description + '</td>';
        html += "<th>" + '<button class="check" onclick="check(' + i + ')">' + (myarray[i].completed ? "checked" : "Check") + '</button>' + "</th>";
        html += "<th>" + '<button class="viewTaskButton" onclick="ViewDetails(this)">View Details</button>' + "</th>";
        html += '</tr>';
    }
    document.getElementById("taskTableBody").innerHTML = html;
}

DislayTableData();

document.getElementById("taskTableBody").addEventListener("click", function(event) {
    var target = event.target;
    if (target && target.tagName.toLowerCase() === "button" && target.classList.contains("check")) {
        var row = target.parentNode.parentNode;
        var selectedIndex = parseInt(row.cells[0].innerText) - 1;

        if (myarray[selectedIndex].completed === false) {
            myarray[selectedIndex].completed = true;
            target.innerText = "checked"; 
        } else {
            myarray[selectedIndex].completed = false;
            target.innerText = "Check"; 
            if (document.getElementById("showCompleted").checked) {
                ViewChecked();
            }
        }

        document.getElementById("para").innerText = "completed tasks: " + countCompletedTasks();
        
    }
});



function countCompletedTasks() {
    var checkedCount = 0;
    myarray.forEach(item => {
        if (item.completed) {
            checkedCount++;
        }
    });
    return checkedCount;
}

function ViewDetails(r) {
    // console.log("ViewDetails function called");
    var i = r.parentNode.parentNode.rowIndex - 1;
    var row = document.getElementById("taskTableBody").rows[i];
    var selectedIndex = parseInt(row.cells[0].innerText) - 1;

    if (myarray[selectedIndex].view === "ViewDetails") {
        console.log("ViewDetails button clicked");
        var detailsCell = row.insertCell(-1);
        var details = myarray[selectedIndex].Details;
        myarray[selectedIndex].view = "HideDetails";
        if(performance.navigation.type===1){
            myarray[selectedIndex].view = "ViewDetails";

        }
        var textBox = document.createElement("textarea");
        textBox.rows = "4";
        textBox.cols = "50";
        textBox.value = details;
        textBox.readOnly = true;
        textBox.style.resize = "none"; // Disable textarea resizing
        textBox.style.border = "1px solid rgb(33, 100, 33)"; // Add border
        textBox.style.padding = "5px"; // Add padding
        textBox.style.width = "100%"; // Set width to 100%
        textBox.style.background= "rgb(234, 192, 129)";
        detailsCell.appendChild(textBox);

        r.innerText = "Hide Details";
    } else {
        row.deleteCell(-1);
        myarray[selectedIndex].view = "ViewDetails";
        r.innerText = "View Details";
    }
}




function search(){
    var SelectedPriority = document.getElementById("priority").value;
if(SelectedPriority != "all"){
    var html = ""
    
setTimeout(()=>{
    for(var i=0;i<myarray.length;i++){
        if(myarray[i].Priority == SelectedPriority){
        html+='<tr>';
        html+='<td>'+myarray[i].id+'</td>';
        html+='<td>'+myarray[i].Title+'</td>';
        html+='<td>'+myarray[i].Teacher+'</td>';
        html+='<td>'+myarray[i].Priority+'</td>';
        html+='<td>'+myarray[i].Description+'</td>';
        html+="<th>"+'<button class="check" onclick="check(this)">'+ (myarray[i].completed ? "checked" : "Check") +'</button>'+"</th>";
        html+="<th>"+'<button class="viewTaskButton" onclick="ViewDetails(this)">View Details</button>'+"</th>";
        html+='</tr>';
        }
    }

    document.getElementById("taskTableBody").innerHTML = html
}, 500);
}
else{
    DislayTableData();
}   
document.getElementById("showCompleted").checked=false;

}




function ViewChecked(){
    const showCompleted = document.getElementById("showCompleted").checked;
    const selectedPriority = document.getElementById("priority").value;

    if (showCompleted) {
        var html = "";

        setTimeout(() => {
            for (var i = 0; i < myarray.length; i++) {
                if (myarray[i].completed && (selectedPriority === "all" || myarray[i].Priority === selectedPriority)) {
                    html += '<tr>';
                    html += '<td>' + myarray[i].id + '</td>';
                    html += '<td>' + myarray[i].Title + '</td>';
                    html += '<td>' + myarray[i].Teacher + '</td>';
                    html += '<td>' + myarray[i].Priority + '</td>';
                    html += '<td>' + myarray[i].Description + '</td>';
                    html += "<th>" + '<button class="check" onclick="check(this)">' + (myarray[i].completed ? "checked" : "Check") + '</button>' + "</th>";
                    html += "<th>" + '<button class="viewTaskButton" onclick="ViewDetails(this)">View Details</button>' + "</th>";
                    html += '</tr>';

                }
            }
            document.getElementById("taskTableBody").innerHTML = html;
        }, 500);
    } else {
        search();
    }
}

function displayTaskSummary() {
    // console.log("displayTaskSummary function called");
    var totalTasks = myarray.length;
    var completedTasks = 0;
    var pendingTasks = 0;

    myarray.forEach(function(task) {
        if (task.completed) {
            completedTasks++;
        } else {
            pendingTasks++;
        }
    });

    document.getElementById("NoOfAssignedTasks").textContent = "Number of tasks assigned: " + totalTasks;
    document.getElementById("NoOfCompletedTasks").textContent = "Number of tasks completed: " + completedTasks;
    document.getElementById("NoOfPendingTasks").textContent = "Number of tasks pending: " + pendingTasks;
}

window.onload = displayTaskSummary;
