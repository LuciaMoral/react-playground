import create from "./http-service";

export interface User {
  id: number;
  name: string;
}

// class UserService {
//   getAllUsers() {
//     const controller = new AbortController();
//     const request = apiClient.get<User[]>("/users", {
//       signal: controller.signal,
//     });
//     return { request, cancel: () => controller.abort };
//   }
//   deleteUsers(id: number) {
//     return apiClient.delete("/users/" + id);
//   }
//   createUser(user: User) {
//     return apiClient.post("/users", user);
//   }
//   updateUser(user: User) {
//     return apiClient.patch("/users/" + user.id, user);
//   }
// }

export default create("/users");
