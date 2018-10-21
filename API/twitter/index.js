var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

var languageTranslator = new LanguageTranslatorV2({
  "apikey": "j_cNZaoz_yb8OdT6Pv1JarKVTPvagA2k3nNsPyspeCPG",
  "iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:language-translator:us-south:a/85cedb07b2c2c75dc6c8cf306d5ea0b5:a2c942ab-8e0d-475f-979c-15c7ebf62d6a::",
  "iam_apikey_name": "auto-generated-apikey-b6545b95-72da-4632-96cf-ad2a9cf17206",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/85cedb07b2c2c75dc6c8cf306d5ea0b5::serviceid:ServiceId-5f665d81-fa34-4981-ac38-0ceb936a4e0b",
  "url": "https://gateway.watsonplatform.net/language-translator/api"
});

var parameters = {
  text: 'Hello',
  model_id: 'en-pt'
};

languageTranslator.translate(parameters, function (error, response) {
  if (error)
    console.log(error)
  else
    console.log(JSON.stringify(response, null, 2));
}
);