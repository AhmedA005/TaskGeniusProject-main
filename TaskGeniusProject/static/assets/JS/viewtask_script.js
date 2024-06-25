var myarray = [
    {id: 1 , Title: 'Example#1' , Teacher: 'El-Ramly' , Priority: 'high' , Description: 'This task involves implementing a new feature for the website.' ,
    Details: "This is the full Details of this task which will be projected in an extended text box to view details when clicking the button view details",completed:"Check",view:"ViewDetails"},
    {id: 2 , Title: 'Example#2' , Teacher: 'Ahmed' , Priority: 'low' , Description: 'Designing a prototype for the upcoming project.' ,
    Details: "This is the full Details of this task which will be projected in an extended text box to view details when clicking the button view details",completed:"Check",view:"ViewDetails"},
    {id: 3 , Title: 'Example#3' , Teacher: 'Basheer' , Priority: 'medium' , Description: 'Preparing documentation for the software release.' ,
    Details: "This is the full Details of this task which will be projected in an extended text box to view details when clicking the button view details",completed:"Check",view:"ViewDetails"},
    {id: 4, Title: 'Example#4', Teacher: 'Moahmed', Priority: 'high', Description: 'Conducting market research for the new product launch.' ,
    Details: "This is the full Details of this task which will be projected in an extended text box to view details when clicking the button view details", completed: "Check", view: "ViewDetails"},
    {id: 5, Title: 'Example#5', Teacher: 'Abdulrahman', Priority: 'medium', Description: 'Testing and debugging the application codebase.' ,
    Details: "This is the full Details of this task which will be projected in an extended text box to view details when clicking the button view details", completed: "Check", view: "ViewDetails"},
    {id: 6, Title: 'Example#6', Teacher: 'Cristiano', Priority: 'low', Description: 'Organizing a team meeting to discuss project milestones.' ,
    Details: "This is the full Details of this task which will be projected in an extended text box to view details when clicking the button view details", completed: "Check", view: "ViewDetails"}
];


function DislayTableData(){
    var html = ""

setTimeout(()=>{
    for(var i=0;i<myarray.length;i++){
        html+='<tr>';
        html+='<td>'+myarray[i].id+'</td>';
        html+='<td>'+myarray[i].Title+'</td>';
        html+='<td>'+myarray[i].Teacher+'</td>';
        html+='<td>'+myarray[i].Priority+'</td>';
        html+='<td>'+myarray[i].Description+'</td>';
        html+="<td>"+'<input type="button" class="edit" value="Edit" onclick="editRow(this)">'+"</td>";
        html+="<td>"+'<input type="button" class="delete" value="Delete" onclick="deleteRow(this)">'+"</td>";
        html+='</tr>';
    }

    document.getElementById("taskTableBody").innerHTML = html
}, 500);

}

DislayTableData();

function addOnClick(){
    var id = document.getElementById('input_id').value;
    var title = document.getElementById('input_title').value;
    var tname = document.getElementById('input_tname').value;
    var description = document.getElementById('input_Description').value;
    var priority = document.getElementById('priority').value;

    if(id && title && tname && description && priority){
        myarray.push({id:id,Title:title,Teacher:tname,Priority:priority,Description:description})
        DislayTableData();
        clearForm();
        hideform();
    }
    RecentAdmin()
    RecentTeacher()
}

function clearForm(){
    var id = document.getElementById('input_id').value=""
    var title = document.getElementById('input_title').value=""
    var tname = document.getElementById('input_tname').value=""
    var description = document.getElementById('input_Description').value=""
    var priority = document.getElementById('priority').value=""
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex-1;
    document.getElementById("taskTableBody").deleteRow(i);
    myarray.splice(i,1);
    RecentAdmin()
    RecentTeacher()
}

function DisplayForm(){
    var Form = ""

setTimeout(()=>{
        Form+='<br>';
        Form+='<label for="input_id"><b>'+"id:"+'</b></label> <input id="input_id" class="box" type="text" required name="id" autofocus>';
        Form+='<br>';
        Form+='<br>';
        Form+='<label for="input_title"><b>'+"task title:"+'</b></label> <input id="input_title" class="box" type="email" required name="title">';
        Form+='<br>';
        Form+='<br>';
        Form+='<label for="input_tname"><b>'+"teacher name:"+'</b></label> <input id="input_tname" class="box" type="text" required name="teacher name" minlength="8">';
        Form+='<br>';
        Form+='<br>';
        Form+='<label for="input_Description"><b>'+"Description:"+'</b></label> <input id="input_Description" class="box" type="text" required name="Description">';
        Form+='<br>';
        Form+='<br>';
        Form+='<label for="input_Details"><b>'+"Task Details:"+'</b></label> <input id="input_Details" class="box" type="text" required name="Details" style="height: 100px;">';
        Form+='<br>'
        Form+='<br>'
        Form+='<label for="priority"><b>'+"Select Priority:"+'</b></label> <select name="priority" id="priority"> <option value="low">'+"low"+'</option> <option value="medium">'
        +"medium"+'</option> <option value="high">'+"high"+'</option> </select>';
        Form+='<br>';
        Form+='<button type="button" class="edit" id="add" onclick="addOnClick()">'+"Add"+'</button>';
        Form+='<br>';
        Form+='<button type="button" class="delete" id="closeform" onclick="hideform()">'+"Close"+'</button>';

    document.getElementById("divform").innerHTML = Form
}, 500);

}

