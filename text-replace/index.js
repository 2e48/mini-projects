"use strict";

const replacementPairs = document.getElementById("key-inputs");
const newPairs = document.getElementById("new-replacement-pairs");
const sourceText = document.getElementById("text-source");
const runReplacements = document.getElementById("do-replacements");
const showReplacementSteps = document.getElementById("show-replacement-steps");
const outputText = document.getElementById("text-result");
const copyResultButton = document.getElementById("copy-result");
const replaceStatus = document.getElementById("replace-status");

const presetSelection = document.getElementById("preset-selection");
const presetNew = document.getElementById("preset-new");
const presetLoad = document.getElementById("preset-load");
const presetSave = document.getElementById("preset-save");

const replaceStepsDialog = document.getElementById("replace-steps-dialog");
const replaceStepsContainer = document.getElementById("replacement-steps-container");
const replaceStepsDialogClose = document.getElementById("replace-steps-dialog-close");

const toggleToggle = document.getElementById("toggle-toggle");
const toggleDelete = document.getElementById("toggle-delete");
const toggleSwap = document.getElementById("toggle-swap");
const toggleSort = document.getElementById("toggle-sort");

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

  const toggleVisible = toggleToggle.dataset.toggled === "true";
  const deleteVisible = toggleDelete.dataset.toggled === "true";
  const swapVisible = toggleSwap.dataset.toggled === "true";
  const sortVisible = toggleSort.dataset.toggled === "true";

  let deleteButton = pGroup.querySelector("button.pair-delete");
  deleteButton.dataset.visible = deleteVisible;
  deleteButton.addEventListener("click", () => {
    replacementPairs.removeChild(pGroup);
  });

  let toggleButton = pGroup.querySelector("button.pair-toggle");
  toggleButton.dataset.visible = toggleVisible;
  toggleButton.addEventListener("click", () => {
    // it is a string lol, "convert" it to an actual bool first
    const isEnabled = pGroup.dataset.enabled === "true";
    pGroup.dataset.enabled = !isEnabled;
  });

  let swapButton = pGroup.querySelector("button.pair-swap");
  swapButton.dataset.visible = swapVisible;
  swapButton.addEventListener("click", () => {
    let find = pGroup.querySelector(".find-input");
    let replace = pGroup.querySelector(".replace-input");

    let fValue = find.value;
    let rValue = replace.value;

    find.value = rValue;
    replace.value = fValue;
  });

  let sortUpButton = pGroup.querySelector("button.pair-sort.pair-direction-up");
  sortUpButton.dataset.visible = sortVisible;
  sortUpButton.addEventListener("click", () => { 
    const prevSibling = pGroup.previousElementSibling;
    if (prevSibling) {
      replacementPairs.insertBefore(pGroup, prevSibling);
    }
  });
  
  let sortDownButton = pGroup.querySelector("button.pair-sort.pair-direction-down");
  sortDownButton.dataset.visible = sortVisible;
  sortDownButton.addEventListener("click", () => {
    const nextSibling = pGroup.nextElementSibling;
    if (nextSibling) {
      replacementPairs.insertBefore(pGroup, nextSibling.nextElementSibling); // the fuck
    }
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
    const isEnabled = pGroup.dataset.enabled === "true";

    const findString = findInput?.value || null;
    const replaceString = replaceInput?.value || null;

    replacePairs.push([findString, replaceString, isEnabled]);
  });

  return replacePairs;
}

function applyReplacements() {
  const pairs = getReplacePairs();
  let text = sourceText.value;
  let count = 0;

  pairs.forEach(([find, replace, isEnabled]) => {
    if (find && replace && isEnabled) {
      count += text.split(find).length - 1;
      text = text.replaceAll(find, replace);
    }
  });

  outputText.value = text;

  if (count > 0) {
    replaceStatus.innerHTML = `Did ${count} replacements.`;
  } else {
    replaceStatus.innerHTML = "Nothing changed.";
  }
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

function escapeHtml(unsafe) {
  return unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
    .replaceAll("\n", "<br>");
}

function showReplacements() {
  replaceStepsDialog.showModal();
  replaceStepsContainer.innerHTML = "";

  const pairs = getReplacePairs();
  let originalText = sourceText.value;

  // [ [pair, replacementHtml], ..]
  let steps = [];

  pairs.forEach(([find, replace, isEnabled]) => {
    if (find && replace && isEnabled) {
      let title = `${escapeHtml(find)} -> ${escapeHtml(replace)}`;
      let text = '';

      // store the og text first
      let tempText = originalText;

      // before running the replacement
      originalText = originalText.replaceAll(find, replace);

      // then do the html visualization of the replacement on the temp
      // but first we need to split the text first, to clean it
      let textFragment = tempText.split(find);
      textFragment = textFragment.map(fragment => escapeHtml(fragment));

      // count the occurrences, ig
      let replacementCount = textFragment.length;

      // then we join it with the cleaned html thingies too
      text = textFragment.join(
        `<del>${escapeHtml(find)}</del><ins>${escapeHtml(replace)}</ins>`
      );

      if (replacementCount > 1) { 
        title += ` <ins>(${replacementCount - 1} changes)</ins>`;
      }

      steps.push([title, text])
    }
  });

  steps.forEach(([title, content]) => {
    const dGroup = getTemplate("template-replace-steps");

    let summary = dGroup.querySelector(".step-title");
    summary.innerHTML = title;

    let code = dGroup.querySelector(".step-content");
    code.innerHTML = content;

    replaceStepsContainer.appendChild(dGroup);
  });
}

function toggleToggles(elem) {
  const target = elem.dataset.target;
  const toggled = elem.dataset.toggled === "true";

  const targets = document.querySelectorAll(`.replacement-pair .${target}`);

  for (let button of targets) {
    button.dataset.visible = !toggled;
  }

  elem.dataset.toggled = !toggled;
}

newPairs.addEventListener("click", () => newReplaceGroup());
runReplacements.addEventListener("click", applyReplacements);
copyResultButton.addEventListener("click", copyResult);

fillPresetSelection();
presetLoad.addEventListener("click", loadPreset);
presetLoad.dispatchEvent(new Event("click"));

showReplacementSteps.addEventListener("click", () => showReplacements());
replaceStepsDialogClose.addEventListener("click", () => replaceStepsDialog.close());
