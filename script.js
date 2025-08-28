const itemform=document.getElementById('item-form')
const iteminput=document.getElementById('item-input')
const itemlist=document.getElementById('item-list')


itemform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const itemvalue=iteminput.value;
    
    if(itemvalue.value ===''){
        alert("Please enter the item")
    }
    
    const item=document.createElement('li')
    const text=document.createTextNode(itemvalue)
    item.appendChild(text)
    const button=createButton("remove-item btn-link text-red")
    item.appendChild(button)
    itemlist.appendChild(item)
    iteminput.value=''
    
})

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






