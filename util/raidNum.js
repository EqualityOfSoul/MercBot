async function raidNum(client, raidLog) {
    const messages = await raidLog.fetchMessages({limit:5});
    console.log(client.user.id);
    const log = messages.filter(m =>
        m.embeds[0] &&
        m.embeds[0].type === 'rich' &&
        m.embeds[0].footer &&
        m.embeds[0].footer.text.startsWith("RaidID")
    ).first();
    if (!log) return 1;
    const splitRaidFooter = log.embeds[0].footer.text.split(" ");
    console.log(splitRaidFooter);
    return splitRaidFooter[1] ? parseInt(splitRaidFooter[1]) + 1 : 1;
}



module.exports = {raidNum};
