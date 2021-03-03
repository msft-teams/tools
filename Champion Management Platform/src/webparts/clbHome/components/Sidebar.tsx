import * as React from 'react';
import Button from 'react-bootstrap/esm/Button';
import '../scss/Championleaderboard.scss';
import { Dropdown, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as _ from 'lodash';
import { sp } from "@pnp/sp";
import {
    SPHttpClient,
    SPHttpClientResponse,
    ISPHttpClientOptions
} from '@microsoft/sp-http';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Icon, initializeIcons } from 'office-ui-fabric-react';
import siteconfig from "../config/siteconfig.json";
initializeIcons();
export interface ISidebarStateProps {
    becomec: boolean;
    context?: any;
    onClickCancel: () => void;
    callBack?: Function;
}
interface IUserDetail {
    ID: number;
    LoginName: string;
}
export class ISPLists {
    public value: ISPList[];
}
export class ISPList {
    public Title: string;
    public FirstName: string;
    public LastName: string;
    public Country: string;
    public Status: string;
    public Role: string;
    public Region: string;
    public Points: number;
    public Group: string;
    public FocusArea: string;
}

interface IState {
    currentUser: ISPList;
    list: ISPLists;
    isAddChampion: boolean;
    SuccessMessage: string;
    UserDetails: Array<any>;
    selectedUsers: Array<any>;
    bc: boolean;
    siteUrl: string;
    user: any;
    isLoaded: boolean;
    form: boolean;
    totalUserPointsfromList: number;
    totalUsers: number;
    userRank: number;
    isActive: boolean;
    coutries: Array<any>;
    regions: Array<any>;
    users: Array<any>;
    roles: Array<any>;
    status: Array<any>;
    memberData: any;
    buttonText: any;
    bFlag: boolean;
    isMember: boolean;
    emailValue: string;
    sitename: string;
    inclusionpath: string;
}

export default class Sidebar extends React.Component<ISidebarStateProps, IState> {
    constructor(props: ISidebarStateProps) {
        super(props);
        sp.setup({
            spfxContext: this.props.context
        });

        this.state = {
            user: {},
            bc: this.props.becomec,
            form: false,
            siteUrl: this.props.context.pageContext.web.absoluteUrl.replace(this.props.context.pageContext.web.serverRelativeUrl, ''),
            isLoaded: false,
            list: null,
            isAddChampion: false,
            SuccessMessage: '',
            UserDetails: [],
            currentUser: new ISPList(),
            selectedUsers: [],
            totalUserPointsfromList: 0,
            isActive: false,
            totalUsers: 0,
            userRank: 0,
            coutries: [],
            regions: [],
            users: [],
            roles: [],
            status: [],
            memberData: { region: '', role: '', status: '', country: '' },
            buttonText: "Become a Champion", bFlag: true, isMember: false, emailValue: '',
            sitename: siteconfig.sitename,
            inclusionpath: siteconfig.inclusionPath,
        };
        this.handleInput = this.handleInput.bind(this);
        this._createorupdateItem = this._createorupdateItem.bind(this);
        this._getPeoplePickerItems = this._getPeoplePickerItems.bind(this);
        this._getListData = this._getListData.bind(this);
    }
    public options = (optionArray: any) => {
        let myoptions = [];
        myoptions.push({ 'key': "All", 'text': "All" });
        optionArray.forEach((element: any) => {
            myoptions.push({ 'key': element, 'text': element });
        });
        return myoptions;
    }

