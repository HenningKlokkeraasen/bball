@rem uses Chocolatey https://chocolatey.org/ to install everything I use for this project

@rem Dev environment
call choco install git
call choco install github
call choco install visualstudiocode
call choco install nodejs
call choco install npm

@rem Client
call npm install -g typescript
call npm install jquery
call npm install -g handlebars
call npm install bootstrap

@rem Server
call npm install httpdispatcher
call npm install csv-parse
call npm install node-cache

echo done
