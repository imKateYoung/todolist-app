//const { get } = require("node:http")

//const { text } = require("body-parser")

//const { response } = require("express")

const add = document.querySelector('#add-btn')
const completeItem = document.querySelectorAll('.complete')
const deleteBtn = document.querySelectorAll('.deleteBtn')
const item = document.querySelector('#item')
//console.log(item)

add.addEventListener('click', ()=> {
    if(item.value != ""){
        fetch('/addItem', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                item: item.value
            })
        }).then(response => {
            window.location.reload()
        })
    }
    else{
        alert("You need to write some stuff")
    }
 
})


function deleteTodo(event){
    const listItem = event.currentTarget.parentNode
    console.log('listitem'+listItem)
    const todoText = listItem.querySelector('.todotext').innerText
    console.log('delete'+todoText)
    fetch('/deleteItem', {
        method: 'delete',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            item: todoText
        })
    }).then(response => {
        window.location.reload()
    })
}
deleteBtn.forEach(element => {
    element.addEventListener('click',deleteTodo)
});

function completeTodo(event) {
    const listItem = event.currentTarget.parentNode
    console.log('complete'+listItem)
    const todoText = listItem.querySelector('.todotext').innerText
    console.log('todotext'+todoText)
    
    const completed = listItem.classList.contains('completeItem')
    console.log('completeitem'+completed)
    let path
    if(completed == false){
        path = '/markComplete'
    }
    else{
        path = '/unComplete'
    }
    console.log('path'+path)
    fetch(path, {
        method: 'put',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            item: todoText
        })
    }).then(response => {
        window.location.reload()
    })
    
}
completeItem.forEach(element => {
    element.addEventListener('click', completeTodo)
});