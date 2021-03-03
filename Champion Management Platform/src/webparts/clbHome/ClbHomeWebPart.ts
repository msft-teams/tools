import * as React from "react";
import * as ReactDom from "react-dom";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";

import * as strings from "ClbHomeWebPartStrings";
import ClbHome from "./components/ClbHome";
import { IClbHomeProps } from "./components/IClbHomeProps";

export interface IClbHomeWebPartProps {
  description: string;
}
export default class ClbHomeWebPart extends BaseClientSideWebPart<IClbHomeWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IClbHomeProps> = React.createElement(
      ClbHome,
      {
        description: this.properties.description,
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