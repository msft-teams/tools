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
The app can display any secure web URL that you want to include.  What are the priority URL's that you'd like to show. In our demonstration we included the dedicated pages for Microsoft Teams and OneDrive training information; you can add sites and pages from anywhere in your tenant as long as they're modern.
Have handy the full URL that you want to use. 


### 2. Update the JSON File - Tab Identifiers & URL's

Inside the manifest.json there are segments that identify a unique tab ID and the target URL's for the tabs inside the app.  The unique tab ID's can be any set of idenfier text.  We simply used the numeric date and time I was updating that URL. 

You will need to update the URL's in each section of the JSON to match the active site URL's in your environment. In the sample manifest.json:

 * Replace all instances of &lt;YOUR TENANT&gt; with your tenant name
 * Replace all instances of &lt;LEARNING PATHWAYS SITE&gt; with your learning pathways site 

Notice that the [sample tabs](manifest.json) have two URLs for each page, a contentUrl and a websiteUrl. Any modern SharePoint page in your tenant can be a tab, but you have to get those URLs right. The website URL is just the URL of the SharePoint site or page, but the contentUrl needs to include the teamslogon.aspx page. For example,

https://contoso.sharepoint.com/sites/foo

becomes

https://contoso.sharepoint.com/_layouts/15/teamslogon.aspx?SPFX=true&dest=/sites/foo",

When you are done editing the manifest.json file, replace the manifest.json file within the GettingStarted.zip file that you will use to upload this app to your Teams environment.

## Installing in your tenant

### Pre-requisites
You must have rights to upload applications and configure app policies in your Microsoft Teams environment to install & make this app available.

### Next Steps
1.  Upload the app package - Follow the instructions to [upload an app package into Microsoft Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/apps/apps-upload)
2. Assign a Policy - Follow the instructions for [configuring a policy](https://docs.microsoft.com/en-us/MicrosoftTeams/teams-app-setup-policies) to display this app. This app can be pinned to the left rail in Microsoft Teams for the general policy and all users will have access.  Alternatively you an create policies that pin this app based on their Teams onboarding group etc.  
NOTE:  At this time automatically pinned apps do not appear for Guest users in your tenant.  


## Version
1.7.3 February 2020 - Added web SSO support and wildcard valid domains
1.7 January 2020
1.6 November 2019