    public dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: "auto" },
    };

    public handleInput(event: any, key: string) {
        let user = this.state.currentUser;
        user[key] = event.target.value;
        this.setState({ currentUser: user });
    }

    public componentDidMount() {
        this.props.context.spHttpClient.get(this.state.siteUrl + "/_api/web/lists/GetByTitle('Member List')/fields/GetByInternalNameOrTitle('Region')", SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                response.json().then(regions => {
                    if (!regions.error) {
                        this.props.context.spHttpClient.get(this.state.siteUrl + "/_api/web/lists/GetByTitle('Member List')/fields/GetByInternalNameOrTitle('Country')", SPHttpClient.configurations.v1)
                            // tslint:disable-next-line:no-shadowed-variable
                            .then((response: SPHttpClientResponse) => {
                                response.json().then(coutries => {
                                    if (!coutries.error) {
                                        this.setState({ regions: regions.Choices, coutries: coutries.Choices });
                                    }
                                });
                            });
                    }
                });
            });

        this.props.context.spHttpClient.get(this.state.siteUrl + "/_api/web/lists/GetByTitle('Member List')/fields/GetByInternalNameOrTitle('Group')", SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                response.json().then(roles => {
                    if (!roles.error) {
                        this.props.context.spHttpClient.get(this.state.siteUrl + "/_api/web/lists/GetByTitle('Member List')/fields/GetByInternalNameOrTitle('FocusArea')", SPHttpClient.configurations.v1)
                            // tslint:disable-next-line: no-shadowed-variable
                            .then((response: SPHttpClientResponse) => {
                                response.json().then(status => {
                                    if (!status.error) {
                                        this.setState({ roles: roles.Choices, status: status.Choices });
                                    }
                                });
                            });
                    }
                });
            });
    }

    public componentDidUpdate(prevPro: ISidebarStateProps) {
        if (prevPro != this.props) {
            this.componentWillMount();
        }
    }

    public componentWillMount() {
        this.props.context.spHttpClient.get(this.state.siteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties", SPHttpClient.configurations.v1).then((responseuser: SPHttpClientResponse) => {
            responseuser.json().then((datauser: any) => {
                if (!datauser.error) {
                    this.props.context.spHttpClient.get(this.state.siteUrl + "/_api/web/lists/GetByTitle('Member List')/Items", SPHttpClient.configurations.v1)
                        .then((response: SPHttpClientResponse) => {
                            response.json().then(datada => {
                                let memberDataIds = datada.value.find((d: { Title: string; }) => d.Title.toLowerCase() === datauser.Email.toLowerCase());
                                let memberData = memberDataIds !== undefined ? memberDataIds.ID : 0;
                                if (memberData === 0) this.setState({ emailValue: datauser.Email, isMember: false, buttonText: "Become a Champion", isLoaded: true });
                                else this.setState({ emailValue: datauser.Email, isMember: true, buttonText: "Champion request Already made", isLoaded: true });
                                localStorage.setItem('memberid', memberData);
                                let user = this.state.currentUser;
                                user['FirstName'] = datauser.DisplayName.split(' ')[1];
                                user['LastName'] = datauser.DisplayName.split(' ')[0];
                                user['Title'] = datauser.Email;
                                user['Country'] = datauser.Country;
                                user['Region'] = datauser.Region;
                                user['Group'] = datauser.Group;
                                user['FocusArea'] = datauser.FocusArea;
                                this.setState({ currentUser: user });
                                if (!datada.error) {
                                    let totalchamps: number = 0;
                                    totalchamps = datada.value.filter(x => (x.Role.toLowerCase() === 'champion' || x.Role.toLowerCase() === 'manager') && x.Status.toLowerCase() === 'approved').length;
                                    if (this.state.isMember === true && (memberDataIds.Role == "Champion" || memberDataIds.Role === "Manager") && memberDataIds.Status === 'Approved') this.props.context.spHttpClient.get(this.state.siteUrl + "/" + this.state.inclusionpath + "/" + this.state.sitename + "/_api/web/lists/GetByTitle('Event Track Details')/Items", SPHttpClient.configurations.v1)
                                        .then((responseeventsdetails: SPHttpClientResponse) => {
                                            responseeventsdetails.json().then(eventsdatauser => {
                                                if (!eventsdatauser.error) {
                                                    let presentuser = eventsdatauser.value.filter((x: { MemberId: any; }) => x.MemberId === datada.value.find((d: { Title: string; }) => d.Title.toLowerCase() === datauser.Email.toLowerCase()).ID);
                                                    let memberids: any = _.uniqBy(eventsdatauser.value, "MemberId");
                                                    let counts = _.countBy(eventsdatauser.value, "MemberId");
                                                    let memcount: Array<any> = [];
                                                    if (presentuser.length === 0 && memberData !== 0) {
                                                        const listDefinition: any = {
                                                            "Title": 'Event Moderator',
                                                            "EventId": 1,
                                                            "MemberId": memberData,
                                                            "DateofEvent": new Date(),
                                                            "Count": 10,
                                                        };
                                                        const spHttpClientOptions: ISPHttpClientOptions = {
                                                            "body": JSON.stringify(listDefinition)
                                                        };
                                                        if (true) {
                                                            const url: string = "/" + this.state.inclusionpath + "/" + this.state.sitename + "/_api/web/lists/GetByTitle('Event Track Details')/items";
                                                            this.props.context.spHttpClient.post(this.state.siteUrl + url, SPHttpClient.configurations.v1, spHttpClientOptions);
                                                            memcount.push({ "id": memberData, "count": 10 });
                                                        }
                                                    }
                                                    for (let i = 0; i < memberids.length; i++) {
                                                        if (datada.value.findIndex((v: { ID: any; }) => v.ID === memberids[i].MemberId) !== -1) {
                                                            let totalUserPoints = 0;
                                                            eventsdatauser.value.filter((z: any) => z.MemberId === memberids[i].MemberId).map((z: any) => { totalUserPoints = totalUserPoints + z.Count; });
                                                            memcount.push({
                                                                "id": memberids[i].MemberId, "count": totalUserPoints
                                                            });
                                                        }
                                                    }

                                                    let pointsTotal = 0;
                                                    let rank: number;
                                                    memcount.sort((x, y) => y.count - x.count).map((x: any, ind: number) => {
                                                        if (x.id === datada.value.find((d: { Title: string; }) => d.Title.toLowerCase() === datauser.Email.toLowerCase()).ID) {
                                                            rank = ind + 1;
                                                            pointsTotal = x.count;
                                                        }
                                                    });
                                                    this.setState({ user: datauser, isLoaded: true, totalUserPointsfromList: pointsTotal, totalUsers: totalchamps, userRank: rank });
                                                    if (presentuser.length === 0) {
                                                        this.props.callBack();
                                                    }
                                                }
                                            });
                                        });
                                }
                            });
                        });
                }
            });
        });

    }

    public onRenderCaretDown = (): JSX.Element => {
        return <span></span>;
    }

    public async _createorupdateItem() {
        let usersave = this.state.currentUser;
        usersave.Country = this.state.memberData.country;
        usersave.Region = this.state.memberData.region;
        usersave.FocusArea = this.state.memberData.focusarea;
        usersave.Group = this.state.memberData.group;
        usersave.Role = "Champion";
        usersave.Status = "Un Approved";

        const spHttpClientOptions: ISPHttpClientOptions = {
            "body": JSON.stringify(usersave)
        };

        let flag = await this._getListData(usersave.Title);
        if (flag == 0) {
            const url: string = "/_api/web/lists/GetByTitle('Member List')/items";
            if (this.props.context)
                this.props.context.spHttpClient.post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
                    .then((response: SPHttpClientResponse) => {
                        if (response.status === 201) {
                            alert("Data Added successfully");
                            { this.props.onClickCancel(); }
                        } else {
                            alert("Response status " + response.status + " - " + response.statusText);
                        }
                    });
        }
        else {
            alert("Record Already Exist");
            { this.props.onClickCancel(); }
        }
        this.setState({
            currentUser: new ISPList()
        });
        this.setState({ isActive: !this.state.isActive, form: !this.state.form });
    }

    private async _getListData(email: any): Promise<any> {
        return this.props.context.spHttpClient.get("/_api/web/lists/GetByTitle('Member List')/Items", SPHttpClient.configurations.v1)
            .then(async (response: SPHttpClientResponse) => {
                if (response.status === 200) {
                    let flag = 0;
                    await response.json().then((responseJSON: any) => {
                        let i = 0;
                        while (i < responseJSON.value.length) {
                            if ((responseJSON.value[i].Title).toLowerCase() == email.toLowerCase()) {
                                flag = 1;
                                return (flag);
                            }
                            i++;
                        }
                        return (flag);
                    });
                    return (flag);
                }
            });
    }

    public addDefaultSrc(ev) {
        ev.target.src = require("../imgs/PersonPlaceholder.png");
    }

    private _getPeoplePickerItems(items: any[]) {
        let userarr: IUserDetail[] = [];
        items.forEach(user => {
            userarr.push({ ID: user.id, LoginName: user.loginName });
            user['FirstName'] = user.text.split(',')[1];
            user['LastName'] = user.text.split(',')[0];
            user['Title'] = user.loginName.split('|')[2];
            this.setState({ currentUser: user });
        });
        this.setState({ UserDetails: userarr });
    }

    public filterUsers(type: string, value: any) {
        if (value.target.innerText !== "All") {
            this.setState({ memberData: { ...this.state.memberData, [type]: value.target.innerText } });
        }
    }

    public render() {
        return (
            <div className="Championleaderboard">
                {this.state.isLoaded && <div className="sidenav">
                    <div>
                        <img src={'/_layouts/15/userphoto.aspx?username=' + this.state.emailValue} className="profilepic" onError={this.addDefaultSrc} />
                        <div className="championname"> {this.state.currentUser.LastName} {this.state.currentUser.FirstName}</div>
                    </div>
                    {!this.state.bc && !this.state.form && <div>
                        <div className="pointcircle">
                            <div className="insidecircle">
                                <div className="pointsscale" >
                                    <Icon iconName="FavoriteStarFill" id="star" />{this.state.totalUserPointsfromList}
                                    <div className="points">Points</div>
                                </div>
                                <div className="line"></div>
                                <div className="globalrank">Global Rank <br />
                                    <span className="bold">{this.state.userRank}</span><br />
                                of {this.state.totalUsers} Champions</div>
                            </div>
                        </div>
                    </div>}
                    {this.state.bc && <div>
                        {<Button variant="primary" className="bc-btn" disabled={this.state.isMember ? true : false} onClick={() => this.setState({ form: !this.state.form, isActive: !this.state.isActive })}>
                            <span> {this.state.buttonText}</span>
                        </Button>}

                    </div>}
                    {this.state.form && this.state.isActive && <div>
                        <div className="bc-form">
                            <label htmlFor="fname" className="bc-label">First Name</label>
                            <TextField value={this.state.currentUser.FirstName ? this.state.currentUser.FirstName : ''}
                                onChange={evt => this.handleInput(evt, "FirstName")} />
                            <label htmlFor="lname" className="bc-label">Last Name</label>
                            <TextField value={this.state.currentUser.LastName ? this.state.currentUser.LastName : ''}
                                onChange={evt => this.handleInput(evt, "LastName")} />
                            <label htmlFor="email" className="bc-label">Email Id</label>
                            <TextField value={this.state.currentUser.Title ? this.state.currentUser.Title : ''}
                                onChange={evt => this.handleInput(evt, "Title")} />
                            <label htmlFor="Region" className="bc-label">Region</label>
                            <Dropdown
                                onChange={(event: any) => this.filterUsers('region', event)}
                                placeholder="Select an Region"
                                options={this.options(this.state.regions)}
                                styles={this.dropdownStyles}
                                onRenderCaretDown={this.onRenderCaretDown}
                                defaultValue={this.state.currentUser.Region}
                            />
                            <label htmlFor="Country" className="bc-label">Country</label>
                            <Dropdown
                                onChange={(event: any) => this.filterUsers('country', event)}
                                placeholder="Select an Country"
                                options={this.options(this.state.coutries)}
                                styles={this.dropdownStyles}
                                onRenderCaretDown={this.onRenderCaretDown}
                                defaultValue={this.state.currentUser.Country}
                            />
                            <label htmlFor="Focus Area" className="bc-label">Focus Area</label>
                            <Dropdown
                                onChange={(event: any) => this.filterUsers('focusarea', event)}
                                placeholder="Select Focus Area"
                                options={this.options(this.state.status)}
                                styles={this.dropdownStyles}
                                onRenderCaretDown={this.onRenderCaretDown}
                                defaultValue={this.state.currentUser.FocusArea}
                            />
                            <label htmlFor="Group" className="bc-label">Group</label>
                            <Dropdown
                                onChange={(event: any) => this.filterUsers('group', event)}
                                placeholder="Select Group"
                                options={this.options(this.state.roles)}
                                styles={this.dropdownStyles}
                                onRenderCaretDown={this.onRenderCaretDown}
                                defaultValue={this.state.currentUser.Group}
                            />
                            <Button className="sub-btn" type="reset" onClick={() => this._createorupdateItem()}>Submit</Button>
                        </div>
                    </div>}
                    <div className="back-btn">
                        <button className=" btn btn-primary back" onClick={this.props.onClickCancel}>Back</button>
                    </div>
                </div>
                }
            </div >
        );
    }
}
