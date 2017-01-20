
@rem Precompile Handlebars templates
call handlebars src/hbs-templates/bballtable.hbs -f public/hbs-templates/bballtable.js
call handlebars src/hbs-templates/bballtab.hbs -f public/hbs-templates/bballtab.js

@rem Compile LESS
call lessc src/less/site.less public/css/site.css

@rem Compile Typescript
call tsc
