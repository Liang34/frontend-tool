const Koa = require("koa2");
const app = new Koa();
const email = require('./router/index');

app.use(email.routes(), email.allowedMethods());
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

app.listen(3000);

