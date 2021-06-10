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
const user_service_1 = __importDefault(require("../services/user.service"));
const log = debug_1.default("app:users-controller");
class UserMiddleware {
    constructor() {
        // Hwew we need to use and arrow function to bind 'this' correctly
        this.validatePatchEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.email) {
                log("Validating email ", req.body.email);
                this.validateSameEmailBelongToSameUser(req, res, next);
            }
            else {
                next();
            }
        });
    }
    validateRequiredBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.email && req.body.password) {
                next();
            }
            else {
                res.status(400).send({
                    error: `Missing required fields email and/or password`,
                });
            }
        });
    }
    validateSameEmailDoesntExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.default.getUserByEmail(req.body.email);
            if (user) {
                res.status(400).send({ error: `User email already exists` });
            }
            else {
                next();
            }
        });
    }
    validateSameEmailBelongToSameUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.default.getUserByEmail(req.body.email);
            if (user && user._id === req.params.userId) {
                next();
            }
            else {
                res.status(400).send({ error: `Invalid email` });
            }
        });
    }
    validateUserExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.default.readById(req.params.userId);
            if (user) {
                next();
            }
            else {
                res.status(404).send({
                    error: `User ${req.params.userId} not found`,
                });
            }
        });
    }
    extractUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.userId;
            next();
        });
    }
}
exports.default = new UserMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvbWlkZGxld2FyZS91c2VyLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFDMUIsNEVBQW1EO0FBRW5ELE1BQU0sR0FBRyxHQUFvQixlQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUzRCxNQUFNLGNBQWM7SUFBcEI7UUF5Q0Usa0VBQWtFO1FBQ2xFLHVCQUFrQixHQUFHLENBQ25CLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCLEVBQzFCLEVBQUU7WUFDRixJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNsQixHQUFHLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDeEQ7aUJBQU07Z0JBQ0wsSUFBSSxFQUFFLENBQUM7YUFDUjtRQUNILENBQUMsQ0FBQSxDQUFDO0lBeUJKLENBQUM7SUE3RU8sMEJBQTBCLENBQzlCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ25ELElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ25CLEtBQUssRUFBRSwrQ0FBK0M7aUJBQ3ZELENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0lBRUssNEJBQTRCLENBQ2hDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLElBQUksR0FBRyxNQUFNLHNCQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUQsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDO2FBQzlEO2lCQUFNO2dCQUNMLElBQUksRUFBRSxDQUFDO2FBQ1I7UUFDSCxDQUFDO0tBQUE7SUFFSyxpQ0FBaUMsQ0FDckMsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sc0JBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5RCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUMxQyxJQUFJLEVBQUUsQ0FBQzthQUNSO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7YUFDbEQ7UUFDSCxDQUFDO0tBQUE7SUFnQkssa0JBQWtCLENBQ3RCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLElBQUksR0FBRyxNQUFNLHNCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0QsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDbkIsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLFlBQVk7aUJBQzdDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUNqQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksY0FBYyxFQUFFLENBQUMifQ==