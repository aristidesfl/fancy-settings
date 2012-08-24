// SAMPLE
this.manifest = {
  "name": "FancyTube",
  "settings": [
    {
      "tab": i18n.get("information"),
      "group": i18n.get("logout"),
      "name": "myCheckbox",
      "type": "checkbox",
      "label": i18n.get("enable"),
      "default": false
    },
    
    {
      "tab": i18n.get("information"),
      "group": i18n.get("login"),
      "name": "username",
      "type": "text",
      "label": i18n.get("username"),
      "placeholder": i18n.get("x-characters"),
      "default": "My Username",
      "enableKey": "myCheckbox",
      "enableValue": true
    },
    {
      "tab": i18n.get("information"),
      "group": i18n.get("login"),
      "name": "password",
      "type": "text",
      "label": i18n.get("password"),
      "placeholder": i18n.get("x-characters-pw"),
      "masked": true,
      "default": "",
      "enableKey": "myCheckbox",
      "enableValue": true
    },
    {
      "tab": i18n.get("information"),
      "group": i18n.get("login"),
      "name": "myNumber",
      "type": "number",
      "label": "My Number:",
      "placeholder": "something",
      "default": 45,
      "min": 0,
      "max": 100,
      "step": 5,
      "enableKey": "myCheckbox",
      "enableValue": true
    },
    {
      "tab": i18n.get("information"),
      "group": i18n.get("login"),
      "name": "additional_information",
      "type": "textarea",
      "label": "Additional Information:",
      "placeholder": i18n.get("x-characters"),
      "default": "",
      "enableKey": "myCheckbox",
      "enableValue": true
    },
    {
      "tab": i18n.get("information"),
      "group": i18n.get("logout"),
      "name": "myButton",
      "type": "pushButton",
      "label": i18n.get("disconnect"),
      "value": i18n.get("logout"),
      "enableKey": "myCheckbox",
      "enableValue": true
    },
    
    
    
    {
      "tab": i18n.get("information"),
      "group": i18n.get("login"),
      "name": "myLabel",
      "type": "label",
      "label": i18n.get("description"),
      "enableKey": "myCheckbox",
      "enableValue": true
    },
    
    
    
    
    {
      "tab": "Details",
      "group": "Sound",
      "name": "noti_volume",
      "type": "slider",
      "label": "Notification volume:",
      "max": 100,
      "min": 0,
      "step": 1,
      "display": true,
      "default": 50
    },
    {
      "tab": "Details",
      "group": "Food",
      "name": "myPopupButton",
      "type": "popupButton",
      "label": "Soup 1 should be:",
      "options": [
        ["hot", "Hot and yummy", "one"],
        ["cold", "Cold and ugly", "two"],
        ["cold2", "Cold and ugly 2", "two"],
        ["nothing"]
      ],
      "default": "cold",
      "disabled": false
    },
    
    
    {
      "tab": "Details",
      "group": "Sound",
      "name": "sound_volume",
      "type": "slider",
      "label": "Sound volume:",
      "max": 100,
      "min": 0,
      "step": 1,
      "display": true,
      "displayModifier": function (value) {
        return value + "%";
      },
      "default": 0
    },
    
    {
      "tab": "Details",
      "group": "Food",
      "name": "myRadioButtons",
      "type": "radioButtons",
      "label": "Soup 3 should be:",
      "options": [
        ["hot", "Hot and yummy", "one"],
        ["cold", "Cold and ugly", "two"],
        ["cold2", "Cold and ugly 2", "two"],
        ["nothing"]
      ],
      "default": "cold",
      "disabled": false
    }
  ],
  /*"alignment": [
    [
      "username",
      "password"
    ],
    [
      "noti_volume",
      "sound_volume"
    ]
  ]*/
};