import Database from "../Database/index.js";
import model from "./model.js";

export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
  // const { modules } = Database;
  // return modules.filter((module) => module.course === courseId);
}
export function createModule(module) {
  delete module._id
  return model.create(module);
  // const newModule = { ...module, _id: Date.now().toString() };
  // Database.modules = [...Database.modules, newModule];
  // return newModule;
}
// 移除当前数据库里和传入id相符的module
export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });

  // const { modules } = Database;
  // Database.modules = modules.filter((module) => module._id !== moduleId);
}
export function updateModule(moduleId, moduleUpdates) {
  return model.updateOne({ _id: moduleId }, moduleUpdates);
  // const { modules } = Database;
  // const module = modules.find((module) => module._id === moduleId);
  // Object.assign(module, moduleUpdates); // 将moduleUpdates里面所有的属性赋值给module
  // return module;
}