function hideform(){
    document.getElementById("divform").innerHTML =''
}

function resetForm() {
    document.getElementById('edit_id').value = "";
    document.getElementById('edit_title').value = "";
    document.getElementById('edit_tname').value = "";
    document.getElementById('edit_Description').value = "";
    document.getElementById('edit_priority').value = "";
}

function editRow(r) {
    var i = r.parentNode.parentNode.rowIndex - 1;
    var task = myarray[i];

    var editForm = "";
    editForm += '<br>';
    editForm += '<label for="edit_id"><b>'+"id:"+'</b></label> <input id="edit_id" class="box" type="text" required name="id" autofocus value="' + task.id + '">';
    editForm += '<br>';
    editForm += '<br>';
    editForm += '<label for="edit_title"><b>'+"task title:"+'</b></label> <input id="edit_title" class="box" type="email" required name="title" value="' + task.Title + '">';
    editForm += '<br>';
    editForm += '<br>';
    editForm += '<label for="edit_tname"><b>'+"teacher name:"+'</b></label> <input id="edit_tname" class="box" type="text" required name="teacher name" minlength="8" value="' + task.Teacher + '">';
    editForm += '<br>';
    editForm += '<br>';
    editForm += '<label for="edit_Description"><b>'+"Description:"+'</b></label> <input id="edit_Description" class="box" type="text" required name="Description" value="' + task.Description + '">';
    editForm += '<br>';
    editForm += '<br>';
    editForm+='<label for="edit_Details"><b>'+"Task Details:"+'</b></label> <input id="edit_Details" class="box" type="text" required name="Details" style="height: 100px;" size="50" value="' + task.Details +'">';
    editForm += '<br>'
    editForm += '<br>'
    editForm += '<label for="edit_priority"><b>'+"Select Priority:"+'</b></label> <select name="priority" id="edit_priority"> <option value="low">'+"low"+'</option> <option value="medium">'
    editForm += "medium"+'</option> <option value="high">'+"high"+'</option> </select>';
    editForm += '<br>';
    editForm += '<br>';
    editForm += '<input type="reset" class="Button" onclick="resetForm()">';
    editForm += '<button type="button" id="update" class="Button" onclick="updateTask(' + i + ')">'+"Update"+'</button>';
    editForm += '<br>';
    editForm += '<br>';
    editForm += '<button type="button" id="closeform" class="Button" onclick="hideform()">'+"close"+'</button>';

    document.getElementById("divform").innerHTML = editForm;

    document.getElementById('edit_priority').value = task.Priority;
    RecentAdmin()
    RecentTeacher()
}

function updateTask(i) {
    var id = document.getElementById('edit_id').value;
    var title = document.getElementById('edit_title').value;
    var tname = document.getElementById('edit_tname').value;
    var description = document.getElementById('edit_Description').value;
    var priority = document.getElementById('edit_priority').value;
    var details = document.getElementById('edit_Details').value;

    if(id && title && tname && description && priority && details){
        myarray[i] = {id:id,Title:title,Teacher:tname,Priority:priority,Description:description,Details:details};

        DislayTableData();

        hideform();
    }
    RecentAdmin()
    RecentTeacher()
}

function RecentTeacher(){
    var html = "<h3>Recent Tasks</h3>"

setTimeout(()=>{
    for(var i=myarray.length - 1;i>=0;i--){
        html+='<p>'+myarray[i].Title+'</p>';
    }

    document.getElementById("RecentTeacher").innerHTML = html
}, 500);

}

RecentTeacher();

function RecentAdmin(){
    var html = "";

    setTimeout(() => {
        for (var i = myarray.length - 1; i >= Math.max(0, myarray.length - 3); i--) {
            html+= '<tr>';
            html += '<td>' + myarray[i].id + '</td>';
            html += '<td>' + myarray[i].Title + '</td>';
            html += '<td>' + myarray[i].Teacher + '</td>';
            html+= '</tr>';

        
        }

        document.getElementById("RecentAdmin").innerHTML = html;
    }, 500);
}


RecentAdmin()

