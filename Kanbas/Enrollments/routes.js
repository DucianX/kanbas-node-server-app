import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/courses/:courseId/createEnrollment", (req, res) => {

    const {courseId} = req.params;
    const {userId} = req.body;

    dao.enrollUserInCourse(userId, courseId);
    res.send("Enrollment created successfully");
  })

  app.post("/api/courses/:courseId/deleteEnrollment", (req, res) => {

    const {courseId} = req.params;
    const {userId} = req.body;

    dao.deleteEnrollment(userId, courseId);
    res.send("Enrollment deleted successfully");
  })

  app.get("/api/courses/getEnrollments", (req, res) => {
    const enrollments = dao.fetchAllEnrollment();
    res.json(enrollments);
  })
}
