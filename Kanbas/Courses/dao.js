// 用这个data access project来获得database里面所有的courses
// DAO的理解：类似于java的get等方法，暴露了API，充当数据库和客户端之间的桥梁
// 如果数据库更改，客户端的业务逻辑不需要更改，只需要更改DAO的implementation
// 提供了一种【集中】管理所有数据访问逻辑的方式
// import Database from "../Database/index.js";
import model from "./model.js";

export function findAllCourses() {
  return model.find();
}

export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) => // 遍历所有课程，返回的是符合条件的课程
    // some方法：检查数组中的至少一个元素是否满足指定条件，如果是，返回True
    // 这里和course的属性做了结合，找到符合userID并且符合courseID的enrollment，就返回True
    enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
  return enrolledCourses;
}
export async function createCourse(course)  {
  delete course._id;
  return await model.create(course);
  // const newCourse = { ...course, _id: Date.now().toString() };
  // Database.courses = [...Database.courses, newCourse];
  // return newCourse;
}

// 旧的方法，从本地读取的数据
// export function deleteCourse(courseId) {
//   const { courses, enrollments } = Database;
//   Database.courses = courses.filter((course) => course._id !== courseId);
//   Database.enrollments = enrollments.filter(
//     (enrollment) => enrollment.course !== courseId
//   );}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export async function updateCourse(courseId, courseUpdates)  {
  return await model.updateOne({ _id: courseId }, { $set: courseUpdates });

  // const { courses } = Database;
  // const course = courses.find((course) => course._id === courseId);
  // Object.assign(course, courseUpdates);
  // return course;
}
