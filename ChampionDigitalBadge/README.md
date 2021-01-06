# Digital Badge App

## Contents
* [Introduction](#Introduction)
* [How it works](#How )
* [Architecture Overview](#Architecture)
* [Prerequisites](#Prerequisites)
* [Install Digital Badge SPFx Package](#Install)
* [Customize configuration](#Customize)
* [Deploy your package to SharePoint](#Deploy)
* [Add Digital Badge tab in Teams](#Add)
* [Add Champions](#Add Champions)
* [Legal](#Legal)



## Introduction / Overview

Digital badge solution is intended to allow Teams Champions to apply a “Champion” badge overlay quickly and easily to their existing profile image and have it populated across Office 365.

The user will be sent a request to accept the badge and update their profile image with digital badge after successful authentication.

## How it works

1. The current version of the Digital badge operates as a Teams app installed locally in your tenant by your tenant administrator. Once installed it can be accessed via ‘+Add a tab’ option at the top of the channel. ***Channel >Add a tab >Digital Badge***
2. Users will need to consent and click “Accept” to allow the application to modify their profile image across all O365 applications.

3. The app installation process will create a SharePoint list, ***Champions List***, to store all users, who are eligible for a digital badge. A local admin is responsible for maintaining this SharePoint list with records of users. All the users from this SharePoint list are eligible for a ‘Digital Badge’. This is a cloud only Office 365 solution and is not supported on premises.

<img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/1.png" alt="Digital Badge Screen" style="width: 100%;">

4. After user clicks “Accept”, the app will display a composite image that will look like:

<img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/2.png" alt="Digital Badge Screen" style="width: 100%;">

5. A successful message will look like:

<img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/3.png" alt="Digital Badge Screen" style="width: 100%;">

6. If a user is not in the SharePoint list, they are notified that they are not qualified for Champion Badge program at this time.

<img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/4.png" alt="Digital Badge Screen" style="width: 100%;">

## Architecture Overview/ User workflow:

<img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/5.png" alt="Digital Badge Screen" style="width: 100%;">

### Prerequisites

To begin with, you will need to ensure access to following:

*  SharePoint Admin Tenant 
*  Digital Badge URL from Git Hub

### Install Digital Badge SPFx package 
1. Download Code / clone from GitHub.

2. If using Existing configuration:

   a. Navigate to folder solution where you cloned and check for “digital-badge.sppkg” package.

### Customize configuration

If desired, Admin can configure to a customized site name OR list name OR Column name in ***"src/webparts/digitalBadge/config/siteconfig.json"***. For customization, follow the below steps:
1. #### Update Config:

<img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/6.png" alt="Digital Badge Screen" style="width: 100%;">

```
· sitename (SharePoint site name)

· list (SharePoint list for maintaining Champions)

· CName (Share Point list Column Name for Champions)
```
When you change the above values in the JSON file, customized SharePoint list is created.

2. #### SharePoint Package creation: The pkg will help us to run the application in the SharePoint as well as in Microsoft Teams. Run the below commands :
```
· gulp serve 

· gulp build

· gulp bundle --ship

· gulp package-solution –ship
```

· Navigate to folder solution, check for ***“digital-badge.sppkg” package.***

### Deploy your Package to SharePoint

  1. Open your SharePoint with admin account and click on the top left corner dots icon.
  
  <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/7.png" alt="Digital Badge Screen" style="width: 100%;">
  
  2. Select Admin from the below image
  
  <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/8.png" alt="Digital Badge Screen" style="width: 100%;">
  
  3. Select SharePoint from below image
  
  <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/9.png" alt="Digital Badge Screen" style="width: 100%;">
  
  4. You will be navigated to the SharePoint admin center as below
  
  <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/10.png" alt="Digital Badge Screen" style="width: 100%;">

  5. Click on More features there on the right you can find Apps click on **Open** there.
  
  <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/11.png" alt="Digital Badge Screen" style="width: 100%;">

  6. Select ***app catalog*** from below image
  
  <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/12.png" alt="Digital Badge Screen" style="width: 100%;">

*If you do not find app catalog, go through below docs to create an app catalog*
Distribute business apps using the <a href='https://docs.microsoft.com/en-us/sharepoint/use-app-catalog'>App Catalog - SharePoint - SharePoint in Microsoft 365 | Microsoft Docs</a>

7. Click on ***Distribute apps for SharePoint*** after clicking on App Catalog
  <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/13.png" alt="Digital Badge Screen" style="width: 100%;">
  
8. Click on ***+New*** after navigating to app’s page

 <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/14.png" alt="Digital Badge Screen" style="width: 100%;">
 
9. Click on *choose file* and select the package you have downloaded and click on ***OK***
 <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/15.png" alt="Digital Badge Screen" style="width: 100%;">
 
10. A pop up with confirmation is displayed. click on ***deploy***
 <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/16.png" alt="Digital Badge Screen" style="width: 100%;">
 
11. Navigate to SharePoint ***admin center*** and under ***advanced options*** select ***API Access***  (you will find unapproved requests here.)
 <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/17.png" alt="Digital Badge Screen" style="width: 100%;">
 
12. Select the pending request and Approve it. (If there are more than one pending request, Approve all the requests)
13. After Approving all pending requests, navigate again to your app’s page and select the app you uploaded. Click on *“Files“* tab on the top and click on ***sync to teams***.

 <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/18.png" alt="Digital Badge Screen" style="width: 100%;">
 
### Add Digital Badge tab in Teams

14. Navigate to Microsoft teams and Select the team for which you want to install digital badge and click on ***+Add a tab*** icon and search for ***Digital Badge*** in the app list and add that as a tab. Select *Save* *For complete reference how to add Teams tab*

 <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/19.jpg" alt="Digital Badge Screen" style="width: 100%;">
           
          Select + Add a tab on the tab bar.

          Select the tab,Digital Badge

          Select Save
         
### Add Champions

1. Find the ***Champion list***:

· Navigate to SharePoint Admin account

· Go to default URL ***`https://<yourtenant>. sharepoint.com/sites/ChampionDigitalBadge/`***

· *If you have customized the site configuration, navigate to your customized site (instead of above default URL)*

· Navigate to ***‘site contents’***

· Find ***“Champions List”*** (This will be the list to maintain the records of all the Champions in your organization)

· *If you have customized the List name, Find your customized List.*


2. Add ***Champions*** to the list:

    · You can add individual Champions here.

    · By default, Tenant Admin is added to the list.

    · *You must give ***Read permissions*** to all the users in the group. For a user to load Digital Badge, ***READ permissions are a MUST.***

    · All the users in this list will be eligible to get a Digital badge. When an eligible user/Champion logs in to their Teams and once they navigate to this app, they will receive a request to accept their digital badge.
    
    <img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/20.jpg" alt="Digital Badge Screen" style="width: 100%;">


3. Grant ***READ permissions*** to User/ Group:

  · Select “Share”

<img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/21.jpg" alt="Digital Badge Screen" style="width: 100%;">

  · Search for the Group or user you want to share Digital Badge with.

<img src="https://github.com/msft-teams/tools/blob/ChampionDigitalBadge/ChampionDigitalBadge/readmeimages/22.jpg" alt="Digital Badge Screen" style="width: 100%;">
  · Share site with User/ Group with Read Permissions

### Legal 
This app template is provided under the MIT License terms. In addition to these terms, by using this app template you agree to the following:

· You are responsible for complying with all applicable privacy and security regulations related to use, collection, and handling of any personal data by your app. This includes complying with all internal privacy and security policies of your organization if your app is developed to be sideloaded internally within your organization.

· Where applicable, you may be responsible for data related incidents or data subject requests for data collected through your app.

· Any trademarks or registered trademarks of Microsoft in the United States and/or other countries and logos included in this repository are the property of Microsoft, and the license for this project does not grant you rights to use any Microsoft names, logos or trademarks outside of this repository. Microsoft's general trademark guidelines can be found here.

· Use of this template does not guarantee acceptance of your app to the Teams app store. To make this app available in the Teams app store, you will have to comply with the submission and validation process, and all associated requirements such as including your own privacy statement and terms of use for your app.

**Contributing**

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the

instructions provided by the bot. You will only need to do this once across all repos using our CLA. This project has adopted the Microsoft Open Source Code of Conduct. For more information see the Code of Conduct FAQ or contact opencode@microsoft.com with any additional questions or comments.

Disclaimer
THIS CODE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.
