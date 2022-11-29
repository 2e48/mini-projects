import { reactive, html } from 'https://cdn.skypack.dev/@arrow-js/core';

const appElement = document.getElementById('app');

const data = reactive({
  items: []
})

function addItem(e) {
  e.preventDefault()
  const input = document.getElementById('new-item');
  const words = input.value.split(',');

  data.items = [];
  words.forEach(word => {
    let wtrim = word.trim();
    let s = data.items.find(item => item.word === wtrim)

    if (s != undefined) {
      s.count += 1;
    } else {
      data.items.push({
        word: wtrim,
        count: 1,
      });
    }
  });

  makeBigBlob(data.items);
}

function makeBigBlob(words) {
  let list = words;
  const pre = document.getElementById('combinations');

  list.sort((a, b) => a.count < b.count);
  let string = list.reduce((accumulator, value) => accumulator + value.word + ', ', '');

  pre.innerHTML = string;
}

html`
<h2>input</h2>
<form @submit="${addItem}">
  <textarea type="text" id="new-item" cols="50" rows="10"></textarea>
  <button>Add</button>
</form>

<h2>stuff</h2>
<ul>
  ${() => data.items.map(
  item => html`<li>${item.word} (${item.count})</li>`
)}
</ul>

<p id="combinations">stuff will go here</p>
`(appElement);