var responseData=[];
function showList() {
  // jQuery cross domain ajax
  $.ajax({
    headers: { Accept: "application/json" },
    type: "GET",
    url: "https://jsonplaceholder.typicode.com/todos?userId=1",
    crossDomain: true,
    beforeSend: function (xhr) {
      xhr.withCredentials = true;
    },
    success: function (data, textStatus, request) {
        //saving in global variable
        responseData=data;
        var str = ''
        data.forEach(function(item) {
        str += "<li onclick=checkItem(this,"+item.id+")>"+item.title+"<span class='close' onclick='deleteItem(this,"+item.id+")'>x</span></li>";
        }); 

        document.getElementById("myUL").innerHTML = str;
    },

  });
}
showList();

function performSignIn() {
  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  headers.append("Access-Control-Allow-Origin", "*");
  headers.append("Access-Control-Allow-Credentials", "true");

  headers.append("GET", "OPTIONS");

  fetch(sign_in, {
    //mode: 'no-cors',
    credentials: "include",
    method: "POST",
    headers: headers,
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.log("Authorization failed : " + error.message));
}

function deleteItem(source, id) {
  //TODO Make AJAX call to delete the Item
$.ajax({
    type: "DELETE",
    url: 'https://jsonplaceholder.typicode.com/todos/' + id,
    crossDomain: true,
    success: function (data) {
       console.log("Item Deleted Successfully")
    },

  });
}

// Add a "checked" symbol when clicking on a list item
function checkItem(ev, id) {
    //filter all data with id
    const item = responseData.filter(
        (x) => x.id ==id
      );
    var newitem ={
        userId: item[0].userId,
        title: item[0].title,
        completed: true,
        id: item[0].id
      };

    //TODO Make AJAX call to update the Item on the Webservice
    $.ajax({
        type: "PUT",
        url: "https://jsonplaceholder.typicode.com/todos",
        data: JSON.stringify(newitem),
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        success: function(data){alert(data);},
        error: function(errMsg) {
            alert(errMsg);
        }
    });
  ev.classList.toggle("checked");
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  let inputValue = document.getElementById("myInput").value;
  if (inputValue === "") {
    alert("You must write something!");
  } else {
    //TODO: make AJAX call to create item on the API
    var item ={
        userId: 1,
        title: inputValue,
        completed: false
      };
      $.ajax({
        type: "POST",
        url: "https://jsonplaceholder.typicode.com/todos",
        data: JSON.stringify(item),
        crossDomain: true,
        contentType: "application/json",
        dataType: "json",
        success: function(data){alert(data);},
        error: function(errMsg) {
            alert(errMsg);
        }
    });
    let newItem = `<li onclick="checkItem(this)">${inputValue} <span class="close" onclick="deleteItem(this)">x</span></li>`;
    document.getElementById("myUL").innerHTML += newItem;
  }
  document.getElementById("myInput").value = "";
}
