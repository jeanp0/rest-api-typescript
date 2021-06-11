"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const user_service_1 = __importDefault(require("../../users/services/user.service"));
const argon2 = __importStar(require("argon2"));
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("app:auth-middleware");
class AuthMiddleware {
    verifyUserPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.default.getUserByEmailWithPassword(req.body.email);
            if (user) {
                const passwordHash = user.password;
                if (yield argon2.verify(passwordHash, req.body.password)) {
                    req.body = {
                        userId: user._id,
                        email: user.email,
                        permissionFlags: user.permissionFlags,
                    };
                    return next();
                }
            }
            // Giving the same message in both cases
            // helps protect against cracking attempts:
            res.status(400).send({ errors: ["Invalid email and/or password"] });
        });
    }
}
exports.default = new AuthMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vYXV0aC9taWRkbGV3YXJlL2F1dGgubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxRkFBNEQ7QUFDNUQsK0NBQWlDO0FBQ2pDLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsZUFBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFFMUQsTUFBTSxjQUFjO0lBQ1osa0JBQWtCLENBQ3RCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLElBQUksR0FBUSxNQUFNLHNCQUFXLENBQUMsMEJBQTBCLENBQzVELEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUNmLENBQUM7WUFDRixJQUFJLElBQUksRUFBRTtnQkFDUixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxJQUFJLE1BQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDeEQsR0FBRyxDQUFDLElBQUksR0FBRzt3QkFDVCxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUc7d0JBQ2hCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzt3QkFDakIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO3FCQUN0QyxDQUFDO29CQUNGLE9BQU8sSUFBSSxFQUFFLENBQUM7aUJBQ2Y7YUFDRjtZQUNELHdDQUF3QztZQUN4QywyQ0FBMkM7WUFDM0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RSxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksY0FBYyxFQUFFLENBQUMifQ==