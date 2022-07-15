const app = document.querySelector('#app')
const onePanel = "<div class='onePanel'></div>"
const twoPanel = `<div class="twoPanel" ondrop="drop(event)" ondragover="allowDrop(event)"></div>`

let todoList = []
let todoListText = []
let index = 0

app.insertAdjacentHTML('afterbegin', onePanel + twoPanel);

let btn = "<button id='btn'>Add TODO</button>"
let input = "<input id='add_todo' type='text' placeholder='Intup your todo' />"


document.querySelector('.onePanel').insertAdjacentHTML('afterbegin', input + btn + "    You can drag-and drop your todo")

let btn_1 = document.querySelector('#btn')
if (btn_1) {
    btn_1.addEventListener('click', function () {

        let inp = document.querySelector('#add_todo')
        if (inp && inp.value) {

            let obj = {
                id: index,
                value: inp.value,
            }

            todoList.push(obj)
            index++
            inp.value = ''

            createElementList()
        }
    })
}


function createElementList() {
    let listEl = ''

    for (let ob of todoList) {
        listEl += createEl(ob.id, ob.value)
    }
    document.querySelector('.twoPanel').innerHTML = listEl

    addCloseListener()

    addDivListener()
}


function createEl(id, value) {
    return `<div id="${id}" class="todo_class" draggable="true" ondragstart="drag(event)">
    <input id="ed_${id}" type="text" class="hide" value="${value}" />
    <span id="sp_${id}"  >${value}</span>
    <input id="cl_${id}" type="button"  value="X" />
    </div>`
}


function addCloseListener() {
    let inp = document.querySelectorAll("input[type='button']")

    inp.forEach(el => el.addEventListener('click', function (el) {

        let id = el.target.id.split('_')

        todoList = deleteEl(id[1])

        createElementList()

    }))

}

function deleteEl(id) {
    return todoList.filter(el => el.id != id)
}

function addDivListener() {
    let divArr = document.querySelectorAll('.todo_class')

    if (divArr) {

        divArr.forEach(el => el.addEventListener('click', (elm) => {
            let sp_id
            let ed_id

            if (elm.target.id.includes('_')) {

                sp_id = 'sp_' + elm.target.id.split('_')[1]
                ed_id = 'ed_' + elm.target.id.split('_')[1]
            } else {

                sp_id = 'sp_' + elm.target.id
                ed_id = 'ed_' + elm.target.id
            }

            document.getElementById(sp_id).classList.add('hide')
            document.getElementById(ed_id).classList.remove('hide')

            addEditListener(ed_id)
        }))
    }
}


function addEditListener(idEl) {
    let id = idEl.split('_')
    let sp_id = 'sp_' + id[1]
    let sp = document.getElementById(sp_id)
    document.getElementById(idEl).addEventListener('change', function (elm) {

        let vl = elm.target.value

        for (let i = 0; i < todoList.length; i++) {

            if (todoList[i].id == id[1]) {
                sp.innerText = vl;
                todoList[i].value = vl;
            }
        }
        sp.classList.remove('hide')

        document.getElementById(idEl).classList.add('hide')
    })
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}