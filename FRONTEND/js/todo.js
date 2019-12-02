var token = localStorage.getItem('token');

var datalength = '';
var flag =0;

function updateTodo(element) {
  const todoId = element.getAttribute('todo-id');
  console.log(todoId)
  var input = document.querySelector("input[name=newitem2]");
  var cantidad = document.querySelector("input[name=newitem3]");
  var cash = document.querySelector("input[name=newitem4]");
  input.classList.remove("show")
  cantidad.classList.remove("show")
  cash.classList.remove("show")

  input.addEventListener('keypress', function (event) {
    if (event.charCode === 13) {
      json_to_send = {
        "description": input.value,
        "quantity": cantidad.value,
        "cash": cash.value
      };
      json_to_send = JSON.stringify(json_to_send);
      $.ajax({
        //url: 'http://localhost:3000/todos/' + todoId,
        url: 'https://webproyectofinal.herokuapp.com/todos/' + todoId,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'PATCH',
        dataType: 'json',
        data: json_to_send,
        success: function (data) {
          console.log("updatiado")
           window.location.reload(true);
        },
        error: function (error_msg) {
          alert((error_msg['responseText']));
        }
      });
      input.value = '';
      quantity.value = '';
      cash.value = '';
    }
  })
  
}
if(flag===0){
  refresh()
  flag=1;

}

function deleteTodo(element) {
  const todoId = element.getAttribute('todo-id');
  $.ajax({
    //url: 'http://localhost:3000/todos/' + todoId,
    url: 'https://webproyectofinal.herokuapp.com/todos/' + todoId,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'DELETE',
    dataType: 'json',
    success: function (data) {
      console.log("borrado")
      window.location.reload(true);
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
  input.value = '';
  refresh()
}

if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

function refresh() {
  $('input[name="todo"]').change(function () {
    if (this.checked) {
      $(this).next().addClass("done")
    }
    else {
      $(this).next().removeClass("done")

    }
  });
}

function loadTodos() {
  $.ajax({
    //url: 'http://localhost:3000/todos',
    url: 'https://webproyectofinal.herokuapp.com/todos/',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      console.log(data)

      datalength = data.length

      for (let i = 0; i < data.length; i++) {

        var txt = data[i].description;
        var quantity = data[i].quantity
        var cash = data[i].cash
        let newHtml = ''
        newHtml +=
          `
          <tr>
            <td>${txt}</td>
            <td>${quantity}</td> 
            <td>${cash}</td>
          </tr>
          <td><button todo-id="${data[i]._id}" onclick="updateTodo(this)">Update :D</button></td>
          <td><button todo-id="${data[i]._id}" onclick="deleteTodo(this)">Delete :(</button></td>
          `
        $('.list').append(newHtml)
        console.log(data[i].description)
      }
      refresh()
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}


loadTodos()


var input = document.querySelector("input[name=newitem]");
var cantidad = document.querySelector("input[name=cantidad]");
var cash = document.querySelector("input[name=dinero]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description": input.value,
      "quantity": cantidad.value,
      "cash": cash.value

    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      //url: 'http://localhost:3000/todos',
      url: 'https://webproyectofinal.herokuapp.com/todos',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        console.log(data)

        var txt = data.description;
        let newHtml = ''
        newHtml +=
          `
          <li><input type="checkbox" name="todo" value=""><span>${txt}</span><button todo-id="" onclick="updateTodo(this)">Update :D</button><button todo-id="" onclick="deleteTodo(this)">Delete :(</button></li>          `
        $('#todo-list').append(newHtml)
        datalength = datalength + 1
        location.reload(true)
      },
      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
    cantidad.value = '';
    cash.value = '';
  }
})

$('#logout').on('click', function(){
  json_to_send = {

  };

  json_to_send = JSON.stringify(json_to_send)
  console.log(json_to_send)
  $.ajax({
    url: 'https://webproyectofinal.herokuapp.com/users/logout',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
    },
    error: function(error_msg) {
      alert((error_msg["responseText"]))
    }
  })
 // alert("Usuarios signed out");
     // console.log('success: '+ data);
     setTimeout(function(){ window.location = './index.html'; }, 300);
})