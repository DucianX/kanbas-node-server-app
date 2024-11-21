import express from 'express';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import "dotenv/config";

const app = express()
// 验证请求里是否存在一个可以被解析为JsonObject的String
app.use(express.json());
// 所有的请求都会经过这里，cors里面配置了很多细节的东西。
// 使用cors，改为仅支持3000（react方面）的请求
app.use(cors({
    credentials: true,
    // 本地的时候：让端口在3000的运行；云端的时候：让netlify的运行
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  }
));
// 以下代码是session的设置，可以让express在session中存储一些数据
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

// session利用cookie作为key，分辨来自不同浏览器的请求，创建不同的session实例给他们
// app.use(session(...检查每一个传入的request，他们是否有cookie。若有，检查针对该cookie是否已经实例化了对象
// 如果还没有，就创建一个并且添加到request当中
app.use(
  session(sessionOptions)
);

// 将routes也添加进express里
UserRoutes(app);
CourseRoutes(app);
// EnrollmentRoutes(app);
Hello(app)
Lab5(app);
ModuleRoutes(app);

app.listen(process.env.PORT || 4000)

