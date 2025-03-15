// script.js
const input = document.getElementById("input");
const list = document.getElementById("list");

async function addTask() {
    const taskObj = JSON.parse(await groq(input.value));
    console.log(taskObj.tasks);
    
    taskObj.tasks.forEach(task => {
        list.appendChild(createTaskTag(task));
    });
}

function createTaskTag(taskName) {
    const newLi = document.createElement('li');
    newLi.innerText = taskName;
    return newLi;
}

async function groq(prompt) {
    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions" ,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer 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",
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                response_format: {"type": "json_object"},
                messages: [
                    {
                        role: "user",
                        content: prompt + " give me array of string json format as { 'tasks': ['task1', 'task2']}",
                    },
                ],
            }),
        }
    );

    const body = await response.json();
    console.log(body.choices[0].message.content);
    return body.choices[0].message.content;
}