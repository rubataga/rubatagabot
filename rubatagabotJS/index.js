
const Bot = require('./Bot');// this directly imports the index.js file
const config = require('./Bot/config/puppeteer');

const run = async () => {
    const bot = new Bot();

    const startTime = Date();

    console.log(Date());

    await bot.initPuppeter().then(() => console.log("PUPPETEER INITIALIZED"));

    const DEBUGMODE = process.env.DEBUGMODE ? process.env.DEBUGMODE : config.settings.debug_mode;

    var debugging = DEBUGMODE == "true";
    if(debugging){
        await bot.testChallenge().then(() => console.log("TESTING CHALLENGE"));
    } else {
    await bot.visitInstagram().then(() => console.log("BROWSING INSTAGRAM"));
    };

    await bot.visitPage('rubataga.gif');
    //await bot.visitHashtagUrl().then(() => console.log("VISITED HASH-TAG URL"));

    await bot._goSickoMode("profile_base");
    //await bot.unFollowUsers();

    await bot.closeBrowser().then(() => console.log("BROWSER CLOSED"));

    const endTime = Date();

    console.log(`START TIME - ${startTime} / END TIME - ${endTime}`)

};

run().catch(e=>console.log(e.message));
//run bot at certain interval we have set in our config file
setInterval(run, config.settings.run_every_x_hours * 3600000);
