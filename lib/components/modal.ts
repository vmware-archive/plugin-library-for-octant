/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

export interface ModalConfig {
  body?: Component<any>;
  form?: {
    fields: any[];
    action?: string;
  };
  opened: boolean;
  size?: string;
  buttons?: {
    name: string;
    payload: { [key: string]: any };
    confirmation?: {
      title: string;
      body: string;
    };
    modal?: Component<any>;
  }[];
}

export interface ModalOptions {
  body?: Component<any>;
  form?: {
    fields: any[];
    action?: string;
  };
  size?: string;
  buttons?: {
    name: string;
    payload: { [key: string]: any };
    confirmation?: {
      title: string;
      body: string;
    };
    modal?: Component<any>;
  }[];
}

interface ModalParameters {
  opened: boolean;
  options?: ModalOptions;
  factoryMetadata?: FactoryMetadata;
}

export class ModalFactory implements ComponentFactory<ModalConfig> {
  private readonly opened: boolean;
  private readonly body: Component<any> | undefined;
  private readonly form:
    | {
        fields: any[];
        action?: string;
      }
    | undefined;
  private readonly size: string | undefined;
  private readonly buttons:
    | {
        name: string;
        payload: { [key: string]: any };
        confirmation?: {
          title: string;
          body: string;
        };
        modal?: Component<any>;
      }[]
    | undefined;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({ opened, options, factoryMetadata }: ModalParameters) {
    this.opened = opened;
    this.factoryMetadata = factoryMetadata;

    if (options) {
      this.body = options.body;
      this.form = options.form;
      this.size = options.size;
      this.buttons = options.buttons;
    }
  }

  toComponent(): Component<ModalConfig> {
    return {
      metadata: {
        type: 'modal',
        ...this.factoryMetadata,
      },
      config: {
        opened: this.opened,

        ...(this.body && { body: this.body }),
        ...(this.form && { form: this.form }),
        ...(this.size && { size: this.size }),
        ...(this.buttons && { buttons: this.buttons }),
      },
    };
  }
}
