@rem This compiles and starts the application

@rem Automates the two steps of compiling, and opening the browser and opening the console

@rem keyboard shortcut to open the console from VS Code is ctrl+shift+c


@rem ----compile-------
@rem call is used so that the script returns after running the command

@rem Typescript compiler
call tsc

@rem Precompile Handlebars templates
call handlebars src/hbs-templates/bballtable.hbs -f public/hbs-templates/bballtable.js


@rem ------run---------
@rem replace with your path
call start chrome "file:///E:/Mine dokumenter/GitHub/bball/index.html"

@rem exit
