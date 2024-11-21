import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
  app.delete("/api/modules/:moduleId", async (req, res) => {
    const {moduleId} = req.params;
    // await 确保在数据库删除操作完成后，
    // 才执行后续的 res.send(status)。

    // 如果你不使用 await，那么代码会直接执行到下一行，
    // 可能还没等数据库删除完成就继续执行，
    // 这样返回给前端的 status 可能是错误的或未定义的
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status);
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    const {moduleId} = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });
  app.put("/api/modules/:moduleId", async (req, res) => {
    const {moduleId} = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status);
  });

}

