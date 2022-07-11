// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var port = null;

chrome.runtime.onInstalled.addListener(({ reason, version }) => {
  console.log("chrome.runtime.onInstalled");
  connect();
});

chrome.windows.onCreated.addListener(({ object}) => {
  console.log("chrome.windows.onCreated");
  connect();
});

function sendNativeMessage(text) {
  console.log("sendNativeMessage()");
  message = {"text": text};
  port.postMessage(message);
}

function onNativeMessage(message) {
  console.log("onNativeMessage()");
  sendNativeMessage(message.text);
}

function onDisconnected() {
  console.log("onDisconnected()");
  port = null;
  connect();
}

function connect() {
  console.log("connect()");
  var hostName = "com.google.chrome.example.echo.mv3";
  if (port != null) {
    console.log("port is already connected.");
  }
  else {
    console.log("connecting new port...");
    port = chrome.runtime.connectNative(hostName);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);  
  }
}
