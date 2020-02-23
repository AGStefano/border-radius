const app = document.getElementById('app');

App();

function App() {
  inputsCreate();
  getInputValue();
}
/** */
function inputsCreate() {
  let input_top = document.createElement('div');
  input_top.setAttribute('class', 'input');

  let input_bottom = document.createElement('div');
  input_bottom.setAttribute('class', 'input');

  var arr = [];
  [0, 1, 2, 3].map(i => {
    let x = arr['input_' + i];
    x = document.createElement('input');
    x.setAttribute('type', 'number');

    arr.push(x);
  });

  arr.map((arr, i) => {
    i <= 1 ? input_top.appendChild(arr) : input_bottom.appendChild(arr);
  });

  app.appendChild(input_top);
  createBox();
  app.appendChild(input_bottom);
}

/** */
function createBox() {
  let box = document.createElement('div');
  box.setAttribute('class', 'box display');

  let inside_box = document.createElement('div');
  inside_box.setAttribute('class', 'inside_box');
  inside_box.setAttribute('contenteditable', 'true');

  let ulElement = document.createElement('ul');

  let arr = [
    { moz: 'topleft', name: 'top-left' },
    { moz: 'topright', name: 'top-right' },
    { moz: 'bottomleft', name: 'bottom-left' },
    { moz: 'bottomright', name: 'bottom-right' }
  ];

  let cssRulesRadius = arr.map((item, p) => ({
    id: p,
    ...item,
    webkit: `-webkit-border-${item.name}-radius: xxpx`,
    mozilla: `-moz-border-radius-${item.moz}: xxpx`,
    border: `border-${item.name}-radius: xxpx;`
  }));

  cssRulesRadius.map((item, p) => {
    let liElementWekit = document.createElement('li');
    liElementWekit.appendChild(document.createTextNode(item.webkit));
    liElementWekit.setAttribute('id', p);
    liElementWekit.setAttribute('class', 'inactive');

    let liElementMozilla = document.createElement('li');
    liElementMozilla.appendChild(document.createTextNode(item.mozilla));
    liElementMozilla.setAttribute('id', p);
    liElementMozilla.setAttribute('class', 'inactive');

    let liElementBorder = document.createElement('li');
    liElementBorder.appendChild(document.createTextNode(item.border));
    liElementBorder.setAttribute('id', p);
    liElementBorder.setAttribute('class', 'inactive');

    ulElement.appendChild(liElementWekit);
    ulElement.appendChild(liElementMozilla);
    ulElement.appendChild(liElementBorder);
  });

  inside_box.appendChild(ulElement);

  box.appendChild(inside_box);

  app.appendChild(box);
}

/** */
function getInputValue() {
  let inputs = document.querySelectorAll('input');

  inputs.forEach((input, i) => {
    input.addEventListener('change', e => {
      changeCSS(e, i);
    });
  });
}

/** */
function changeCSS(e, i) {
  let box = document.getElementsByClassName('box')[0];
  let inside_box = document.getElementsByClassName('inside_box')[0];
  let inside_box_li = document.getElementsByTagName('li');

  let valueRadius = e.srcElement.value;

  for (let l = 0; l < inside_box_li.length; l++) {
    let idLiElement = inside_box_li[l].getAttribute('id');
    let liElementStatus = inside_box_li[l].getAttribute('class');
    let liElementData = inside_box_li[l].getAttribute('data');

    if (
      idLiElement == i &&
      liElementStatus === 'active' &&
      liElementData >= 0
    ) {
      let textInsideLiElement = inside_box_li[l].innerText.replace(
        liElementData,
        valueRadius
      );
      inside_box_li[l].innerHTML = textInsideLiElement;
    }

    if (idLiElement == i && liElementStatus === 'active') {
      inside_box_li[l].innerHTML = inside_box_li[l].innerText.replace(
        'xx',
        valueRadius
      );
    }

    if (idLiElement == i) {
      inside_box_li[l].setAttribute('data', valueRadius);
      let textInsideLiElement = inside_box_li[l].innerText.replace(
        'xx',
        valueRadius
      );
      inside_box_li[l].innerHTML = textInsideLiElement;

      inside_box_li[l].className = 'active';
    }
  }

  switch (i) {
    case 0:
      box.style.borderTopLeftRadius = `${valueRadius}px`;
      break;
    case 1:
      box.style.borderTopRightRadius = `${valueRadius}px`;
      break;
    case 2:
      box.style.borderBottomLeftRadius = `${valueRadius}px`;
      break;
    case 3:
      box.style.borderBottomRightRadius = `${valueRadius}px`;
      break;
  }
}
