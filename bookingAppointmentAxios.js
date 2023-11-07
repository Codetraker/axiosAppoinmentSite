let form = document.getElementById('formApp');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let phoneInput = document.getElementById('phone');
let itemList = document.getElementById('itemlist');

window.addEventListener("DOMContentLoaded",() =>{
  axios.get("https://crudcrud.com/api/83fed4bff44a4c54a01caa3af7228fd1/appointmentData")
  .then((response) =>{
    console.log(response)
  })
  .catch((error)=>{
    console.log(error);
  })
})

form.addEventListener('submit',addInLocal);

function addInLocal(e){
    e.preventDefault();
    
    let myData = {
        name : nameInput.value,
        email : emailInput.value,
        phone : phoneInput.value
    };
    let myData_serialized = JSON.stringify(myData);
    localStorage.setItem(myData.name , myData_serialized );
    
    axios.post("https://crudcrud.com/api/83fed4bff44a4c54a01caa3af7228fd1/appointmentData", myData)
    .then((response)=>{
      console.log(response)
    })
    .catch((err)=>{
      console.log(err)
    })

    
    let myData_deserialized = JSON.parse(localStorage.getItem(myData.name));

    let newUl = document.getElementById('itemlist')
    let newList = document.createElement('li');
    newList.className = 'items';
    let textNode = document.createTextNode(`Name:- ${myData_deserialized.name} - Email Id:- ${myData_deserialized.email} - Mob:- ${myData_deserialized.phone}`);

    //add delete button here
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.setAttribute('data-name', myData.name);
    deleteBtn.addEventListener('click', removeItem); 

    let editBtn = document.createElement('button');
    editBtn.className = 'edit-button edit';
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.setAttribute('data-name', myData.name);
    editBtn.addEventListener('click', editItem);

    newList.appendChild(textNode);
    newList.appendChild(deleteBtn);
    newList.appendChild(editBtn);
    itemList.appendChild(newList); 
    
}


// Remove item
function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        let name = li.querySelector('.delete').getAttribute('data-name'); 
        localStorage.removeItem(name);
        itemList.removeChild(li);
      }
    }
  }

  // Edit item
function editItem(e) {
    let name = e.target.getAttribute('data-name');
    let data = JSON.parse(localStorage.getItem(name));
    nameInput.value = data.name;
    emailInput.value = data.email;
    phoneInput.value = data.phone;

    localStorage.removeItem(name);
    let li = e.target.parentElement;
    itemList.removeChild(li);
}

