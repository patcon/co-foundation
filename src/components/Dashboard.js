import { Pane, Paragraph, Tablist, SidebarTab } from 'evergreen-ui'
import React, { useState } from 'react'

export const Dashboard = () => {
  const [ selectedIndex, setSelectedIndex ] = useState(0)
  const tabs = [
    'Dashboard',
    'Organization',
    'Shares',
    'Employees',
    'Documents',
    'Settings',
  ]

  return (
    <Pane display="flex" height={240}>
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
        {tabs.map((tab, index) => (
          <SidebarTab
            key={tab}
            id={tab}
            onSelect={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
            aria-controls={`panel-${tab}`}
          >
            { tab }
          </SidebarTab>
        ))}
      </Tablist>
      <Pane padding={16} background="tint1" flex="1">
        {tabs.map((tab, index) => (
          <Pane
            key={tab}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
          >
            <Paragraph>Panel {tab}</Paragraph>
          </Pane>
        ))}
      </Pane>
    </Pane>
  )
}