
function listenForClicks() {
  document.addEventListener("click", e => {

      function fillRequiredFields(tabs) {
          browser.tabs.insertCSS({ code: hidePage }).then(() => {
              let url = beastNameToURL(e.target.textContent);
              browser.tabs.sendMessage(tabs[0].id, {
                  command: "beastify",
                  beastURL: url
              });
          });
      }

    if (e.target.type === "reset") {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(() => console.error("Error when trying to fill in the fields!"))
        .catch(reportError);
    } else {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(fillRequiredFields)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "/content_scripts/fillTabReqFields.js" })
  .then(listenForClicks)
.catch(reportExecuteScriptError);
