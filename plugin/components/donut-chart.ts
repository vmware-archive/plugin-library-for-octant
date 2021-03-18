/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

export interface DonutChartConfig {
  segments: {
    count: number;
    status: string;
    color?: string;
    description?: string;
    thickness?: number;
  }[];
  labels: {
    plural: string;
    singular: string;
  };
  size: number;
  thickness?: number;
}

export interface DonutChartOptions {
  thickness?: number;
}

interface DonutChartParameters {
  segments: {
    count: number;
    status: string;
    color?: string;
    description?: string;
    thickness?: number;
  }[];
  labels: {
    plural: string;
    singular: string;
  };
  size: number;
  options?: DonutChartOptions;
  factoryMetadata?: FactoryMetadata;
}

export class DonutChartFactory implements ComponentFactory<DonutChartConfig> {
  private readonly segments: {
    count: number;
    status: string;
    color?: string;
    description?: string;
    thickness?: number;
  }[];
  private readonly labels: {
    plural: string;
    singular: string;
  };
  private readonly size: number;
  private readonly thickness: number | undefined;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({
    segments,
    labels,
    size,
    options,
    factoryMetadata,
  }: DonutChartParameters) {
    this.segments = segments;
    this.labels = labels;
    this.size = size;
    this.factoryMetadata = factoryMetadata;

    if (options) {
      this.thickness = options.thickness;
    }
  }

  toComponent(): Component<DonutChartConfig> {
    return {
      metadata: {
        type: 'donutChart',
        ...this.factoryMetadata,
      },
      config: {
        segments: this.segments,
        labels: this.labels,
        size: this.size,

        ...(this.thickness && { thickness: this.thickness }),
      },
    };
  }
}
