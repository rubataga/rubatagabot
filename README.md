**This is rubatagabot.**

Big thanks to Balogun Wahab (https://medium.com/@03balogun) for the code for the initial bot. Here's the link to the article which goes over everything: https://medium.com/@03balogun/building-an-instagram-bot-using-nodejs-puppeteer-and-firebase-28ebb93784d6

Also, thanks to LevPasha for the Instagram-API(https://github.com/LevPasha/Instagram-API-python).



**<<< WHAT DOES RUBATAGABOT DO?>>>**

Typically, how botting on Instagram works is you give a third-party your login info/password and they run a bot that makes your account like and comment on a whole bunch of posts under a certain hashtag. I wanted to make my own bot so that:

1) I didn't have to give away my private Instagram username / password
2) I could get comments on my own posts (comments that I chose)
3) I could do this completely free.



**<<< HOW DOES RUBATAGABOT WORK? >>>**

I use a service called Heroku, which lets you host things for free (meaning that I can run the bot without having my PC always on). I created a GitHub repo (which is what this is) and Heroku automatically copies everything from here to its service. Then, it runs the bot to my custom settings. 

rubatagabot uses something called puppeteer (https://github.com/GoogleChrome/puppeteer) which allows it to open up the Chrome web browser. Then, it logs in to the online version of Instagram, navigates to a url, and likes the posts.



**<<< What I added >>>**

Like I mentioned before, a great deal of this bot would not have been possible without the original one I found. However, because it was not fully to my satisfaction, I added on to the bot. Here's what I did:

~ I made it so that there is a bit more customisation available.
~ I made it possible to run the bot on Heroku.
~ I added the commenting functionality.
~ I added the ability to target profiles and like the posts on those rather than just hashtag feeds.

As I continue on with this bot, my ambition is to give it DM command functionality (that is, send a certain DM message to the bot account, and it will respond accordingly). 
