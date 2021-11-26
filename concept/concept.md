# Concept

## Maps

### Definition

TODO: Define requirements that maps must fulfill to be categorized as "gema maps". (e.g. must be loadable in mode CTF, there must be some kind of obstacle between the two flags, etc.).

Non gema maps = Maps that can be finished by using solely the arrow keys?

### Ideas

- Use mapshot and cleanshot to make screenshots for each map
- Show screenshot for each map on website
- Show user contributed screenshots per map?
- Provide map uploads and downloads
- Information per map:
  * author
  * map message
  * Player rating
  * Difficulty rating (Need rules for the stars, e.g. max height jump)
    * Need different categories
      - unarmed => should be finishable by pretty much anyone
      - Easy => can be finished using basic techniques (sidewards walking, nades, hold SHIFT in air)
      - Medium => can be finished using advanced techniques (hax jump, nade jump)
      - pro => can be finished using advanced techniques (11 hax jump, 40 nade jump)
      - expert => requires players to do (nearly) maxed out advanced techniques (45 nade jump, 42 hax jump)
  * Special notes
  * Properties (Wrong spawn possible => no, by design, by spawn blocking)


## Map Top

### Ideas

- List maps where a specific player has records
- Use demos to verify and archive runs
- API to fetch status, subscribe and to add records (needs API key)
- Special categories for:
  - Respawn nade and ghost nade
  - Wrong spawn
  - Getting shot by other players? => else reject
  - Jumping on other players? => else reject


## Other ideas

- Show gtop on website
- Show maps that were finished by 1+ players in a special color
- Make site responsive



## Database schema

Needed Map info:
- Name
- Revision
- Upload Date
- Uploader


## Backend API

REST API:
- users
- maps
