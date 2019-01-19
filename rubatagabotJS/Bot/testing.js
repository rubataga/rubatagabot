'${parentClass} > div > div > .Nnq7C:nth-child(${r}) > .v1Nh3:nth-child(${c}) > a'
//.FyNDV should be the class
'${parentClass} > div > div > .Nnq7c:nth-child(${r}) > .v1Nh3:nth-child(${c}) > a'



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

            //get the current post like status by checking if the selector exist
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

///
//
//
///
//
//
//

async _goSickoMode (parentClass, page){

    for (let r = 1; r < 4; r++) {//loops through each row
        for (let c = 1; c < 4; c++) {//loops through each item in the row

            let br = false;
            //Try to select post
            await page.click(`${parentClass} > div > div > .Nnq7c:nth-child(${r}) > .v1Nh3:nth-child(${c}) > a`)
                .catch((e) => {
                    console.log(e.message);
                    br = true;
                });
            await page.waitFor(2250 + Math.floor(Math.random() * 250));//wait for random amount of time
            if (br) continue;//if successfully selecting post continue

            //get the current post like status by checking if the selector exist
            let hasEmptyHeart = await page.$(this.config.selectors.post_heart_grey);

            //get the username of the current post
            let username = await page.evaluate(x => {
                let element = document.querySelector(x);
                return Promise.resolve(element ? element.innerHTML : '');
            }, this.config.selectors.post_username);
            console.log(`INTERACTING WITH ${username}'s POST`);


            //like the post if not already liked. Check against our like ratio so we don't just like all post
            if (hasEmptyHeart !== null) {
                await page.click(this.config.selectors.post_like_button);//click the like button
                await page.waitFor(10000 + Math.floor(Math.random() * 5000));// wait for random amount of time.
                await page.click(this.config.selectors.post_comment_button);//click the comment button
                await page.keyboard.type('Obligatory comment for exposure 👏😩', {delay: 40}); //type some stuff
            }

            //Closing the current post modal
            await page.click(this.config.selectors.post_close_button)
                .catch((e) => console.log('<<< ERROR CLOSING POST >>> ' + e.message));
            //Wait for random amount of time
            await page.waitFor(2250 + Math.floor(Math.random() * 250));
        }
    }
};

#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1)