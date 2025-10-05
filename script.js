const itemform=document.getElementById('item-form')
const iteminput=document.getElementById('item-input')
const itemlist=document.getElementById('item-list')
const clearAll=document.getElementById('clear')
const filter=document.getElementById('filter')
let isEditMode=false;
const formBtn=itemform.querySelector('button')

itemform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const itemvalue=iteminput.value;
    
    if(itemvalue.value === ''){
        alert("Please enter the item")
        return;
    }
    if(isEditMode){
        const itemToEdit=itemlist.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode=false;

    }
    else{
        if(checkItemExists(itemvalue)){
            alert('That item already Exists');
            return;
        }
    }
    addItemToDom(itemvalue);
    addItemToStorage(itemvalue)
    
    UI()
    
    
})

function addItemToDom(itemvalue){
     const item=document.createElement('li')
    const text=document.createTextNode(itemvalue)
    item.appendChild(text)
    const button=createButton("remove-item btn-link text-red")
    item.appendChild(button)
    itemlist.appendChild(item)
     iteminput.value = '';
  

}
function checkItemExists(item){
    const itemsFromStorage=getItemsFromStorage();
    return itemsFromStorage.includes(item);

}
function addItemToStorage(item){
const itemFromStorage = getItemsFromStorage();

itemFromStorage.push(item)


localStorage.setItem('items',JSON.stringify(itemFromStorage))
}


function getItemsFromStorage(){
    let itemFromStorage ;
    if(localStorage.getItem('items')=== null){
    itemFromStorage=[];

}
else{
    itemFromStorage=JSON.parse(localStorage.getItem('items'));
}
return itemFromStorage;

}

function DisplayItems(){
    let itemFromStorage = getItemsFromStorage();
    itemFromStorage.forEach(item=>addItemToDom(item)) 
}
function createButton(classes){
    const button=document.createElement('button')
    button.className=classes
   

    const icon=createicon("fa-solid fa-xmark")
    button.appendChild(icon)

     return button;
}

function createicon(classs){
    const icon=document.createElement('i')
    icon.className=classs
    return icon;
}
function onclickitem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        
        removeitem(e.target.parentElement.parentElement)
        }
        else{
            setEditItem(e.target)
        }
    }






function removeitem(item){
        //remove item from dom
        if(confirm("Are you Sure")){
        item.remove()

        //remove item from local storage
        removeItemFromStorage(item.textContent)
          
    }
    UI()

}
function removeItemFromStorage(item){
    let itemsFromStorage=getItemsFromStorage();
    //filter out item to be removed
    itemsFromStorage=itemsFromStorage.filter((i)=> i !== item)
    //re set item in local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage))

    


}

function setEditItem(item){
    isEditMode=true;
    itemlist.querySelectorAll('li').forEach((i)=> i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML='<i class="fa-solid fa-pen"></i> update item';
    formBtn.style.backgroundColor="#228B22";
    iteminput.value=item.textContent;
    

}

function clearall(){
    while(itemlist.firstChild){
            itemlist.removeChild(itemlist.firstChild);

    }
    //clear from localstorage
    localStorage.removeItem('items');
    UI()

}

function filteritems(e){
    const items=itemlist.querySelectorAll('li');
    const text=e.target.value.toLowerCase();
    
    items.forEach((item)=>{
        const itemtext=item.firstChild.textContent.toLowerCase()
        if(itemtext.indexOf(text) !== -1){
            item.style.display='flex'
        }
        else{
            item.style.display='none'
        }
        })


}

function UI(){
    iteminput.value='';

    const items=itemlist.querySelectorAll('li')
    if(items.length === 0){
        clearAll.style.display='none'
        filter.style.display='none'
    }
    else{
         clearAll.style.display='block'
        filter.style.display='block'
    }
    formBtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor='#333'
    isEditMode=false;


}
itemlist.addEventListener('click',onclickitem)
clearAll.addEventListener('click',clearall)
filter.addEventListener('input',filteritems)
document.addEventListener('DOMContentLoaded',DisplayItems)
UI()









