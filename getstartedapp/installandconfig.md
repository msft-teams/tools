# Configuration and Installation Instructions

## Summary

This Microsoft Teams app is designed to highlight the [M365 Learning Pathways](https://aka.ms/M365LPDocs) training site inside of Microsoft Teams.  It can be used to highlight other secure web URL's from your SharePoint installation.  We recommend that you keep the tabs to a maximum of 5.  You may wish to remove the [feedback tab](https://aka.ms/AdoptionTools) that we include in our demonstration app.

## First Steps
Download the zip file for this app that contains the following files:
1. manifest.json - this file tells the app what experience to load inside Microsoft Teams
2. color.png - 4 color Microsoft icon
3. outline.png - simple outline Micorosft icon

## Configuring this to work for your tenant

There are a few steps that you need to take to make the application work in your environment.  They are as follows:

### 1. Decision: What tabs / sites do you want to display?
The app can display any secure web URL that you want to include.  What are the priority URL's that you'd like to show. In our demonstration we included the dedicated pages for Microsoft Teams and OneDrive training information, an example IT portal for additional assistance and our own feedback UserVoice instance.  Have handy the full URL that you want to use. 


### 2. Update the JSON File - Tab Identifiers & URL's

Inside the manifest.json there are segments that identify a unique tab ID and the target URL's for the tabs inside the app.  The unique tab ID's can be any set of idenfier text.  We simply used the numeric date and time I was updating that URL. You will need to update the URL's in each section of the JSON to match the active site URL's in your environment (vnextday is a sample tenant name you need to replace, along with the path to the site and page).

### 3. Update the JSON File - Valid Domains

The Valid Domains section is already set up for SharePoint use, and includes the login server and other resources SharePoint may need (based on the SharePoint Framework Teams manifest). If you want to show tabs in your tenant's SharePoint Online installation, you shouldn't need to change this.

When you are done editing the manifest.json file, replace the manifest.json file within the GettingStarted.zip file that you will use to upload this app to your Teams environment.

## Installing in your tenant

### Pre-requisites
You must have rights to upload applications and configure app policies in your Microsoft Teams environment to install & make this app available.

### Next Steps
1.  Upload the app package - Follow the instructions to [upload an app package into Microsoft Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-upload)
1. Assign a Policy - Follow the instructions for [configuring a policy](https://docs.microsoft.com/en-us/MicrosoftTeams/teams-app-setup-policies) to display this app. This app can be pinned to the left rail in Microsoft Teams for the general policy and all users will have access.  Alternatively you an create policies that pin this app based on their Teams onboarding group etc.  


## Version
1.7 January 2020
1.6 November 2019