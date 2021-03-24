import { TableFactoryBuilder, createTabResponse, Width } from "./helpers";
import { TextFactory } from "./components/text";
import { CardFactory } from "./components/card";
import { FlexLayoutFactory } from "./components/flexlayout";

import { Plugin, PluginConstructor, TabResponse } from "./octant";

test("TableFactoryBuild options do not need placeholders", () => {
  const expected = {
    config: {
      columns: [
        { accessor: "A1", name: "A1" },
        { accessor: "A2", name: "A2" },
        { accessor: "A3", name: "A3" },
      ],
      emptyContent: "No results found!",
      filters: {},
      loading: true,
      rows: [],
    },
    metadata: {
      title: [
        { config: { value: "Test" }, metadata: { type: "text" } },
        { config: { value: "Title" }, metadata: { type: "text" } },
      ],
      type: "table",
    },
  };

  const title = [
    new TextFactory({ value: "Test" }),
    new TextFactory({ value: "Title" }),
  ];

  const columns = ["A1", "A2", "A3"];

  const tfb = new TableFactoryBuilder(title, columns, { loading: true });
  const factory = tfb.getFactory();

  expect(factory.toComponent()).toStrictEqual(expected);
});

test("single tab response", () => {
  const expected = {
    tab: {
      contents: {
        config: {
          sections: [
            [
              {
                view: {
                  config: {
                    body: {
                      config: { value: "card body A" },
                      metadata: { type: "text" },
                    },
                  },
                  metadata: {
                    title: [
                      {
                        config: { value: "Card A" },
                        metadata: { type: "text" },
                      },
                    ],
                    type: "card",
                  },
                },
                width: 12,
              },
              {
                view: {
                  config: {
                    body: {
                      config: { value: "card body B" },
                      metadata: { type: "text" },
                    },
                  },
                  metadata: {
                    title: [
                      {
                        config: { value: "Card B" },
                        metadata: { type: "text" },
                      },
                    ],
                    type: "card",
                  },
                },
                width: 12,
              },
            ],
          ],
        },
        metadata: { type: "flexlayout" },
      },
      name: "my-tab-1",
    },
  };
  const podGVK = { version: "v1", kind: "Pod" };

  const TestPlugin: PluginConstructor = class TestPlugin implements Plugin {
    name = "test-plugin";
    description = "test tab renderer";
    isModule = false;
    dashboardClient: any;
    httpClient: any;
    capabilities = {
      supportTab: [podGVK],
    };

    tabHandler(any): TabResponse {
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
              { width: Width.Half, view: cardA },
              { width: Width.Half, view: cardB },
            ],
          ],
        },
      });
      return createTabResponse("my-tab-1", layout);
    }
  };

  const plugin = new TestPlugin(void 0, void 0);
  expect(plugin.tabHandler(void 0)).toStrictEqual(expected);
});

test("multi tab response", () => {
  const expected = [
    {
      tab: {
        contents: {
          config: {
            sections: [
              [
                {
                  view: {
                    config: {
                      body: {
                        config: { value: "card body A" },
                        metadata: { type: "text" },
                      },
                    },
                    metadata: {
                      title: [
                        {
                          config: { value: "Card A" },
                          metadata: { type: "text" },
                        },
                      ],
                      type: "card",
                    },
                  },
                  width: 12,
                },
                {
                  view: {
                    config: {
                      body: {
                        config: { value: "card body B" },
                        metadata: { type: "text" },
                      },
                    },
                    metadata: {
                      title: [
                        {
                          config: { value: "Card B" },
                          metadata: { type: "text" },
                        },
                      ],
                      type: "card",
                    },
                  },
                  width: 12,
                },
              ],
            ],
          },
          metadata: { type: "flexlayout" },
        },
        name: "my-tab-1",
      },
    },
    {
      tab: {
        contents: {
          config: {
            sections: [
              [
                {
                  view: {
                    config: {
                      body: {
                        config: { value: "card body A" },
                        metadata: { type: "text" },
                      },
                    },
                    metadata: {
                      title: [
                        {
                          config: { value: "Card A" },
                          metadata: { type: "text" },
                        },
                      ],
                      type: "card",
                    },
                  },
                  width: 12,
                },
                {
                  view: {
                    config: {
                      body: {
                        config: { value: "card body B" },
                        metadata: { type: "text" },
                      },
                    },
                    metadata: {
                      title: [
                        {
                          config: { value: "Card B" },
                          metadata: { type: "text" },
                        },
                      ],
                      type: "card",
                    },
                  },
                  width: 12,
                },
              ],
            ],
          },
          metadata: { type: "flexlayout" },
        },
        name: "my-tab-2",
      },
    },
  ];
  const podGVK = { version: "v1", kind: "Pod" };

  const TestPlugin: PluginConstructor = class TestPlugin implements Plugin {
    name = "test-plugin";
    description = "test tab renderer";
    isModule = false;
    dashboardClient: any;
    httpClient: any;
    capabilities = {
      supportTab: [podGVK],
    };

    tabHandler(any): TabResponse[] {
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
              { width: Width.Half, view: cardA },
              { width: Width.Half, view: cardB },
            ],
          ],
        },
      });
      return [
        createTabResponse("my-tab-1", layout),
        createTabResponse("my-tab-2", layout),
      ];
    }
  };

  const plugin = new TestPlugin(void 0, void 0);
  expect(plugin.tabHandler(void 0)).toStrictEqual(expected);
});
