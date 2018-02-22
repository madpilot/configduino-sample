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

    this.state = Object.assign({}, CONFIG_DEFAULTS, {
      scan: true,
      tab: TAB_SETTINGS,
      loaded: false
    });

    this.fetchConfig();
  }

  fetchConfig() {
    window.fetch("/config.dat").then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
      }
      return response.text();
    }).then((config) => {
      let decoded = decode(config);
      decoded.scan = false;
      decoded.loaded = true;
      this.setState(decoded);
    }).catch((error) => {
      // Treat an error as a missing config.
    });
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
        <Header />

        <nav>
          <ul className={styles.tabs}>
            <li><a href="#" className={this.state.tab == TAB_SETTINGS ? styles['current-tab'] : styles.tab} onClick={this.changeTab(TAB_SETTINGS).bind(this)}>Settings</a></li>
            <li><a className={this.state.tab == TAB_FIRMWARE ? styles['current-tab'] : styles.tab} href="#" onClick={this.changeTab(TAB_FIRMWARE).bind(this)}>Firmware</a></li>
          </ul>
        </nav>

        <Tab name={TAB_SETTINGS} current={this.state.tab}>
          <Form class={styles.form} onSubmit={(e) => window.alert("Normally, you would save your configuration")}>
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
          <Form class={styles.form} onSubmit={this.uploadFirmware.bind(this)}>
            <Firmware />
            <Button>Upload</Button>
          </Form>
        </Tab>
      </div>
    )
  }
}
