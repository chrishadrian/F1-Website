# CPSC 304 Project Repository
This repository contains the source code for our application. An application that displays relevant Formula 1 (F1) race data and standings. A user would be able to view each season described by the year the season was held (e.g. '2017') and view a multitude of data - races (location, drivers for that race, driver standings of that race), the drivers for that season and teams for that season just to name a few. Our application is targeted at avid F1 fans, just like us, who would not like the clutter of advertisements, news feeds, and different tabs.

## Project directory
Assuming you start from our repo's root directory (`project_k4g2g_s6f2k_w5t9j`).
<br>

#### To start frontend application:
1. Go to the client's repo:
   - `cd client`
2. Install and start the React application:
   - `npm i`
   - `npm start`
<br><br>

#### To start backend application:
1.  If you have connected to the undergrad server (SSH):
    - Go to the server's repo:
      - `cd server`
    - Connect to SSH:
      - `npm run connect`
2. Clone our repo in your remote server if you haven't done it.
3. Once you've cloned our repo in your SSH, go to the repo.
4. Go to the server's repo:
   - `cd server`
5. Set up your env if you haven't done so (look at .env.sample for instructions)
6. Start our backend application:
   - `sh remote-start.sh`
<br><br>

#### To access oracle database with sqlplus:
1. Connect to the undergrad server (SSH)
2. Connect to oracle database with sqlplus:
   -  `sqlplus ora_<CWL username>@stu`.
   -  Password is `a<YOUR-STUDENT-NUMBER>`