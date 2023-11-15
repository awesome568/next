fetch('history.txt')
.then(response => response.text())
.then(text => {
  // Split the text into sentences
  var sentences = text.split(/[.!?]/).filter(Boolean);

  // Iterate over sentences
  (async function () {
    for (var i = 0; i < sentences.length; i++) {
      var sentence = sentences[i].trim();
      document.title = sentence;
      history.pushState({}, '', encodeURIComponent(sentence));
      document.body.innerText = "Loading... (" + ((i + 1) / sentences.length * 100).toFixed(1) + "%)";
      await new Promise(r => setTimeout(r, 50));
    }

    // Update UI after loading all sentences
    document.body.innerText = "Loading error 508, check history to fix";
  })();
})
.catch(error => {
  console.error("error: txt not found", error);
  document.body.innerText = "Failed to load";
});
