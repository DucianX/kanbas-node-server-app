import * as dao from "./dao.js";
import * as coursesDao from "../Courses/dao.js";
import {deleteAssignment} from "./dao.js";
export default function AssignmentRoutes(app) {
  // 重点：从数据库返回的内容一定要async
  // 获得一个course的全部assignment
  app.get("/api/assignments/:courseId/assignments", async (req, res) => {
    const {courseId} = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // 创建一个新的assignment给当前的课程
  app.post("/api/assignments/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    console.log("新建作业接收:", assignment); // 打印返回值


    const newAssignment = await dao.createAssignment(assignment);
    console.log("新建作业返回:", newAssignment); // 打印返回值
    res.send(newAssignment);
  });

  // 删除一个assignment
  app.delete("/api/assignments/:assignmentId/assignments", async (req, res) => {
    const {assignmentId} = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.send(status);
  });

  // 编辑一个assignment,返回编辑成功与否
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const {assignmentId} = req.params;
    // 这是最新的assignment数据
    const assignmentUpdates = req.body;
    const status = await dao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  });
}

