"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const user_middleware_1 = __importDefault(require("./middleware/user.middleware"));
class UserRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "UsersRoutes");
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(user_controller_1.default.list)
            .post(user_middleware_1.default.validateRequiredBodyFields, user_middleware_1.default.validateSameEmailDoesntExist, user_controller_1.default.create);
        this.app.param("userId", user_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(user_middleware_1.default.validateUserExists)
            .get(user_controller_1.default.getById)
            .delete(user_controller_1.default.removeById);
        this.app.put(`/users/:userId`, [
            user_middleware_1.default.validateRequiredBodyFields,
            user_middleware_1.default.validateSameEmailBelongToSameUser,
            user_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            user_middleware_1.default.validatePatchEmail,
            user_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXNlcnMvdXNlci5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlFQUFvRTtBQUNwRSxvRkFBMkQ7QUFDM0QsbUZBQTBEO0FBRTFELE1BQWEsVUFBVyxTQUFRLHlDQUFrQjtJQUNoRCxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixHQUFHLENBQUMseUJBQWMsQ0FBQyxJQUFJLENBQUM7YUFDeEIsSUFBSSxDQUNILHlCQUFjLENBQUMsMEJBQTBCLEVBQ3pDLHlCQUFjLENBQUMsNEJBQTRCLEVBQzNDLHlCQUFjLENBQUMsTUFBTSxDQUN0QixDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLHlCQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUFDLHlCQUFjLENBQUMsa0JBQWtCLENBQUM7YUFDdEMsR0FBRyxDQUFDLHlCQUFjLENBQUMsT0FBTyxDQUFDO2FBQzNCLE1BQU0sQ0FBQyx5QkFBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQzdCLHlCQUFjLENBQUMsMEJBQTBCO1lBQ3pDLHlCQUFjLENBQUMsaUNBQWlDO1lBQ2hELHlCQUFjLENBQUMsR0FBRztTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtZQUMvQix5QkFBYyxDQUFDLGtCQUFrQjtZQUNqQyx5QkFBYyxDQUFDLEtBQUs7U0FDckIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQXBDRCxnQ0FvQ0MifQ==