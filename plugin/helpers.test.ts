import { TableFactoryBuilder } from "./helpers";
import { TextFactory } from "./components/text";

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
