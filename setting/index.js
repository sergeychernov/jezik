import { gettext } from 'i18n'
import { DEFAULT_SETTINGS } from '../constants';

AppSettingsPage({
  state: {
    settingsStorage: {},
    settingsForm: DEFAULT_SETTINGS
  },
  save() {
    this.state.settingsStorage.setItem('settings', this.state.settingsForm);
  },
  build({ settings, settingsStorage }) {
    this.state.settingsStorage = settingsStorage;
    this.state.settingsForm = this.state.settingsStorage.getItem('settings')||DEFAULT_SETTINGS;
    
    return View(
      {
        style: {
          padding: '12px 20px'
        }
      },
      [
        Select({
          label: gettext('native-language'),
          options: [
            {
              name: 'English',
              value: 'en'
            },
            {
              name: 'Русский',
              value: 'ru'
            },
          ],
          value: this.state.settingsStorage.getItem('nativeLanguage'),
          onChange: (val) => {
            this.state.settingsForm.nativeLanguage = val;
            //this.state.settingsStorage.setItem('nativeLanguage', val);
            //          console.log(val)
                    
                  }
        }),
        Button({
              label: 'Save',
              style: {
                fontSize: '12px',
                borderRadius: '30px',
                background: '#D85E33',
                color: 'white'
              },
              onClick: () => {
                this.save();
              }
            })]
    );
  }
})