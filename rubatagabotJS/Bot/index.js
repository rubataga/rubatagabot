//rubatagabot

class InstagramBot {

    constructor() {
        this.firebase_db = require('./db');
        this.config = require('./config/puppeteer.json');
    }

    async initPuppeteer() {
        console.log();
        const puppeteer = require('puppeteer');
        //check if WINDOW variable is true or false
        const WINDOWLESS = process.env.WINDOW ? process.env.WINDOW : this.config.settings.headless;
        var dontShowWindow = WINDOWLESS === 'true'; //check if the windowless variable says true or false
        this.browser = await puppeteer.launch({
            headless: dontShowWindow, //if dontShowWindow is true, then be headless
            args: ['--no-sandbox']
        });
        this.instaPage = await this.browser.newPage();
        this.instaPage.setViewport({width: 1500, height: 764});
        this.tenMinMailPage = await this.browser.newPage();
        this.tenMinMailPage.setViewport({width: 1500, height: 764});
        //this.page.setViewport({width: this.config.settings.window_size.width, height: this.configt.settings.window_size.height});
    }
    //challenge url: https://www.instagram.com/challenge/9986510155/6JAsw4LEzp/

    // async outlookEmail() {
    //     const PuppeteerEmail = require('puppeteer-email')

    //     const client = new PuppeteerEmail('outlook')

    //     const username = this.generateUser(10);
    //     const password = this.generatePass(10);

    //     console.log(`${username}@outlook.com:${password}`);

    //     const session = await client.signup({
    //         username,
    //         password,
    //         firstName: this.generateUser(10),
    //         lastName: this.generateUser(10),
    //         birthday: {
    //             month: "1",
    //             day: "1",
    //             year: "1990"
    //         }
    //     }, {
    //         browser: this.browser
    //     });
    //     await session.close();

    //     console.log(emails);
    // }

    async openTenMinMail() {
        let page = this.tenMinMailPage;
        await page.goto(`https://www.minuteinbox.com/`, {timeout: 60000});
        await page.waitForSelector(this.config.selectors["10min"]);
        const tenMinMail = await page.evaluate(() => document.querySelector('#email').textContent);
        console.log("email: " + tenMinMail);
        return tenMinMail;
    }

    async fetchEmailCode(){
        let page = this.tenMinMailPage;
        await page.waitForSelector('tr.hidden-xs[data-href$="2"]');
        var instaCode = await page.evaluate(() => document.querySelector('tr.hidden-xs[data-href$="2"] > td:nth-child(2)').textContent);
        instaCode = instaCode.slice(0,6);
        console.log("instagram code: " + instaCode);
        return instaCode;
    }
    
    async fetchSMSCode(){
        const SMSNumberVerifier = require('sms-number-verifier')
        const smsVerifier = new SMSNumberVerifier('getsmscode', {
        username: '...',
        token: '...'
})

// fetch a number to use for a new verification request
const number = await smsVerifier.getNumber({ service: 'google' })

// give number to third-party service such as google...
// third-party service sends SMS code to the given number

// check for valid codes received via SMS from the google service
const codes = await smsVerifier.getAuthCodes({ number, service: 'google' })
    }

    generatePass(pLength){

        var keyListAlpha="abcdefghijklmnopqrstuvwxyz",
            keyListInt="123456789",
            keyListSpec="!@#_",
            password='';
        var len = Math.ceil(pLength/2);
        len = len - 1;
        var lenSpec = pLength-2*len;
    
        for (let i=0;i<len;i++) {
            password+=keyListAlpha.charAt(Math.floor(Math.random()*keyListAlpha.length));
            password+=keyListInt.charAt(Math.floor(Math.random()*keyListInt.length));
        }
    
        for (let i=0;i<lenSpec;i++) {
            password+=keyListSpec.charAt(Math.floor(Math.random()*keyListSpec.length));
        }

        password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
    
        return password;
    }

    generateUser(uLength){

        var keyListAlpha="abcdefghijklmnopqrstuvwxyz",
            keyListInt="123456789",
            keyListSpec="ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            username='';
        var len = Math.ceil(uLength/2);
        len = len - 1;
        var lenSpec = uLength-2*len;
    
        for (let i=0;i<len;i++) {
            username+=keyListAlpha.charAt(Math.floor(Math.random()*keyListAlpha.length));
            username+=keyListInt.charAt(Math.floor(Math.random()*keyListInt.length));
        }
    
        for (let i=0;i<lenSpec;i++) {
            username+=keyListSpec.charAt(Math.floor(Math.random()*keyListSpec.length));
        }
        username=username.split('').sort(function(){return 0.5-Math.random()}).join('');
    
        return username;
    }

