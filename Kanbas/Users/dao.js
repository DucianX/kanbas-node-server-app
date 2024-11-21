// 本文件把对数据库的操作进行集中封装（高内聚High Cohesion：这个模块的功能紧密相关），这样在调用的时候就不用关心具体数据库的选型
// 若要切换数据库，只需要更改 dao.js 中的逻辑，而不需要修改与之交互的其他部分。（低耦合Low Coupling）
// 它的目的是让其他部分的代码（如服务或控制器）与数据存储层进行隔离，使得更改底层数据库的实现不会影响到应用程序的其他部分。
import db from "../Database/index.js";
// 从index.js导入db，并且赋值为users
let { users } = db;
export const createUser = (user) => (users = [...users, { ...user, _id: Date.now().toString() }]);
export const findAllUsers = () => users;
export const findUserById = (userId) => users.find((user) => user._id === userId);
export const findUserByUsername = (username) => users.find((user) => user.username === username);
export const findUserByCredentials = (username, password) =>
  users.find( (user) => user.username === username && user.password === password );
// 遍历，直到id符合条件的时候把对应的user直接换成传入的user数据
export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));

