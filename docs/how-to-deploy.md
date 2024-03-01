## How to Deploy?

Follow this step to staging or production.

1. Pull the HEAD of the current branch

```
    git pull <repository_name> <branch_name>
```

2. Install app dependencies

```
    npm install
```

3. Build react app

```
    npm run build
```

4. Install serve and pm2 globally

```
    npm install -g pm2 serve
```

5. Run build folder using serve and run it in background using pm2

```
    pm2 serve build/ 3000 --name "pm2_service_name" --spa
```

### Note

- See all pm2 service

```
    pm2 list
```

- Stop pm2 service

```
    pm2 stop <service_id or service_name>
```

- Restart pm2 service

```
    pm2 restart <service_id or service_name>
```

- Delete all pm2 service

```
    pm2 delete all
```
