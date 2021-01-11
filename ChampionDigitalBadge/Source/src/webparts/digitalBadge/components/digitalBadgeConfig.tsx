import * as React from 'react';
import {
    PrimaryButton,
    TeamsComponentContext,
    ConnectedComponent,
    Panel,
    PanelBody,
    PanelHeader,
    PanelFooter,
    Input,
    Surface
} from 'msteams-ui-components-react';
import { render } from 'react-dom';
import { TeamsBaseComponent, ITeamsBaseComponentProps, ITeamsBaseComponentState } from './TeamsBaseComponent'
import * as microsoftTeams from "@microsoft/teams-js";
export interface IdigitalBadgeConfigState extends ITeamsBaseComponentState {
    value: string;
}

export interface IdigitalBadgeConfigProps extends ITeamsBaseComponentProps {

}

/**
 * Implementation of Digital Badge configuration page
 */
export class digitalBadgeConfig  extends TeamsBaseComponent<IdigitalBadgeConfigProps, IdigitalBadgeConfigState> {

    public componentWillMount() {
        
        this.updateTheme(this.getQueryVariable('theme'));
        this.setState({
            fontSize: this.pageFontSize()
        });
        
        

        if (this.inTeams()) {
            microsoftTeams.initialize();

            microsoftTeams.getContext((context: microsoftTeams.Context) => {
                this.updateTheme(context.theme);
                this.setState({
                    value: context.entityId
                });
                this.setValidityState(true);
            });

            microsoftTeams.settings.registerOnSaveHandler((saveEvent: microsoftTeams.settings.SaveEvent) => {
                // Calculate host dynamically to enable local debugging
                let host = "https://" + window.location.host;
                microsoftTeams.settings.setSettings({
                    contentUrl: host ,
                    suggestedDisplayName: 'Digital Badge',
                    removeUrl: host + "/digitalBadgeRemove",
                    entityId: this.state.value,

                });
                saveEvent.notifySuccess();
            });

        } else {
            
        }
    }

    public render() {
        return (
            <TeamsComponentContext
                fontSize={this.state.fontSize}
                theme={this.state.theme}
                
            >

                <ConnectedComponent render={(props:any) => {
                    const { context } = props;
                    const { rem, font } = context;
                    const { sizes, weights } = font;
                    const styles = {
                        header: { ...sizes.title, ...weights.semibold },
                        section: { ...sizes.base, marginTop: rem(1.4), marginBottom: rem(1.4) },
                        input: {},
                    }

                    return (
                        <Surface>
                            <Panel>
                                <PanelHeader>
                                </PanelHeader>
                                <PanelBody>
                                </PanelBody>
                                <PanelFooter>
                                </PanelFooter>
                            </Panel>
                        </Surface>
                    );
                }}>
                </ConnectedComponent>
            </TeamsComponentContext >
        );
    }
}