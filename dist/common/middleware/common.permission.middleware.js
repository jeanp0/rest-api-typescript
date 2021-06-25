"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const common_permissionflag_enum_1 = require("./common.permissionflag.enum");
const log = debug_1.default("app:common-permission-middleware");
class PermissionMiddleware {
    permissionFlagsRequired(requiredPermissionFlag) {
        return (req, res, next) => {
            try {
                console.log(res.locals.jwt.permissionFlags);
                const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
                if (userPermissionFlags & requiredPermissionFlag) {
                    return next();
                }
                res.status(403).send();
            }
            catch (e) {
                log(e);
            }
        };
    }
    onlySameUserOrAdminCanDoThisAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
            if (req.params &&
                req.params.userId &&
                req.params.userId === res.locals.jwt.userId) {
                return next();
            }
            if (userPermissionFlags & common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION) {
                return next();
            }
            res.status(403).send();
        });
    }
}
exports.default = new PermissionMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5wZXJtaXNzaW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFDMUIsNkVBQThEO0FBRTlELE1BQU0sR0FBRyxHQUFvQixlQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUV2RSxNQUFNLG9CQUFvQjtJQUN4Qix1QkFBdUIsQ0FBQyxzQkFBc0M7UUFDNUQsT0FBTyxDQUNMLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCLEVBQzFCLEVBQUU7WUFDRixJQUFJO2dCQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLG1CQUFtQixHQUFHLHNCQUFzQixFQUFFO29CQUNoRCxPQUFPLElBQUksRUFBRSxDQUFDO2lCQUNmO2dCQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDeEI7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDUjtRQUNILENBQUMsQ0FBQztJQUNKLENBQUM7SUFFSyxrQ0FBa0MsQ0FDdEMsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sbUJBQW1CLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3JFLElBQ0UsR0FBRyxDQUFDLE1BQU07Z0JBQ1YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNO2dCQUNqQixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQzNDO2dCQUNBLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtZQUNELElBQUksbUJBQW1CLEdBQUcsMkNBQWMsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekQsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNmO1lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksb0JBQW9CLEVBQUUsQ0FBQyJ9