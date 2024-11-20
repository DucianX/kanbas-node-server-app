// Routes（routes.js） 将DAO的数据操作暴露为 API 端点，并定义了如何处理前端发送的请求。
// routes在前端和dao之间，作为中间层MiddleTier。负责把前端的请求转换为对DAO的调用。把DAO的结果返回给前端

import * as dao from "./dao.js";
let currentUser = null;
export default function UserRoutes(app) {
  const createUser = (req, res) => { };
  const deleteUser = (req, res) => { };
  const findAllUsers = (req, res) => { };
  const findUserById = (req, res) => { };

  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    // 将需要更新的部分放在body里面一起传递给dao内的update方法
    dao.updateUser(userId, userUpdates);
    // 一旦完成，我将用id来获得新的user，并且返回
    currentUser = dao.findUserById(userId);
    res.json(currentUser);
  };
  const signup = (req, res) => {
    // 相信函数定义
    // 首先检查用户是否已经存在。
    const user = dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already in use" });
      return;
    }
    currentUser = dao.createUser(req.body);
    // 直接登录
    res.json(currentUser);
  };
  const signin = (req, res) => {
    const { username, password } = req.body;
    currentUser = dao.findUserByCredentials(username, password);
    res.json(currentUser);
  };
  const signout = (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  };


  // profile函数将当前的用户用route进行暴露：返回当前user
  const profile = async (req, res) => {
    res.json(currentUser);
  };


  // 这些是利用DAO可以进行的操作
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  // post接收两个函数，一个".../profile"是URL路径，当匹配时服务器会处理这个请求。
  // 第二个profile是回调函数，决定了服务器如何处理这个请求
  app.post("/api/users/profile", profile);
}
