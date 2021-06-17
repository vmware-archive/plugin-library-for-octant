/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

export interface SignpostConfig {
  trigger: Component<any>;
  message: string;
  position: string;
}

interface SignpostParameters {
  trigger: Component<any>;
  message: string;
  position: string;
  factoryMetadata?: FactoryMetadata;
}

export class SignpostFactory implements ComponentFactory<SignpostConfig> {
  private readonly trigger: Component<any>;
  private readonly message: string;
  private readonly position: string;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({
    trigger,
    message,
    position,
    factoryMetadata,
  }: SignpostParameters) {
    this.trigger = trigger;
    this.message = message;
    this.position = position;
    this.factoryMetadata = factoryMetadata;
  }

  toComponent(): Component<SignpostConfig> {
    return {
      metadata: {
        type: 'signpost',
        ...this.factoryMetadata,
      },
      config: {
        trigger: this.trigger,
        message: this.message,
        position: this.position,
      },
    };
  }
}