    async typeTab(text){
        let page = this.instaPage;
        await page.keyboard.type(text);
        await page.waitFor(500);
        await page.keyboard.press('Tab')
        await page.waitFor(500);   
    }

    async createAccount() {
        let page = this.instaPage;
        let userEmail = await this.openTenMinMail();
        var genUser = this.generateUser(9);
        var genPass = this.generatePass(6);
        console.log("username: " + genUser);
        console.log("password: " + genPass);
        await page.goto(`https://www.instagram.com/accounts/emailsignup/`, {timeout: 60000});
        //email signup
        await page.waitForSelector(this.config.selectors.new.email);
        await page.click(this.config.selectors.new.email);
        await page.waitFor(500);
        await this.typeTab(userEmail);
        await this.typeTab("bitch baby #5");
        await this.typeTab(genUser);
        await page.keyboard.press('Tab')
        await page.waitFor(500);
        await this.typeTab(genPass);
        await page.waitFor(500);
        await page.keyboard.press('Tab')
        await page.keyboard.press('Enter');
        //birthday verify
        await page.waitForSelector(this.config.selectors.new.birthday);
        await page.click(this.config.selectors.new.birthday);
        await page.waitFor(500);
        await page.keyboard.press('Tab');
        await page.waitFor(500);
        await page.keyboard.press('Tab');
        await page.waitFor(500);
        await page.keyboard.press('Tab');
        await page.waitFor(500);
        await page.keyboard.type("1");
        await page.waitFor(500);
        await page.keyboard.press('Tab');
        await page.waitFor(500);
        await page.keyboard.press('Enter');
        let instaCode = await this.fetchEmailCode();
        await page.waitForSelector(this.config.selectors.new.insta_code);
        await page.click(this.config.selectors.new.insta_code);
        await page.waitFor(500);
        await this.typeTab(instaCode);
        await page.keyboard.press('Enter');
        await page.waitForNavigation();
        await page.waitFor(500);
        console.log(page.frames());
    }


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

    /*async testChallenge() {
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
    }*/
    
    async visitPage(pagename) {
        await this.page.goto(`https://www.instagram.com/` + pagename + `/`);
        console.log(`VISITING [${pagename}]`);
        await this.page.waitForNavigation;
        //await this._goSickoMode(this.config.selectors.profile_base_class, this.page)
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
    
     async commentPosts (){
        
        let page = this.page;
        let baseClass = this.config.selectors.profile_base;
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
                
                // let liked = null;
                // if (page.$(this.config.selectors.post_heart_grey).length){
                //     liked = false;
                //     // console.log(`POST {${postID}} HAS NOT BEEN LIKED YET.`);
                // } else {
                //     liked = true;
                //    // console.log(`POST {${postID}} HAS ALREADY BEEN LIKED.`);
                // }

                //like the post if not already liked
                // if (liked) {
                //     console.log(`{${postID}} :: ALREADY LIKED`);
                // } else {
                //     await page.waitForSelector(this.config.selectors.post_like_button, {timeout : 0});
                //     await page.click(this.config.selectors.post_like_button);//click the like button
                //     console.log(`{${postID}} :: LIKED`);
                //     await page.waitFor(10000 + Math.floor(Math.random() * 5000));// wait for random amount of time.
                // };
                
                let hasCommented = null;
                await this.firebase_db.hasCommented(postID).then(data => hasCommented = data)
                    .catch(() => hasCommented = false);

                if (!hasCommented) { 
                    let comments = shuffle(this.config.comments);
                    // loop through available commments
                    await page.waitForSelector(this.config.selectors.post_like_button, {timeout : 0});
                        await page.click(this.config.selectors.post_comment_button);//click the comment button
                        await page.keyboard.type("#josephmccarthysucc", {delay: 40}); //type some stuff
                        await page.waitFor(1000);
                        await page.keyboard.press('Enter');
                        await page.waitFor(2500);
                    for (let commentIndex = 0; commentIndex < (this.config.settings.comments_per_post - 1); commentIndex++) {
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

    async closeBrowser(){
        await this.browser.close();
    }


}

module.exports = InstagramBot;