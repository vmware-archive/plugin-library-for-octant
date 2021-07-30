/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

export interface DropdownConfig {
  position?: string;
  type: string;
  action?: string;
  selection?: string;
  useSelection: boolean;
  showToggleIcon: boolean;
  items: {
    name: string;
    type: string;
    label: string;
    url?: string;
    description?: string;
  }[];
}

export interface DropdownOptions {
  position?: string;
  action?: string;
  selection?: string;
}

interface DropdownParameters {
  type: string;
  useSelection: boolean;
  showToggleIcon: boolean;
  items: {
    name: string;
    type: string;
    label: string;
    url?: string;
    description?: string;
  }[];
  options?: DropdownOptions;
  factoryMetadata?: FactoryMetadata;
}

export class DropdownFactory implements ComponentFactory<DropdownConfig> {
  private readonly type: string;
  private readonly useSelection: boolean;
  private readonly showToggleIcon: boolean;
  private readonly items: {
    name: string;
    type: string;
    label: string;
    url?: string;
    description?: string;
  }[];
  private readonly position: string | undefined;
  private readonly action: string | undefined;
  private readonly selection: string | undefined;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({
    type,
    useSelection,
    showToggleIcon,
    items,
    options,
    factoryMetadata,
  }: DropdownParameters) {
    this.type = type;
    this.useSelection = useSelection;
    this.showToggleIcon = showToggleIcon;
    this.items = items;
    this.factoryMetadata = factoryMetadata;

    if (options) {
      this.position = options.position;
      this.action = options.action;
      this.selection = options.selection;
    }
  }

  toComponent(): Component<DropdownConfig> {
    return {
      metadata: {
        type: 'dropdown',
        ...this.factoryMetadata,
      },
      config: {
        type: this.type,
        useSelection: this.useSelection,
        showToggleIcon: this.showToggleIcon,
        items: this.items,

        ...(this.position && { position: this.position }),
        ...(this.action && { action: this.action }),
        ...(this.selection && { selection: this.selection }),
      },
    };
  }
}
