/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

export interface AccordionConfig {
  rows: {
    title: string;
    content: Component<any>;
  }[];
  allowMultipleExpanded: boolean;
}

interface AccordionParameters {
  rows: {
    title: string;
    content: Component<any>;
  }[];
  allowMultipleExpanded: boolean;
  factoryMetadata?: FactoryMetadata;
}

export class AccordionFactory implements ComponentFactory<AccordionConfig> {
  private readonly rows: {
    title: string;
    content: Component<any>;
  }[];
  private readonly allowMultipleExpanded: boolean;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({
    rows,
    allowMultipleExpanded,
    factoryMetadata,
  }: AccordionParameters) {
    this.rows = rows;
    this.allowMultipleExpanded = allowMultipleExpanded;
    this.factoryMetadata = factoryMetadata;
  }

  toComponent(): Component<AccordionConfig> {
    return {
      metadata: {
        type: 'accordion',
        ...this.factoryMetadata,
      },
      config: {
        rows: this.rows,
        allowMultipleExpanded: this.allowMultipleExpanded,
      },
    };
  }
}
