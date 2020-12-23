<!-- PROJECT SHIELDS -->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sQuiz-2/Core">
    <img src="images/logo.png" alt="Logo" width="80" height="103">
  </a>

  <h3 align="center">sQuiz</h3>

  <p align="center">
    <a href="https://squiz.gg">View</a>
    ·
    <a href="https://github.com/sQuiz-2/Core/issues">Report Bug</a>
    ·
    <a href="https://github.com/sQuiz-2/Core/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#twitch-authentication">Twitch Authentication</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contributors">Contributors</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

sQuiz.gg is an online multiplayer quiz about general culture. 


### Built With

* [Expo](https://expo.io/)
* [Adonis](https://preview.adonisjs.com/)
* [Socket.io](https://socket.io/)
* ... other awesome projects!



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [Expo](https://docs.expo.io/get-started/installation/)
* [Yarn](https://classic.yarnpkg.com/lang/en/)
* [Docker](https://www.docker.com/)
* [Docker compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sQuiz-2/Core.git
   ```
2. Init the project
   ```sh
   ./scripts/init
   ```
3. Start the project
   ```sh
   yarn start
   ```

### Twitch Authentication

1. Create a Twitch app [here](https://dev.twitch.tv/console/apps/create)
   - Name: sQuiz-dev
   - oAuth redirect URL: https://localhost:19006
   - Category: Website Integration
1. Replace the `TWITCH_CLIENT_ID` in `packages/client/.env`
1. Replace the `TWITCH_CLIENT_ID` and the `TWITCH_CLIENT_SECRET` in `packages/backend/.env`

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/sQuiz-2/Core/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

⚠️ Before starting a pull request, make sure your pull request will be related to an opened issue, if it's not the case please open an issue so we can discuss about it! 😉

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`yarn commit`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTRIBUTORS -->
## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://m4gie.com/"><img src="https://avatars2.githubusercontent.com/u/33150916?v=4?s=100" width="100px;" alt=""/><br /><sub><b>M4gie</b></sub></a><br /><a href="https://github.com/M4gie/sQuiz/commits?author=M4gie" title="Code">💻</a> <a href="#design-M4gie" title="Design">🎨</a> <a href="#infra-M4gie" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/JulesDT"><img src="https://avatars2.githubusercontent.com/u/14008484?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JulesD</b></sub></a><br /><a href="https://github.com/M4gie/sQuiz/commits?author=JulesDT" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kahlys"><img src="https://avatars0.githubusercontent.com/u/23560176?v=4?s=100" width="100px;" alt=""/><br /><sub><b>kahlys</b></sub></a><br /><a href="https://github.com/M4gie/sQuiz/commits?author=kahlys" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

M4gie - [@M4gie_](https://twitter.com/M4gie_)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/sQuiz-2/Core.svg?style=for-the-badge
[contributors-url]: https://github.com/sQuiz-2/Core/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sQuiz-2/Core.svg?style=for-the-badge
[forks-url]: https://github.com/sQuiz-2/Core/network/members
[stars-shield]: https://img.shields.io/github/stars/sQuiz-2/Core.svg?style=for-the-badge
[stars-url]: https://github.com/sQuiz-2/Core/stargazers
[issues-shield]: https://img.shields.io/github/issues/sQuiz-2/Core.svg?style=for-the-badge
[issues-url]: https://github.com/sQuiz-2/Core/issues
[license-shield]: https://img.shields.io/github/license/sQuiz-2/Core.svg?style=for-the-badge
[license-url]: https://github.com/sQuiz-2/Core/blob/main/LICENSE.txt
