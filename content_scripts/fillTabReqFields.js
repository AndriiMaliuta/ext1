(() => {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function insertData(data) {
        resetData();
        const beastImage = document.createElement("img");
        beastImage.setAttribute("src", beastURL);
        beastImage.style.height = "100vh";
        beastImage.className = "beastify-image";
        document.body.appendChild(beastImage);
    }

    function resetData() {
        const toRemove = document.querySelectorAll(".to-reset");
        for (const elem of toRemove) {
            elem.remove();
        }
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "beastify") {
            insertBeast(message.beastURL);
        } else if (message.command === "reset") {
            resetData();
        }
    });
})();
