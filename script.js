const GITHUB_API_URL = "https://api.github.com";
// 뭐 어쩌자고 
// !!!!!!!!!! 토큰을 추가해주세요 !!!!!!!!!!
const TOKEN ="";

class User {
    constructor(img, profile_url, public_repos, public_gists, followers, following, since,
        company, location, blog) {
        this.img = img;
        this.profile_url = profile_url;
        this.public_repos = public_repos;
        this.public_gists = public_gists;
        this.followers = followers;
        this.following = following;
        this.since = since;
        this.company = company;
        this.location = location;
        this.blog = blog;
    }
    setData(data) {
        this.img = data.avatar_url;
        this.profile_url = data.html_url;
        this.public_repos = data.public_repos;
        this.public_gists = data.public_gists;
        this.followers = data.followers;
        this.following = data.following;
        this.since = new Date(data.created_at).toLocaleDateString('en-CA');
        this.company = data.company;
        this.location = data.location;
        this.blog = data.blog; 
    }
}

// 사용자의 레포지토리 가져오기
async function getRepos(username) {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos`, {
        headers: {
            Authorization: `token ${TOKEN}`, // 토큰 추가
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    
    // 데이터 렌더링
    renderRepos(data);

    return data;
}

// 사용자 정보 가져오기
async function getUser(username) {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
        headers: {
            Authorization: `token ${TOKEN}`, // 토큰 추가
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    

    const user = new User();
    user.setData(data);

    return user;
}

document.addEventListener("DOMContentLoaded", () => {
    const searchEl = document.getElementById('search');
    console.log(searchEl);  // null이 아닌 값이 출력될 것입니다.

    searchEl.addEventListener("keyup", (e) => {
        if (e.key === "Enter")  {
            const username = searchEl.value.trim();
        
            if (username) {
                getUser(username)
                    .then((data) => {
                        // 유저 레포지토리 가져오기
                        getRepos(username);
                        // 유저 정보 렌더링
                        renderUserInfo(data);
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("유저 정보를 가져오는데 실패했습니다.");
                    });
            }
        }
    });
});


// 사용자 정보 렌더링
function renderUserInfo(user) {
    const imgEl = document.querySelector('.img-container img');
    const profileUrlEl = document.querySelector('.view-btn');
    
    imgEl.src = user.img;
    profileUrlEl.href = user.profile_url;
    
    const publicReposEl = document.getElementById('public-repos');
    const publicGistsEl = document.getElementById('public-gists');
    const followersEl = document.getElementById('followers');
    const followingEl = document.getElementById('following');
    
    publicReposEl.innerText = user.public_repos;
    publicGistsEl.innerText = user.public_gists;
    followersEl.innerText = user.followers;
    followingEl.innerText = user.following;
    
    const companyEl = document.getElementById('company');
    const blogEl = document.getElementById('blog');
    const locationEl = document.getElementById('location');
    const sinceEl = document.getElementById('since');
    
    companyEl.innerText = user.company || "null";
    blogEl.innerText = user.blog || "null";
    locationEl.innerText = user.location || "null";
    sinceEl.innerText = user.since;
}

function renderRepos(data) {
    const repo_container = document.querySelector('.repos-container');

    // // 이전에 렌더링된 데이터가 있다면 삭제
    // if (repo_container.children.length > 0) {
    //     repo_container.innerHTML = '';
    // }

    console.log(repo_container);
    
    data.forEach((data) => {
        const repoEl = document.createElement('figure');
        repoEl.classList.add('repo');

        const repoNameEl = document.createElement('a');
        repoNameEl.classList.add('repo-name');
        repoNameEl.innerText = data.name;
        repoNameEl.href = data.html_url;

        const repoStatsEl = document.createElement('div');
        repoStatsEl.classList.add('repo-stats');
        
        const starEl = document.createElement('span');
        const watcherEl = document.createElement('span');
        const forkEl = document.createElement('span');
        starEl.classList.add('stars');
        watcherEl.classList.add('watchers');
        forkEl.classList.add('forks');

        const blue = document.createElement('span');
        blue.classList.add('blue');
        blue.innerText = "Stars:";
        blue.appendChild(starEl);

        const gray = document.createElement('span');
        gray.classList.add('gray');
        gray.innerText = "Watchers:";
        gray.appendChild(watcherEl);

        const green = document.createElement('span');
        green.classList.add('green');
        green.innerText = "Forks:";
        green.appendChild(forkEl);

        starEl.innerText = data.stargazers_count;
        watcherEl.innerText = data.watchers_count;
        forkEl.innerText = data.forks_count;

        repoStatsEl.appendChild(blue);
        repoStatsEl.appendChild(gray);
        repoStatsEl.appendChild(green);

        repoEl.appendChild(repoNameEl);
        repoEl.appendChild(repoStatsEl);

        repo_container.appendChild(repoEl);
    });
}
