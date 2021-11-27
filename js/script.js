onload = () => {
    const inputTask = document.getElementById("inputTask")
    const btnAdd = document.getElementById("btnAdd")
    const btnClear = document.getElementById("btnClear")
    const listTasks = document.getElementById("listTasks")

    let tasks = []
    
    function showTasks(){
        if(localStorage.tasks != null){
            tasks = JSON.parse(localStorage.tasks)
            
            let li
            let checkbox
            let task 
            let divContent
            let br
            
            listTasks.innerHTML = ""

            for(i in tasks){
                task = document.createTextNode(tasks[i]["task"])

                li = document.createElement("li")
                li.setAttribute("class", "task")
                li.appendChild(task)

                checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.className = "checkbox"
                checkbox.setAttribute("value", tasks[i]["id"])
                checkbox.checked = tasks[i]["checkbox"]
                checkbox.onclick = function(){check(this)}

                divContent = document.createElement("div")
                divContent.className = "content"
                divContent.appendChild(checkbox)
                divContent.appendChild(li)

                br = document.createElement("br")

                listTasks.appendChild(divContent)
                listTasks.appendChild(br)
                
            }
            tasks = []
        }else{
            listTasks.innerHTML = ""
        }
    }
    
    function check(checkbox){
        if(checkbox.value){
            let id = parseInt(checkbox.value) - 1
            tasks = JSON.parse(localStorage.tasks)
            if(tasks[id]["checkbox"]){
                tasks[id]["checkbox"] = false
            }else{
                tasks[id]["checkbox"] = true
            }

            localStorage.tasks = JSON.stringify(tasks)
            showTasks()
        }
    }

    btnAdd.addEventListener("click", () => {
        if(inputTask.value != ""){
            if(localStorage.tasks != null){
                tasks = JSON.parse(localStorage.tasks)

                let task = {
                    "id": tasks.length + 1,
                    "checkbox": false,
                    "task": inputTask.value
                }

                tasks.push(task)
                localStorage.tasks = JSON.stringify(tasks)
            }else{
                let task = {
                    "id": 1,
                    "checkbox": false,
                    "task": inputTask.value
                }

                tasks.push(task)
                localStorage.tasks = JSON.stringify(tasks)
            }
            tasks = []
            inputTask.value = ""
            showTasks()
        }else{
            alert("Preecha o campo 'Adicionar Tarefa', para adicionar uma tarefa!")
        }
    })

    btnClear.addEventListener("click", () => {
        if(localStorage.tasks != null){
            localStorage.clear("tasks")
            inputTask.value = ""
            showTasks()
        }
    })

    showTasks()
}