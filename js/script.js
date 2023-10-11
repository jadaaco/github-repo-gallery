/////////////////////////// GLOBAL VARIABLES ///////////////////////////////////
// where profile info appears
const overview = document.querySelector(".overview");
// username
const username = "jadaaco";
// repo list
const repoList = document.querySelector(".repo-list");
// where all repo info appears (container)
const allReposContainer = document.querySelector(".repos");
// where individual repo data
const repoData = document.querySelector(".repo-data");
// "back to repo gallery" button
const backToRepoButton = document.querySelector(".view-repos");
// input with the “Search by name” placeholder
const filterInput = document.querySelector(".filter-repos");




// fetch API JSON data from github page
const getUserData = async function () {
    const fetchUserInfo = await fetch(`https://api.github.com/users/${username}`);
    const userData = await fetchUserInfo.json();
    displayUserInfo(userData);
};

getUserData();

// display user info
const displayUserInfo = function (userData) {
    const info = document.createElement("div");
    info.classList.add("user-info");

    info.innerHTML = `
    <figure>
        <img alt="user avatar" src=${userData.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Bio:</strong> ${userData.bio}</p>
        <p><strong>Location:</strong> ${userData.location}</p>
        <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div>`;
    overview.append(info);
    getRepos();
};

// fetch repos
const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100/`);
    const reposData = await fetchRepos.json();
    displayRepos(reposData);
};

// display repos
const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

// click event to check if 
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        // console.log(repoName);

        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

// display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);

    // added "back to repo gallery" button
    backToRepoButton.classList.remove("hide");
};

// "back to repo gallery" button click event
backToRepoButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    backToRepoButton.classList.add("hide");
});