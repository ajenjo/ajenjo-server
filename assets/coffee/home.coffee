'use strict'

# Fin Data

# Include Service Angular
#= require appHome/services/_service_angular_app.coffee

console.log "-- End Runing --" if config.dev

console.log "%c", "
  padding:3px 174px;
  line-height: 20px;
  background-repeat:no-repeat;
  background-size: auto 100%;
  background-position:button left;
  background-image: url(\"#{location.protocol}//#{location.host}#{new RegExp('.{0,}/').exec(location.pathname)}/imgs/logo348.png\");
" if config.dev or config.presentation
