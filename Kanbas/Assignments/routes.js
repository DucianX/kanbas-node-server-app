import * as dao from "./dao.js";
import * as coursesDao from "../Courses/dao.js";
import {deleteAssignment} from "./dao.js";
export default function AssignmentRoutes(app) {

  // 获得一个course的全部assignment
  app.get("/api/assignments/:courseId/assignments", (req, res) => {
    const {courseId} = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // 创建一个新的assignment给当前的课程
  app.post("/api/assignments/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = dao.createAssignment(assignment);
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

