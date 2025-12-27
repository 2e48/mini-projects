"use strict";

const replacementPairs = document.getElementById("key-inputs");
const newPairs = document.getElementById("new-replacement-pairs");
const sourceText = document.getElementById("text-source");
const runReplacements = document.getElementById("do-replacements");
const outputText = document.getElementById("text-result");
const copyResultButton = document.getElementById("copy-result");
const presetSelection = document.getElementById("preset-selection");

const defaultPresets = {
  "none": [],
  "single-to-double-brackets": [
    ["{user}", "<user>"],
    ["{<user>}", "{{user}}"],
    ["{char}", "<char>"],
    ["{<char>}", "{{char}}"],
  ],
};

function getTemplate(id) { 
  const template = document.getElementById(id);
  const fragment = document.importNode(template.content, true);

  // a wrapper is needed, as this will return the first child
  // of the <template> like a usual DOM
  return fragment.firstElementChild;
}

function newReplaceGroup(initialFind = "", initialReplace = "") {
  const pGroup = getTemplate("template-replace-pairs");

  let button = pGroup.querySelector("button");
  button.addEventListener("click", () => {
    replacementPairs.removeChild(pGroup);
  });

  if (initialFind !== "") {
    let findInput = pGroup.querySelector(".find-input");
    findInput.value = initialFind;
  }

  if (initialReplace !== "") {
    let replaceInput = pGroup.querySelector(".replace-input");
    replaceInput.value = initialReplace;
  }

  replacementPairs.appendChild(pGroup);
}

function getReplacePairs() { 
  const pGroups = Array.from(replacementPairs.children);

  let replacePairs = [];

  pGroups.forEach(pGroup => {
    const findInput = pGroup.querySelector('.find-input');
    const replaceInput = pGroup.querySelector('.replace-input');

    const findString = findInput?.value || null;
    const replaceString = replaceInput?.value || null;

    replacePairs.push([findString, replaceString]);
  });
  
  return replacePairs;
}

function applyReplacements() { 
  const pairs = getReplacePairs();
  let text = sourceText.value;

  pairs.forEach(([find, replace]) => {
    if (find && replace) {
      text = text.replaceAll(find, replace);
    }
  });

  outputText.value = text;
}

async function copyResult() { 
  const result = outputText?.value || null;

  if (!result) return;

  try {
    await navigator.clipboard.writeText(result);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

newPairs.addEventListener("click", () => newReplaceGroup());
runReplacements.addEventListener("click", () => applyReplacements());
copyResultButton.addEventListener("click", () => copyResult());

newPairs.dispatchEvent(new Event("click"));