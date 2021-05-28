/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

export interface JSONEditorConfig {
  mode: string;
  content: string;
}

interface JSONEditorParameters {
  mode: string;
  content: string;
  factoryMetadata?: FactoryMetadata;
}

export class JSONEditorFactory implements ComponentFactory<JSONEditorConfig> {
  private readonly mode: string;
  private readonly content: string;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({ mode, content, factoryMetadata }: JSONEditorParameters) {
    this.mode = mode;
    this.content = content;
    this.factoryMetadata = factoryMetadata;
  }

  toComponent(): Component<JSONEditorConfig> {
    return {
      metadata: {
        type: 'jsonEditor',
        ...this.factoryMetadata,
      },
      config: {
        mode: this.mode,
        content: this.content,
      },
    };
  }
}
