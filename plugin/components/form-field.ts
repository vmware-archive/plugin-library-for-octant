/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// GENERATED: do not edit!

import { ComponentFactory, FactoryMetadata } from './component-factory';
import { Component } from './component';

import { FormFieldConfig } from './form-field';

export interface FormFieldConfig {
  type: string;
  label: string;
  name: string;
  value: any;
  configuration?: {
    choices?: {
      label: string;
      value: string;
      checked: boolean;
    }[];
    multiple?: boolean;
    fields?: Component<FormFieldConfig>[];
  };
  placeholder?: string;
  error?: string;
  validators?: { [key: component.FormValidator]: any };
  width?: number;
}

export interface FormFieldOptions {
  configuration?: {
    choices?: {
      label: string;
      value: string;
      checked: boolean;
    }[];
    multiple?: boolean;
    fields?: Component<FormFieldConfig>[];
  };
  placeholder?: string;
  error?: string;
  validators?: { [key: component.FormValidator]: any };
  width?: number;
}

interface FormFieldParameters {
  type: string;
  label: string;
  name: string;
  value: any;
  options?: FormFieldOptions;
  factoryMetadata?: FactoryMetadata;
}

export class FormFieldFactory implements ComponentFactory<FormFieldConfig> {
  private readonly type: string;
  private readonly label: string;
  private readonly name: string;
  private readonly value: any;
  private readonly configuration:
    | {
        choices?: {
          label: string;
          value: string;
          checked: boolean;
        }[];
        multiple?: boolean;
        fields?: Component<FormFieldConfig>[];
      }
    | undefined;
  private readonly placeholder: string | undefined;
  private readonly error: string | undefined;
  private readonly validators:
    | { [key: component.FormValidator]: any }
    | undefined;
  private readonly width: number | undefined;
  private readonly factoryMetadata: FactoryMetadata | undefined;

  constructor({
    type,
    label,
    name,
    value,
    options,
    factoryMetadata,
  }: FormFieldParameters) {
    this.type = type;
    this.label = label;
    this.name = name;
    this.value = value;
    this.factoryMetadata = factoryMetadata;

    if (options) {
      this.configuration = options.configuration;
      this.placeholder = options.placeholder;
      this.error = options.error;
      this.validators = options.validators;
      this.width = options.width;
    }
  }

  toComponent(): Component<FormFieldConfig> {
    return {
      metadata: {
        type: 'formField',
        ...this.factoryMetadata,
      },
      config: {
        type: this.type,
        label: this.label,
        name: this.name,
        value: this.value,

        ...(this.configuration && { configuration: this.configuration }),
        ...(this.placeholder && { placeholder: this.placeholder }),
        ...(this.error && { error: this.error }),
        ...(this.validators && { validators: this.validators }),
        ...(this.width && { width: this.width }),
      },
    };
  }
}
