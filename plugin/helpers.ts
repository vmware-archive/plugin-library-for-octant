/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as octant from "./octant";

import {
  ComponentFactory,
  FactoryMetadata,
} from "./components/component-factory";
import { ButtonGroupFactory } from "./components/button-group";
import { FlexLayoutFactory } from "./components/flexlayout";
import { SummaryFactory } from "./components/summary";
import { TableFactory } from "./components/table";
import { Component } from "./components/component";
import { LinkConfig, LinkFactory } from "./components/link";

/**
 * TableRow represents a single row in a table.
 */
export type TableRow = { [key: string]: Component<any> };

/**
 * TableFilters represents any local data filters the table should render with.
 */
export type TableFilters = {
  [key: string]: {
    values: string[];
    selected: string[];
  };
};

export const createPrintResponse = (
  config?: SummaryFactory,
  status?: SummaryFactory,
  items?: { width: number; view: ComponentFactory<any> }[]
): octant.PrintResponse => {
  return {
    config: config?.toComponent().config.sections,
    status: status?.toComponent().config.sections,
    items: items?.map((i) => {
      return { width: i.width, view: i.view.toComponent() };
    }),
  };
};

export const createTabResponse = (
  name: string,
  contents: FlexLayoutFactory
): octant.TabResponse => {
  return {
    tab: {
      name: name,
      contents: contents.toComponent(),
    },
  };
};

/**
 * 
 * @param title title of the page, this is rendered directly above the content
 * @param bodyComponents an Array of ComponentFactory that will be rendered using toComponent()
 * @param buttonGroup global action buttons to display, these render on the same row as the title
 */
export const createContentResponse = (
  title: ComponentFactory<any>[],
  bodyComponents: ComponentFactory<any>[],
  buttonGroup?: ButtonGroupFactory
): octant.ContentResponse => {
  return {
    content: {
      title: title.map((t) => t.toComponent()),
      viewComponents: bodyComponents.map((c) => c.toComponent()),
      ...(buttonGroup && { buttonGroup: buttonGroup.toComponent() }),
    },
  };
};

/**
 * Width of the component
 */
export enum Width {
  Half = 12,
  Full = 24,
}

/**
 * Navigation is a class for defining the navigation menu for module plugins.
 */
export class Navigation implements octant.Navigation {
  title: string;
  path: string;
  iconName?: string;

  children: octant.Navigation[];

  /**
   *
   * @param title display title for navigation, usually your plugin name as a Title
   * @param rootPath root path for your plugin, consider namespacing, e.g. octant.dev-my-plugin
   * @param icon clarity icon name (https://clarity.design/icons#core-shapes)
   */
  constructor(title: string, rootPath: string, icon?: string) {
    this.title = title;
    this.path = "/" + rootPath;
    this.iconName = icon;
    this.children = [];
  }

  /**
   *
   * @param title display title for child menu entry
   * @param path path for child menu entry
   * @param icon clarity icon name (https://clarity.design/icons#core-shapes)
   */
  add(title: string, path: string, icon?: string) {
    this.children.push({
      title: title,
      path: this.path + "/" + path,
      iconName: icon,
    });
  }
}

/**
 * TableFactoryBuilder aids in building TableFactory instances.
 */
export class TableFactoryBuilder {
  private _columns: string[];
  private _rows: { [key: string]: Component<any> }[];
  private _emptyContent: string;
  private _loading: boolean;
  private _filters: TableFilters;
  private factoryMetadata: FactoryMetadata | undefined;

  /**
   *
   * @param columns titles for each column in the table
   * @param rows initial set of rows
   * @param emptyContent message to display when there are no rows, defaults to "No results found!"
   * @param loading display the loading indicator on the table
   * @param filters set any data filters on the table
   * @param factoryMetadata allows for changing the title or accessor of the underlying TableFactory
   */
  constructor(
    columns: string[],
    rows?: { [key: string]: Component<any> }[],
    emptyContent?: string,
    loading?: boolean,
    filters?: TableFilters,
    factoryMetadata?: FactoryMetadata
  ) {
    this._columns = columns;
    this._rows = rows ? rows : [];
    this._emptyContent = emptyContent ? emptyContent : "No results found!";
    this._loading = loading ? loading : false;
    this._filters = filters ? filters : {};
    this.factoryMetadata = factoryMetadata;
  }

  public get emptyContent(): string {
    return this._emptyContent;
  }
  public set emptyContent(message: string) {
    this._emptyContent = message;
  }

  public get loading(): boolean {
    return this._loading;
  }
  public set loading(loading: boolean) {
    this._loading = loading;
  }

  public get filters(): TableFilters {
    return this._filters;
  }
  public set filters(f: TableFilters) {
    this._filters = f;
  }

  public get columns(): string[] {
    return this._columns;
  }
  public set columns(c: string[]) {
    this._columns = c;
  }

  /**
   *
   * @param rows a TableRow or Array of TableRow to push in to the table.
   */
  public push(rows: TableRow | TableRow[]) {
    if (Array.isArray(rows)) {
      rows.forEach((element) => {
        this._rows.push(element);
      });
    } else {
      this._rows.push(rows);
    }
  }

  /**
   * @returns a new TableFactory
   */
  public getFactory(): TableFactory {
    const columns = this._columns.map((name: string) => ({
      name: name,
      accessor: name,
    }));
    const rows = this._rows;
    const emptyContent = this.emptyContent;
    const loading = this.loading;
    const factoryMetadata = this.factoryMetadata;

    return new TableFactory({
      columns,
      rows,
      emptyContent,
      loading: loading,
      filters: {},
      factoryMetadata: factoryMetadata,
    });
  }
}

export interface Ref {
  apiVersion: string;
  kind: string;
  name: string;
  namespace: string;
}

export const genLinkFromObject = (
  object: any,
  client: octant.DashboardClient
): Component<LinkConfig> => {
  const ref: Ref = {
    namespace: object.metadata.namespace,
    apiVersion: object.apiVersion,
    kind: object.kind,
    name: object.metadata.name,
  };

  return genLink(ref, client);
};

export const genLink = (
  ref: Ref,
  client: octant.DashboardClient
): Component<LinkConfig> => {
  const path = client.RefPath(ref);
  return new LinkFactory({ value: ref.name, ref: path }).toComponent();
};
