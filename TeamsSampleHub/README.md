Microsoft Teams Sample Hub overview
=====================================

The Teams Branded Experience (aka Sample Hub), together with custom
line-of-business applications, enable you to quickly present the "art of
the possible" by showcasing the Teams platform and articulating the
value that it can deliver. 

The Sample Hub is a personal-branded landing experience that is pinned to
the Teams mobile app, allowing your organization to provide consolidated
information and the functionality of important first-party and
line-of-business apps to firstline worker employees. Sample Hub can leverage
multiple technologies and capabilities such as the SharePoint Framework
in Teams (SPFx), Microsoft Graph APIs, PowerApps, Web
Apps/HTML/JavaScript, and mobile app pinning to highlight a branded
experience for any user.

The Sample Hub was primarily designed and built as a mobile app and is
currently not optimized for desktop clients.

Sample Hub scenarios
=================


<table>
    <tbody>
        <tr>
            <td class="col-md-8" style="color:blue;" align="center"><b>On shift scenarios</b></td>
            <td rowspan="6"><img src="https://github.com/msft-teams/tools/blob/master/TeamsSampleHub/SampleHub/Source/wwwroot/images/readmeimages/1.png" alt="Sample Hub Screen" style="width: 100%;"></td>
         </tr>
       <tr>
            <td>Employees can view their current shift schedule and current assigned tasks under the Hub tab.</td>
        </tr>
       <tr>
            <td>Employees can view the latest companywide announcements.</td>
        </tr>
       <tr>
            <td>Team members in the same shift, can chat and communicate using Teams chat.</td>
        </tr>
       <tr>
            <td>Employees can communicate and greet new team members using Teams 1:1 chat.</td>
        </tr>
       <tr>
            <td>Employees can communicate and greet new team members using Teams 1:1 chat capability. </td>
        </tr>
       <tr>
            <td>Employees can access other apps such as PayStubs and Rewards through the Sample Hub application. </td>
           <td><img src="https://github.com/msft-teams/tools/blob/master/TeamsSampleHub/SampleHub/Source/wwwroot/images/readmeimages/2.png" alt="Sample Hub Screen"></td>
        </tr>
         <tr>
            <th colspan="2"></th>
         </tr>
        <tr>
            <td align="center"><b>Off shift scenarios</b></td>
            <td rowspan="2"><img src="https://github.com/msft-teams/tools/blob/master/TeamsSampleHub/SampleHub/Source/wwwroot/images/readmeimages/3.png" alt="Optional Title"></td>
         </tr>
       <tr>
            <td>Off shift employees can view their upcoming shift schedule. Off shift employees cannot view and access tasks.</td>
        </tr>
       <tr>
           <td>Off shifts employees do not have access to Learning tab.</td>
           <td><img src="https://github.com/msft-teams/tools/blob/master/TeamsSampleHub/SampleHub/Source/wwwroot/images/readmeimages/4.png" alt="Optional Title"></td>
        </tr>
      </tbody>
</table>

Solution overview
=================

### Architecture

