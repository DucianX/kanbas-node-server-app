// import Database from "../Database/index.js";
import model from "./model.js"
export async function findAssignmentsForCourse(courseId) {
  try {
    // 查询数据库，并打印查询结果
    const assignments = await model.find({ course: courseId }).exec();
    console.log("找到的作业:", assignments); // 确保查询结果是一个数组
    return assignments; // 返回查询结果
  } catch (error) {
    console.error("findAssignmentsForCourse 函数中的错误:", error);
    throw error; // 抛出错误以便调用方处理
  }
}

export function createAssignment(assignment) {
  delete assignment._id;
  // return model.create(assignment);
  const createdAssignment = model.create(assignment);
  console.log("创建的作业:", createdAssignment); // 打印插入结果
  return createdAssignment;
}

// 定义：传入一个id，删除id在database里对应的assignment，返回状态
export const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });


// 定义：根据传入的id和修改过的assignment修改数据库里的assignment,并且返回修改过的assignment
// export function updateAssignment(assignmentId, assignmentUpdates) {
//   const { assignments } = Database;
//   const assignment = assignments.find((assignment) => assignment._id === assignmentId);
//   Object.assign(assignment, assignmentUpdates);
//   return assignment;
// }
export const updateAssignment = (assignmentId, assignmentUpdates) => model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
