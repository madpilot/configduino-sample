import { h, Component } from 'preact';

import Tab from 'configduino/components/tab';
import Firmware from 'configduino/components/firmware';
import WifiPanel from 'configduino/components/wifi-panel';
import NetworkPanel from 'configduino/components/network-panel';
import Button from 'configduino/components/button';

import Form from 'configduino/validation/form';

const TAB_SETTINGS = 0;
const TAB_FIRMWARE = 1;

import styles from './app.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = Object.assign({}, {
      encryption: '7',
      dhcp: true,
      
      ssid: '',
      passkey: '',
      deviceName: '',
      staticIP: '',
      staticDNS: '',
      staticGateway: '',
      staticSubnet: '',
    }, {
      scan: true,
      tab: TAB_SETTINGS,
      loaded: false
    });
  }

  update(settings) {
    this.setState(settings);
  }

  changeTab(tab) {
    return((e) => {
      e.preventDefault();
      this.setState({ tab: tab });
    });
  }

  render() {
    return (
      <div id="app" className={styles.container}>
        <header className={styles.header}>
          <h1>Sample Configduino</h1>
        </header>
        <nav>
          <ul className={styles.tabs}>
            <li><a href="#" className={this.state.tab == TAB_SETTINGS ? styles['current-tab'] : styles.tab} onClick={this.changeTab(TAB_SETTINGS).bind(this)}>Settings</a></li>
            <li><a className={this.state.tab == TAB_FIRMWARE ? styles['current-tab'] : styles.tab} href="#" onClick={this.changeTab(TAB_FIRMWARE).bind(this)}>Firmware</a></li>
          </ul>
        </nav>

        <Tab name={TAB_SETTINGS} current={this.state.tab}>
          <Form class={styles.form} onSubmit={(e) => { e.preventDefault(); window.alert("Normally, you would save your configuration") }}>
            <WifiPanel
              {...this.state}
              onUpdate={this.update.bind(this)}
              />

            <NetworkPanel
              {...this.state}
              onUpdate={this.update.bind(this)}
              />

            <Button>Save</Button>
          </Form>
        </Tab>

        <Tab name={TAB_FIRMWARE} current={this.state.tab}>
          <Form class={styles.form} onSubmit={(e) => { e.preventDefault(); alert("Normally this would upload your firmware"); } }>
            <Firmware />
            <Button>Upload</Button>
          </Form>
        </Tab>
      </div>
    )
  }
}
