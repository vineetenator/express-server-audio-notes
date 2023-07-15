// Load the SDK
const AWS = require('aws-sdk')
const Fs = require('fs')

// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
})

const config = {
  // 'Text': 'Hi, my name is Vineet and I am going to present your audio notes',
  'Engine': 'neural',
  'OutputFormat': 'mp3',
  'VoiceId': 'Kajal',
  'LanguageCode': 'en-IN' 
}

const convertToAudio = (textNotes, fileName = 'speech', callbackSuccess) => {
  const params = { 'Text': textNotes, ...config };

  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log(err.code)
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        Fs.writeFile(`./public/audio/${fileName}.mp3`, data.AudioStream, function (err) {
          if (err) {
            return console.log(err)
          }
          console.log("The file was saved!")
          callbackSuccess && callbackSuccess();
        })
      }
    }
  });
}

module.exports.convertToAudio = convertToAudio;