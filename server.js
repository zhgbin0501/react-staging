let express = require('express');
let app = express();

app.get('/user', (req, res) => {
    res.json({name: '张斌'});
});

app.listen(4000);