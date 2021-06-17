/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

export interface ExpandableRowDetailConfig {
  replace: boolean;
  body: Component<any>[];
}

interface ExpandableRowDetailParameters {
  replace: boolean;
  body: Component<any>[];
  factoryMetadata?: FactoryMetadata;
}

export class ExpandableRowDetailFactory
  implements ComponentFactory<ExpandableRowDetailConfig>
{
  private readonly replace: boolean;
  private readonly body: Component<any>[];
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({
    replace,
    body,
    factoryMetadata,
  }: ExpandableRowDetailParameters) {
    this.replace = replace;
    this.body = body;
    this.factoryMetadata = factoryMetadata;
  }

  toComponent(): Component<ExpandableRowDetailConfig> {
    return {
      metadata: {
        type: 'expandableRowDetail',
        ...this.factoryMetadata,
      },
      config: {
        replace: this.replace,
        body: this.body,
      },
    };
  }
}
