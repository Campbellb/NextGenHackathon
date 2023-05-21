document.getElementById("addProfileButton").addEventListener("click", function () {
  const profileNameInput = document.getElementById("profileNameInput");
  const ageInput = document.getElementById("ageInput");
  const colorInput = document.getElementById("colorInput");
  const locationInput = document.getElementById("locationInput");

  const profileName = profileNameInput.value;
  const age = ageInput.value;
  const favoriteColor = colorInput.value;
  const location = locationInput.value;

  profileNameInput.value = "";
  ageInput.value = "";
  colorInput.value = "";
  locationInput.value = "";

  chrome.storage.sync.get("profiles", function (data) {
    const profiles = data.profiles || {};
    profiles[profileName] = {
      name: profileName,
      age: age,
      favoriteColor: favoriteColor,
      location: location,
    };
    chrome.storage.sync.set({ profiles: profiles }, function () {
      loadProfiles();
    });
  });
});

function loadProfiles() {
  chrome.storage.sync.get(["profiles", "activeProfile"], function (data) {
    const profiles = data.profiles || {};
    const activeProfile = data.activeProfile || "";

    const profileList = document.getElementById("profileList");
    profileList.innerHTML = "";
    Object.keys(profiles).forEach(function (profile) {
      const profileButton = document.createElement("button");
      profileButton.textContent = profile;
      if (profile === activeProfile) {
        profileButton.classList.add("active");
      }
      profileButton.addEventListener("click", function () {
        chrome.storage.sync.set({ activeProfile: profile }, function () {
          loadProfiles();
        });
      });
      profileList.appendChild(profileButton);
    });

    if (activeProfile) {
      console.log(activeProfile)
      const profileData = document.getElementById("profileData");
      profileData.textContent = JSON.stringify(profiles[activeProfile], null, 2);
    }
  });
}

loadProfiles();
