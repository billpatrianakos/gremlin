#!/usr/bin.env python3

import configparser
import os.path
from pyky040 import pyky040

config = configparser.ConfigParser()
config.read(os.path.dirname(__file__) + '/../config/physical_controls.ini')

rotary_encoder = config['encoder']
display        = config['tm1637']

##
# Constants
##
SOUNDFONT_PATH = config['DEFAULT']['soundfont_path']
# Rotary encoder constants
ECLK = int(rotary_encoder['clock'])
EDT  = int(rotary_encoder['data'])
ESW  = int(rotary_encoder['switch'])
# Display constants
DCLK = int(display['clock'])
DDT  = int(display['data'])

# Encoder callbacks
def next_sound():
    pass

def prev_sound():
    pass

def reset_sound():
    pass

# Init the encoder pins
encoder_1 = pyky040.Encoder(CLK=17, DT=18, SW=26)

# Setup the options and callbacks (see documentation)
encoder_1.setup(scale_min=0, scale_max=100, step=1, chg_callback=my_callback)

# Launch the listener
encoder_1.watch()

while True:
    print(rotary_encoder['switch'])
    print(display['clock'])
