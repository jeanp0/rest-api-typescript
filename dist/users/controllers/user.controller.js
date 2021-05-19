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
// we import out newly created user services
const user_service_1 = __importDefault(require("../services/user.service"));
// we import the argon 2 library for password hashing
const argon2_1 = __importDefault(require("argon2"));
// we use debug with a custom context ad escribed in Part 1
const debug_1 = __importDefault(require("debug"));
const log = debug_1.default("app:users-controller");
class UsersController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_service_1.default.list(100, 0);
            res.status(200).send(users);
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.default.readById(req.body.id);
            res.status(200).send(user);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2_1.default.hash(req.body.password);
            const userId = yield user_service_1.default.create(req.body);
            res.status(201).send({ id: userId });
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.password) {
                req.body.password = yield argon2_1.default.hash(req.body.password);
            }
            log(yield user_service_1.default.patchById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield argon2_1.default.hash(req.body.password);
            log(yield user_service_1.default.putById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    removeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield user_service_1.default.deleteById(req.body.id));
            res.status(204).send();
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvY29udHJvbGxlcnMvdXNlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBR0EsNENBQTRDO0FBQzVDLDRFQUFvRDtBQUVwRCxxREFBcUQ7QUFDckQsb0RBQTRCO0FBRTVCLDJEQUEyRDtBQUMzRCxrREFBMEI7QUFFMUIsTUFBTSxHQUFHLEdBQW9CLGVBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTNELE1BQU0sZUFBZTtJQUNiLElBQUksQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNwRCxNQUFNLEtBQUssR0FBRyxNQUFNLHNCQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDO0tBQUE7SUFFSyxPQUFPLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDdkQsTUFBTSxJQUFJLEdBQUcsTUFBTSxzQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUM7S0FBQTtJQUVLLE1BQU0sQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN0RCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLGdCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekQsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDO0tBQUE7SUFFSyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDckQsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFEO1lBQ0QsR0FBRyxDQUFDLE1BQU0sc0JBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFSyxHQUFHLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDbkQsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxnQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxNQUFNLHNCQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzFELEdBQUcsQ0FBQyxNQUFNLHNCQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9