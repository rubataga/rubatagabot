//rubatagabot

class InstagramBot {

    constructor() {
        this.firebase_db = require('./db');
        this.config = require('./config/puppeteer.json');
    }

    async initPuppeter() {
        console.log();
        const puppeteer = require('puppeteer');
        //check if WINDOW variable is true or false
        const WINDOWLESS = process.env.WINDOW ? process.env.WINDOW : this.config.settings.headless;
        var dontShowWindow = WINDOWLESS === 'true'; //check if the windowless variable says true or false
        this.browser = await puppeteer.launch({
            headless: dontShowWindow, //if dontShowWindow is true, then be headless
            args: ['--no-sandbox'],
        });
        this.page = await this.browser.newPage();
        this.page.setViewport({width: 1500, height: 764});
        //this.page.setViewport({width: this.config.settings.window_size.width, height: this.configt.settings.window_size.height});
    }
    //challenge url: https://www.instagram.com/challenge/9986510155/6JAsw4LEzp/


    async visitInstagram() {
        const INSTAUSERNAME = process.env.INSTAUSERNAME? process.env.INSTAUSERNAME : require('./config/instacredentials.json').username;
        const INSTAPASSWORD = process.env.INSTAPASSWORD? process.env.INSTAPASSWORD : require('./config/instacredentials.json').password;
        console.log("USERNAME: " + INSTAUSERNAME);
        console.log("PASSWORD: " + INSTAPASSWORD);
        console.log();
        await this.page.goto(this.config.base_url, {timeout: 60000});
        await this.page.waitFor(2500);
        await this.page.click(this.config.selectors.home_to_login_button);
        await this.page.waitFor(2500);
        //Input username and password to log in
        await this.page.click(this.config.selectors.username_field);
        await this.page.keyboard.type(INSTAUSERNAME);
        await this.page.click(this.config.selectors.password_field);
        await this.page.keyboard.type(INSTAPASSWORD);
        await this.page.click(this.config.selectors.login_button);
        console.log("ATTEMPTING LOGIN");
        await this.page.waitForNavigation({timeout : 0});
        await this.page.waitFor(2500);
        //if a security problem occurs
        //if (this.page.url() != `https://www.instagram.com/#reactivated` && this.page.url() != `https://www.instagram.com/`){
        if (this.page.url() != `https://www.instagram.com/#reactivated` && this.page.url() != `https://www.instagram.com/`){    
            console.log("SECURITY CHALLENGE");
            console.log("CURRENT PAGE URL: " + this.page.url());
            await this.page.waitForSelector(this.config.selectors.security_button, {timeout : 0});
            await this.page.click(this.config.selectors.security_button);
            console.log("SENT EMAIL W/SECURITY CODE");
            const VERIFCODE = process.env.VERIFCODE? process.env.VERIFCODE : this.config.settings.security_code;
            console.log("SECURITY CODE: " + VERIFCODE);
            await this.page.waitFor(2500);
            await this.page.waitForSelector(this.config.selectors.type_security_code, {timeout : 0});
            await this.page.click(this.config.selectors.type_security_code);
            await this.page.waitFor(2500);
            await this.page.keyboard.type(VERIFCODE, {delay: 40});
            console.log("TYPED SECURITY CODE");
            await this.page.click(this.config.selectors.security_button);
            console.log("ENTERED SECURITY CODE");
            await this.page.waitForNavigation({timeout : 0});
            await this.page.waitFor(2500);
            console.log("CURRENT PAGE URL: " + this.page.url());
        }
        await this.page.goto(`https://www.instagram.com`)
        console.log("CURRENT PAGE URL: " + this.page.url());
        await this.page.goto(`https://www.instagram.com`)
        await this.page.waitForNavigation;
                //Close Turn On Notification modal after login
                //await this.page.waitForSelector(this.config.selectors.not_now_button, {timeout : 10000})  
                    //.then(() => await this.page.click(this.config.selectors.not_now_button))
                    //.catch(() => console.log("LOGIN SUCCESS!"));
        console.log("LOGIN SUCCESS!");

    }

