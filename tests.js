// const user = {
//   id: "1",
//   email: "jeanpi3rm@gmail.com",
//   password: "123",
//   firstName: "jeanpier",
//   lastname: "mendoza",
//   permissionLevel: 1,
// };

// const currentUser = {
//   id: "1",
//   email: "jeanpi3rm@gmail.com",
//   password: "123",
//   firstName: "jeanpier",
//   permissionLevel: 1,
// };

// const allowedPatchFields = [
//   "password",
//   "firstName",
//   "lastName",
//   "permissionLevel",
// ];

// console.log("old current: ", currentUser);
// for (let field of allowedPatchFields) {
//   if (field in user) {
//     console.log(field + " updated");
//     // @ts-ignore
//     currentUser[field] = user[field];
//   }
// }
// console.log("new current: ", currentUser);

// const array = [1, 2, 3];
// console.log(array[-1]);

const buffer = Buffer.from("a");
console.log(buffer);
