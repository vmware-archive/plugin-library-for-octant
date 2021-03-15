/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

import { ButtonGroupConfig } from './button-group';

export interface TimelineConfig {
  steps: {
    state: string;
    header: string;
    title: string;
    description: string;
    buttonGroup?: Component<ButtonGroupConfig>;
  }[];
  vertical: boolean;
}

interface TimelineParameters {
  steps: {
    state: string;
    header: string;
    title: string;
    description: string;
    buttonGroup?: Component<ButtonGroupConfig>;
  }[];
  vertical: boolean;
  factoryMetadata?: FactoryMetadata;
}

export class TimelineFactory implements ComponentFactory<TimelineConfig> {
  private readonly steps: {
    state: string;
    header: string;
    title: string;
    description: string;
    buttonGroup?: Component<ButtonGroupConfig>;
  }[];
  private readonly vertical: boolean;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({ steps, vertical, factoryMetadata }: TimelineParameters) {
    this.steps = steps;
    this.vertical = vertical;
    this.factoryMetadata = factoryMetadata;
  }

  toComponent(): Component<TimelineConfig> {
    return {
      metadata: {
        type: 'timeline',
        ...this.factoryMetadata,
      },
      config: {
        steps: this.steps,
        vertical: this.vertical,
      },
    };
  }
}