    async testChallenge() {
        const INSTAUSERNAME = process.env.INSTAUSERNAME? process.env.INSTAUSERNAME : require('./config/instacredentials.json').username;
        const INSTAPASSWORD = process.env.INSTAPASSWORD? process.env.INSTAPASSWORD : require('./config/instacredentials.json').password;
        console.log("USERNAME: " + INSTAUSERNAME);
        console.log("PASSWORD: " + INSTAPASSWORD);
        await this.page.goto(this.config.base_url, {timeout: 60000});
        await this.page.waitFor(2500);
        await this.page.click(this.config.selectors.home_to_login_button);
        await this.page.waitFor(2500);
        //Input username and password to log in
        await this.page.click(this.config.selectors.username_field);
        await this.page.keyboard.type(INSTAUSERNAME);
        await this.page.click(this.config.selectors.password_field);
        await this.page.keyboard.type(INSTAPASSWORD);
        await this.page.click(this.config.selectors.login_button);
        console.log("ATTEMPTING LOGIN");
        await this.page.waitForNavigation();
        await this.page.waitFor(2500);
        //delibaretly get challenged
        await this.page.goto(`https://www.instagram.com/challenge/9986510155/nykVZShe1d/`);  
        console.log("SECURITY CHALLENGE");
        await this.page.waitForNavigation();
        await this.page.waitFor(2500);
        await this.page.waitForSelector(this.config.selectors.security_button);
        await this.page.click(this.config.selectors.security_button);
        const VERIFCODE = process.env.VERIFCODE? process.env.VERIFCODE : this.config.settings.security_code;
        console.log("SECURITY CODE: " + VERIFCODE);
        await this.page.waitFor(2500);
        await this.page.waitForSelector(this.config.selectors.type_security_code);
        await this.page.click(this.config.selectors.type_security_code);
        await this.page.waitFor(2500);
        await this.page.keyboard.type(VERIFCODE, {delay: 40});
        await this.page.click(this.config.selectors.security_button);
        await this.page.waitForNavigation();
        await this.page.waitFor(2500);
        console.log("CURRENT PAGE URL: " + this.page.url());
        await this.page.goto(`https://www.instagram.com`)
        //Close Turn On Notification modal after login
        await this.page.click(this.config.selectors.not_now_button);
        console.log("LOGIN SUCCESS!");
    }
    
    async visitPage(pagename) {
        await this.page.goto(`https://www.instagram.com/` + pagename + `/`);
        console.log(`VISITING [${pagename}]`);
        await this.page.waitForNavigation;
        //await this._goSickoMode(this.config.selectors.profile_base_class, this.page)
    }

    async visitRubataga() {
        await this.page.goto(`https://www.instagram.com/rubataga/`);
        console.log('VISITING RUBATAGA');
        await this._goSickoMode(this.config.selectors.profile_base_class, this.page)
    }

    async visitHashtagUrl() {
        const shuffle = require('shuffle-array');
        let hashTags = shuffle(this.config.hashTags);
        // loop through hashTags
        for (let tagIndex = 0; tagIndex < hashTags.length; tagIndex++) {
            console.log('<<<< Currently Exploring >>>> #' + hashTags[tagIndex]);
            //visit the hash tag url
            await this.page.goto(`${this.config.base_url}/explore/tags/` + hashTags[tagIndex] + '/?hl=en');
            // Loop through the latest 9 posts
            await this._doPostLikeAndFollow(this.config.selectors.hash_tags_base_class, this.page)
        }
    }

    /**
     * @Description loops through the the first three rows and the their items which are also three on a row
     * We'll be looping through nine items in total.
     * @param parentClass the parent class for items we trying to loop through this differs depending on the page
     * @param page this.page context of our browser
     * we're currently browsing through
     * @returns {Promise<void>}
     * @private
     */
    
