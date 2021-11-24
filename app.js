input = document.getElementById("val");
ul = document.getElementById("ul");

firebase.database().ref('todos').on("child_added",(data) => {
    var createElement = document.createElement("li");
    var appendText = document.createTextNode(data.val().value);
    createElement.appendChild(appendText);
    ul.appendChild(createElement)
    var editbtn = document.createElement('button')
    var editBtnText = document.createTextNode('EDIT')
    editbtn.setAttribute('class', 'btn btn-success')
    editbtn.setAttribute('id', data.val().key)
    editbtn.setAttribute('onclick','editbtnclick(this)')
    editbtn.appendChild(editBtnText)
    createElement.appendChild(editbtn)

    var delbtn = document.createElement('button')
    delbtn.setAttribute('class', 'btn btn-danger')
    delbtn.setAttribute('id', data.val().key)
    delbtn.setAttribute('onclick','del(this)')       
    var delText = document.createTextNode('DELETE')
    delbtn.appendChild(delText)
    createElement.appendChild(delbtn)
})

const AddTodo = () => {
    var database = firebase.database().ref('todos')
    var key = database.push().key;  
    var todo = {
        value: input.value,
        key: key
    }
    database.child(key).set(todo)
    input.value = ''
}

function closee(){
    getInput.value = ''
    }
    
    function deleteAll(){
        firebase.database().ref('todos').remove()
        ul.innerHTML = ""
    }
    
    function del(Val){
     Val.parentNode.remove()   
     console.log(Val.id)
     firebase.database().ref('todos').child(Val.id).remove()
    }
    function editbtnclick(editbtnclickval){
        console.log(editbtnclickval.id)
        var getValue = prompt('Enter Your EDIT Value') 
        editbtnclickval.parentNode.childNodes[0].nodeValue = getValue
        var editTodo = {
            value: getValue,
            key: editbtnclickval.id
        }   
        firebase.database().ref('todos').child(editbtnclickval.id).set(editTodo)

    }  