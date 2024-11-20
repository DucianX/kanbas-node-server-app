import express from 'express';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
const app = express()
// 验证请求里是否存在一个可以被解析为JsonObject的String
app.use(express.json());
// 所有的请求都会经过这里，cors里面配置了很多细节的东西。
// 使用cors，默认是允许所有跨domains的请求
app.use(cors());
// 将routes也添加进express里
UserRoutes(app);


Hello(app)
Lab5(app);

app.listen(process.env.PORT || 4000)

