let todos = [{id: 1, title: "Task 1", completed: false}, {id: 2, title: "Task 2", completed: true},
  {id: 3, title: "Task 3", completed: false}, {id: 4, title: "Task 4", completed: true},];
export default function WorkingWithArrays(app) {
  // create必须要在：id的get请求定义之前，因为可能会把他当成id
  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });
  app.post("/lab5/todos", (req, res) => {
    const newTodo = {...req.body, id: new Date().getTime()};
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.get("/lab5/todos/:id", (req, res) => {
    const {id} = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });
  app.get("/lab5/todos", (req, res) => {
    const {completed} = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter(
        (t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });


  app.get("/lab5/todos/:id/delete", (req, res) => {
    const {id} = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    todos.splice(todoIndex, 1);
    res.json(todos);
  });
  app.delete("/lab5/todos/:id", (req, res) => {
    const {id} = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    // 进行错误的捕捉处理
    if (todoIndex === -1) {
      res.status(404).json({message: `Unable to delete Todo with ID ${id}`});
      return;
    }

    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });


  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const {id, title} = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });
  // 通过put请求来进行修改某一个todo
  app.put("/lab5/todos/:id", (req, res) => {
    const {id} = req.params;
    // 根据id锁定index，如果看不到index，那么就返回404
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({message: `Unable to update Todo with ID ${id}`});
      return;
    }

    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        // 复制老的属性的所有，然后用req.body覆盖所有包含了的属性
        return {...t, ...req.body};
      }
      return t;
    });
    // 与其返回所有的todos，这里只返回一个执行后的状态：是否成功
    res.sendStatus(200);
  });


  // 根据id得到todo，并且修改他的complete属性
  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const {completed} = req.params;
    const {id} = req.params;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const todo = todos.find((t) => t.id === parseInt(id));
      todo.completed = completedBool;
      res.json(todos);
      return;
    }
    res.json(todos);
  })
  // 同理，修改他的description属性
  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const {description} = req.params;
    const {id} = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);

  })


};
