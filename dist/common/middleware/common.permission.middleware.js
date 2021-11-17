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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vbWlkZGxld2FyZS9jb21tb24ucGVybWlzc2lvbi5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLDZFQUE4RDtBQUU5RCxNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFFdkUsTUFBTSxvQkFBb0I7SUFDeEIsdUJBQXVCLENBQUMsc0JBQXNDO1FBQzVELE9BQU8sQ0FDTCxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQixFQUMxQixFQUFFO1lBQ0YsSUFBSTtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDckUsSUFBSSxtQkFBbUIsR0FBRyxzQkFBc0IsRUFBRTtvQkFDaEQsT0FBTyxJQUFJLEVBQUUsQ0FBQztpQkFDZjtnQkFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3hCO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1I7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUssa0NBQWtDLENBQ3RDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNyRSxJQUNFLEdBQUcsQ0FBQyxNQUFNO2dCQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUMzQztnQkFDQSxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFDRCxJQUFJLG1CQUFtQixHQUFHLDJDQUFjLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pELE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtZQUNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLG9CQUFvQixFQUFFLENBQUMifQ==