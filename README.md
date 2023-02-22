<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
    <img src="dataChain/application-datachain/public/images/DataChain v1 (Colour-light-blue).svg" alt="Logo" width="180" height="180">
  </a>

  <h3 align="center">Datachain</h3>

  <p align="center">
    My university dissertation project that utilises the Hyperledger Fabric blockchain to allow for the awarding and storing of digital degrees.
    <br />
    <br />
    <a href="https://drive.google.com/file/d/1ZvBKH6Ezdz7gkq5NJTThPwjUGQTCqliJ/view"><strong>- Read Project Report</strong></a>
    <br />
    <a href="https://joethompson.co.uk/projects"><strong>- View Portfolio Overview</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
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
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

### Home Page:
[![homePage][product-screenshot]](https://joethompson.co.uk/projects)

### Student Account Page:
[![homePage][product-screenshot2]](https://joethompson.co.uk/projects)


### Description:
The purpose of the application was to create a prototype which highlights to universities that the adoption of blockchain technology is not only beneficial to their organisation, but also to their past, present, and future students. This is because creating a digital degree brings with it added utility to both students and employers, whilst at the same time helping to prevent qualification fraud.

Datachain makes use of a variety of languages and technologies in order to achieve this. By leveraging the HyperLedger Fabric permissioned blockchain network to deploy custom smart contracts written using the programming language Go, an immutable record of transactions was able to be created, specifically for the distribution and viewing of digital degrees.

This was created with the help of Node.Js and the HyperLedger Fabric blockchain network. Please be aware that a local Hyperledger Fabric blockchain network is required to be running on your computer in order for the site to work as it has not been set up for production purposes. More can be found about this in the getting started.




<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

The technologies I used to build this project are listed below:

* [![JQuery][JQuery.com]][JQuery-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Hyperledger Fabric][Hyperledger]][Hyperledger-url]
* [![Node.JS][NodeJS]][NodeJS-url]
* [![MongoDB][MongoDB]][MongoDB-url]
* [![NPM][NPM]][NPM-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

If you wish to set up the project locally then follow these simple steps below.

### Prerequisites


#### Clone the repo
* Clone the datachain repository
   ```sh
   git clone https://github.com/joethompson1/joethompson.git
   ```

#### NPM
If npm is already installed on your machine then you can skip this step.
If you don't have npm installed then copy and past the line below into terminal.

* Install npm
  ```sh
  npm install -g npm
  ```

#### Docker
If docker is already installed on your machine then you can skip this step.
If you don't have docker installed then copy and past the line below into terminal.

* download and follow the guide on their website
  ```url
  https://docs.docker.com/desktop/install/mac-install/
  ```

<br></br>


### Installation and Set Up of Hyperledger Fabric Blockchain

Follow the steps below to set up and start the Hyperledger Fabric blockchain network locally:


3. Install NPM packages
   ```sh
   npm install
   ```
4. Start the React development server
   ```sh
   npm start
   ```
5. Open the website locally in your browser
   ```
   http://localhost:3000/
   ```



### Installation and Set Up of Front End

Follow the steps below to set up and start the project locally:


1. Go into dataChain/application-datachain/
   ```sh
   cd dataChain/application-datachain/
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the development server
   ```sh
   npm run devStart
   ```
4. Open the website locally in your browser
   ```
   http://localhost:3000/
   ```




<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Joe Thompson 

Email: joe.cl.thompson@gmail.com

Github Link: [https://github.com/joethompson1/joethompson](https://github.com/joethompson1/joethompson)

Project Link: [https://joethompson.co.uk](https://joethompson.co.uk)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: dataChain/application-datachain/public/images/homePage.png
[product-screenshot2]: dataChain/application-datachain/public/images/studentAccountPageWithDegree.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[Hyperledger]: https://img.shields.io/badge/Hyperledger_Fabric-FF0000?style=for-the-badge&logo=Hyperledger&logoColor=black
[Hyperledger-url]: https://www.hyperledger.org/use/fabric/
[NodeJS]: https://img.shields.io/badge/Node.JS-BAB86C?style=for-the-badge&logo=Node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[MongoDB]: https://img.shields.io/badge/MongoDB-000000?style=for-the-badge&logo=MongoDB&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[NPM]: https://img.shields.io/badge/NPM-d90166?style=for-the-badge&logo=npm&logoColor=white
[NPM-url]: https://www.npmjs.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 