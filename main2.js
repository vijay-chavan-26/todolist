const newTaskText = document.querySelector("#new-task");
const taskListContainer = document.querySelectorAll(".tasks");
const ulUncomTaskList = document.querySelector(".uncom-task-list");
const ulComTaskList = document.querySelector(".com-task-list")
const unCompletedTask = document.querySelector(".uncompleted-tasks")
const slogan = document.querySelector(".slogan")
const msg = document.querySelector(".msg");
let taskList=[];
let temp=[];

let unComLocalItem = JSON.parse(localStorage.getItem('uncomlocalitem'));
let comLocalItem = JSON.parse(localStorage.getItem('comlocalitem'));

showUncompletedTaskList(unComLocalItem);
showCompletedTaskList(comLocalItem);

// localStorage.clear()

// Function to Show Uncompleted task List
function showUncompletedTaskList(localItem){
    
    let outPut = '';
    if(localItem===null || localItem.length === 0){
        taskList = [];
        taskListContainer[0].style.visibility = "hidden";

    }else{
        taskList = localItem;
        taskListContainer[0].style.display = "block";
        const div = document.createElement("div")
        div.classList.add("uncompleted-tasks","tasks")
        div.innerHTML = `
        <h1 class="uncom-heading">Uncompleted Tasks</h1>
        <ul class="uncom-task-list task-list"></ul>`
    }
    taskList.forEach((data,index)=>{
        outPut = `
            <span class="sr-no">${index+1}.</span>
            <input type="text" class="task-text" value="${data}" readonly>
            <div class="buttons">
                <button class="btn save" style="display: none;">Save</button>
                <i class="fa-solid fa-pen-to-square btn edit"></i>
                <i class="fa-solid fa-circle-check btn done"></i>
            </div>`
        let newTaskLi = document.createElement("li")
        newTaskLi.classList.add(`task${index+1}`, "task")
        newTaskLi.innerHTML = outPut;
        ulUncomTaskList.append(newTaskLi);
    })
}

// Function to Show Completed task List
function showCompletedTaskList(localItem){
    
    let outPut = '';
    if(localItem===null || localItem.length === 0){
        taskList = [];
        taskListContainer[1].style.visibility = "hidden";

    }else{
        taskList = localItem;
        taskListContainer[1].style.display = "block";
        const div = document.createElement("div")
        div.classList.add("completed-tasks","tasks")
        div.innerHTML = `
        <h1 class="com-heading">Completed Tasks</h1>
        <ul class="com-task-list task-list"></ul>`
    }

    taskList.forEach((data,index)=>{
        outPut = `
            <span class="sr-no">${index+1}.</span>
            <input type="text" class="task-text" value="${data}" readonly>
        <div class="buttons">
        <i class="fa-solid fa-trash-can btn remove"></i>
        </div>`
        let newTaskLi = document.createElement("li")
        newTaskLi.classList.add(`task${index+1}`, "task")
        newTaskLi.innerHTML = outPut;
        ulComTaskList.append(newTaskLi);
    })
}

// Function to Sumbit the Task from input field by user 
function addTask(e){
    e.preventDefault();

    // if user enters something in input field and
    // if it enters nothing and try to submit task then page will refresh
    if(newTaskText.value.trim()!==''){
        console.log(e.target)
        localItem = JSON.parse(localStorage.getItem('uncomlocalitem'));
        if(localItem===null){
            taskList = [];
        }else{
            taskList = localItem;
        }
        taskList.push(newTaskText.value.trim())
        localStorage.setItem('uncomlocalitem', JSON.stringify(taskList))

        location.reload()
        // showTaskList();
        
    }else{
        msg.style.color = "red"
        msg.textContent = "Please Enter Something";
    }
    setTimeout(()=>{
        msg.textContent = "";
    },4000)
    newTaskText.value = '';
}

// Adding submit  event to form on pressing enter or button
const newTaskForm = document.querySelector("#new-task-form");
newTaskForm.addEventListener("submit", addTask);

