#!/usr/bin/env python3

import configparser
from subprocess import call
import os.path
import glob
import sys
import tm1637
from pyky040 import pyky040
from time import sleep

##
# Get config settings
##
config = configparser.ConfigParser()
config.read(os.path.dirname(__file__) + '/../config/physical_controls.ini')

encoder_config = config['encoder']
display_config = config['tm1637']

##
# Constants
##
SOUNDFONT_PATH = config['DEFAULT']['soundfont_path']
# Rotary encoder constants
ECLK = int(encoder_config['clock'])
EDT  = int(encoder_config['data'])
ESW  = int(encoder_config['switch'])
# Display constants
DCLK = int(display_config['clock'])
DDIO = int(display_config['data'])

soundfont_files = glob.glob(SOUNDFONT_PATH + '*.sf2')
current_sound = 0
max_program   = len(soundfont_files) - 1
# Encoder callbacks
def next_sound(position):
    global current_sound
    global max_program
    global soundfont_files
    global display
    if (current_sound + 1) > max_program:
        display.show('max')
    else:
        current_sound += 1
        select_sound(soundfont_files[current_sound], current_sound)

def prev_sound(position):
    global current_sound
    global max_program
    global soundfont_files
    global display
    if (current_sound - 1) < 0:
        display.show('max')
    else:
        current_sound -= 1
        select_sound(soundfont_files[current_sound], current_sound)

def reset_sound():
    global current_sound
    current_sound = 0
    select_sound(soundfont_files[current_sound], current_sound)

def select_sound(filename, filenum):
    global display
    command_string = 'echo "load ' + filename + '" > /dev/tcp/localhost/9988'
    call(command_string, shell=True)
    display_filename = filename.split('/')[-1].replace('.sf2', '')
    display.scroll(filename)
    sleep(2)
    display.number(filenum)

# Init the encoder pins
encoder_1 = pyky040.Encoder(CLK=ECLK, DT=EDT, SW=ESW)

# Setup the options and callbacks for encoder
encoder_1.setup(scale_min=0, scale_max=(len(soundfont_files) - 1), step=1, inc_callback=next_sound, dec_callback=prev_sound, sw_callback=reset_sound)

# Init the display
display = tm1637.TM1637(clk=DCLK, dio=DDIO)

display.scroll('loading')
sleep(10) # Give the rest of the system time to boot up Fluidsynth

# Launch the encoder listener
encoder_1.watch()

while True:
    print('Loaded. Ready to test...')
    sleep(10)
