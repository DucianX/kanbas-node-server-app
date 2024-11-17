const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};
const module = {
  id: "6",
  name: "Jinx",
  description: "Used to be named Powder",
  course: "None"
};
export default function WorkingWithObjects(app) {
  // assignment Routes
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });
  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore, 10);
    res.json(assignment);
  });
  app.get("/lab5/assignment/completed/:status", (req, res) => {
    const { status } = req.params;
    assignment.completed = status === "true";
    res.json(assignment);
  });


  // 通过get创造一个路由，当react访问这个URL的时候返回一个json
  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });
  app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
  });
  // 把newName从get请求的URL里解构出来，并且更新server端的moduleconst
  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  });

};
