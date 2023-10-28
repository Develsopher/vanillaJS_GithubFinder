import { API_BASE_URL } from './config.js';

function init() {
  new GithubFinder();
}

class GithubFinder {
  constructor() {
    this.setupElements();
    this.setupEvents();
  }

  // DOM 요소 초기화
  setupElements() {
    this.searchBtnEl = document.querySelector('#search-btn');
    this.searchInputEl = document.querySelector('#search-input');
    this.userInfoEl = document.querySelector('.user-information');
    this.pageEl = document.querySelector('#first-page');
    this.secondPageEl = document.querySelector('#second-page');
    this.cardEl = document.querySelector('.card');
    this.profileInfoEl = document.querySelector('.user-information');
    this.latestReposEl = document.querySelector('#latest-repos');
  }

  // 이벤트 리스너 초기화
  setupEvents() {
    this.searchBtnEl.addEventListener('click', this.onSearch.bind(this));
    this.userInfoEl.addEventListener('click', this.onReset.bind(this));
  }

  showSpinner() {
    document.querySelector('.dimmer').style.display = 'block';
  }

  hideSpinner() {
    document.querySelector('.dimmer').style.display = 'none';
  }

  async onSearch() {
    this.showSpinner();
    const searchId = this.searchInputEl.value;
    if (searchId) {
      const userInfoUrl = `${API_BASE_URL}/users/${searchId}`;
      const userReposUrl = `${API_BASE_URL}/users/${searchId}/repos?sort=created&direction=desc&per_page=7`;
      try {
        const [userData, reposData] = await Promise.all([
          this.getData(userInfoUrl),
          this.getData(userReposUrl),
        ]);
        this.render(userData, reposData);
      } catch (error) {
        console.error(error);
      } finally {
        this.hideSpinner();
      }
    } else {
      this.showAlert('검색어를 입력해주세요.');
      this.hideSpinner();
    }
  }

  async getData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      this.showAlert('존재하지 않는 유저입니다.');
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  render(userData, reposData) {
    // 페이지 넘김 이펙트
    this.cardEl.style.transform = 'translateX(250px)';
    this.pageEl.classList.add('flipped');
    this.cardEl.addEventListener('transitionend', () => {
      if (this.pageEl.classList.contains('flipped')) {
        this.secondPageEl.style.zIndex = '3';
      }
    });

    this.renderUserInfo(userData);
    this.renderRepos(reposData);
  }

  renderUserInfo(userData) {
    const userTemplate = `
      <div id="user-profile" class="user-content content">
        <button id="reset-btn">
          <i class="fa-solid fa-arrow-left"></i>다시 검색하기
        </button>
        <div class="profile-picture">
          <img
            src="${userData.avatar_url}"
            alt="profile-picture"
          />
        </div>
        <div class="profile-info">
          <h2 class="login">${userData.login}</h2>
          <p class="name ${userData.name ? '' : 'd-none'}">${userData.name}</p>
          <div class="follow-info">
            <i class="fa-solid fa-user"></i>
            <p class="followers"><span>${userData.followers}</span>followers</p>
            ·
            <p class="following"><span>${userData.following}</span>following</p>
          </div>
          <p class="company ${
            userData.company ? '' : 'd-none'
          }"><i class="fa-solid fa-building"></i>${userData.company}</p>
          <p class="location ${userData.location ? '' : 'd-none'}">
            <i class="fa-solid fa-location-dot"></i>${userData.location}
          </p>
          <a href="${userData.blog}" target="_blank" class="blog ${
      userData.blog ? '' : 'd-none'
    }">
          <i class="fa-solid fa-house"></i>${userData.blog}
          </a>
        </div>
        <a href="${
          userData.html_url
        }" target="_blank"class="profile-btn">View Profile</a>
      </div>`;

    this.profileInfoEl.insertAdjacentHTML('beforeend', userTemplate);
  }

  renderRepos(reposData) {
    let combinedTemplate = '';
    if (reposData.length > 0) {
      reposData.forEach((repo) => {
        combinedTemplate += `
          <li class="repo-list">
            <p>
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </p>
            <div class="repo-info-wrap">
              <div class="stars repo-info">Stars: ${repo.stargazers_count}</div>
              <div class="watchers repo-info">Watchers: ${repo.watchers_count}</div>
              <div class="forks repo-info">Forks: ${repo.forks_count}</div>
            </div>
          </li>
        `;
      });
    } else {
      combinedTemplate = `<p class="repo-fallback">No Repository Found. 😢</p>`;
    }

    this.latestReposEl.insertAdjacentHTML('beforeend', combinedTemplate);
  }

  onReset(e) {
    if (e.target.matches('#reset-btn')) {
      this.searchInputEl.value = '';
      this.searchInputEl.focus();
      this.pageEl.classList.remove('flipped');
      this.cardEl.style.transform = 'translateX(0px)';
      this.secondPageEl.style.zIndex = '2';

      this.cardEl.addEventListener('transitionend', () => {
        if (!this.pageEl.classList.contains('flipped')) {
          this.profileInfoEl.innerHTML = '';
          this.latestReposEl.innerHTML = '';
        }
      });
    }
  }

  showAlert(message) {
    const helperEl = document.querySelector('.helper-wrap');
    const alertEl = document.createElement('div');
    alertEl.classList.add('helper');
    alertEl.textContent = message;

    helperEl.appendChild(alertEl);
    setTimeout(() => {
      alertEl.remove();
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', init);
