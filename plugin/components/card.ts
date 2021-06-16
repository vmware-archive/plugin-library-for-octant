/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

import { ButtonGroupConfig } from './button-group';
import { FormFieldConfig } from './form-field';

export interface CardConfig {
  body: Component<any>;
  actions?: {
    name: string;
    title: string;
    form: {
      fields: Component<FormFieldConfig>[];
      action?: string;
    };
    modal: boolean;
  }[];
  alert?: {
    status: string;
    type: string;
    message: string;
    closable: boolean;
    buttonGroup: Component<ButtonGroupConfig>;
  };
}

export interface CardOptions {
  actions?: {
    name: string;
    title: string;
    form: {
      fields: Component<FormFieldConfig>[];
      action?: string;
    };
    modal: boolean;
  }[];
  alert?: {
    status: string;
    type: string;
    message: string;
    closable: boolean;
    buttonGroup: Component<ButtonGroupConfig>;
  };
}

interface CardParameters {
  body: Component<any>;
  options?: CardOptions;
  factoryMetadata?: FactoryMetadata;
}

export class CardFactory implements ComponentFactory<CardConfig> {
  private readonly body: Component<any>;
  private readonly actions:
    | {
        name: string;
        title: string;
        form: {
          fields: Component<FormFieldConfig>[];
          action?: string;
        };
        modal: boolean;
      }[]
    | undefined;
  private readonly alert:
    | {
        status: string;
        type: string;
        message: string;
        closable: boolean;
        buttonGroup: Component<ButtonGroupConfig>;
      }
    | undefined;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({ body, options, factoryMetadata }: CardParameters) {
    this.body = body;
    this.factoryMetadata = factoryMetadata;

    if (options) {
      this.actions = options.actions;
      this.alert = options.alert;
    }
  }

  toComponent(): Component<CardConfig> {
    return {
      metadata: {
        type: 'card',
        ...this.factoryMetadata,
      },
      config: {
        body: this.body,

        ...(this.actions && { actions: this.actions }),
        ...(this.alert && { alert: this.alert }),
      },
    };
  }
}
