import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SecondaryButton, IconButton,PrimaryButton,Tr, Th, Table, Panel, PanelBody, PanelFooter, PanelHeader, TBody, THead, Td, connectTeamsComponent } from 'msteams-ui-components-react';
import { MSTeamsIconType, MSTeamsIconWeight, MSTeamsIcon } from 'msteams-ui-icons-react';

export class HomeInternal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyCode: '',
            productionUnit: ''
        };
    }
    componentWillMount() {
       this.setState({
           companyCode: this.getQueryVariable('companycode'),
           productionUnitId: this.getQueryVariable('productionunitid')
        });
    }

    getQueryVariable = (variable) => {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        for (const varPairs of vars) {
            const pair = varPairs.split('=');
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }

    render() {
        const { context } = this.props;
        const { rem, font } = context;
        const { sizes, weights } = font;

        const styles = {
            header: { ...sizes.title, ...weights.semibold },
            section: { ...sizes.title2, marginTop: rem(1.4), marginBottom: rem(1.4) },
            table: { width: rem(80), border: 1 },
        };

        const icons = Object.keys(MSTeamsIconType);
        const rows = [];
        for (var i = 0; i < icons.length; i += 4) {
            var first = icons[i];
            var second = icons[i + 1];
            var third = icons[i + 2];
            var fourth = icons[i + 3];
            rows.push(
                <Tr key={i}>
                    <Td style={{ textAlign: 'right', paddingRight: rem(3.2) }}>{first}</Td>
                    <Td style={{ textAlign: 'center' }}>
                        <MSTeamsIcon
                            tabIndex={0}
                            aria-label={first}
                            iconWeight={MSTeamsIconWeight.Regular}
                            iconType={MSTeamsIconType[first]} />
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                        <MSTeamsIcon
                            tabIndex={0}
                            aria-label={first}
                            iconWeight={MSTeamsIconWeight.Light}
                            iconType={MSTeamsIconType[first]} />
                    </Td>
                    <Td style={{ textAlign: 'right', paddingRight: rem(3.2) }}>{second}</Td>
                    <Td style={{ textAlign: 'center' }}>
                        <MSTeamsIcon
                            tabIndex={0}
                            aria-label={second}
                            iconWeight={MSTeamsIconWeight.Regular}
                            iconType={MSTeamsIconType[second]} />
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                        <MSTeamsIcon
                            tabIndex={0}
                            aria-label={second}
                            iconWeight={MSTeamsIconWeight.Light}
                            iconType={MSTeamsIconType[second]} />
                    </Td>
                    <Td style={{ textAlign: 'right', paddingRight: rem(3.2) }}>{third}</Td>
                    <Td style={{ textAlign: 'center' }}>
                        <MSTeamsIcon
                            tabIndex={0}
                            aria-label={third}
                            iconWeight={MSTeamsIconWeight.Regular}
                            iconType={MSTeamsIconType[third]} />
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                        <MSTeamsIcon
                            tabIndex={0}
                            aria-label={third}
                            iconWeight={MSTeamsIconWeight.Light}
                            iconType={MSTeamsIconType[third]} />
                    </Td>
                    <Td style={{ textAlign: 'right', paddingRight: rem(3.2) }}>{fourth}</Td>
                    <Td style={{ textAlign: 'center' }}>
                        <MSTeamsIcon
                            tabIndex={0}
                            aria-label={fourth}
                            iconWeight={MSTeamsIconWeight.Regular}
                            iconType={MSTeamsIconType[fourth]} />
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                        <MSTeamsIcon
                            tabIndex={0}
                            aria-label={fourth}
                            iconWeight={MSTeamsIconWeight.Light}
                            iconType={MSTeamsIconType[fourth]} />
                    </Td>
                </Tr>
            );
        }

        return (

            <Panel>
                <PanelHeader>
                    <div style={styles.header}>companyCode: {this.state.companyCode} productionUnitId: {this.state.productionUnitId} </div>
                </PanelHeader>
                <PanelBody>
                    <div style={styles.section}>Primary</div>
                    <PrimaryButton
                        autoFocus
                        style={styles.button} >Enabled</PrimaryButton>
                    <PrimaryButton
                        style={styles.button}
                        disabled>Disabled</PrimaryButton>
                    <div style={styles.section}>Secondary</div>
                    <SecondaryButton
                        style={styles.button}>Enabled</SecondaryButton>
                    <SecondaryButton
                        style={styles.button}
                        disabled>Disabled</SecondaryButton>
                    <div style={styles.section}>Icon</div>
                    <IconButton
                        style={styles.button}
                        iconType={MSTeamsIconType.MoreFilled} />
                    <IconButton
                        style={styles.button}
                        iconType={MSTeamsIconType.MoreFilled}
                        disabled />
                    <br />
                    <IconButton
                        style={styles.button}
                        iconType={MSTeamsIconType.ChromeClose} />
                    <IconButton
                        style={styles.button}
                        iconType={MSTeamsIconType.ChromeClose}
                        disabled />
                    <br />
                    <IconButton
                        style={styles.button}
                        iconType={MSTeamsIconType.IllustrationMonkey} />
                    <IconButton
                        style={styles.button}
                        iconType={MSTeamsIconType.IllustrationMonkey}
                        disabled />
                    <div style={styles.section}></div>
                    <Table style={styles.table}>
                        <THead>
                            <Tr>
                                <Th style={{ textAlign: 'right', paddingRight: rem(3.2) }}>Icon Name</Th>
                                <Th style={{ textAlign: 'center' }}>Regular</Th>
                                <Th style={{ textAlign: 'center' }}>Light</Th>
                                <Th style={{ textAlign: 'right', paddingRight: rem(3.2) }}>Icon Name</Th>
                                <Th style={{ textAlign: 'center' }}>Regular</Th>
                                <Th style={{ textAlign: 'center' }}>Light</Th>
                                <Th style={{ textAlign: 'right', paddingRight: rem(3.2) }}>Icon Name</Th>
                                <Th style={{ textAlign: 'center' }}>Regular</Th>
                                <Th style={{ textAlign: 'center' }}>Light</Th>
                                <Th style={{ textAlign: 'right', paddingRight: rem(3.2) }}>Icon Name</Th>
                                <Th style={{ textAlign: 'center' }}>Regular</Th>
                                <Th style={{ textAlign: 'center' }}>Light</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            {rows}
                        </TBody>
                    </Table>
                </PanelBody>
                <PanelFooter>
                </PanelFooter>
            </Panel>
        );

    }

}

const Home = connectTeamsComponent(HomeInternal);

export default connect()(Home);
