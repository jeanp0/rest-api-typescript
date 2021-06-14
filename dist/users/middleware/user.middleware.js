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
        // async validateRequiredBodyFields(
        //   req: express.Request,
        //   res: express.Response,
        //   next: express.NextFunction
        // ) {
        //   if (req.body && req.body.email && req.body.password) {
        //     next();
        //   } else {
        //     res.status(400).send({
        //       error: `Missing required fields email and/or password`,
        //     });
        //   }
        // }
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
            const user = res.locals.user || (yield user_service_1.default.getUserByEmail(req.body.email));
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
                res.locals.user = user;
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
    userCantChangePermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if ("permissionFlags" in req.body &&
                req.body.permissionFlags !== res.locals.user.permissionFlags) {
                return res
                    .status(400)
                    .send({ errors: ["User cannot change permissionFlags"] });
            }
            next();
        });
    }
}
exports.default = new UserMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvbWlkZGxld2FyZS91c2VyLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFDMUIsNEVBQW1EO0FBRW5ELE1BQU0sR0FBRyxHQUFvQixlQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUzRCxNQUFNLGNBQWM7SUFBcEI7UUFDRSxvQ0FBb0M7UUFDcEMsMEJBQTBCO1FBQzFCLDJCQUEyQjtRQUMzQiwrQkFBK0I7UUFDL0IsTUFBTTtRQUNOLDJEQUEyRDtRQUMzRCxjQUFjO1FBQ2QsYUFBYTtRQUNiLDZCQUE2QjtRQUM3QixnRUFBZ0U7UUFDaEUsVUFBVTtRQUNWLE1BQU07UUFDTixJQUFJO1FBNkJKLGtFQUFrRTtRQUNsRSx1QkFBa0IsR0FBRyxDQUNuQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQixFQUMxQixFQUFFO1lBQ0YsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDbEIsR0FBRyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3hEO2lCQUFNO2dCQUNMLElBQUksRUFBRSxDQUFDO2FBQ1I7UUFDSCxDQUFDLENBQUEsQ0FBQztJQTBDSixDQUFDO0lBakZPLDRCQUE0QixDQUNoQyxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxzQkFBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlELElBQUksSUFBSSxFQUFFO2dCQUNSLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLENBQUMsQ0FBQzthQUM5RDtpQkFBTTtnQkFDTCxJQUFJLEVBQUUsQ0FBQzthQUNSO1FBQ0gsQ0FBQztLQUFBO0lBRUssaUNBQWlDLENBQ3JDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLElBQUksR0FDUixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sc0JBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQzFDLElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQzthQUNsRDtRQUNILENBQUM7S0FBQTtJQWdCSyxrQkFBa0IsQ0FDdEIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sc0JBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxJQUFJLElBQUksRUFBRTtnQkFDUixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ25CLEtBQUssRUFBRSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxZQUFZO2lCQUM3QyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtJQUVLLGFBQWEsQ0FDakIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2hDLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztLQUFBO0lBRUssd0JBQXdCLENBQzVCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUNFLGlCQUFpQixJQUFJLEdBQUcsQ0FBQyxJQUFJO2dCQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQzVEO2dCQUNBLE9BQU8sR0FBRztxQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDO3FCQUNYLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLG9DQUFvQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzdEO1lBQ0QsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksY0FBYyxFQUFFLENBQUMifQ==