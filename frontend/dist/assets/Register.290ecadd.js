import{d as p,j as m,r as _,c as v,a as s,b as d,u as l,w,p as h,k as B,o as F,F as n,l as g,m as E,_ as f}from"./index.0302ece1.js";import{v as b,h as V}from"./forms.be58dbb0.js";const C=r=>(h("data-v-576583e4"),r=r(),B(),r),x={class:"container rt-wp mt-4"},k={class:"row justify-content-sm-center"},y={class:"col col-md-9 col-lg-6"},M={class:"card my-3"},I={class:"card-body",id:"auth-form-app"},R=C(()=>s("h2",{class:"card-title text-center"},"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F",-1)),S={class:"mb-3"},U={class:"mb-3"},j={class:"mb-3"},D={class:"text-center"},N=["onClick"],q=p({__name:"Register",setup(r){const c=g(),e=m({username:{value:"",validators:["required"]},password1:{value:"",validators:["password1"]},password2:{value:"",validators:[],checkers:{password_match:{check:(t,u)=>Boolean(u&&t===u.password1.value),errorMessage:"\u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442"}}}}),o=_(!1),i=()=>{const t=b(e);if(o.value||(o.value=!0),!t)return;const u={username:e.username.value,password:e.password1.value};E(u).then(()=>{c.push("/login")}).catch(a=>{V(a,{400:{username:()=>{e.username.errorMessage="\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u0436\u0435 \u0437\u0430\u043D\u044F\u0442\u043E"}}})})};return(t,u)=>(F(),v("div",x,[s("div",k,[s("div",y,[s("div",M,[s("div",I,[R,s("div",S,[d(l(n),{name:"username",label:"\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",modelValue:e.username.value,"onUpdate:modelValue":u[0]||(u[0]=a=>e.username.value=a),error:e.username.errorMessage,isBound:o.value,maxlength:100},null,8,["modelValue","error","isBound"])]),s("div",U,[d(l(n),{name:"password1",label:"\u041F\u0430\u0440\u043E\u043B\u044C",modelValue:e.password1.value,"onUpdate:modelValue":u[1]||(u[1]=a=>e.password1.value=a),error:e.password1.errorMessage,isBound:o.value,maxlength:100,password:""},null,8,["modelValue","error","isBound"])]),s("div",j,[d(l(n),{name:"password2",label:"\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C",modelValue:e.password2.value,"onUpdate:modelValue":u[2]||(u[2]=a=>e.password2.value=a),error:e.password2.errorMessage,isBound:o.value,maxlength:100,password:""},null,8,["modelValue","error","isBound"])]),s("div",D,[s("button",{type:"submit",class:"btn btn-outline-primary",onClick:w(i,["prevent"])}," \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F ",8,N)])])])])])]))}});const G=f(q,[["__scopeId","data-v-576583e4"]]);export{G as default};