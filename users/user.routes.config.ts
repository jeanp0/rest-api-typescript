import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import UserController from "./controllers/user.controller";
import UserMiddleware from "./middleware/user.middleware";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(UserController.list)
      .post(
        UserMiddleware.validateRequiredBodyFields,
        UserMiddleware.validateSameEmailDoesntExist,
        UserController.create
      );

    this.app.param("userId", UserMiddleware.extractUserId);

    this.app
      .route(`/users/:userId`)
      .all(UserMiddleware.validateUserExists)
      .get(UserController.getById)
      .delete(UserController.removeById);

    this.app.put(`/users/:userId`, [
      UserMiddleware.validateRequiredBodyFields,
      UserMiddleware.validateSameEmailBelongToSameUser,
      UserController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      UserMiddleware.validatePatchEmail,
      UserController.patch,
    ]);

    return this.app;
  }
}
