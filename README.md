# Qine

Qine the Quadroguard, featuring both a PvP duel and a new party member.

This is a CCLoader mod; if you don't already have CCLoader installed, grab it from here: https://github.com/CCDirectLink/CCLoader - then unpack this into new assets/mods/ directory in your CrossCode directory.

There's currently no direct way to access the PvP arena; to get there, you can run the following from the console:

```javascript
new frame.contentWindow.cc.ig.events.TELEPORT({"map": "mod/qine-arena"}).start()
```

To add Qine to your party, run the following:
```javascript
new cc.ig.events.SET_PARTY_MEMBER_SP_LEVEL({"member": "Qine", "level": "3"}).start()
new cc.ig.events.SET_PARTY_MEMBER_LEVEL({"member": "Qine", "level": 60, "exp": 183, "updateEquipment": true }).start()
new cc.ig.events.SET_PARTY_MEMBER_ALL_ELEMENTS({"member": "Qine", allElements: true }).start()
new cc.ig.events.ADD_PARTY_MEMBER({"member": "Qine", "npc": {"global": true, "name": "Qine"}}).start()
```
(Adjust the level and SP level as appropriate.)

If you have questions, comments, or concerns, you can reach the author, sgrunt, on Discord in the CrossCode Discord server at http://discord.gg/crosscode.
