import * as octant from "@project-octant/plugin";
import * as h from "@project-octant/plugin/helpers";

import { TextFactory } from "@project-octant/plugin/components/text";
import { LinkFactory } from "@project-octant/plugin/components/link";
import { CardFactory } from "@project-octant/plugin/components/card";
import { FlexLayoutFactory } from "@project-octant/plugin/components/flexlayout";

const PREFIX = "/<%= filename %>";
const ENTITY_COLUMNS = ["ID", "Name", "URL", "Tags"];
const ENTITIES = [
  {
    id: 1,
    name: "EntityA",
    url: "https://example.com/EA",
    tags: ["a1", "a2"],
    detail: "Details about EntityA",
  },
  {
    id: 2,
    name: "EntityB",
    url: "https://example.com/EB",
    tags: ["b1", "b2"],
    detail: "Details about EntityB",
  },
];

/**
 * getHandler returns the details of a specific entity
 * @param this instance of octant.Plugin
 * @param params router params and properties of octant.ContentRequest
 */
export function getHandler(
  this: any,
  params: any
): octant.ContentResponse {
  const name: string = params.entityName;
  const title = [
    new TextFactory({ value: "<%= name %>" }),
    new TextFactory({ value: "Entities" }),
    new TextFactory({ value: name }),
  ];

  let entityDetails = new CardFactory({
    body: new TextFactory({
      value: "Information from a 3rd party API using httpClient for " + name,
    }).toComponent(),
    factoryMetadata: {
      title: [new TextFactory({ value: `${name} - Details I` }).toComponent()],
    },
  }).toComponent();

  let apiDetails = new CardFactory({
    body: new TextFactory({
      value:
        "Information from the Kubernetes API using dashboardClient for " + name,
    }).toComponent(),
    factoryMetadata: {
      title: [new TextFactory({ value: ` ${name} - Details II` }).toComponent()],
    },
  }).toComponent();

  let layout = new FlexLayoutFactory({
    options: {
      sections: [
        [
          { width: h.Width.Half, view: entityDetails },
          { width: h.Width.Half, view: apiDetails },
        ],
      ],
    },
    factoryMetadata: { title: title.map((cf) => cf.toComponent()) },
  });

  return h.createContentResponse(title, [layout]);
}

/**
 *
 * @param this instance of octant.Plugin
 * @param params router params and properties of octant.ContentRequest
 */
export function listHandler(
  this: any,
  params: any
): octant.ContentResponse {
  const title = [
    new TextFactory({ value: "<%= name %>" }),
    new TextFactory({ value: "Entities" }),
  ];

  const table = new h.TableFactoryBuilder(title, ENTITY_COLUMNS);
  ENTITIES.forEach((entity) => {
    const row = {
      ID: new TextFactory({ value: entity.id.toString() }),
      Name: new LinkFactory({
        value: entity.name,
        ref: `${PREFIX}/entities/${entity.name}`,
      }),
      URL: new LinkFactory({
        value: entity.url,
        ref: entity.url,
      }),
      // Use TextFactory with isMarkdown true to render custom elements.
      Tags: new TextFactory({
        value: entity.tags
          .map((t) => `<span class="badge badge-purple">${t}</span>`)
          .join(""),
        options: { isMarkdown: true },
      }),
    } as h.TableRow;
    table.push(row);
  });

  return h.createContentResponse(title, [table.getFactory()]);
}

/**
 * notFoundHandler returns a not found content response
 * @param this instance of octant.Plugin
 * @param params router params and properties of octant.ContentRequest
 */
export function notFoundHandler(
  this: any,
  param: any
): octant.ContentResponse {
  const title = [
    new TextFactory({ value: "<%= name %>" }),
    new TextFactory({ value: "Not found" }),
  ];
  const text = new TextFactory({ value: "Not Found." });
  return h.createContentResponse(title, [text]);
}
