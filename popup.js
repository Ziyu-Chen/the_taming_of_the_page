// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


let scrollButton = document.getElementById('scroll');

const keepScrollingCode = "const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));};const scroll = async () => {let position = 0;while (true) {await sleep(1000);window.scroll(0, position);if (position > document.body.scrollHeight) {position = 0;} else {position += 100;};};}; scroll();"


// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

scrollButton.onclick = function() {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    for (const tab of tabs) {
      console.log(tab)
      chrome.tabs.executeScript(
        tab.id,
        {code: keepScrollingCode}
      );
    }
  });
};

