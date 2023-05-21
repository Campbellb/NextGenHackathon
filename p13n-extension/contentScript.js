// contentScript.js
chrome.storage.local.get(['activeProfile'], function (result) {
  if (result.activeProfile) {
    let userDiv = document.createElement("div");
    userDiv.id = "userProfileData";
    userDiv.style.display = "none";
    userDiv.dataset.profile = JSON.stringify(result.activeProfile);
    document.body.appendChild(userDiv);
  }
});
