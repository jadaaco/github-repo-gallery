// where profile info appears
const overview = document.querySelector(".overview");
// username
const username = "jadaaco";
// repo list
const repoList = document.querySelector(".repo-list");

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
    const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100/`);
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