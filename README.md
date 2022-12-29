# soccer-league
### GR-Tech Test Project

#### Base URL: https://soccer-league-production.up.railway.app/api/v1
## Endpoints

### 1. Goals
#### [POST] `Register Goal` : /goals/register
#### [GET] `All Goals` : /goals

### 2. Match Locations
#### [POST] `Register Location` : /locations/register
#### [GET] `Update Location` : /locations/update/:id
#### [GET] `All Locations` : /locations
#### [GET] `Single Location` : /locations/:id
#### [DELETE] ] `Delete Location` : /locations/:id

### 3. Match
#### [POST] `Register Match` : /matches/register
#### [GET] `All Matches` : /matches
#### [GET] `All Upcoming Matches` : /matches/upcoming

### 4. Player
#### [POST] `Register Player` : /players/register
#### [GET] `All Players` : /players
#### [GET] `All Players By Team` : /players/:teamId

### 5. Team
#### [POST] `Register Team` : /teams/register
#### [GET] `All Teams` : /teams
#### [GET] `Team Performance` : /teams/performance/:teamId
