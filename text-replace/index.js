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
const presetAppend = document.getElementById("preset-append");

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
  "regex-single-to-double-brackets": [
    ["/(?<!{)[{<](user|char)[>}](?!})/gi", "{{$1}}"]
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

function replacementPairClick(elem) {
  const button = elem.target.closest("button");
  if (!button) return;

  const pGroup = button.closest(".replacement-pair");
  if (!pGroup) return;

  if (button.classList.contains("pair-toggle")) {
    const isEnabled = pGroup.dataset.enabled === "true";
    pGroup.dataset.enabled = !isEnabled;
    return;
  }
  
  if (button.classList.contains("pair-direction-up")) {
    const prevSibling = pGroup.previousElementSibling;
    if (prevSibling) {
      replacementPairs.insertBefore(pGroup, prevSibling);
    }
    return;
  }
  
  if (button.classList.contains("pair-direction-down")) {
    const nextSibling = pGroup.nextElementSibling;
    if (nextSibling) {
      replacementPairs.insertBefore(pGroup, nextSibling.nextElementSibling); // the fuck
    }
    return;
  }
  
  if (button.classList.contains("pair-swap")) {
    let find = pGroup.querySelector(".find-input");
    let replace = pGroup.querySelector(".replace-input");

    let fValue = find.value;
    let rValue = replace.value;

    find.value = rValue;
    replace.value = fValue;

    return;
  }
  
  if (button.classList.contains("pair-delete")) {
    replacementPairs.removeChild(pGroup);
    return;
  }
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

  function classic(f, r) {
    count += text.split(f).length - 1;
    text = text.replaceAll(f, r);
  }

  pairs.forEach(([find, replace, isEnabled]) => {
    if (!find || !replace || !isEnabled) return;

    // check if the string is regex with optional flags
    // must start AND end with a slash like /this/ (and some flags)
    const isRegexMatch = find.match(/^\/(.+)\/([gimyus]*)$/);

    // regex will require a 'g' flag to do global search
    // might as well give it an option :)
    if (isRegexMatch) {
      try {
        const pattern = isRegexMatch[1]; // (.+)
        const flags = isRegexMatch[2] || ""; // ([gimyus]*)

        const re = new RegExp(pattern, flags);
        const matches = text.match(re);

        if (matches) {
          count += matches.length;
          text = text.replace(re, replace);
        }
      } catch (error) {
        console.error("RegEx Error:", error);
        classic(find, replace);
      }
    } else {
      classic(find, replace);
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

function appendPreset() {
  const selectedPreset = presetSelection.value;
  const pairsFromPreset = defaultPresets[selectedPreset];

  if (selectedPreset === "none") {
    return;
  }

  if (!pairsFromPreset) return;
  if (pairsFromPreset.length < 1) return;

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
    if (!find || !replace || !isEnabled) return;

    let title = `${escapeHtml(find)} -> ${escapeHtml(replace)}`;
    let textForDisplay = '';
    let replacementCount = 0;

    // store the og text first
    let tempText = originalText;

    // checker for find if they're regex
    const isRegexMatch = find.match(/^\/(.+)\/([gimyus]*)$/);
    console.log(isRegexMatch);

    // old logic "refactored" into a helper function
    // as this gets reused for like 2 times.
    function classic(find, replace) {
      // if old logic, then do changes to the og text
      originalText = originalText.replaceAll(find, replace);

      // then do the html visualization of the replacement on the temp
      // but first we need to split the text first, to clean it
      let textFragment = tempText.split(find);
      textFragment = textFragment.map(fragment => escapeHtml(fragment));

      // count the occurrences, ig
      // minus one since it still returns an array of 1 even if nothing matches
      replacementCount = textFragment.length - 1;

      // then we join it with the cleaned html thingies too
      textForDisplay = textFragment.join(
        `<del>${escapeHtml(find)}</del><ins>${escapeHtml(replace)}</ins>`
      );
    }

    if (isRegexMatch) {
      // new logic for regex
      // mostly copy paste from applyReplacements()
      try {
        const pattern = isRegexMatch[1]; // (.+)
        const flags = isRegexMatch[2] || ""; // ([gimyus]*)
        const re = new RegExp(pattern, flags);

        // do the regex replacements
        originalText = originalText.replace(re, replace);

        // then to avoid some "pollution"
        // we will substitute these funky shit for now
        // instead of the actual html tags
        const DEL_S = "!!___DELS___!!";
        const DEL_E = "!!___DELE___!!";
        const INS_S = "!!___INSS___!!";
        const INS_E = "!!___INSE___!!";

        // then do the visualization regex logic
        textForDisplay = tempText.replace(re, match => {
          replacementCount += 1;

          // this will handle if the regex has grouping: /(things)/
          // and if the replace uses $n notation: $1 $2, etc
          const singleRe = new RegExp(re, flags.replace("g", ""));
          const processedReplace = match.replace(singleRe, replace)

          // we will use these unusual html tags
          // so we can replace them later...
          return `${DEL_S}${match}${DEL_E}${INS_S}${processedReplace}${INS_E}`;
        });

        // after which, we will now THEN escape the html
        textForDisplay = escapeHtml(textForDisplay);

        // before doing these "unreplacements" so we can render things
        // back to html
        textForDisplay = textForDisplay
          .replaceAll(DEL_S, "<del>")   // remember the DEL_S?
          .replaceAll(DEL_E, "</del>")
          .replaceAll(INS_S, "<ins>")
          .replaceAll(INS_E, "</ins>");
      } catch (error) {
        console.error("Steps for RegEx Error:", error);
        
        // just use the fallback if shit hits the fan.
        classic(find, replace);
      }
    } else {
      // old logic here
      classic(find, replace);
    }

    if (replacementCount > 0) {
      title += ` <ins>(${replacementCount} changes)</ins>`;
    }

    steps.push([title, textForDisplay]);
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
  const targetToggle = elem.dataset.target;
  const isToggled = elem.dataset.toggled === "true";

  if (isToggled) {
    replacementPairs.classList.remove(`show-${targetToggle}`);
  } else {
    replacementPairs.classList.add(`show-${targetToggle}`);
  }

  elem.dataset.toggled = !isToggled;
}

newPairs.addEventListener("click", () => newReplaceGroup());
runReplacements.addEventListener("click", applyReplacements);
copyResultButton.addEventListener("click", copyResult);

fillPresetSelection();
presetLoad.addEventListener("click", loadPreset);
presetLoad.dispatchEvent(new Event("click"));
presetAppend.addEventListener("click", appendPreset);

replacementPairs.addEventListener("click", (e) => replacementPairClick(e));

showReplacementSteps.addEventListener("click", () => showReplacements());
replaceStepsDialogClose.addEventListener("click", () => replaceStepsDialog.close());
