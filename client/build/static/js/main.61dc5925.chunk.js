(this["webpackJsonpmeal-planner"]=this["webpackJsonpmeal-planner"]||[]).push([[0],{37:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(9),i=n.n(c),s=(n(37),n(4)),u=function(e,t){return e.length>t?e.substring(0,t)+"...":e},o=n(1),l=function(e){var t=e.meal,n=e.toggleModal,a=u;return Object(o.jsxs)("div",{onDragStart:function(e){e.dataTransfer.setData("text/plain",e.target.id),e.dataTransfer.dropEffect="move"},onClick:n,className:"meal-card",id:JSON.stringify(t),draggable:"true",children:[a(t.recipe_name,30),Object(o.jsx)("div",{className:"meal-card-body",children:Object(o.jsx)("span",{className:"meal-assigned-to",style:{backgroundColor:t.tag_color},children:t.assigned_to_name})})]})},d=n(3),p=n.n(d),j=n(6),f=n(5),b=n.n(f),h="/api/meals";b.a.defaults.withCredentials=!0;var m={getAll:function(){var e=Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.a.get("".concat(h)),e.abrupt("return",t.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),create:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.post("".concat(h),t),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(j.a)(p.a.mark((function e(t,n){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=b.a.put("".concat(h,"/").concat(n),t),e.abrupt("return",a.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),remove:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.delete("".concat(h,"/").concat(t)),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},g=n(12),v=n.n(g),O="/api/recipes",x={getAll:function(){var e=Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.a.get("".concat(O)),e.abrupt("return",t.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),getIngredients:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.get("".concat(O,"/").concat(t,"/ingredients")),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),get:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.get("".concat(O,"/").concat(t)),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),create:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.post("".concat(O),t),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(j.a)(p.a.mark((function e(t,n){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=b.a.put("".concat(O,"/").concat(t),n),e.abrupt("return",a.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),remove:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.delete("".concat(O,"/").concat(t)),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},w="/api/users";b.a.defaults.withCredentials=!0;var y={getAll:function(){var e=Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.a.get("".concat(w)),e.abrupt("return",t.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),get:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.get("".concat(w,"/").concat(t)),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),create:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.post("".concat(w),t),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(j.a)(p.a.mark((function e(t,n){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=b.a.put("".concat(w,"/").concat(t),n),e.abrupt("return",a.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},S=function(e){var t=e.displayMessage,n=e.meal,r=e.meals,c=e.setMeals,i=e.weekdays,u=e.mealConfig,l=e.setIsOpen,d=Object(a.useState)(!!n.id),p=Object(s.a)(d,2),j=p[0],f=(p[1],Object(a.useState)("")),b=Object(s.a)(f,2),h=b[0],g=b[1],v=Object(a.useState)(""),O=Object(s.a)(v,2),w=O[0],S=O[1],k=Object(a.useState)([]),C=Object(s.a)(k,2),N=C[0],_=C[1],M=Object(a.useState)(""),I=Object(s.a)(M,2),E=I[0],P=I[1],R=Object(a.useState)(""),D=Object(s.a)(R,2),U=D[0],A=D[1],L=Object(a.useState)([]),J=Object(s.a)(L,2),T=J[0],q=J[1];return Object(a.useEffect)((function(){x.getAll().then((function(e){_(e),j?P(n.recipe_id):e.length>0&&P(e[0].id)})),g(n.day),S(n.meal?n.meal.value:n.type),y.getAll().then((function(e){q(e),j?A({id:n.assigned_to,first_name:n.assigned_to_name}):e.length>0&&A(e[0])}))}),[]),Object(o.jsx)("div",{className:"form-container",children:Object(o.jsxs)("div",{className:"form-wrapper",id:"meal-form-wrapper",children:[Object(o.jsx)("h2",{children:n.id?"Update meal":"Create new meal"}),Object(o.jsxs)("form",{className:"meal-form",children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Weekday"}),Object(o.jsx)("select",{value:h,onChange:function(e){var t=e.target;return g(t.value)},children:i.map((function(e){return Object(o.jsx)("option",{value:e.value,children:e.label},e.value)}))})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Meal"}),Object(o.jsx)("select",{value:w,onChange:function(e){var t=e.target;return S(t.value)},children:u.map((function(e){return Object(o.jsx)("option",{value:e.value,children:e.label},e.value)}))})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Recipe"}),Object(o.jsx)("select",{value:E,onChange:function(e){var t=e.target;return P(t.value)},children:N.map((function(e){return Object(o.jsx)("option",{value:e.id,children:e.name},e.id)}))})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Assignee"}),Object(o.jsx)("select",{value:U.id,onChange:function(e){return function(e){var t=T.find((function(t){return t.id.toString()===e.toString()}));A(t)}(e.target.value)},children:T.map((function(e){return Object(o.jsx)("option",{value:e.id,children:e.first_name},e.id)}))})]}),Object(o.jsx)("button",{type:"submit",className:"submit-button",onClick:function(e){e.preventDefault();var a=N.find((function(e){return e.id.toString()===E.toString()}));if(a){var i={day:h,type:w.value?w.value:w,recipe_id:E,recipe_name:a.name,assigned_to:U.id,assigned_to_name:U.first_name,tag_color:U.tag_color};j?m.update(i,n.id).then((function(){i.id=n.id;var e=r.filter((function(e){return e.id.toString()!==n.id.toString()})).concat(i);c(e)})).catch((function(e){console.log("something went wrong with updating a meal",e)})):m.create(i).then((function(e){i.id=e[0].id;var t=r.concat(i);c(t)})).catch((function(e){console.log("something went wrong with creating a meal",e)})),l(!1)}else t("Cannot create a meal without a recipe. Please create a recipe first","error",5)},children:n.id?"Save changes":"Submit"}),n.id?Object(o.jsx)("button",{className:"delete-button",type:"delete",onClick:function(e){e.preventDefault(),m.remove(n.id).then((function(){var e=r.filter((function(e){return e.id.toString()!==n.id.toString()}));c(e),l(!1)})).catch((function(e){console.log("something went wrong with removing a meal",e)}))},children:"Delete"}):null]})]})})},k={weekdays:[{value:"monday"},{value:"tuesday"},{value:"wednesday"},{value:"thursday"},{value:"friday"},{value:"saturday"},{value:"sunday"}],meals:[{value:"lunch"},{value:"dinner"}],_getLabels:function(e){return this[e].map((function(e){return e.label=e.value.replace(/^\w{1}/,e.value[0].toUpperCase()),e}))},get weekdayLabels(){return this._getLabels("weekdays")},get mealLabels(){return this._getLabels("meals")}},C=function(e){var t=e.displayMessage,n=e.show,r=Object(a.useState)([]),c=Object(s.a)(r,2),i=c[0],u=c[1],d=Object(a.useState)(!1),p=Object(s.a)(d,2),j=p[0],f=p[1],b=Object(a.useState)(""),h=Object(s.a)(b,2),g=h[0],O=h[1],x=k.weekdayLabels,w=k.mealLabels,y=function(e){e.preventDefault(),e.stopPropagation();var t=JSON.parse(e.dataTransfer.getData("text/plain")),n=i.find((function(e){return e.id===t.id})),a=JSON.parse(e.currentTarget.id);if(!i.some((function(e){return e.day===a.day&&e.type===a.meal.value}))){n.day=a.day,n.type=a.meal.value;var r=i.filter((function(e){return e.id!==n.id})).concat(n);u(r),m.update(n,n.id)}},C=function(e){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect="move"},N=function(e){if(j)f(!1);else{var t=JSON.parse(e.currentTarget.id);O(t),f(!0)}};Object(a.useEffect)((function(){n&&m.getAll().then((function(e){u(e)})).catch((function(e){403===e.response.status?(window.localStorage.removeItem("loggedInUser"),console.log(n)):t("We're having trouble retrieving your meal plan. Please try again later","error",5)}))}),[n]);var _={gridTemplateColumns:"3fr ".concat(x.map((function(e){return"5fr"})).join(" ")),gridTemplateRows:"50px ".concat(w.map((function(e){return"150px"})).join(" "))};return n?Object(o.jsxs)("div",{className:"calendar",style:_,children:[function(){var e=x.map((function(e){return e}));return e.unshift(""),e.map((function(e){return Object(o.jsx)("div",{className:"calendar-heading",id:e.value,children:e.label},e.value)}))}(),w.map((function(e){return function(e){var t=x.map((function(e){return e}));return t.unshift(e),t.map((function(n){return 0===t.indexOf(n)?Object(o.jsx)("div",{children:Object(o.jsx)("p",{children:n.label})},n.value):Object(o.jsxs)("div",{className:"meal-slot",id:JSON.stringify({day:n.value,meal:{value:e.value,label:e.label}}),onDrop:y,onDragOver:C,onDoubleClick:N,children:[i.filter((function(t){return t.day===n.value&&t.type===e.value})).map((function(e){return Object(o.jsx)(l,{meal:e,toggleModal:N})})),Object(o.jsx)("span",{id:"create-new-meal",children:"Double click to create new meal"})]},n.value)}))}(e)})),Object(o.jsxs)(v.a,{isOpen:j,onRequestClose:N,contentLabel:"Uusi ateria",style:{content:{position:"fixed",zIndex:2,width:"45%",margin:"auto",height:"28rem"}},children:[Object(o.jsx)("span",{className:"modal-close",onClick:N,children:"X"}),Object(o.jsx)(S,{displayMessage:t,meal:g,meals:i,setMeals:u,weekdays:x,mealConfig:w,setIsOpen:f})]})]}):null},N=n(19),_=n(8),M="/api/ingredients",I={getAll:function(){var e=Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.a.get("".concat(M)),e.abrupt("return",t.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),get:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.get("".concat(M,"/").concat(t)),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),create:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.post("".concat(M),t),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},E="/api/units",P={getAll:function(){var e=Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.a.get("".concat(E)),e.abrupt("return",t.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),get:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.get("".concat(E,"/").concat(t)),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},R=n(32),D=function(e){var t=e.displayMessage,n=e.toggleModal,r=e.recipes,c=e.setRecipes,i=e.recipeID,u=Object(a.useState)(!0),l=Object(s.a)(u,2),d=l[0],p=l[1],j=Object(a.useState)(i?r.find((function(e){return e.id.toString()===i})):null),f=Object(s.a)(j,2),b=f[0],h=(f[1],Object(a.useState)()),m=Object(s.a)(h,2),g=m[0],v=m[1],O=Object(a.useState)([]),w=Object(s.a)(O,2),y=w[0],S=w[1],k=Object(a.useState)([]),C=Object(s.a)(k,2),M=C[0],E=C[1],D=Object(a.useState)([]),U=Object(s.a)(D,2),A=U[0],L=U[1],J=Object(a.useState)(""),T=Object(s.a)(J,2),q=T[0],W=T[1],F=Object(a.useState)(""),z=Object(s.a)(F,2),B=z[0],X=z[1];Object(a.useEffect)((function(){P.getAll().then((function(e){S(e)})).catch((function(e){console.log(e)})),I.getAll().then((function(e){var t=e.map((function(e){return{value:e.value,label:e.label,quantity:1,unit:"tl"}}));L(t)})).catch((function(e){console.log(e),t("Something went wrong with fetching ingredients","error",5)})),b&&(p(!1),v(b.name),W(b.preparation_time),X(b.instructions),x.getIngredients(b.id).then((function(e){E(e)})).catch((function(e){console.log(e),t("Something went wrong with fetching ingredients","error",5)})))}),[b]);return d?Object(o.jsx)("div",{className:"form-container",children:Object(o.jsxs)("div",{className:"form-wrapper",id:"recipe-form-wrapper",children:[Object(o.jsx)("h2",{children:b?"Edit recipe":"Create new recipe"}),Object(o.jsxs)("form",{className:"recipe-form",children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Name"}),Object(o.jsx)("input",{style:{width:520},id:"recipe-name",type:"text",value:g,onChange:function(e){var t=e.target;return v(t.value)}})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Preparation time"}),Object(o.jsx)("input",{style:{width:100},id:"preparation-time",type:"number",value:q,onChange:function(e){var t=e.target;return W(t.value)}})," min"]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Ingredients"}),Object(o.jsx)(R.a,{id:"ingredients-picker",onCreateOption:function(e){var n={name:e};I.create(n).then((function(e){var t={value:e[0].id,label:e[0].name,quantity:1,unit:"tl"};L([].concat(Object(N.a)(A),[t])),E([].concat(Object(N.a)(M),[t]))})).catch((function(e){console.log(e),t("Something went wrong with creating a new ingredient","error",5)}))},onChange:E,value:M,placeholder:"Search ingredients",options:A,isMulti:!0,isSearchable:!0})]}),Object(o.jsx)("div",{children:Object(o.jsx)("ul",{style:{listStyle:"none"},children:M.map((function(e){return Object(o.jsxs)("li",{style:{width:"60%",borderBottom:"1px solid gray",margin:"0.5rem 0 0.5rem 0"},children:[Object(o.jsx)("input",{type:"number",style:{border:"none",width:"3rem",marginRight:"5px"},step:"0.1",id:e.value,value:e.quantity,className:"quantity-input",onChange:function(e){return function(e){var t=M.map((function(t){return t.value===e.id.toString()?Object(_.a)(Object(_.a)({},t),{},{quantity:parseFloat(e.value)}):t}));E(t)}(e.target)}}),Object(o.jsx)("select",{className:"unit-input",id:e.value,style:{border:"none",width:"2.5rem",paddingLeft:"0.5rem",marginRight:"5px",webkitAppearance:"none"},value:e.unit,onChange:function(e){return function(e){var t=M.map((function(t){return t.value===e.id.toString()?Object(_.a)(Object(_.a)({},t),{},{unit:e.value}):t}));E(t)}(e.target)},children:y.map((function(e){return Object(o.jsx)("option",{value:e.name,children:e.name})}))}),e.label]},e.value)}))})}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Instructions"}),Object(o.jsx)("textarea",{id:"instructions",rows:"15",cols:"70",value:B,onChange:function(e){var t=e.target;return X(t.value)}})]}),Object(o.jsx)("button",{className:"submit-button",type:"submit",onClick:function(e){e.preventDefault();var a={name:g,ingredients:M,instructions:B,duration:Number(q)};i?function(e,a){x.update(e,a).then((function(e){var a=r.filter((function(t){return t.id.toString()!==e[0].id.toString()})).concat(e[0]);c(a),v(e[0].name),W(e[0].preparation_time),X(e[0].instructions),n(),t('Saved changes to "'.concat(e[0].name,'"'),"success",5)})).catch((function(e){console.log(e),t("Something went wrong with saving the recipe","error",5)}))}(i,a):function(e){x.create(e).then((function(e){c(r.concat(e[0])),v(""),E([]),W(""),X(""),n(),t('Created new recipe "'.concat(e[0].name,'"'),"success",5)})).catch((function(e){console.log(e),t("Something went wrong with saving the recipe","error",5)}))}(a)},children:"Save"}),i?Object(o.jsx)("button",{className:"delete-button",onClick:function(e){return function(e,a){e.preventDefault(),x.remove(a).then((function(e){var i=r.filter((function(e){return e.id.toString()!==a}));c(i),t("Recipe deleted","success",5),n()})).catch((function(e){console.log(e),t("Failed deleting recipe","error",5)}))}(e,i)},children:"Delete"}):null]})]})}):Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:b.name}),Object(o.jsxs)("p",{children:[Object(o.jsx)("strong",{children:"Preparation time:"})," ",b.preparation_time]}),Object(o.jsx)("div",{children:Object(o.jsx)("ul",{children:M.map((function(e){return Object(o.jsxs)("li",{children:[e.quantity," ",e.unit," ",e.label]})}))})}),Object(o.jsxs)("p",{children:[Object(o.jsx)("strong",{children:"Instructions:"})," ",b.instructions]}),Object(o.jsx)("button",{id:"edit-recipe-button",onClick:function(){return p(!0)},children:"Edit"})]})},U=function(e){return Object(o.jsxs)(v.a,{isOpen:e.isOpen,onRequestClose:e.toggleModal,shouldCloseOnOverlayClick:!0,contentLabel:e.label,style:e.style,onAfterClose:function(){return e.selectRecipe("")},children:[Object(o.jsx)("span",{className:"modal-close",onClick:e.toggleModal,children:"X"}),Object(o.jsx)(D,{displayMessage:e.displayMessage,toggleModal:e.toggleModal,recipes:e.recipes,setRecipes:e.setRecipes,recipeID:e.selectedRecipe})]})},A=function(e){var t=e.recipe,n=e.selectRecipe,a=e.toggleModal,r=u;return Object(o.jsxs)("li",{class:"recipes-list-card",id:t.id,onClick:function(e){var t=e.currentTarget;n(t.id),a()},children:[Object(o.jsx)("b",{children:r(t.name,30)}),Object(o.jsxs)("div",{className:"recipe-list-card-details",children:["Preparation time: ",t.preparation_time," min"]}),Object(o.jsx)("span",{className:"edit-recipe",children:"Click to view"})]},t.id)},L=function(e){var t=e.show,n=e.displayMessage,r=e.toggleModal,c=e.isOpen,i=Object(a.useState)([]),u=Object(s.a)(i,2),l=u[0],d=u[1],p=Object(a.useState)(""),j=Object(s.a)(p,2),f=j[0],b=j[1],h=Object(a.useState)(""),m=Object(s.a)(h,2),g=m[0],v=m[1];return Object(a.useEffect)((function(){x.getAll().then((function(e){d(e)})).catch((function(e){403===e.response.status?window.localStorage.removeItem("loggedInUser"):n("We're having trouble fetching recipes. Please try again later","error",5)}))}),[t]),t?Object(o.jsxs)("div",{children:[Object(o.jsx)(U,{isOpen:c,toggleModal:r,label:"recipe form",style:{content:{width:"50%",margin:"auto",height:"auto"}},selectRecipe:b,selectedRecipe:f,recipes:l,setRecipes:d,displayMessage:n}),Object(o.jsx)("input",{type:"text",className:"search-box",placeholder:"Search recipes",onChange:function(e){var t=e.target;return v(t.value.toLowerCase())}}),Object(o.jsx)("button",{style:{marginLeft:"1rem"},id:"create-recipe",onClick:function(){return r()},children:"Create new recipe"}),Object(o.jsx)("ul",{className:"recipes-list-container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(190px, 1fr))",gridGap:"0.2rem"},children:l.filter((function(e){return-1!==e.name.toLowerCase().indexOf(g)})).map((function(e){return Object(o.jsx)(A,{recipe:e,selectRecipe:b,toggleModal:r})}))})]}):null},J=function(e){var t=e.message;return t?Object(o.jsx)("div",{className:"message-banner banner-".concat(t.type),children:t.content}):null},T="/api/auth",q={register:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.post("".concat(T,"/register"),t),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),login:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.post("".concat(T,"/login"),t),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),logout:function(){var e=Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.a.post("".concat(T,"/logout")),e.abrupt("return",t.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),resetPassword:function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=b.a.put("".concat(T,"/reset_password"),t),e.abrupt("return",n.then((function(e){return e.data})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},W=function(e){var t=e.show,n=e.setUser,r=e.setPage,c=e.displayMessage,i=Object(a.useState)(""),u=Object(s.a)(i,2),l=u[0],d=u[1],p=Object(a.useState)(""),j=Object(s.a)(p,2),f=j[0],b=j[1];return t?Object(o.jsx)("div",{className:"form-container",children:Object(o.jsx)("div",{className:"form-wrapper",id:"login-form-wrapper",children:Object(o.jsxs)("form",{id:"login-form",onSubmit:function(e){e.preventDefault(),q.login({username:l,password:f}).then((function(e){c(" Successfully logged in as ".concat(e.name),"success",5),window.localStorage.setItem("loggedInUser",JSON.stringify(e)),n(e),d(""),b(""),r("weekly-calendar")})).catch((function(e){c("Incorrect username or password","error",5)}))},children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"username"}),Object(o.jsx)("input",{id:"username",type:"text",value:l,name:"username",onChange:function(e){var t=e.target;return d(t.value)}})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"password"}),Object(o.jsx)("input",{id:"password",type:"password",value:f,name:"Password",onChange:function(e){var t=e.target;return b(t.value)}})]}),Object(o.jsx)("button",{id:"login-button",type:"submit",children:"login"})]})})}):null},F=function(e){var t=e.show,n=e.setUser,r=e.setPage,c=e.displayMessage,i=Object(a.useState)(""),u=Object(s.a)(i,2),l=u[0],d=u[1],p=Object(a.useState)(""),j=Object(s.a)(p,2),f=j[0],b=j[1],h=Object(a.useState)(""),m=Object(s.a)(h,2),g=m[0],v=m[1],O=Object(a.useState)(""),x=Object(s.a)(O,2),w=x[0],y=x[1];return t?Object(o.jsx)("div",{className:"form-container",children:Object(o.jsx)("div",{className:"form-wrapper",id:"login-form-wrapper",children:Object(o.jsxs)("form",{id:"sign-up-form",onSubmit:function(e){e.preventDefault();var t={username:l,firstName:f,email:g,password:w};q.register(t).then((function(e){c("Welcome ".concat(e.name,"! You are now logged in"),"success",5),window.localStorage.setItem("loggedInUser",JSON.stringify(e)),n(e),d(""),y(""),b(""),v(""),r("weekly-calendar")})).catch((function(e){c("Registration failed: ".concat(e.response.data.message),"error",5),console.log(e)}))},children:[Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Username"}),Object(o.jsx)("input",{id:"username",type:"text",value:l,name:"username",onChange:function(e){var t=e.target;return d(t.value)}})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"First name"}),Object(o.jsx)("input",{id:"first-name",type:"text",value:f,name:"firstName",onChange:function(e){var t=e.target;return b(t.value)}})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Email"}),Object(o.jsx)("input",{id:"email",type:"email",value:g,name:"email",onChange:function(e){var t=e.target;return v(t.value)}})]}),Object(o.jsxs)("div",{children:[Object(o.jsx)("label",{children:"Password"}),Object(o.jsx)("input",{id:"password",type:"password",value:w,name:"Password",onChange:function(e){var t=e.target;return y(t.value)}})]}),Object(o.jsx)("button",{id:"sign-up-button",type:"submit",children:"Create account"})]})})}):null},z=function(e){var t=e.show,n=e.displayMessage,r=Object(a.useState)({}),c=Object(s.a)(r,2),i=c[0],u=c[1],l=Object(a.useState)({}),d=Object(s.a)(l,2),p=d[0],j=d[1],f=Object(a.useState)({}),b=Object(s.a)(f,2),h=b[0],m=b[1],g=function(e){e.target.previousElementSibling.disabled=!1;var t=Object(_.a)({},h);t[e.target.parentElement.id]=!0,m(t)},v=function(e){var t=e.target.name,n=e.target.value,a=Object(_.a)({},i);a[t].value=n,u(a)},O=function(e){e.target.previousElementSibling.disabled=!0;var t=e.target.parentElement.id,a=p[t].value,r=i[t].value,c=Object(_.a)({},h);if(c[t]=!1,m(c),a){var s={field_name:t,value:r};"password"===t?q.resetPassword({new_password:r}).then((function(e){var t=Object(_.a)(Object(_.a)({},p),{},{password:e.password});j(t),u(t),n("Password changed","success",5)})).catch((function(e){n(e.response.data.message,"error",5);var t=Object(_.a)(Object(_.a)({},i),{},{password:a});u(t),console.log(e.message)})):y.update(x.id,s).then((function(){j(i),n("Saved changes","success",5)})).catch((function(e){console.log(e)}))}},x=JSON.parse(window.localStorage.getItem("loggedInUser"));if(Object(a.useEffect)((function(){x&&x.id&&y.get(x.id).then((function(e){var t={first_name:{value:e.first_name},username:{value:e.username},password:{value:e.password},email:{value:e.email},household_name:{value:e.household_name}};u(t),j(t)})).catch((function(e){console.log(e)}))}),[t]),t){var w=i.first_name,S=i.username,k=i.password,C=i.email,N=i.household_name;return Object(o.jsx)("div",{className:"form-container",children:Object(o.jsx)("div",{className:"form-wrapper",children:Object(o.jsxs)("form",{children:[Object(o.jsxs)("div",{id:"first_name",children:[Object(o.jsx)("label",{children:Object(o.jsx)("b",{children:"Name:"})})," ",Object(o.jsx)("input",{className:"account",name:"first_name",onChange:function(e){return v(e)},value:w?w.value:null,disabled:!0}),h.first_name?null:Object(o.jsx)("span",{className:"edit-save-field",id:"edit_firstName",onClick:function(e){return g(e)},children:"Edit"}),h.first_name?Object(o.jsx)("span",{className:"edit-save-field",id:"save_firstName",onClick:function(e){return O(e)},children:"Save"}):null]}),Object(o.jsxs)("div",{id:"username",children:[Object(o.jsx)("label",{children:Object(o.jsx)("b",{children:"Username:"})})," ",Object(o.jsx)("input",{className:"account",name:"username",value:S?S.value:null,disabled:!0})]}),Object(o.jsxs)("div",{id:"password",children:[Object(o.jsx)("label",{children:Object(o.jsx)("b",{children:"Password:"})})," ",Object(o.jsx)("input",{className:"account",name:"password",type:"password",onChange:function(e){return v(e)},value:k?k.value:null,disabled:!0}),h.password?null:Object(o.jsx)("span",{className:"edit-save-field",id:"edit_password",onClick:function(e){return g(e)},children:"Edit"}),h.password?Object(o.jsx)("span",{className:"edit-save-field",id:"save_password",onClick:function(e){return O(e)},children:"Save"}):null]}),Object(o.jsxs)("div",{id:"email",children:[Object(o.jsx)("label",{children:Object(o.jsx)("b",{children:"Email:"})})," ",Object(o.jsx)("input",{className:"account",name:"email",onChange:function(e){return v(e)},value:C?C.value:null,disabled:!0}),h.email?null:Object(o.jsx)("span",{className:"edit-save-field",id:"edit_email",onClick:function(e){return g(e)},children:"Edit"}),h.email?Object(o.jsx)("span",{className:"edit-save-field",id:"save_email",onClick:function(e){return O(e)},children:"Save"}):null]}),Object(o.jsxs)("div",{id:"email",children:[Object(o.jsx)("label",{children:Object(o.jsx)("b",{children:"Household name:"})})," ",Object(o.jsx)("input",{className:"account",name:"household_name",onChange:function(e){return v(e)},value:N?N.value:null,disabled:!0})]})]})})})}return null},B=n(31),X=n(0),G=function(){var e=Object(a.useState)("weekly-calendar"),t=Object(s.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),i=Object(s.a)(c,2),u=i[0],l=i[1],d=Object(a.useState)(!1),p=Object(s.a)(d,2),j=p[0],f=p[1],b=Object(a.useState)(null),h=Object(s.a)(b,2),m=h[0],g=h[1],v=function(e,t,n){l({content:e,type:t}),setTimeout((function(){l("")}),1e3*n)};Object(a.useEffect)((function(){var e=JSON.parse(window.localStorage.getItem("loggedInUser"));e?g(e):(g(null),r("login"))}),[]);return Object(o.jsxs)("div",{children:[Object(o.jsxs)("header",{children:[Object(o.jsxs)("div",{className:"navbar",children:[Object(o.jsxs)("ul",{className:"nav",children:[m?Object(o.jsx)("li",{id:"weekly-calendar",className:"brand",onClick:function(){return r("weekly-calendar")},children:"Weekly planner"}):null,m?Object(o.jsx)("li",{id:"all-recipes",onClick:function(){return r("recipes")},children:"Recipes"}):null]}),m?Object(o.jsxs)("ul",{className:"nav",children:[Object(o.jsxs)("li",{onClick:function(){return r("account")},children:[Object(o.jsx)(X.b.Provider,{value:{size:"1.2rem"},children:Object(o.jsx)(B.a,{style:{marginRight:"0.5rem"}})}),"My Account"]}),Object(o.jsx)("li",{className:"auth",id:"logout",onClick:function(){q.logout().then((function(e){window.localStorage.removeItem("loggedInUser"),g(null),r("login"),v("Successfully logged out","success",5)}))},children:"Logout "})]}):Object(o.jsxs)("ul",{className:"nav",children:[Object(o.jsx)("li",{className:"auth",id:"login",onClick:function(){return r("login")},children:"Login"}),Object(o.jsx)("li",{className:"auth",id:"sign-up",onClick:function(){return r("sign-up")},children:"Sign up"})]})]}),Object(o.jsx)(J,{message:u})]}),Object(o.jsx)(L,{show:"recipes"===n,message:u,displayMessage:v,toggleModal:function(){f(!j)},isOpen:j}),Object(o.jsx)(C,{show:"weekly-calendar"===n,displayMessage:v}),Object(o.jsx)(W,{setPage:r,show:"login"===n,displayMessage:v,setUser:g}),Object(o.jsx)(F,{show:"sign-up"===n,displayMessage:v,user:m,setUser:g,setPage:r}),Object(o.jsx)(z,{loggedInUser:m,show:"account"===n,displayMessage:v})]})};i.a.render(Object(o.jsx)(r.a.StrictMode,{children:Object(o.jsx)(G,{})}),document.getElementById("root"))}},[[78,1,2]]]);
//# sourceMappingURL=main.61dc5925.chunk.js.map