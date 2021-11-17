import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

function ActionPanel(props) {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    const [data, setData] = useState([])
    const [tabs, setTabs] = useState([])

    return (
        <div>
            <Nav tabs>
                {
                    (tabs)?tabs.map(function(item, i){
                        return <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === i+1 })}
                                onClick={() => { toggle(i+1); }}
                            ></NavLink>
                        </NavItem>
                    }):""
                }
                
            </Nav>
            <TabContent activeTab={activeTab}>
                {
                    (data)?data.map(function(item, i){
                        return <TabPane tabId={i+1}>
                            <Row>
                                <Col sm="12">
                                <h4>Tab {i+1} Contents</h4>
                                </Col>
                            </Row>
                        </TabPane>
                    })
                }

               

            </TabContent>
        </div>
    )
}

export default ActionPanel
