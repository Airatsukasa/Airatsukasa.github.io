fetch("/data.json").then(response => {
  return response.json();
}).then(data => {
  init(data);
}).catch(error => {
  console.log(error)
})



let nounSection = document.querySelector("#noun-section"),
adjectiveSection = document.querySelector("#adjective-section"),
verbSection = document.querySelector("#verb-section"),
adverbSection = document.querySelector("#adverb-section");


function wordToFuriganaHtml(word) {
  let html = '<div class="word">';
  word.split("/").forEach(w => {
    let k = w.split("_");
    if(k.length == 1) {
      html += `<span>${k[0]}</span>`
    } else {
      html += `<span class="kanji">${k[0]}<div class="furigana">${k[1]}</div></span>`;
    }
  })
  html += "</div>";
  
  return html;
}

function handleVocab(type, data) {
  let typeHTML = "";
  data.vocab[type].forEach((wordArr, idx) => {
    typeHTML += `<div class="word-idx">${idx+1}</div>`;
    typeHTML += wordToFuriganaHtml(wordArr[0]);
    typeHTML += `<div class="meaning">${wordArr[1]}</div>`;
    
    typeHTML += `<div class="sentences">`;
    let sentences = wordArr[2] || [];
    sentences.forEach(sentence => {
      typeHTML += wordToFuriganaHtml(sentence[0]);
      typeHTML += `<div class="translation">${sentence[1]}</div>`;
    })
    typeHTML += `</div>`;
    
    let desc = wordArr[3];
    if(desc) {
      typeHTML += `<div class="word-desc">${desc}</div>`;
    }
    
    if(idx + 1 != data.vocab[type].length) {
      typeHTML += '<div class="rule"></div>';
    }
  })
  console.log(typeHTML, type)
  eval(`${type}Section`).innerHTML += typeHTML;
}

function init(data) {
  //console.log(data)
  let vocab = data.vocab;
  let nouns = vocab.noun;
  handleVocab("noun", data);
  handleVocab("adjective", data);
  handleVocab("verb", data);
  handleVocab("adverb", data);
  /*
  let nounHTML = "";
  nouns.forEach((noun, idx) => {
    nounHTML += `<div class="word-idx">${idx+1}</div>`;
    nounHTML += wordToFuriganaHtml(noun[0]);
    nounHTML += `<div class="meaning">${noun[1]}</div>`;
    
    nounHTML += `<div class="sentences">`;
    let sentences = noun[2] || [];
    sentences.forEach(sentence => {
      nounHTML += wordToFuriganaHtml(sentence[0]);
      nounHTML += `<div class="translation">${sentence[1]}</div>`;
    })
    nounHTML += `</div>`;
    
    let desc = noun[3];
    if(desc) {
      nounHTML += `<div class="word-desc">${desc}</div>`;
    }
    
    if(idx + 1 != nouns.length) {
      nounHTML += '<div class="rule"></div>';
    }
  })
  nounSection.innerHTML += nounHTML;
  */
  
}
