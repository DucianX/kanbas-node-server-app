import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/courses/:courseId/createEnrollment", (req, res) => {

    const {courseId} = req.params;
    const {userId} = req.body;
    console.log("Received courseId:", courseId, "userId:", userId);

    dao.enrollUserInCourse(userId, courseId);
    res.send("Enrollment created successfully");
  })
}
