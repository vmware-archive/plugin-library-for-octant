/*
 * Copyright (c) 2020 the Octant contributors. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from "./components/component";
import { FlexLayoutConfig } from "./components/flexlayout";
import { ExtensionConfig } from "./components/extension";
import { PodStatusConfig } from "./components/pod-status";

/**
 * Key defines the interface expected for request keys when performing actions using the DashboadClient.
 */
export interface Key {
  namespace?: string;
  apiVersion: string;
  kind: string;
  name?: string;
  selector?: object;
}

/**
 * ObjectRequest defines the request object passed in to print, tab, and objectStatus handlers.
 * @property {DashboardClient} client - provided by the plugin runtime for performing API operations.
 * @property {object} object - resource of the request, for example a Pod or Deployment
 */
export interface ObjectRequest {
  readonly client: DashboardClient;
  readonly object: any;
}

export interface PrintResponse {
  config?: { header: string; content: Component<any> }[];
  status?: { header: string; content: Component<any> }[];
  items?: { width: number; view: Component<any> }[];
  error?: string;
}

export interface Tab {
  name: string;
  contents: Component<FlexLayoutConfig>;
}

export interface TabResponse {
  tab: Tab;
}

export interface ObjectStatusResponse {
  objectStatus: Component<PodStatusConfig>;
}

/**
 * ActionRequest defines the request object passed in to an action handler.
 * @property {DashboardClient} client - provided by the plugin runtime for performing API operations.
 * @property {string} actionName - name of the action being sent, match this to dispatch to different handlers.
 * @property {any} payload - action payload
 */
export interface ActionRequest {
  readonly client: DashboardClient;
  readonly actionName: string;
  readonly payload: any;
}

/**
 * ContentRequest defines the request object passed in to a content handler.
 * @property {DashboardClient} client - client provided by the plugin runtime for performing API operations.
 * @property {string} contentPath - full content path of the request, parse this to handle child navigation.
 */
export interface ContentRequest {
  readonly client: DashboardClient;
  readonly contentPath: string;
}

export interface ActionResponse {
  error?: string;
}

/**
 * DashboardClient provides API operations to Octant plugins.
 * This client is provided with every request to ensure that the namespace and context
 * match the current selected namespace and context in Octant.
 */
export interface DashboardClient {
  Get(key: Key): any;
  List(key: Key): any[];
  Update(namespace: string, yaml: string): string;

  /**
   * Delete deletes a an object identified by the key.
   * @param key The key of the object to be deleted
   * @throws Will throw an exception if the key is invalid or the delete fails.
   */
  Delete(key: Key): never;
  RefPath(object: any): string;
}

/**
 * HTTPClient defines a client for making HTTP calls from within the Octant plugin runtime.
 * @method get - GET a url as a string
 * @method getJSON - GET a url as JSON
 */
export interface HTTPClient {
  /**
   * call HTTP GET for a given URL and return the response as a string
   * @param url request url
   * @param callback response callback
   * @throws will throw an exception if the request fails
   */
  get(url: string, callback: (response: string) => void): string;
  /**
   * call HTTP GET for a given URL and return the response as JSON
   * @param url request url
   * @param callback response callback
   * @throws will throw an exception if the request fails
   */
  getJSON(url: string, callback: (response: string) => void): any;
}

/**
 * Plugin defines the expected interface for Octant TypeScript plugins.
 * @property {string} name - title of the plugin
 * @property {string} description - description of the plugin
 * @property {boolean} isModule - is this a module plugin, used for custom navigation and content
 * @property {Capabilities} capabilities - declare the plugin capabilities
 */
export interface Plugin {
  name: string;
  description: string;
  isModule: boolean;

  capabilities: Capabilities;

  tabHandler?: (request: ObjectRequest) => TabResponse;
  printHandler?: (request: ObjectRequest) => PrintResponse;
  objectStatusHandler?: (request: ObjectRequest) => ObjectStatusResponse;
  navigationHandler?: () => Navigation;
  contentHandler?: (request: ContentRequest) => ContentResponse;
  actionHandler?: (request: ActionRequest) => ActionResponse | void;
}

export interface GroupVersionKind {
  group?: string;
  version: string;
  kind: string;
}

/**
 * Capabilities defines the expected interface for declaring what an Octant plugin can do.
 */
export interface Capabilities {
  supportPrinterConfig?: GroupVersionKind[];
  supportPrinterStatus?: GroupVersionKind[];
  supportPrinterItems?: GroupVersionKind[];
  supportObjectStatus?: GroupVersionKind[];
  supportTab?: GroupVersionKind[];
  actionNames?: string[];
}

export interface Navigation {
  module?: string;
  title: string;
  path: string;

  children?: Navigation[];
  iconName?: string;
  isLoading?: boolean;
}

/**
 * ContentResponse is used by module plugins for rendering custom content views.
 */
export interface ContentResponse {
  content: Content;
}

export interface PathItem {
  title: string;
  url?: string;
}

export interface Content {
  extensionComponent?: Component<ExtensionConfig>;
  viewComponents: View[];
  title: View[];
  buttonGroup?: View;
}

export interface Metadata {
  type: string;
  title?: View[];
  accessor?: string;
}

export interface View {
  metadata: Metadata;
  totalItems?: number;
}
