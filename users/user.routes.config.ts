import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import UserController from "./controllers/user.controller";
import UserMiddleware from "./middleware/user.middleware";
import { body } from "express-validator";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import permissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagsRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        UserController.list
      )
      .post(
        body("email").isEmail(),
        body("password")
          .isLength({ min: 5 })
          .withMessage("Must include password (5+ characters"),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UserMiddleware.validateSameEmailDoesntExist,
        UserController.create
      );

    this.app.param("userId", UserMiddleware.extractUserId);

    this.app
      .route(`/users/:userId`)
      .all(
        UserMiddleware.validateUserExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(UserController.getById)
      .delete(UserController.removeById);

    this.app.put(`/users/:userId`, [
      body("email").isEmail(),
      body("password")
        .isLength({ min: 5 })
        .withMessage("Must include password (5+ characters"),
      body("firstName").isString(),
      body("lastName").isString(),
      body("permissionFlags").isInt(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UserMiddleware.validateSameEmailBelongToSameUser,
      permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      permissionMiddleware.permissionFlagsRequired(
        PermissionFlag.PAID_PERMISSION
      ),
      UserController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      body("email").isEmail().optional(),
      body("password")
        .isLength({ min: 5 })
        .withMessage("Must include password (5+ characters")
        .optional(),
      body("firstName").isString().optional(),
      body("lastName").isString().optional(),
      body("permissionFlags").isInt().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UserMiddleware.validatePatchEmail,
      permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      permissionMiddleware.permissionFlagsRequired(
        PermissionFlag.PAID_PERMISSION
      ),
      UserController.patch,
    ]);

    return this.app;
  }
}
