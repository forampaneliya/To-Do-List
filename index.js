const express = require("express")
const port = 3334;

const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded())

let ToDo = [
    {
        id: 1,
        title: "Demo todo",
        task: "A to-do list is a list of tasks that need"
    }
   
]
let completetask = []


app.get("/", (req, res) => {
    res.render("todo", { ToDo: ToDo, completetask: completetask })
})
app.post("/addtask", (req, res) => {
    let { id, title, task } = req.body;
    let newObj = {
        id,
        title,
        task
    }
    ToDo.push(newObj)
    return res.redirect("/")
})
app.get("/completedata/:id", (req, res) => {
    console.log(req.params.id);
    res.redirect("/")
    let result = ToDo.filter((val, i) => {
        if (req.params.id == i) {
            return val
        }

    })
    ToDo = ToDo.filter((val, i) => {
        return i != req.params.id
    })
    console.log(result[0]);
    completetask.push(result[0])
})
app.get("/deleteData/:id", (req, res) => {
    let id = req.params.id;
    ToDo.splice(id, 1)
    res.redirect("/")
})
app.get("/deletetask/:id", (req, res) => {
    let id = req.params.id;
    completetask.splice(id, 1)
    res.redirect("/")

})
app.get("/editdata/:id", (req, res) => {
    let id = req.params.id;
    let data = ToDo.find((val, ind) => {
        return val.id == id
        // res.render("editdata", { data: data })

    })
    res.render("editdata", { data: data })
})

app.post("/editdata/:id", (req, res) => {
    let id = req.params.id;
    let { title, task } = req.body;
    ToDo.filter((v, ind) => {
        if (v.id == id) {
            v.title = title;
            v.task = task;
        }
        return v
    })
    return res.redirect("/")

})


app.listen(port, (err) => {
    if (err) {
        console.log("server not start");

    }
    else {
        console.log(`Server is started on http://localhost:${port}`);

    }
})