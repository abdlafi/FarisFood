/* @flow */

import React, { Component } from 'react';
//import fontawesome from 'react-native-fontawesome';
import native_base from '../../../utilities/AllImports/native_base' 
import FontAwesom from '../../../utilities/AllImports/FontAwesom'

export default class FooterBadge extends Component {
  render() {
    return (
        <native_base.Footer>
          <native_base.FooterTab>
            <native_base.Button badge vertical>
              <native_base.Badge><native_base.Text>600</native_base.Text></native_base.Badge>
              <FontAwesom.FontAwesomeIcon icon={ FontAwesom.faHome } />
              <native_base.Text>Apps</native_base.Text>
            </native_base.Button>
            <native_base.Button badge vertical>
              <FontAwesom.FontAwesomeIcon icon={ FontAwesom.faHome } />
              <native_base.Text>Apps</native_base.Text>
            </native_base.Button>
            <native_base.Button badge vertical>
              <FontAwesom.FontAwesomeIcon icon={ FontAwesom.faHome } />
              <native_base.Text>Apps</native_base.Text>
            </native_base.Button>
          </native_base.FooterTab>
        </native_base.Footer>
    );
  }
}
