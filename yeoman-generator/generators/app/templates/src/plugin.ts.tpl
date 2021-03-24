// core-js and regenerator-runtime are required to ensure the correct polyfills
// are applied by babel/webpack.
import "core-js/stable";
import "regenerator-runtime/runtime";

// plugin contains interfaces your plugin can expect
// this includes your main plugin class, response, requests, and clients.
import * as octant from "@project-octant/plugin";

// helpers for generating the
// objects that Octant can render to components.
import * as h from "@project-octant/plugin/helpers";

// components
import { TextFactory } from "@project-octant/plugin/components/text";

// rxjs is used to show that Observables function within
// the Octant JavaScript runtime.
import { Subject, BehaviorSubject } from "rxjs";
import { CardFactory } from "@project-octant/plugin/components/card";
import { FlexLayoutFactory } from "@project-octant/plugin/components/flexlayout";
import { SummaryFactory } from "@project-octant/plugin/components/summary";

import { router } from "./routes";

// This plugin will handle v1/Pod types.
let podGVK = { version: "v1", kind: "Pod" };

const <%= pluginClass %>: octant.PluginConstructor = class <%= pluginClass %>
  implements octant.Plugin {
  // Static fields that Octant uses
  name = "<%= filename %>";
  description = "<%= description %>";

  // If true, the contentHandler and navigationHandler will be called.
  isModule = <%= isModule %>;

  // Octant will assign these via the constructor at runtime.
  dashboardClient: octant.DashboardClient;
  httpClient: octant.HTTPClient;

  // Plugin capabilities
  capabilities = {
    supportPrinterConfig: [podGVK],
    supportTab: [podGVK],
    actionNames: ["action.octant.dev/setNamespace"],
  };

  // We want to keep track of the current selected namespace
  currentNamespace: Subject<string>;

  // Octant expects plugin constructors to accept two arguments, the dashboardClient and the httpClient
  constructor(
    dashboardClient: octant.DashboardClient,
    httpClient: octant.HTTPClient
  ) {
    this.dashboardClient = dashboardClient;
    this.httpClient = httpClient;

    this.currentNamespace = new BehaviorSubject("default");
  }

  printHandler(request: octant.ObjectRequest): octant.PrintResponse {
    const myText = new TextFactory({
      value: "my **bold** and *emphasized* test",
      options: { isMarkdown: true },
    }).toComponent();

    const config = new SummaryFactory({
      sections: [{ header: "plugin-foo-config", content: myText }],
    });

    const status = new SummaryFactory({
      sections: [{ header: "plugin-foo-status", content: myText }],
    });

    let cardA = new CardFactory({
      body: new TextFactory({
        value: "Extra information about this resource.",
      }).toComponent(),
      factoryMetadata: {
        title: [new TextFactory({ value: "Extra Information" }).toComponent()],
      },
    });

    let items = [{ width: h.Width.Half, view: cardA }];

    return h.createPrintResponse(config, status, items);
  }

  actionHandler(request: octant.ActionRequest): octant.ActionResponse | void {
    if (request.actionName === "action.octant.dev/setNamespace") {
      this.currentNamespace.next(request.payload.namespace);
      return;
    }
    return;
  }

  tabHandler(request: octant.ObjectRequest): octant.TabResponse {
    let cardA = new CardFactory({
      body: new TextFactory({ value: "card body A" }).toComponent(),
      factoryMetadata: {
        title: [new TextFactory({ value: "Card A" }).toComponent()],
      },
    }).toComponent();

    let cardB = new CardFactory({
      body: new TextFactory({ value: "card body B" }).toComponent(),
      factoryMetadata: {
        title: [new TextFactory({ value: "Card B" }).toComponent()],
      },
    }).toComponent();

    let layout = new FlexLayoutFactory({
      options: {
        sections: [
          [
            { width: h.Width.Half, view: cardA },
            { width: h.Width.Half, view: cardB },
          ],
        ],
      },
    });

    return h.createTabResponse("<%= name %>", layout);
  }

  navigationHandler(): octant.Navigation {
    const nav = new h.Navigation("<%= name %>", "<%= filename %>", "cloud");
    nav.add("Entities", "entities");
    return nav;
  }

  contentHandler(request: octant.ContentRequest): octant.ContentResponse {
    return h.contentResponseFromRouter(this, router, request);
  }
}

export default <%= pluginClass %>;

console.log("loading <%= filename %>.ts");