     async _goSickoMode (parentClass){
        
        let page = this.page;
        let baseClass = this.config.selectors[parentClass];
        const shuffle = require('shuffle-array');

        for (let r = 1; r < 4; r++) {//loops through each row
            for (let c = 1; c < 4; c++) {//loops through each item in the row
    
                let br = false;
                //Try to select post
                //#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a
                //await page.click(`${parentClass} > div > div > .Nnq7c:nth-child(${r}) > .v1Nh3:nth-child(${c}) > a`)
                //#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1) > a
                
                await page.waitForSelector(`${baseClass} > div:nth-child(${r}) > div:nth-child(${c}) > a`, {timeout : 0});
                //await page.click(`#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(${r}) > div:nth-child(${c}) > a`)
                await page.click(`${baseClass} > div:nth-child(${r}) > div:nth-child(${c}) > a`)    
                    .catch((e) => {
                        console.log(e.message);
                        br = true;
                    });
                
                await page.waitFor(2250 + Math.floor(Math.random() * 250));//wait for random amount of time
                if (br) continue;//if successfully selecting post continue
                
                //find the postID

                let postID = page.url().substr(28,11);
                
                //let hasEmptyHeart = await page.$(this.config.selectors.post_heart_grey);
                
                //get the username of the current post
                let username = await page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, this.config.selectors.post_username);
                
                console.log();
                console.log(`INTERACTING WITH ${username}'s POST: {${postID}}`);
                
                //get the current post like status by checking if the selector exist
                
                let liked = null;
                if (page.$(this.config.selectors.post_heart_grey).length){
                    liked = false;
                    // console.log(`POST {${postID}} HAS NOT BEEN LIKED YET.`);
                } else {
                    liked = true;
                   // console.log(`POST {${postID}} HAS ALREADY BEEN LIKED.`);
                }

                //like the post if not already liked
                if (liked) {
                    console.log(`{${postID}} :: ALREADY LIKED`);
                } else {
                    await page.waitForSelector(this.config.selectors.post_like_button, {timeout : 0});
                    await page.click(this.config.selectors.post_like_button);//click the like button
                    console.log(`{${postID}} :: LIKED`);
                    await page.waitFor(10000 + Math.floor(Math.random() * 5000));// wait for random amount of time.
                };
                
                let hasCommented = null;
                await this.firebase_db.hasCommented(postID).then(data => hasCommented = data)
                    .catch(() => hasCommented = false);

                if (!hasCommented) { 
                    let comments = shuffle(this.config.comments);
                    // loop through available commments
                    for (let commentIndex = 0; commentIndex < this.config.settings.comments_per_post; commentIndex++) {
                        await page.waitForSelector(this.config.selectors.post_like_button, {timeout : 0});
                        await page.click(this.config.selectors.post_comment_button);//click the comment button
                        await page.keyboard.type(comments[commentIndex], {delay: 40}); //type some stuff
                        await page.waitFor(1000);
                        await page.keyboard.press('Enter');
                        await page.waitFor(2500);
                    }
                    console.log(`{${postID}} :: COMMENTED ${this.config.settings.comments_per_post} TIMES`);
                    await this.firebase_db.addCommented(postID);
                    console.log(`{${postID}} :: ADDED TO DATABASE`)
                } else {
                    console.log(`{${postID}} :: ALREADY COMMENTED`);
                }

                //Closing the current post modal
                await page.waitForSelector(this.config.selectors.post_close_button, {timeout : 0});
                await page.click(this.config.selectors.post_close_button)
                    .catch((e) => console.log('<<< ERROR CLOSING POST >>> ' + e.message));
                //Wait for random amount of time
                await page.waitFor(2250 + Math.floor(Math.random() * 250));
            }
        }
    };

     async _doPostLikeAndFollow (parentClass, page){

        for (let r = 1; r < 4; r++) {//loops through each row
            for (let c = 1; c < 4; c++) {//loops through each item in the row

                let br = false;
                //Try to select post
                await page.click(`${parentClass} > div > div > .Nnq7C:nth-child(${r}) > .v1Nh3:nth-child(${c}) > a`)
                    .catch((e) => {
                        console.log(e.message);
                        br = true;
                    });
                await page.waitFor(2250 + Math.floor(Math.random() * 250));//wait for random amount of time
                if (br) continue;//if successfully selecting post continue

                //get the current post like status by checking if the selector exists
                let hasEmptyHeart = await page.$(this.config.selectors.post_heart_grey);

                //get the username of the current post
                let username = await page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, this.config.selectors.post_username);
                console.log(`INTERACTING WITH ${username}'s POST`);


                //like the post if not already liked. Check against our like ratio so we don't just like all post
                if (hasEmptyHeart !== null && Math.random() < this.config.settings.like_ratio) {
                    await page.click(this.config.selectors.post_like_button);//click the like button
                    await page.waitFor(10000 + Math.floor(Math.random() * 5000));// wait for random amount of time.
                }

                //let's check from our archive if we've follow this user before
                let isArchivedUser = null;
                await this.firebase_db.inHistory(username).then(data => isArchivedUser = data)
                    .catch(() => isArchivedUser = false);

                //get the current status of the current user using the text content of the follow button selector
                let followStatus = await page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, this.config.selectors.post_follow_link);

                console.log("followStatus", followStatus);
                //If the text content of followStatus selector is Follow and we have not follow this user before
                // Save his name in the list of user we now follow and follow him, else log that we already follow him
                // or show any possible error
                if (followStatus === 'Follow' && !isArchivedUser) {
                    await this.firebase_db.addFollowing(username).then(() => {
                        return page.click(this.config.selectors.post_follow_link);
                    }).then(() => {
                        console.log('<<< STARTED FOLLOWING >>> ' + username);
                        return page.waitFor(10000 + Math.floor(Math.random() * 5000));
                    }).catch((e) => {
                        console.log('<<< ALREADY FOLLOWING >>> ' + username);
                        console.log('<<< POSSIBLE ERROR >>>' + username + ':' + e.message);
                    });
                }

                //Closing the current post modal
                await page.click(this.config.selectors.post_close_button)
                    .catch((e) => console.log('<<< ERROR CLOSING POST >>> ' + e.message));
                //Wait for random amount of time
                await page.waitFor(2250 + Math.floor(Math.random() * 250));
            }
        }
    };

    

    /**
     * @Description let's unfollow users we've followed for the number of days specified in our config
     * @returns {Promise<void>}
     */
    async unFollowUsers() {
        let date_range = new Date().getTime() - (this.config.settings.unfollow_after_days * 86400000);

        // get the list of users we are currently following
        let following = await this.firebase_db.getFollowings();
        let users_to_unfollow = [];
        if (following) {
            const all_users = Object.keys(following);
            // filter our current following to get users we've been following since day specified in config
            users_to_unfollow = all_users.filter(user => following[user].added < date_range);
        }

        if (users_to_unfollow.length) {
            for (let n = 0; n < users_to_unfollow.length; n++) {
                let user = users_to_unfollow[n];
                await this.page.goto(`${this.config.base_url}/${user}/?hl=en`);
                await this.page.waitFor(1500 + Math.floor(Math.random() * 500));

                let followStatus = await this.page.evaluate(x => {
                    let element = document.querySelector(x);
                    return Promise.resolve(element ? element.innerHTML : '');
                }, this.config.selectors.user_unfollow_button);

                if (followStatus === 'Following') {
                    console.log('<<< UNFOLLOW USER >>>' + user);
                    //click on unfollow button
                    await this.page.click(this.config.selectors.user_unfollow_button);
                    //wait for a sec
                    await this.page.waitFor(1000);
                    //confirm unfollow user
                    await this.page.click(this.config.selectors.user_unfollow_confirm_button);
                    //wait for random amount of time
                    await this.page.waitFor(20000 + Math.floor(Math.random() * 5000));
                    //save user to following history
                    await this.firebase_db.unFollow(user);
                } else {
                    //save user to our following history
                    this.firebase_db.unFollow(user);
                }
            }

        }
    }

    async closeBrowser(){
        await this.browser.close();
    }


}

module.exports = InstagramBot;