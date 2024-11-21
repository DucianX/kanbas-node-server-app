// DAO直接接触数据库，而Route决定了接收什么样的URL请求（客户端发出的HTTP通信协议）
// 对应着什么样的路径来调用DAO,接收dao返回的数据然后把这些内容放进app的回调函数(res.send or res.json)里面
// 并且，routes需要挂载到express的应用实例上面才能被识别处理
import * as dao from "./dao.js";
export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
}
