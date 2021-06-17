/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

export interface ButtonConfig {
  name: string;
  payload: { [key: string]: any };
  confirmation?: {
    title: string;
    body: string;
  };
  modal?: Component<any>;
  status?: string;
  size?: string;
  style?: string;
}

export interface ButtonOptions {
  confirmation?: {
    title: string;
    body: string;
  };
  modal?: Component<any>;
  status?: string;
  size?: string;
  style?: string;
}

interface ButtonParameters {
  name: string;
  payload: { [key: string]: any };
  options?: ButtonOptions;
  factoryMetadata?: FactoryMetadata;
}

export class ButtonFactory implements ComponentFactory<ButtonConfig> {
  private readonly name: string;
  private readonly payload: { [key: string]: any };
  private readonly confirmation:
    | {
        title: string;
        body: string;
      }
    | undefined;
  private readonly modal: Component<any> | undefined;
  private readonly status: string | undefined;
  private readonly size: string | undefined;
  private readonly style: string | undefined;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({ name, payload, options, factoryMetadata }: ButtonParameters) {
    this.name = name;
    this.payload = payload;
    this.factoryMetadata = factoryMetadata;

    if (options) {
      this.confirmation = options.confirmation;
      this.modal = options.modal;
      this.status = options.status;
      this.size = options.size;
      this.style = options.style;
    }
  }

  toComponent(): Component<ButtonConfig> {
    return {
      metadata: {
        type: 'button',
        ...this.factoryMetadata,
      },
      config: {
        name: this.name,
        payload: this.payload,

        ...(this.confirmation && { confirmation: this.confirmation }),
        ...(this.modal && { modal: this.modal }),
        ...(this.status && { status: this.status }),
        ...(this.size && { size: this.size }),
        ...(this.style && { style: this.style }),
      },
    };
  }
}
