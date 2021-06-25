import express from "express";
import debug from "debug";
import { PermissionFlag } from "./common.permissionflag.enum";

const log: debug.IDebugger = debug("app:common-permission-middleware");

class PermissionMiddleware {
  permissionFlagsRequired(requiredPermissionFlag: PermissionFlag) {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        console.log(res.locals.jwt.permissionFlags);
        const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
        if (userPermissionFlags & requiredPermissionFlag) {
          return next();
        }
        res.status(403).send();
      } catch (e) {
        log(e);
      }
    };
  }

  async onlySameUserOrAdminCanDoThisAction(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const userPermissionFlags = parseInt(res.locals.jwt.permissionFlags);
    if (
      req.params &&
      req.params.userId &&
      req.params.userId === res.locals.jwt.userId
    ) {
      return next();
    }
    if (userPermissionFlags & PermissionFlag.ADMIN_PERMISSION) {
      return next();
    }
    res.status(403).send();
  }
}

export default new PermissionMiddleware();
