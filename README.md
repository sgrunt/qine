# Qine

Qine the Quadroguard, featuring both a PvP duel and a new party member.

This is a CCLoader mod; if you don't already have CCLoader installed, grab it from here: https://github.com/CCDirectLink/CCLoader - then unpack this into new assets/mods/ directory in your CrossCode directory.

Upon loading with this mod in place, Qine will appear in your party menu and can be invited / removed as normal. Contacting Qine will prompt you with the option to teleport to the PvP arena, effective upon returning to main gameplay.

If you'd prefer to teleport directly there, you can issue the following from the console:
```javascript
new frame.contentWindow.cc.ig.events.TELEPORT({"map": "mod/qine-arena"}).start()
```

To add Qine to your party, run the following:
```javascript
new cc.ig.events.ADD_PARTY_MEMBER({"member": "Qine", "npc": {"global": true, "name": "Qine"}}).start()
```

If you have questions, comments, or concerns, you can reach the author, sgrunt, on Discord in the CrossCode Discord server at http://discord.gg/crosscode.
