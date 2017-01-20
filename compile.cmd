
@rem Precompile Handlebars templates
call handlebars src/hbs-templates/bballtable.hbs -f public/hbs-templates/bballtable.js
call handlebars src/hbs-templates/bballtab.hbs -f public/hbs-templates/bballtab.js

@rem Compile Typescript
call tsc
