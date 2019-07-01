
const Bot = require('./Bot');// this directly imports the index.js file
const config = require('./Bot/config/puppeteer');

const bot = new Bot();
start().catch(e=>console.log(e.message));

async function start() {
    const startBrowsing = Date();
    console.log(Date());
    await bot.initPuppeter().then(() => console.log("PUPPETEER INITIALIZED"));

    const DEBUGMODE = process.env.DEBUGMODE ? process.env.DEBUGMODE : config.settings.debug_mode;
    const VISITINSTA = process.env.VISITINSTA? process.env.VISITINSTA : "rubataga.gif";
    var debugging = DEBUGMODE == "true";
    if(debugging){
        await bot.testChallenge().then(() => console.log("TESTING CHALLENGE"));
    } else {
        await bot.visitInstagram().then(() => console.log("BROWSING INSTAGRAM"));
    };

    console.log();

    await bot.visitPage("rubataga.gif");

    await bot._goSickoMode("profile_base");

    const doneBrowsing = Date();
    console.log();
    console.log(`STARTED BROWSING - ${startBrowsing} / STOPPED BROWSING - ${doneBrowsing}`);
    setInterval(profileLike, config.settings.run_every_x_hours * 3600000, VISITINSTA, "profile_base");
}

//setInterval(profileLike, config.settings.run_every_x_hours * 600000, "rubataga.gif", "profile_base", bot);

async function profileLike(profile, parentClass){
    const startBrowsing = Date();
    await bot.visitPage(profile);
    await bot._goSickoMode(parentClass);
    const doneBrowsing = Date();
    console.log(`STARTED BROWSING - ${startBrowsing} / STOPPED BROWSING - ${doneBrowsing}`);
}

const run = async () => {
    //const bot = new Bot();

    //const startTime = Date();

    console.log(Date());

    await bot.initPuppeter().then(() => console.log("PUPPETEER INITIALIZED"));

    const DEBUGMODE = process.env.DEBUGMODE ? process.env.DEBUGMODE : config.settings.debug_mode;

    var debugging = DEBUGMODE == "true";
    if(debugging){
        await bot.testChallenge().then(() => console.log("TESTING CHALLENGE"));
    } else {
    await bot.visitInstagram().then(() => console.log("BROWSING INSTAGRAM"));
    };

    await bot.visitPage("rubataga.gif");
    //await bot.visitHashtagUrl().then(() => console.log("VISITED HASH-TAG URL"));

    await bot._goSickoMode("profile_base");
    //await bot.unFollowUsers();

    //await bot.closeBrowser()
    //    .then(() => console.log("BROWSER CLOSED"))
    //    .catch(() => console.log("BROWSER FAILED TO CLOSE"));
    setInterval(profileLike, config.settings.run_every_x_hours * 3600000, "rubataga.gif", "profile_base");
    //const endTime = Date();

    //console.log(`START TIME - ${startTime} / END TIME - ${endTime}`)

};

//run().catch(e=>console.log(e.message));
//run bot at certain interval we have set in our config file
//setInterval(run, config.settings.run_every_x_hours * 3600000);
