"use strict";

const replacementPairs = document.getElementById("key-inputs");
const newPairs = document.getElementById("new-replacement-pairs");
const sourceText = document.getElementById("text-source");
const runReplacements = document.getElementById("do-replacements");
const outputText = document.getElementById("text-result");
const copyResultButton = document.getElementById("copy-result");

const presetSelection = document.getElementById("preset-selection");
const presetNew = document.getElementById("preset-new");
const presetLoad = document.getElementById("preset-load");
const presetSave = document.getElementById("preset-save");

let defaultPresets = {
  "none": [],
  "single-to-double-brackets": [
    ["{user}", "<user>"],
    ["{<user>}", "{{user}}"],
    ["<user>", "{{user}}"],
    ["{char}", "<char>"],
    ["{<char>}", "{{char}}"],
    ["<char>", "{{char}}"],
  ],
  "jai-pronouns-to-st": [
    ["{{sub}}", "{{pronoun.subjective}}"],
    ["{{obj}}", "{{pronoun.objective}}"],
    ["{{poss}}", "{{pronoun.pos_det}}"],
    ["{{poss_p}}", "{{pronoun.pos_pro}}"],
    ["{{ref}}", "{{pronoun.reflexive}}"],
  ],
  "st-pronouns-to-jai": [
    ["{{pronoun.subjective}}", "{{sub}}"],
    ["{{pronoun.objective}}", "{{obj}}"],
    ["{{pronoun.pos_det}}", "{{poss}}"],
    ["{{pronoun.pos_pro}}", "{{poss_p}}"],
    ["{{pronoun.reflexive}}", "{{ref}}"],
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

function loadPreset() {
  const selectedPreset = presetSelection.value;
  const pairsFromPreset = defaultPresets[selectedPreset];

  if (selectedPreset === "none") {
    replacementPairs.innerHTML = "";
    newReplaceGroup();
    return;
  }

  if (!pairsFromPreset) return;
  if (pairsFromPreset.length < 1) return;

  replacementPairs.innerHTML = "";
  pairsFromPreset.forEach(([find, replace]) => {
    newReplaceGroup(find, replace);
  });
}

function fillPresetSelection(presets = defaultPresets) {
  Object.keys(presets).forEach(item => {
    presetSelection.innerHTML += `<option value="${item}">${item}</option>`
  })
}

newPairs.addEventListener("click", () => newReplaceGroup());
runReplacements.addEventListener("click", applyReplacements);
copyResultButton.addEventListener("click", copyResult);

fillPresetSelection();
presetLoad.addEventListener("click", loadPreset);
presetLoad.dispatchEvent(new Event("click"));

// newPairs.dispatchEvent(new Event("click"));
