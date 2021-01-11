import * as React from "react";
import * as ReactDom from "react-dom";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "DigitalBadgeWebPartStrings";
import DigitalBadge, { IDigitalBadgeProps } from "./components/DigitalBadge";
import { ThemeStyle } from "msteams-ui-components-react";

export interface IDigitalBadgeWebPartProps {
  description: string;
}

export default class DigitalBadgeWebPart extends BaseClientSideWebPart<IDigitalBadgeWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IDigitalBadgeProps> = React.createElement(
      DigitalBadge,
      {
        description: this.properties.description,
        clientId: "",
        theme: ThemeStyle.Light,
        fontSize: 12,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
