#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Use text editor to edit the script and type in valid Instagram username/password

from InstagramAPI import InstagramAPI

print("starting bruh.py")

ig = InstagramAPI("rubatagabot", "1t6a5jA!")
ig.login()                        # login

print("logged in")
                        

ig.direct_message('hey there chieftain', "6370543112")

print('message sent')
ig.getv2Inbox()

print("inbox accessed")
print(ig.LastResponse.content)

print("finished")


