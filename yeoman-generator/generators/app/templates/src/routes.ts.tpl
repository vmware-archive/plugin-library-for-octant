import RouteRecognizer from "route-recognizer";
import * as h from "@project-octant/plugin/helpers";

import { listHandler, getHandler, notFoundHandler } from "./content";

export const router = new RouteRecognizer();

router.add(
  [
    {
      path: "/entities",
      handler: listHandler,
    },
  ],
  { as: "default" }
);
router.add([
  {
    path: "/entities/:entityName",
    handler: getHandler,
  },
]);
router.add(
  [
    {
      path: "/not-found",
      handler: notFoundHandler,
    },
  ],
  { as: "notFound" }
);
