import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now().toString(), user: userId.toString(), course: courseId.toString() });
}

export function deleteEnrollment(userId, courseId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    // filter=>后面的是符合留下来的条件的元素
    (enrollment) => enrollment.user!== userId || enrollment.course!== courseId
  );
}

export function fetchAllEnrollment() {
  const { enrollments } = Database;
  return enrollments
}
