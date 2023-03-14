(()=>{"use strict";var e={779:e=>{e.exports=require("express-jwt")}},t={};function r(s){var o=t[s];if(void 0!==o)return o.exports;var n=t[s]={exports:{}};return e[s](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var s={};(()=>{r.r(s);const e=require("path");var t=r.n(e);const o=require("express");var n=r.n(o);const a=require("mongoose");var i=r.n(a);const u={env:"production",port:process.env.PORT||3e3,jwtSecret:process.env.JWT_SECRET||"mxsolopov",mongoUri:process.env.MONGODB_URI||process.env.MONGO_HOST||"mongodb+srv://mxsolopov:UCDtYU60jv9t65Kt@cluster0.l0v0ehu.mongodb.net/?retryWrites=true&w=majority"},d=require("body-parser");var c=r.n(d);const l=require("cookie-parser");var p=r.n(l);const h=require("compression");var m=r.n(h);const g=require("cors");var w=r.n(g);const v=require("helmet");var y=r.n(v);const f=require("crypto");var j=r.n(f);const b=new(i().Schema)({name:{type:String,trim:!0,required:"Name is required"},email:{type:String,trim:!0,unique:"Email already exists",match:[/.+\@.+\..+/,"Please fill a valid email address"],required:"Email is required"},hashed_password:{type:String,required:"Password is required"},salt:String,updated:Date,created:{type:Date,default:Date.now}});b.virtual("password").set((function(e){this._password=e,this.salt=this.makeSalt(),this.hashed_password=this.encryptPassword(e)})).get((function(){return this._password})),b.path("hashed_password").validate((function(e){this._password&&this._password.length<6&&this.invalidate("password","Password must be at least 6 characters."),this.isNew&&!this._password&&this.invalidate("password","Password is required")}),null),b.methods={authenticate:function(e){return this.encryptPassword(e)===this.hashed_password},encryptPassword:function(e){if(!e)return"";try{return j().createHmac("sha1",this.salt).update(e).digest("hex")}catch(e){return""}},makeSalt:function(){return Math.round((new Date).valueOf()*Math.random())+""}};const q=i().model("User",b),S=require("lodash/extend");var _=r.n(S);const x=e=>{let t="";if(e.code)switch(e.code){case 11e3:case 11001:t=(e=>{let t;try{let r=e.message.substring(e.message.lastIndexOf(".$")+2,e.message.lastIndexOf("_1"));t=r.charAt(0).toUpperCase()+r.slice(1)+" already exists"}catch(e){t="Unique field already exists"}return t})(e);break;default:t="Something went wrong"}else for(let r in e.errors)e.errors[r].message&&(t=e.errors[r].message);return t},O=require("jsonwebtoken");var P=r.n(O);const{expressjwt:U}=r(779),k={signin:async(e,t)=>{try{const r=await q.findOne({email:e.body.email});if(!r)return t.status(401).json({error:"User not found"});if(!r.authenticate(e.body.password))return t.status(401).send({error:"Email and password don't match"});const s=P().sign({_id:r._id},u.jwtSecret);return t.cookie("t",s,{expire:new Date+9999}),t.json({token:s,user:{_id:r._id,name:r.name,email:r.email}})}catch(e){return t.status(401).json({error:"Could not sign in"})}},signout:(e,t)=>(t.clearCookie("t"),t.status(200).json({message:"signed out"})),requireSignin:U({secret:u.jwtSecret,userProperty:"auth",algorithms:["HS256"]}),hasAuthorization:(e,t,r)=>{if(!e.profile||!e.auth||e.profile._id!=e.auth._id)return t.status(403).json({error:"User is not authorized"});r()}},D=n().Router();D.route("/api/users").get((async(e,t)=>{try{const e=await q.find().select("name email updated created");t.json(e)}catch(e){return t.status(400).json({error:x(e)})}})).post((async(e,t)=>{const r=new q(e.body);try{return await r.save(),t.status(200).json({message:"Successfully signed up"})}catch(e){return t.status(400).json({error:x(e)})}})),D.route("/api/users/:userId").get(k.requireSignin,((e,t)=>(e.profile.hashed_password=void 0,e.profile.salt=void 0,t.json(e.profile)))).put(k.requireSignin,k.hasAuthorization,(async(e,t)=>{try{let r=e.profile;r=_()(r,e.body),r.updated=Date.now(),await r.save(),e.profile.hashed_password=void 0,e.profile.salt=void 0,t.json(r)}catch(e){return t.status(400).json({error:x(e)})}})).delete(k.requireSignin,k.hasAuthorization,(async(e,t)=>{try{let r=e.profile,s=await r.remove();s.hashed_password=void 0,s.salt=void 0,t.json(s)}catch(e){return t.status(400).json({error:x(e)})}})),D.param("userId",(async(e,t,r,s)=>{try{const o=await q.findById(s);if(!o)return t.status(400).json({error:"User not found"});e.profile=o,r()}catch(e){return t.status(400).json({error:"Could not retrieve user"})}}));const M=D,C=n().Router();C.route("/auth/signin").post(k.signin),C.route("/auth/signout").get(k.signout);const E=C,z=n()(),A=c().json();z.use(c().json()),z.use(c().urlencoded({extended:!0})),z.use(p()()),z.use(m()()),z.use(y()()),z.use(w()()),z.use("/",A,M),z.use("/",A,E),z.use(((e,t,r,s)=>{"UnauthorizedError"===e.name?r.status(401).json({error:e.name+": "+e.message}):e&&(r.status(400).json({error:e.name+": "+e.message}),console.log(e))}));const I=z,R=process.cwd();I.use("/dist",n().static(t().join(R,"dist"))),I.get("/*",((e,t)=>{t.status(200).type("html").send(T)})),I.listen(u.port,(e=>{e&&console.log(e),console.info("Server started on port %s.",u.port)})),i().Promise=global.Promise,i().set("strictQuery",!1),i().connect(u.mongoUri,{}),i().connection.on("error",(()=>{throw new Error(`unable to connect to database: ${u.mongoUri}`)}));const T='<!doctype html>\n<html lang="ru">\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Solopov Social Network</title>\n    <link\n      rel="stylesheet"\n      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"\n      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"\n      crossorigin="anonymous"\n    />\n  </head>\n  <body>\n    <div id="root"></div>\n    <script src="/dist/bundle.js"><\/script>\n  </body>\n</html>'})(),module.exports=s})();