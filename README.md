# homebridge-xbox-one

Homebridge plugin to turn on Xbox One.  Unfortunately, that's all it does at present... hopefully someone figures out the protocol and we can beef this up soon :-)

## Installation

Naturally...
```
npm install -g homebridge-xbox-one
```

## Configuration

Add this to your `~/.homebridge/config.json` as an accessory:
```
{
  "accessory": "Xbox",
  "name": "Xbox",
  "ipAddress": "<Xbox IP address>",
  "liveId": "<Xbox Live ID>"
}
```

## Optional configuration

You can additionally configure the following options as well, defaults are shown

```
  "tries": 5,               // Number of times to send powerOn request
  "tryInterval": 1000,      // Delay between tries
  "waitForLastTry": false,  // Wait for last try to trigger callback (less responsive)
```

## Getting your Xbox One's IP address

On your Xbox, go to Settings > Network > Network Settings > Advanced Settings

## Getting your Live ID

On your Xbox, go to Settings > System > Console info & updates and look under "Xbox Live device ID"