![Architecture](https://github.com/msft-teams/tools/blob/master/TeamsSampleHub/SampleHub/Source/wwwroot/images/readmeimages/5.png)

Prerequisites
-------------

1.  An Azure Active Directory (Azure AD) subscription and the following
    resources:

    -   [Azure
        Service](https://azure.microsoft.com/en-us/services/app-service/)

    -   [Azure App Service
        Plan](https://docs.microsoft.com/en-us/azure/app-service/overview)

    -   [Application
        Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)

2.  [Microsoft Teams
    Shifts](https://docs.microsoft.com/en-us/microsoftteams/expand-teams-across-your-org/shifts/manage-the-shifts-app-for-your-organization-in-teams)
    app enabled in Teams. Users must be a member of a team to access
    Shifts information.

3.  [Microsoft Teams
    Tasks](https://docs.microsoft.com/en-us/microsoftteams/manage-tasks-app)
    app enabled in Teams. Users must be a member of a team to access
    Tasks information.

4.  [OAuth 2.0 identity
    provider](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/authentication/configure-identity-provider)
    configured for Teams. This is required to access a user's profile
    information from Azure AD and Microsoft Graph.

5.  Install your desired custom apps.

![note](https://github.com/msft-teams/tools/blob/master/TeamsSampleHub/SampleHub/Source/wwwroot/images/readmeimages/6.PNG)

Authentication and Single Sign on (SSO)
---------------------------------------

The Sample Hub authentication flow is based on user profile information
stored in Azure AD and accessed using Microsoft Graph.

The Teams [Single Sign-on
API](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-aad-sso)
is currently supported in Teams Developer Preview and will be available
to the general public soon.

[Learn
more](https://docs.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/authentication/auth-flow-tab)
about authentication for Microsoft Tabs and SSO in Teams.

Capabilities overview
---------------------

1.  Sample Hub is an ASP.NET Core MVC application.

2.  Access employee Shifts schedules using [Microsoft Teams Shifts Graph API integration](https://docs.microsoft.com/en-us/graph/api/schedule-list-shifts?view=graph-rest-1.0&tabs=http).

3.  Display employee tasks using [Microsoft Planner Tasks Graph API
    integration](https://docs.microsoft.com/en-us/graph/api/planneruser-list-tasks?view=graph-rest-1.0&tabs=http).

4.  Customize Sample Hub to create a tailored experience. For example:

    -   The announcement feature of the Sample Hub can be integrated with
        our [Company Communicator app
        template](https://docs.microsoft.com/en-us/microsoftteams/platform/samples/app-templates#company-communicator)
        to share your company's the information and notifications within
        the Sample Hub.

    -   [Create Power App
        applications](https://docs.microsoft.com/en-us/learn/modules/get-started-with-powerapps/5-powerapps-create-first)
        and
        [deep-link](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-links)
        to the Sample Hub.

    -   [Build SharePoint Framework application in
        Teams](https://aka.ms/spfx-teams) such as a News app and
        [deep-link](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-links)
        to the Sample Hub.

5.  Retrieve a list of team members in the same shift by using the
    [Microsoft Graph List Members
    API](https://docs.microsoft.com/en-us/graph/api/group-list-members?view=graph-rest-1.0&tabs=http).

6.  Enhance the user chat experience by creating [deep
    links](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-links#generating-a-deep-link-to-a-chat)
    to private chats within the Sample Hub.

7.  The [Microsoft Graph photo
    API](https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0)
    can be called to display a team member's user profile picture.

8.  Get user profile information using the [Microsoft Graph Get User
    API](https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http).

Deployment
----------

### Register your Sample Hub with Azure AD

-   Sign in to the [Azure portal.](https://portal.azure.com)

-   If your account gives you access to more than one tenant, select your account in the upper right corner. Set your portal session to your desired Azure AD tenant

-   Under Azure services on the Sample Hub page, select App registrations.

-   Select New registration from the top navigation bar. You will be taken to the Register an application page.

-   Enter a meaningful application display name in the Name field.

-   Specify who can use the application, as follows:

-   Accounts in any organizational directory (Any Azure Ad directory --Multitenant) and personal Microsoft accounts.

-   Under Authentication, click on Add a platform and select Web. Then enter the redirect URI that will be accepted when returning authentication responses (tokens). 

-   After successfully authenticating users, make sure the redirect URI follows the following format: https://%appDomain%.azurewebsites.net/End. 
    
        - Note, Redirect URI can be set post deployment also, if the appDomain is not available yet.
        
-   Select the Register button. You'll be taken to the app\'s Overview page. Copy the Application (client) ID; you'll
     need it later. Verify that Supported account types is set to Multiple organizations 
     
-   On the side rail in the Manage section, navigate to the "Certificates & secrets" section. In the Client secrets section, click on "+ New client secret". Add a description      (Name of the secret) for the secret and select “Never” for Expires. Click "Add". Once the client secret is created, copy its Value; we will need it later.

-   Navigate to the Authentication page that can be found in the left blade, Under the section that reads Implicit grant, make sure that the check boxes for Access tokens and    ID tokens are checked. 

### Add Microsoft Graph API permissions

You\'ll need to add additional permissions in order to use Microsoft
Graph notifications.

-   On the Overview page, Choose API permissions -\> Add a
    permission

-   Select Microsoft Graph -\> Delegated permissions.

-   Select Group -\> Group.Read.All  (Allows application to read
    shifts, tasks of logged in user).

-   Select Group -\> User.Read.All (Allows application to
    read/write shifts, tasks of logged in user).

-   Select Microsoft Graph -\> Application permissions.

-   Select Application -\> User.ReadWrite.All (Allows
    application to read/write user data).

-   Select Application -\> Directory.Read.All

Please make sure to grant the admin consent for the required permissions.

### Publish your Sample Hub to your Azure subscription using Visual Studio 

-   Download the Sample Hub code from the repository and open in Visual studio
    explorer. 

-   In Visual Studio Solution Explorer, right-click the project and
    choose Publish (or use the Build \> Publish menu item). 

-   In the Publish dialog, select Azure.

-   Choose Azure App Service (Windows) and select the Next
    button.

-   Sign in with you Azure account, if necessary. Select Create a new
    Azure App Service.

-   In the Create Azure App Service (Windows) dialog, the App
    Name, Resource Group, and App Service Plan entry fields
    are populated. You can keep these names or change them. 
-   Complete the necessary app setting values:

        1. Azure client Id (App id).
        2. Deep Link URL and all required app Ids which we need to deep link.
        3. If you have SharePoint Framework app then provide the SharePoint client Id and List Id.        
-   When ready, select Create.

### Create a Sample Hub Teams app manifest

[Create an app package for the Sample Hub
app](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/apps-package).
Apps in Teams are defined by an app manifest JSON file and bundled in an
app package with their icons. You\'ll need an app package to upload and
install your app in Teams, and to publish to either your Line of
Business app catalog or to AppSource.

![Note](https://github.com/msft-teams/tools/blob/master/TeamsSampleHub/SampleHub/Source/wwwroot/images/readmeimages/7.PNG)

### Install the Sample Hub Teams app manifest into Teams

Install the Sample Hub manifest into Teams. [Learn how to distribute Microsoft Teams
app](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/overview).
<br/>
<br/>
<br/>

Legal notice
----------------

This app template is provided under the [MIT
License](https://github.com/msft-teams/tools/blob/master/TeamsSampleHub/LICENSE) terms.
In addition to these terms, by using this app template you agree to the
following:

-   You are responsible for complying with all applicable privacy and
    security regulations related to use, collection and handling of any
    personal data by your app. This includes complying with all internal
    privacy and security policies of your organization if your app is
    developed to be sideloaded internally within your organization.

-   Where applicable, you may be responsible for data related incidents
    or data subject requests for data collected through your app.

-   Any trademarks or registered trademarks of Microsoft in the United
    States and/or other countries and logos included in this repository
    are the property of Microsoft, and the license for this project does
    not grant you rights to use any Microsoft names, logos or trademarks
    outside of this repository. Microsoft's general trademark guidelines
    can be
    found [here](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general.aspx).

-   Use of this template does not guarantee acceptance of your app to
    the Teams app store. To make this app available in the Teams app
    store, you will have to comply with the [submission and validation
    process](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/publish),
    and all associated requirements such as including your own privacy
    statement and terms of use for your app.

Contributing
----------------

This project welcomes contributions and suggestions. Most contributions
require you to agree to a Contributor License Agreement (CLA) declaring
that you have the right to, and actually do, grant us the rights to use
your contribution. For details,
visit [https://cla.microsoft.com](https://cla.microsoft.com/).

When you submit a pull request, a CLA-bot will automatically determine
whether you need to provide a CLA and decorate the PR appropriately
(e.g., label, comment). Simply follow the instructions provided by the
bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of
Conduct](https://opensource.microsoft.com/codeofconduct/). For more
information see the [Code of Conduct
FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact <opencode@microsoft.com> with any additional questions or
comments.
