# movie world  ![GitHub release](https://img.shields.io/github/release/ajeetx/movie.svg?style=for-the-badge) ![Maintenance](https://img.shields.io/maintenance/yes/2021.svg?style=for-the-badge)

[![Build Status](https://travis-ci.org/AJEETX/movie.svg?branch=master)](https://travis-ci.org/AJEETX/movie) |![GitHub Release Date](https://img.shields.io/github/release-date/ajeetx/movie.svg)| [![.Net Framework](https://img.shields.io/badge/DotNet-4.5-blue.svg?style=plastic)](https://www.microsoft.com/en-au/download/details.aspx?id=30653)| [![nodejs](https://img.shields.io/badge/Node-js-blue.svg?style=plastic)](https://nodejs.org/en/) | ![GitHub language count](https://img.shields.io/github/languages/count/ajeetx/movie.svg) | ![GitHub top language](https://img.shields.io/github/languages/top/ajeetx/movie.svg) |![GitHub repo size in bytes](https://img.shields.io/github/repo-size/ajeetx/movie.svg) 
| ---          | ---        | ---      | ---  | ---        | --- | --- | 

---------------------------------------
##  Nodejs plus Dotnet SelfHost webapi

```
nodejs with self-hosted webapi with token authentication with async.parallel.   
```
### Steps to install and setup

> Kindly close/download the repository to an empty folder location

> There are 2 parts to the repository: 
> 
| # | application type | technology | description |
| --- | --- | ---| ---|
| a | Self-hosted webapi | [![.Net Framework](https://img.shields.io/badge/DotNet-4.5-blue.svg?style=plastic)](https://www.microsoft.com/en-au/download/details.aspx?id=30653) |  backend processing logic|
|b| Nodejs app  | [![nodejs](https://img.shields.io/badge/Node-js-blue.svg?style=plastic)](https://nodejs.org/en/)| User interactive application |


> > (a) Self-hosted webapi : 	install [![.Net Framework](https://img.shields.io/badge/DotNet-4.5-blue.svg?style=plastic)](https://www.microsoft.com/en-au/download/details.aspx?id=30653)

-	Go to  webapi folder location
-	Open the solution file **SelfHostApi.sln** in Visual Studio 2017 
-	Run the project **SelfHostApi**

> > (b) Nodejs app : install  [![nodejs](https://img.shields.io/badge/Node-js-blue.svg?style=plastic)](https://nodejs.org/en/)

-  Kindly open VSCode to the folder location.
-	 Open VSCode command-line interface/terminal.
-	 Terminal points to same folder location where server.js file is located.
-	 On Terminal run below commands with admin privilege: 
```
> npm init          //initialise 
> npm install async express nodemon request --save      // install dependencies
> nodemon server.js     // go
```
If the Terminal displays message comes up as "listening on port 3000".

The server has started successfully. 

Please open a chrome browser and run "localhost:3000" url.
```
happy coding  :)
```
## Features
-	simple token-based authentication
-	search cheapest movie
-	search movie by id 

### Support or Contact

Having any trouble? Check out our [documentation](https://github.com/AJEETX/movie/blob/master/README.md) or [contact support](mailto:ajeetkumar@email.com) and we’ll help you sort it out.


[![HitCount](http://hits.dwyl.io/ajeetx/movie/projects/2.svg)](http://hits.dwyl.io/ajeetx/movie/projects/2) | ![GitHub contributors](https://img.shields.io/github/contributors/ajeetx/movie.svg?style=plastic)|![license](https://img.shields.io/github/license/ajeetx/movie.svg?style=plastic)|
 | --- | --- | ---|


