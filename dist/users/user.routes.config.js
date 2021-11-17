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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXJzL3VzZXIucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx5RUFBb0U7QUFDcEUsaUhBQXVGO0FBQ3ZGLG9GQUEyRDtBQUMzRCxtRkFBMEQ7QUFDMUQseURBQXlDO0FBQ3pDLHVGQUE4RDtBQUM5RCxxSEFBcUY7QUFDckYsZ0dBQWlGO0FBRWpGLE1BQWEsVUFBVyxTQUFRLHlDQUFrQjtJQUNoRCxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixHQUFHLENBQ0Ysd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHVCQUF1QixDQUMxQywyQ0FBYyxDQUFDLGdCQUFnQixDQUNoQyxFQUNELHlCQUFjLENBQUMsSUFBSSxDQUNwQjthQUNBLElBQUksQ0FDSCx3QkFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUN2Qix3QkFBSSxDQUFDLFVBQVUsQ0FBQzthQUNiLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNwQixXQUFXLENBQUMsc0NBQXNDLENBQUMsRUFDdEQsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLHlCQUFjLENBQUMsNEJBQTRCLEVBQzNDLHlCQUFjLENBQUMsTUFBTSxDQUN0QixDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLHlCQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUNGLHlCQUFjLENBQUMsa0JBQWtCLEVBQ2pDLHdCQUFhLENBQUMsY0FBYyxFQUM1QixzQ0FBb0IsQ0FBQyxrQ0FBa0MsQ0FDeEQ7YUFDQSxHQUFHLENBQUMseUJBQWMsQ0FBQyxPQUFPLENBQUM7YUFDM0IsTUFBTSxDQUFDLHlCQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0Isd0JBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsd0JBQUksQ0FBQyxVQUFVLENBQUM7aUJBQ2IsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNwQixXQUFXLENBQUMsc0NBQXNDLENBQUM7WUFDdEQsd0JBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsd0JBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDM0Isd0JBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMvQixvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0MseUJBQWMsQ0FBQyxpQ0FBaUM7WUFDaEQsc0NBQW9CLENBQUMsa0NBQWtDO1lBQ3ZELHNDQUFvQixDQUFDLHVCQUF1QixDQUMxQywyQ0FBYyxDQUFDLGVBQWUsQ0FDL0I7WUFDRCx5QkFBYyxDQUFDLEdBQUc7U0FDbkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDL0Isd0JBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDbEMsd0JBQUksQ0FBQyxVQUFVLENBQUM7aUJBQ2IsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNwQixXQUFXLENBQUMsc0NBQXNDLENBQUM7aUJBQ25ELFFBQVEsRUFBRTtZQUNiLHdCQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLHdCQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3RDLHdCQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDMUMsb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLHlCQUFjLENBQUMsa0JBQWtCO1lBQ2pDLHNDQUFvQixDQUFDLGtDQUFrQztZQUN2RCxzQ0FBb0IsQ0FBQyx1QkFBdUIsQ0FDMUMsMkNBQWMsQ0FBQyxlQUFlLENBQy9CO1lBQ0QseUJBQWMsQ0FBQyxLQUFLO1NBQ3JCLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUExRUQsZ0NBMEVDIn0=