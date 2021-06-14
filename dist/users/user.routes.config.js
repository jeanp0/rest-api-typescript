"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const user_middleware_1 = __importDefault(require("./middleware/user.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const common_permission_middleware_1 = __importDefault(require("../common/middleware/common.permission.middleware"));
const common_permissionflag_enum_1 = require("../common/middleware/common.permissionflag.enum");
class UserRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "UsersRoutes");
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.permissionFlagsRequired(common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION), user_controller_1.default.list)
            .post(express_validator_1.body("email").isEmail(), express_validator_1.body("password")
            .isLength({ min: 5 })
            .withMessage("Must include password (5+ characters"), body_validation_middleware_1.default.verifyBodyFieldsErrors, user_middleware_1.default.validateSameEmailDoesntExist, user_controller_1.default.create);
        this.app.param("userId", user_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(user_middleware_1.default.validateUserExists, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction)
            .get(user_controller_1.default.getById)
            .delete(user_controller_1.default.removeById);
        this.app.put(`/users/:userId`, [
            express_validator_1.body("email").isEmail(),
            express_validator_1.body("password")
                .isLength({ min: 5 })
                .withMessage("Must include password (5+ characters"),
            express_validator_1.body("firstName").isString(),
            express_validator_1.body("lastName").isString(),
            express_validator_1.body("permissionFlags").isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            user_middleware_1.default.validateSameEmailBelongToSameUser,
            common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction,
            common_permission_middleware_1.default.permissionFlagsRequired(common_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION),
            user_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            express_validator_1.body("email").isEmail().optional(),
            express_validator_1.body("password")
                .isLength({ min: 5 })
                .withMessage("Must include password (5+ characters")
                .optional(),
            express_validator_1.body("firstName").isString().optional(),
            express_validator_1.body("lastName").isString().optional(),
            express_validator_1.body("permissionFlags").isInt().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            user_middleware_1.default.validatePatchEmail,
            common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction,
            common_permission_middleware_1.default.permissionFlagsRequired(common_permissionflag_enum_1.PermissionFlag.PAID_PERMISSION),
            user_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdXNlcnMvdXNlci5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHlFQUFvRTtBQUNwRSxpSEFBdUY7QUFDdkYsb0ZBQTJEO0FBQzNELG1GQUEwRDtBQUMxRCx5REFBeUM7QUFDekMsdUZBQThEO0FBQzlELHFIQUFxRjtBQUNyRixnR0FBaUY7QUFFakYsTUFBYSxVQUFXLFNBQVEseUNBQWtCO0lBQ2hELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLEdBQUcsQ0FDRix3QkFBYSxDQUFDLGNBQWMsRUFDNUIsc0NBQW9CLENBQUMsdUJBQXVCLENBQzFDLDJDQUFjLENBQUMsZ0JBQWdCLENBQ2hDLEVBQ0QseUJBQWMsQ0FBQyxJQUFJLENBQ3BCO2FBQ0EsSUFBSSxDQUNILHdCQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQ3ZCLHdCQUFJLENBQUMsVUFBVSxDQUFDO2FBQ2IsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ3BCLFdBQVcsQ0FBQyxzQ0FBc0MsQ0FBQyxFQUN0RCxvQ0FBd0IsQ0FBQyxzQkFBc0IsRUFDL0MseUJBQWMsQ0FBQyw0QkFBNEIsRUFDM0MseUJBQWMsQ0FBQyxNQUFNLENBQ3RCLENBQUM7UUFFSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUseUJBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQ0YseUJBQWMsQ0FBQyxrQkFBa0IsRUFDakMsd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLGtDQUFrQyxDQUN4RDthQUNBLEdBQUcsQ0FBQyx5QkFBYyxDQUFDLE9BQU8sQ0FBQzthQUMzQixNQUFNLENBQUMseUJBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM3Qix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN2Qix3QkFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDYixRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ3BCLFdBQVcsQ0FBQyxzQ0FBc0MsQ0FBQztZQUN0RCx3QkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUM1Qix3QkFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMzQix3QkFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFO1lBQy9CLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQyx5QkFBYyxDQUFDLGlDQUFpQztZQUNoRCxzQ0FBb0IsQ0FBQyxrQ0FBa0M7WUFDdkQsc0NBQW9CLENBQUMsdUJBQXVCLENBQzFDLDJDQUFjLENBQUMsZUFBZSxDQUMvQjtZQUNELHlCQUFjLENBQUMsR0FBRztTQUNuQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtZQUMvQix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDYixRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ3BCLFdBQVcsQ0FBQyxzQ0FBc0MsQ0FBQztpQkFDbkQsUUFBUSxFQUFFO1lBQ2Isd0JBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDdkMsd0JBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDdEMsd0JBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUMxQyxvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0MseUJBQWMsQ0FBQyxrQkFBa0I7WUFDakMsc0NBQW9CLENBQUMsa0NBQWtDO1lBQ3ZELHNDQUFvQixDQUFDLHVCQUF1QixDQUMxQywyQ0FBYyxDQUFDLGVBQWUsQ0FDL0I7WUFDRCx5QkFBYyxDQUFDLEtBQUs7U0FDckIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQTFFRCxnQ0EwRUMifQ==