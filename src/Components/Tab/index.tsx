import React, { useState } from 'react';

import {
  TabContainer,
  TabElement,
  TabText
} from './styles';

interface TabProps {
  setState: (state: any) => void;
  options: Option[];
  styles?: Object;
}

interface Option {
  title: string;
  state: any;
}

/**
 * @param Function setState Function responsible for changing tabs
 * @param Array options information
 */
const Tab: React.FC<TabProps> = ({setState, options, styles}) =>
{
  const [activeTab, setActiveTab] = useState(0);

  function renderTabs()
  {
    const tabs = Array();
    options.forEach((option, index) => {
      tabs.push(
        <TabElement
          activeOpacity={0.8}
          onPress={() => {
            setActiveTab(index);
            setState(option.state);
          }}
          key={index}
          style={{
            marginLeft: index > 0 ? 20 : 0,
            borderBottomWidth: index == activeTab ? 1 : 0,
            borderBottomColor: '#686868'
          }}
        >
          <TabText>{option.title}</TabText>
        </TabElement>)
    });

    return tabs;
  }

  return (
    <TabContainer style={styles}>
      {renderTabs()}
    </TabContainer>
  );
}

export default Tab;
