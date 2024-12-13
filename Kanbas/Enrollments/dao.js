import Database from "../Database/index.js";
// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: Date.now().toString(), user: userId.toString(), course: courseId.toString() });
// }
//
// export function deleteEnrollment(userId, courseId) {
//   const { enrollments } = Database;
//   Database.enrollments = enrollments.filter(
//     // filter=>后面的是符合留下来的条件的元素
//     (enrollment) => enrollment.user!== userId || enrollment.course!== courseId
//   );
// }
//

import model from "./model.js";
export function fetchAllEnrollment() {
  const { enrollments } = Database;
  return enrollments
  // return model.find()
}
// 函数定义：给一个courseid，返回对应该id的课程数组
export async function findCoursesForUser(userId) {
  // populate方法用userId找到Id referenced的course，map操作打开enrollment并且返回仅包含courses的新数组
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

