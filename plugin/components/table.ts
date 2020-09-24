/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

import { ButtonGroupConfig } from './button-group';

export interface TableConfig {
  columns: {
    name: string;
    accessor: string;
  }[];
  rows: { [key: string]: Component<any> }[];
  emptyContent: string;
  loading: boolean;
  filters: {
    [key: string]: {
      values: string[];
      selected: string[];
    };
  };
  buttonGroup?: Component<ButtonGroupConfig>;
}

export interface TableOptions {
  buttonGroup?: Component<ButtonGroupConfig>;
}

interface TableParameters {
  columns: {
    name: string;
    accessor: string;
  }[];
  rows: { [key: string]: Component<any> }[];
  emptyContent: string;
  loading: boolean;
  filters: {
    [key: string]: {
      values: string[];
      selected: string[];
    };
  };
  options?: TableOptions;
  factoryMetadata?: FactoryMetadata;
}

export class TableFactory implements ComponentFactory<TableConfig> {
  private readonly columns: {
    name: string;
    accessor: string;
  }[];
  private readonly rows: { [key: string]: Component<any> }[];
  private readonly emptyContent: string;
  private readonly loading: boolean;
  private readonly filters: {
    [key: string]: {
      values: string[];
      selected: string[];
    };
  };
  private readonly buttonGroup: Component<ButtonGroupConfig> | undefined;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({
    columns,
    rows,
    emptyContent,
    loading,
    filters,
    options,
    factoryMetadata,
  }: TableParameters) {
    this.columns = columns;
    this.rows = rows;
    this.emptyContent = emptyContent;
    this.loading = loading;
    this.filters = filters;
    this.factoryMetadata = factoryMetadata;

    if (options) {
      this.buttonGroup = options.buttonGroup;
    }
  }

  toComponent(): Component<TableConfig> {
    return {
      metadata: {
        type: 'table',
        ...this.factoryMetadata,
      },
      config: {
        columns: this.columns,
        rows: this.rows,
        emptyContent: this.emptyContent,
        loading: this.loading,
        filters: this.filters,

        ...(this.buttonGroup && { buttonGroup: this.buttonGroup }),
      },
    };
  }
}
