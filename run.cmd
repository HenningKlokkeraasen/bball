@rem This compiles and starts the application

@rem Automates the two steps of compiling, and opening the browser and opening the console

@rem The compile is just to run the TypeScript compiler

@rem The run is done using the start DOS program, to start firefox,
@rem and set a flag to open the console 

@rem The same thing does not work in Chrome as a --console flag is not implemented.
@rem Chromium feature request for this here: https://code.google.com/p/chromium/issues/detail?id=410958
@rem Chromium flags reference http://peter.sh/experiments/chromium-command-line-switches/




@rem keyboard shortcut to open the console from VS Code is ctrl+shift+c




@rem ----compile-------
@rem call is used so that the script returns after running the command

call tsc



@rem ------run---------

call start firefox "file:///E:/Mine dokumenter/GitHub/bball/index.html" -jsconsole



exit
