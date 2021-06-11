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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const user_routes_config_1 = require("./users/user.routes.config");
const auth_routes_config_1 = require("./auth/auth.routes.config");
const debug_1 = __importDefault(require("debug"));
const dotenv_1 = __importDefault(require("dotenv"));
const dotenvResult = dotenv_1.default.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const app = express_1.default();
const server = http.createServer(app);
const port = 3000;
const routes = [];
const debugLog = debug_1.default("app");
// here we are adding middleware to parse all incoming requests as JSON
app.use(express_1.default.json());
// here we are adding middleware to allow cross-origin requests
app.use(cors_1.default());
// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}
// initialize the logger with de above configuration
app.use(expressWinston.logger(loggerOptions));
// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new user_routes_config_1.UserRoutes(app));
routes.push(new auth_routes_config_1.AuthRoutes(app)); // independent: can go before or after UserRoutes
// this is a simple route to make sure everything is working properly
const runningMessage = `Server running at http://localhost:${port}`;
app.get("/", (req, res) => {
    res.status(200).send(runningMessage);
});
server.listen(port, () => {
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    // our only exception to avoiding console.log(), because we
    // always want to knoe when the server is done starting up
    console.log(runningMessage);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUM5QiwyQ0FBNkI7QUFFN0IsaURBQW1DO0FBQ25DLGdFQUFrRDtBQUNsRCxnREFBd0I7QUFFeEIsbUVBQXdEO0FBQ3hELGtFQUF1RDtBQUN2RCxrREFBMEI7QUFDMUIsb0RBQTRCO0FBRTVCLE1BQU0sWUFBWSxHQUFHLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDckMsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO0lBQ3RCLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztDQUMxQjtBQUVELE1BQU0sR0FBRyxHQUF3QixpQkFBTyxFQUFFLENBQUM7QUFDM0MsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLE1BQU0sTUFBTSxHQUE4QixFQUFFLENBQUM7QUFDN0MsTUFBTSxRQUFRLEdBQW9CLGVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUUvQyx1RUFBdUU7QUFDdkUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFFeEIsK0RBQStEO0FBQy9ELEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztBQUVoQiw2RUFBNkU7QUFDN0UsdUVBQXVFO0FBQ3ZFLE1BQU0sYUFBYSxHQUFpQztJQUNsRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUN2QztDQUNGLENBQUM7QUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUU7SUFDdEIsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxpREFBaUQ7Q0FDOUU7QUFFRCxvREFBb0Q7QUFDcEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFFOUMsa0RBQWtEO0FBQ2xELHVGQUF1RjtBQUN2RixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksK0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSwrQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpREFBaUQ7QUFFbkYscUVBQXFFO0FBQ3JFLE1BQU0sY0FBYyxHQUFHLHNDQUFzQyxJQUFJLEVBQUUsQ0FBQztBQUNwRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQzNELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDM0MsUUFBUSxDQUFDLHlCQUF5QixLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ0gsMkRBQTJEO0lBQzNELDBEQUEwRDtJQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzlCLENBQUMsQ0FBQyxDQUFDIn0=