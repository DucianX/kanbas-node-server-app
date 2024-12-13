// DAO直接接触数据库，而Route决定了接收什么样的URL请求（客户端发出的HTTP通信协议）
// 对应着什么样的路径来调用DAO,接收dao返回的数据然后把这些内容放进app的回调函数(res.send or res.json)里面
// 并且，routes需要挂载到express的应用实例上面才能被识别处理
import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
export default function CourseRoutes(app) {
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params; // 从URL中解析的
    const module = {
      ...req.body,
      course: courseId, // 修改module的courseID属性
    };
    const newModule = await modulesDao.createModule(module); // 用DataAccessObject的createModule函数，相信函数定义
    res.send(newModule); // 将新module返回
  });

  app.post("/api/courses/getEnrolledCourses", async (req, res) => {
    const { userId } = req.body;
    const enrolledCourses = await dao.findCoursesForEnrolledUser(userId);
    res.send(enrolledCourses);
  });
}
