import dva from "dva";
import { Component } from "react";
import createLoading from "dva-loading";
import history from "@tmp/history";

let app = null;

export function _onCreate() {
  const plugins = require("umi/_runtimePlugin");
  const runtimeDva = plugins.mergeConfig("dva");
  app = dva({
    history,

    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {})
  });

  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });

  app.model({
    namespace: "global",
    ...require("/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/models/global.js")
      .default
  });
  app.model({
    namespace: "list",
    ...require("/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/models/list.js")
      .default
  });
  app.model({
    namespace: "login",
    ...require("/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/models/login.js")
      .default
  });
  app.model({
    namespace: "project",
    ...require("/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/models/project.js")
      .default
  });
  app.model({
    namespace: "setting",
    ...require("/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/models/setting.js")
      .default
  });
  app.model({
    namespace: "user",
    ...require("/Users/chenzilong/workspace/study/ant-design-pro/ant-design-pro-v2/src/models/user.js")
      .default
  });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}