# NEXPROMA FrontEnd
### _v.0.1_

This is the master branch of NEXPROMA frontEnd.
This document decribes the steps to follow to build the project in a Debian/Ubuntu architecture.

## Features
- Signup, login and logout
- Account management
- CV management : Create, View, process
- Offer management : Create, View, process
- Soumission management : Create, view, process

This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Tech
NEXPROMA frontEnd uses a number of open source projects to work properly:
- [Angular CLI v12.0.0]
- [Node.js v16.15.1]
- [npm v8]

## Setup & Getting started

1. Install [NodeJS](http://nodejs.org/) (If you done have)

2. If you have not installed angular yet,

#Install angular globally

```
$ npm install -g @angular/cli@12.0.0-rc.2
```

3. Clone porjet FrontEnd

```
$ ng clone https://github.com/achrafOuakka/nexProMa-frontend-AO.git
```

4. navigate to frontend/ directory.

```   
$ cd frontend 
```

5. then install dependencies

```
$ npm install
```

6. Serve the application using (run dev)


6. Getting started

Run `ng serve` for a dev server.
 
```
$ ng serve
```

#Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building the project

1. Run `ng build` to build the project.
```
$ ng build --prod --base-href '/app/’
```
 The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
 
# !!!! After re-name build folder `NEXPROMA` it to `app`

2. create .htaccess file & add variables:

- create file `Nouveau Document texte.txt` & re-name it to `.htaccess`
- set your desired variable value
```
<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{REQUEST_FILENAME} -s [OR]
    RewriteCond %{REQUEST_FILENAME} -l [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^.*$ - [NC,L]
    RewriteRule ^(.*) /app/index.html [NC,L]
</IfModule>
```
3. After copy/paste .htaccess file in build folder(app)

## Deploy Bo-frontend

# Deploy Angular Bo-frontend App to Apache Server

!. Install Apache2:
Install from here: http://httpd.apache.org/docs/current/install.html

2. Copy the dist/app folder in /var/www/ folder.



## License

NEXPROMA - copyright - 2023-2024
