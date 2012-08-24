// SAMPLE
this.manifest = {
  "name": "FancyTube",
  "settings": [
    {
      "tab": i18n.get("information"),
      "group": i18n.get("login"),
      "name": "username",
      "type": "text",
      "label": i18n.get("username"),
      "placeholder": i18n.get("x-characters"),
      "default": "My Username"
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
      "enableKey": "username",
      "enableValue": function (string) {
        return string.length > 0;
      }
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
      "step": 5
    },
    {
      "tab": i18n.get("information"),
      "group": i18n.get("login"),
      "name": "additional_information",
      "type": "textarea",
      "label": "Additional Information:",
      "placeholder": i18n.get("x-characters"),
      "default": ""
    },
    {
      "tab": i18n.get("information"),
      "group": i18n.get("logout"),
      "name": "myButton",
      "type": "pushButton",
      "label": i18n.get("disconnect"),
      "value": i18n.get("logout"),
      "enableKey": "username",
      "enableValue": function (string) {
        return string.length > 0;
      }
    },
    
    
    
    {
      "tab": i18n.get("information"),
      "group": i18n.get("login"),
      "name": "myLabel",
      "type": "label",
      "label": i18n.get("description")
    },
    
    /*
    {
      "tab": i18n.get("information"),
      "group": i18n.get("logout"),
      "name": "myCheckbox",
      "type": "checkbox",
      "label": i18n.get("enable")
    },
    
    {
      "tab": "Details",
      "group": "Sound",
      "name": "noti_volume",
      "type": "slider",
      "label": "Notification volume:",
      "max": 1,
      "min": 0,
      "step": 0.01,
      "display": true,
      "displayModifier": function (value) {
        return (value * 100).floor() + "%";
      }
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
      }
    },
    {
      "tab": "Details",
      "group": "Food",
      "name": "myPopupButton",
      "type": "popupButton",
      "label": "Soup 1 should be:",
      "options": [
        ["hot", "Hot and yummy"],
        ["cold"]
      ]
    },
    {
      "tab": "Details",
      "group": "Food",
      "name": "myListBox",
      "type": "listBox",
      "label": "Soup 2 should be:",
      "options": [
        ["hot", "Hot and yummy"],
        ["cold"]
      ]
    },
    {
      "tab": "Details",
      "group": "Food",
      "name": "myRadioButtons",
      "type": "radioButtons",
      "label": "Soup 3 should be:",
      "options": [
        ["hot", "Hot and yummy"],
        ["cold"]
      ]
    }*/
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