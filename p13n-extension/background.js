chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method === "getUserProfile") {
    let userProfile = {}; // Retrieve the user profile here
    sendResponse({ userProfile: userProfile });
  }
});
