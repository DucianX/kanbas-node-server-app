import Database from "../Database/index.js";
export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, assignment];
  return newAssignment;
}

// 定义：传入一个id，删除id在database里对应的assignment，返回状态
export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
}

// 定义：根据传入的id和修改过的assignment修改数据库里的assignment,并且返回修改过的assignment
export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find((assignment) => assignment._id === assignmentId);
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}
