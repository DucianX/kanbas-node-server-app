// DAO直接接触数据库，而Route决定了接收什么样的URL请求（客户端发出的HTTP通信协议）
// 对应着什么样的路径来调用DAO,接收dao返回的数据然后把这些内容放进app的回调函数(res.send or res.json)里面
// 并且，routes需要挂载到express的应用实例上面才能被识别处理
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });
  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });
  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params; // 从URL中解析的
    const module = {
      ...req.body,
      course: courseId, // 修改module的courseID属性
    };
    const newModule = modulesDao.createModule(module); // 用DataAccessObject的createModule函数，相信函数定义
    res.send(newModule); // 将新module返回
  });

}