// Adding Events to Uncompleted task list Buttons
ulUncomTaskList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("done")){
        const targetText = e.target.parentNode.previousElementSibling;
        const targetElement = e.target.parentNode.parentNode;

        let text = targetText.previousElementSibling.textContent
        let letr = text.indexOf(".");
        // console.log(letr)
        
        let index = text.slice(0,letr)-1;
        // console.log(index)
        text = targetText.value

        temp = JSON.parse(localStorage.getItem('uncomlocalitem'));
        temp.splice(index,1);
        localStorage.setItem("uncomlocalitem", JSON.stringify(temp))

        
        localItem = JSON.parse(localStorage.getItem('comlocalitem'));
        if(localItem===null){
            taskList = [];
        }else{
            taskList = localItem;
        }
        
        console.log(taskList)
        taskList.push(text)
        localStorage.setItem("comlocalitem", JSON.stringify(taskList))

        // console.log(letr)
        // console.log(text)
        targetElement.remove();
        location.reload()
    }

    if(e.target.classList.contains("edit")){
        // console.log("Edit Pressed")
        const targetText = e.target.parentNode.previousElementSibling;
        // const currentTarget = e.target
        targetText.readOnly = false
        targetText.style.backgroundColor = "white"
        targetText.style.outline = "auto"
        e.target.style.display = "none"
        e.target.nextElementSibling.style.display = "none"
        // console.log()
        e.target.previousElementSibling.style.display = "inline"
        
        let end = targetText.value.length
        targetText.setSelectionRange(end,end);
        targetText.focus();
        // let targetValue = targetText.value
        // console.log(currentTarget.previousElementSibling)
    }
    if(e.target.classList.contains("save")){
        const targetText = e.target.parentNode.previousElementSibling;
        let text = targetText.previousElementSibling.textContent
        let letr = text.indexOf(".");
        // console.log(letr)
        
        let index = text.slice(0,letr)-1;
        text = targetText.value

        temp = JSON.parse(localStorage.getItem('uncomlocalitem'));
        temp.splice(index,1,text);
        // console.log(temp)

        localStorage.setItem("uncomlocalitem", JSON.stringify(temp))

        targetText.readOnly = true;
        targetText.style.backgroundColor = "inherit"
        e.target.nextElementSibling.style.display = "inline"
        e.target.nextElementSibling.nextElementSibling.style.display = "inline"
        targetText.style.outline = "none"
        e.target.style.display = "none"
        // console.log(e.target)

    }
})

// Adding Events to Completed task list Buttons
ulComTaskList.addEventListener("click",(e)=>{
    if(e.target.classList.contains("remove")){
        const targetText = e.target.parentNode.previousElementSibling;
        const targetElement = e.target.parentNode.parentNode;
        // console.log(targetText.value)


        let text = targetText.previousElementSibling.textContent
        let letr = text.indexOf(".");
        // console.log(letr)
        
        let index = text.slice(0,letr)-1;
        // console.log(index)
        text = targetText.value

        temp = JSON.parse(localStorage.getItem('comlocalitem'));
        temp.splice(index,1);
        localStorage.setItem("comlocalitem", JSON.stringify(temp))


        // console.log(index)
        // console.log(text)
        targetElement.remove();
        location.reload()
    }
})

let sloganData = ["Opportunities don't happen, You create them.", "Don't be afraid to give up the good, to go for the great.", "Don't let the fear of losing be greater than the excitement of winning.", "Nothing is impossible. The word itself says 'I'm possible!'", "You are never too old to set another goal or to dream a new dream.", "All our dreams can come true, if we have the courage to pursue them.", "The secret of getting ahead is getting started.", "If people are doubting how far you can go, go so far that you can't hear them anymore.", "Do one thing every day that scares you.", "You can either experience the pain of discipline or the pain of regret. The choice is yours.", "One day or day one. You decide.", "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", "Some people want it to happen, some wish it would happen, others make it happen.", "Great things are done by a series of small things brought together.", "If you believe it'll work out, you'll see opportunities. If you don’t believe it'll work out, you'll see obstacles.", "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", "Hard work beats talent when talent doesn't work hard.", "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.", "If you work on something a little bit every day, you end up with something that is massive.", "Sometimes when you're in a dark place you think you've been buried but you've actually been planted.", "Don't limit your challenges. Challenge your limits.", "Start where you are. Use what you have. Do what you can.", "Every champion was once a contender that didn’t give up.", "Doubt kills more dreams than failure ever will.", "Today is your opportunity to build the tomorrow you want.", "You don’t need to see the whole staircase, just take the first step.", "Don’t tell everyone your plans, instead show them your results.", "You never know what you can do until you try."];

console.log(sloganData.length)
// slogan.textContent = sloganData[Math.floor(Math.random()*29)]; 


const id = setInterval(()=>{
    let random = Math.floor(Math.random()*29);
    slogan.textContent = sloganData[random]; 
    console.log(sloganData[random])
},20000)

const date = new Date()
console.log(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`)
console.log(`${date.getHours()%12}-${date.getMinutes()}-${date.getSeconds()}`)
