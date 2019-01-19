#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Use text editor to edit the script and type in valid Instagram username/password

from InstagramAPI import InstagramAPI

print("starting bruh.py")

InstagramAPI = InstagramAPI("rubatagabot", "1t6a5jA!")
InstagramAPI.login()                        # login

print("logged in")
                         # array of user_ids. They can be strings or ints
InstagramAPI.direct_message('hey there chieftain', "6370543112")

print("finished")
