// Routes（routes.js） 将DAO的数据操作暴露为 API 端点，并定义了如何处理前端发送的请求。
// routes在前端和dao之间，作为中间层MiddleTier。负责把前端的请求转换为对DAO的调用。把DAO的结果返回给前端

import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
// let currentUser = null;
export default function UserRoutes(app) {
  // 因为涉及到了服务器的返回，我们需要把所有的函数设置为异步函数
  const createUser = (req, res) => {
  };
  const deleteUser = (req, res) => {
  };
  const findAllUsers = async (req, res) => {
    // 如果还包含了requery，那么进行过滤
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return; // 跳过下面的response
    }

    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = (req, res) => {
  };
// 和数据库的交流需要用async异步函数，await等待回传信息
  const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    // 将需要更新的部分放在body里面一起传递给dao内的update方法
    await dao.updateUser(userId, userUpdates);
    // 一旦完成，我将用id来获得新的user，并且返回
    const currentUser = await dao.findUserById(userId);
    // 同步更新session里的user
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signup = async(req, res) => {
    // 相信函数定义
    // 首先检查用户是否已经存在。
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        {message: "Username already in use"});
      return;
    }
    const currentUser = await dao.createUser(req.body);
    // 每一个不同的cookie将会有不同的session，每一个session里像hash一样记录下不同的currentUser（当前登录用户）
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = async(req, res) => {
    const {username, password} = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      // 如果能找到，就在session里面记录当前的user
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({message: "Unable to login. Try again later."});
    }

  };
  const signout = async (req, res) => {
    // 通过摧毁当前session来登出
    req.session.destroy();
    res.sendStatus(200);
  };


  // profile函数将当前的用户用route进行暴露：返回当前user
  const profile = async (req, res) => {
    // 声明局部变量，用session的cU赋值
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      // 如果找不到就返回错误
      res.sendStatus(401);
      return;
    }

    res.json(currentUser);
  };
  const findCoursesForEnrolledUser = async(req, res) => {
    let {userId} = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = await courseDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };
  // 因为希望确保创始人能够访问到课程，所以创建课程在users的上下文中进行
  // 课程定的标准：优先迁就user
  const createCourse = async(req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = await courseDao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  app.post("/api/users/current/courses", createCourse);


  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

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
