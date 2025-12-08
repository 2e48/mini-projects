"use strict";

const replacementPairs = document.getElementById("key-inputs");
const newPairs = document.getElementById("new-replacement-pairs");
const sourceText = document.getElementById("text-source");
const runReplacements = document.getElementById("do-replacements");
const outputText = document.getElementById("text-result");
const copyResultButton = document.getElementById("copy-result");

function newReplaceGroup() { 
  const pGroup = document.createElement("p");
  pGroup.className = "grouped";

  const findInput = document.createElement("input");
  findInput.type = "text";
  findInput.placeholder = "find";
  findInput.className = "find-input";
  pGroup.appendChild(findInput);

  const replaceInput = document.createElement("input");
  replaceInput.type = "text";
  replaceInput.placeholder = "replace";
  replaceInput.className = "replace-input";
  pGroup.appendChild(replaceInput);

  const deleteButton = document.createElement("a");
  deleteButton.href = "#";
  deleteButton.className = "button error";
  deleteButton.innerText = "🗑️";
  deleteButton.addEventListener("click", () => {
    replacementPairs.removeChild(pGroup);
  });
  pGroup.appendChild(deleteButton);

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
  console.log(pairs);
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