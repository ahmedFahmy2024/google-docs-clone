# Zad Alakhera Server Information

## Production Environment

### Home (Frontend)

- **URL:** https://zad-alakhera.com
- **SSH:** `zad-alakhera@213.136.70.107 -p 3679`
- **Root Directory:** `/var/www/zad-alakhera/home/build`
- **Technology:** React.js

### Backend

- **URL:** https://backend.zad-alakhera.com
- **SSH:** `zad-alakhera@213.136.70.107 -p 3679`
- **Root Directory:** `/var/www/zad-alakhera/backend`
- **Technology:** Node.js + PostgreSQL

#### PostgreSQL Database
- **Database:** `zad-alakhera_db`
- **Username:** `zad-alakhera_user`
- **Password:** `6SOkjcq+1CONZ1WQWQHEvg==`

#### Start Command
```bash
NODE_ENV=production pm2 start yarn \
  --name zad-alakhera-backend \
  -- run start --port 3010
```

### Dashboard

- **URL:** https://dashboard.zad-alakhera.com
- **Root Directory:** `/var/www/zad-alakhera/dashboard`
- **Technology:** Node.js

#### Start Command
```bash
pm2 --name zad-alakhera-dashboard start yarn -- run start --port 3011
```

### App

- **URL:** https://app.zad-alakhera.com
- **Root Directory:** `/var/www/zad-alakhera/app`
- **Technology:** Node.js

#### Start Command
```bash
pm2 --name zad-alakhera-app start yarn -- run start --port 3012
```

---

## Development Environment

### Backend (Dev)

- **URL:** https://backend-dev.zad-alakhera.com
- **SSH:** `devzad-alakhera@213.136.70.107 -p 3679`
- **Root Directory:** `/var/www/devzad-alakhera/backend`
- **Technology:** Node.js + PostgreSQL

#### PostgreSQL Database
- **Database:** `devzad-alakhera_db`
- **Username:** `devzad-alakhera_user`
- **Password:** `VE0EwcpTmg6PO6g3XMxdLw==`

#### Start Command
```bash
NODE_ENV=staging pm2 start yarn \
  --name devzad-alakhera-backend \
  -- run start --port 3013
```

### Dashboard (Dev)

- **URL:** https://dashboard-dev.zad-alakhera.com
- **Root Directory:** `/var/www/devzad-alakhera/dashboard`
- **Technology:** Node.js

#### Start Command
```bash
pm2 --name devzad-alakhera-dashboard start yarn -- run start --port 3014
```

### App (Dev)

- **URL:** https://app-dev.zad-alakhera.com
- **Root Directory:** `/var/www/devzad-alakhera/app`
- **Technology:** Node.js

#### Start Command
```bash
pm2 --name devzad-alakhera-app start yarn -- run start --port 3015
```