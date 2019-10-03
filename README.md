# Gremlin

> A FluidSynth startup service and web interface for Raspberry Pi

## What it does

Gremlin will turn your Raspberry Pi into a portable synth. Just plug in a MIDI keyboard, power up the Pi, and once it's finished booting you can play your keyboard and hear the output through your headphone jack or wherever you route your Raspberry Pi's audio output to.

### Features

- Starts FluidSynth on system boot
- Opens a session on port 9987 to control FluidSynth
- Starts a web server and Node.js application you can access to change SF2 files
- Connects a MIDI controller input (client 128) to FluidSynth output (client 20)
- Plays a chime when it's fully loaded
- Change soundfounts using physical controls

## Requirements

- A Raspberry Pi (tested on Raspberry Pi Model 2 B and higher) running Raspbian (tested on a headless Pi 2 running Raspian Lite headless)
- Wifi capability for your Pi (a Wifi dongle works great otherwise you'll need to be wired in using the ethernet cable to connect to the web interface)
- A way to access your Pi over the internet or a local network (I suggest setting up a Tinc VPN)
- FluidSynth and alsa installed
- Node and a web server like Nginx installed on your Pi (tested with Node 10.16.0)

## Setting up your Raspberry Pi

A tutorial on how to set up your Raspberry Pi to work with Gremlin is in the works

TODO: *__Add link to tutorial here__*

## Installation

TODO: Add installation instructions

## Credits

Inspiration: [http://andrewdotni.ch/blog/2015/02/28/midi-synth-with-raspberry-p/](http://andrewdotni.ch/blog/2015/02/28/midi-synth-with-raspberry-p/)
Service and start scripts: https://github.com/MarquisdeGeek/FluidPi
