/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

import { ButtonConfig } from './button';

export interface ButtonGroupConfig {
  buttons: Component<ButtonConfig>[];
}

interface ButtonGroupParameters {
  buttons: Component<ButtonConfig>[];
  factoryMetadata?: FactoryMetadata;
}

export class ButtonGroupFactory implements ComponentFactory<ButtonGroupConfig> {
  private readonly buttons: Component<ButtonConfig>[];
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({ buttons, factoryMetadata }: ButtonGroupParameters) {
    this.buttons = buttons;
    this.factoryMetadata = factoryMetadata;
  }

  toComponent(): Component<ButtonGroupConfig> {
    return {
      metadata: {
        type: 'buttonGroup',
        ...this.factoryMetadata,
      },
      config: {
        buttons: this.buttons,
      },
    };
  }
}
