(this.webpackJsonppas_frontend=this.webpackJsonppas_frontend||[]).push([[7],{106:function(e,t,n){},107:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),l=n(30),o=n.n(l),i=n(10),s=n(1),c=n(53),u=n(13),m=n(3),h=n.n(m),d=n(9),p=n(5),f=n(6),b=n(8),y=n(7),E=(n(71),n(24)),g=n.n(E),v=(n(72),function(e){Object(b.a)(n,e);var t=Object(y.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(f.a)(n,[{key:"componentDidMount",value:function(){var e=this;setTimeout(Object(d.a)(h.a.mark((function t(){var n,r,a;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n=e.props.nodes,g.a.templates.ana.field_0='<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="150" y="30" text-anchor="middle">{val}</text>',g.a.templates.ana.field_1='<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="150" y="50" text-anchor="middle">{val}</text>',g.a.templates.ana.field_2='<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="150" y="70" text-anchor="middle">{val}</text>',g.a.templates.ana.field_3='<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="150" y="90" text-anchor="middle">{val}</text>',g.a.templates.ana.nodeMenuButton='<g style="cursor:pointer;" transform="matrix(1,0,0,1,275,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>',g.a.templates.ana.size=[300,120],r={},a=0;25>=a;a+=1)r["subLevels".concat(a)]={subLevels:a};new g.a(document.getElementById("orgchart"),{nodes:n,nodeBinding:{field_0:"Name",field_1:"Status",field_2:"Staff Name",field_3:"Year"},searchFields:["Name","Staff Name","Year","Status"],menu:{pdf:{text:"Export PDF"},png:{text:"Export PNG"},csv:{text:"Export CSV"}},tags:r,scaleInitial:g.a.match.boundary,levelSeparation:25,siblingSeparation:15}).on("exportstart",(function(e,t){if("csv"===t.ext){for(var n=[],r=0;r<t.nodes.length;r+=1)n.push({Name:t.nodes[r].Name,StaffName:t.nodes[r]["Staff Name"],Year:t.nodes[r].Year,Status:t.nodes[r].Status,BigBrother:t.nodes[r]["Big Brother"]});t.nodes=n}}));case 11:case"end":return t.stop()}}),t)}))),1e3)}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"render",value:function(){return a.a.createElement("div",{id:"orgchart"})}}]),n}(r.Component)),w=n(73),j=function(){function e(){Object(p.a)(this,e)}return Object(f.a)(e,null,[{key:"fetchByYear",value:function(){var t=Object(d.a)(h.a.mark((function t(){var n;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.performSelectReq("treeByYear");case 2:return(n=t.sent).forEach((function(e){e.tags=["subLevels".concat(e.Year-e.bigBrotherYear-1)]})),t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"fetchByGeneration",value:function(){var t=Object(d.a)(h.a.mark((function t(){var n;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.performSelectReq("treeByGeneration");case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"getBrothers",value:function(){var t=Object(d.a)(h.a.mark((function t(){var n;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.performSelectReq("brothersList");case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"addNew",value:function(){var e=Object(d.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://phialphasigma.azurewebsites.net",e.prev=1,e.next=4,w.post("".concat("https://phialphasigma.azurewebsites.net","/addBrother"),t);case 4:e.next=10;break;case 6:return e.prev=6,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",e.t0.message);case 10:return e.abrupt("return",null);case 11:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}()},{key:"updateExisting",value:function(){var e=Object(d.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://phialphasigma.azurewebsites.net",e.prev=1,e.next=4,w.post("".concat("https://phialphasigma.azurewebsites.net","/updateBrother"),t);case 4:e.next=10;break;case 6:return e.prev=6,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",e.t0.message);case 10:return e.abrupt("return",null);case 11:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getBrother",value:function(){var t=Object(d.a)(h.a.mark((function t(n){var r;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.performSelectReq("brother/".concat(n));case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"performSelectReq",value:function(){var e=Object(d.a)(h.a.mark((function e(t){var n,r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"https://phialphasigma.azurewebsites.net",e.prev=1,e.next=4,w.post("".concat("https://phialphasigma.azurewebsites.net","/").concat(t));case 4:a=e.sent,e.next=11;break;case 7:return e.prev=7,e.t0=e.catch(1),console.log(e.t0),e.abrupt("return",[]);case 11:return e.abrupt("return",null===(n=a)||void 0===n||null===(r=n.data)||void 0===r?void 0:r.recordset);case 12:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()}]),e}(),I=function(e){Object(b.a)(n,e);var t=Object(y.a)(n);function n(){var e;return Object(p.a)(this,n),(e=t.call(this)).state={data:[]},e}return Object(f.a)(n,[{key:"componentDidMount",value:function(){var e=Object(d.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.fetchByGeneration();case 2:t=e.sent,this.setState({data:t});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.data;return a.a.createElement(s.m,null,a.a.createElement(s.g,null,a.a.createElement(s.v,null,a.a.createElement(s.t,null,"Family Tree By Generation"))),a.a.createElement(s.e,null,a.a.createElement(s.g,{collapse:"condense"},a.a.createElement(s.v,null,a.a.createElement(s.t,{size:"large"},"Family Tree By Generation"))),a.a.createElement(v,{nodes:e})))}}]),n}(r.Component),B=(n(90),function(e){Object(b.a)(n,e);var t=Object(y.a)(n);function n(){var e;return Object(p.a)(this,n),(e=t.call(this)).state={data:[]},e}return Object(f.a)(n,[{key:"componentDidMount",value:function(){var e=Object(d.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.fetchByYear();case 2:t=e.sent,this.setState({data:t});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.data;return a.a.createElement(s.m,null,a.a.createElement(s.g,null,a.a.createElement(s.v,null,a.a.createElement(s.t,null,"Family Tree By Year"))),a.a.createElement(s.e,null,a.a.createElement(s.g,{collapse:"condense"},a.a.createElement(s.v,null,a.a.createElement(s.t,{size:"large"},"Family Tree By Year"))),a.a.createElement(v,{nodes:e})))}}]),n}(r.Component)),k=(n(91),n(11)),x=(n(92),n(93),function(e){Object(b.a)(n,e);var t=Object(y.a)(n);function n(){var e;return Object(p.a)(this,n),(e=t.call(this)).state={brothers:[]},e}return Object(f.a)(n,[{key:"componentDidMount",value:function(){var e=Object(d.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.getBrothers();case 2:t=e.sent,this.setState({brothers:t});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.brothers.map((function(e){return a.a.createElement("option",{"data-value":e.id,value:e.Name})})),t=this.props,n=t.label,r=t.id,l=t.list,o=t.onChange;return a.a.createElement(s.j,null,a.a.createElement(s.k,{position:"stacked"},n),a.a.createElement("input",{className:"bigBrotherInput",id:r,list:l,onChange:o,required:!0}),a.a.createElement("datalist",{id:l},e))}}]),n}(r.Component));x.defaultProps={label:"",onChange:function(){}};var A=x,T=function(e){Object(b.a)(n,e);var t=Object(y.a)(n);function n(){var e;return Object(p.a)(this,n),(e=t.call(this)).submit=e.submit.bind(Object(k.a)(e)),e.state={message:null},e}return Object(f.a)(n,[{key:"submit",value:function(){var e=Object(d.a)(h.a.mark((function e(t){var n,r,a,l,o,i,s,c,u,m,d,p,f,b,y;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),n=document.getElementById("editedUserIdInput"),r=null,!n){e.next=9;break}if(null!=(a=document.querySelector("option[value='".concat(n.value,"']")))&&(r=parseInt(a.getAttribute("data-value"),10)),""===n.value||null!==r){e.next=9;break}return this.setState({message:"Invalid Brother to Edit"}),e.abrupt("return");case 9:if(null!==(l=document.getElementById("yearSelect")).value&&(o=parseInt(null===(i=l.value)||void 0===i?void 0:i.slice(0,4),10)),""===(s=document.getElementById("nameInput").value)&&(s=null),""===(c=document.getElementById("staffNameInput").value)&&(c=null),u=document.getElementById("bigBrotherInput"),m=document.querySelector("option[value='".concat(u.value,"']")),d=null,null!=m&&(d=parseInt(m.getAttribute("data-value"),10)),""===u.value||null!==d){e.next=22;break}return this.setState({message:"Invalid Big Brother"}),e.abrupt("return");case 22:return p=document.getElementById("statusSelect").value,f={id:r,year:o,name:s,staffName:c,bigBrother:d,status:p},b=this.props.callback,e.next=27,b(f);case 27:null===(y=e.sent)?(this.setState({message:"Successful Operation"}),document.getElementById("nameInput").value=null,document.getElementById("staffNameInput").value=null,document.getElementById("bigBrotherInput").value=null):this.setState({message:"Failed Operation: ".concat(y)});case 29:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=(new Date).getFullYear(),n=this.props,r=n.additionalItemsBottom,l=n.additionalItemsTop,o=n.buttonText,i=n.clearYear,c=this.state.message;return a.a.createElement("form",{onSubmit:this.submit},a.a.createElement(s.u,{isOpen:null!==c,message:c,position:"top",onDidDismiss:function(){return e.setState({message:null})},buttons:[{text:"Close",role:"cancel"}]}),l,a.a.createElement(s.j,null,a.a.createElement(s.k,{position:"floating"},"Year"),a.a.createElement(s.f,{id:"yearSelect",name:"year",displayFormat:"YYYY",value:i?t:null,required:!0})),a.a.createElement(s.j,null,a.a.createElement(s.k,{position:"floating"},"Name"),a.a.createElement(s.i,{id:"nameInput",name:"name",required:!0})),a.a.createElement(s.j,null,a.a.createElement(s.k,{position:"floating"},"Staff Name"),a.a.createElement(s.i,{id:"staffNameInput",name:"staffName",required:!0})),a.a.createElement(A,{id:"bigBrotherInput",list:"bigBrotherInputList",label:"Big Brother"}),a.a.createElement(s.j,null,a.a.createElement(s.k,{position:"floating"},"Status"),a.a.createElement(s.o,{id:"statusSelect",interface:"popover",value:"Brother",required:!0},a.a.createElement(s.p,{value:"Brother",default:!0},"Brother"),a.a.createElement(s.p,{value:"Elder"},"Elder"),a.a.createElement(s.p,{value:"Founder"},"Founder"))),a.a.createElement(s.j,null,a.a.createElement(s.d,{slot:"start",onIonChange:function(e){"on"===e.target.value?(document.querySelectorAll("input").forEach((function(e){e.removeAttribute("required")})),i&&(document.getElementById("yearSelect").value=null)):(document.getElementById("yearSelect").setAttribute("required","required"),document.getElementById("nameInput").setAttribute("required","required"),document.getElementById("staffNameInput").setAttribute("required","required"),document.getElementById("bigBrotherInput").setAttribute("required","required"),document.getElementById("statusSelect").setAttribute("required","required"))}}),a.a.createElement(s.k,null,"Check if brother has incomplete information")),r,a.a.createElement(s.c,{class:"ion-margin-top",expand:"block",type:"submit"},o))}}]),n}(r.Component);T.defaultProps={additionalItemsTop:"",additionalItemsBottom:"",buttonText:"Submit",callback:function(){},clearYear:!0};var C=T,S=function(e){Object(b.a)(n,e);var t=Object(y.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(f.a)(n,[{key:"render",value:function(){return a.a.createElement(s.m,null,a.a.createElement(s.g,null,a.a.createElement(s.v,null,a.a.createElement(s.t,null,"Add"))),a.a.createElement(s.e,null,a.a.createElement(s.g,{collapse:"condense"},a.a.createElement(s.v,null,a.a.createElement(s.t,{size:"large"},"Add"))),a.a.createElement(C,{buttonText:"Add",callback:j.addNew})))}}]),n}(r.Component),O=(n(94),function(){return a.a.createElement(s.m,null,a.a.createElement(s.g,null,a.a.createElement(s.v,null,a.a.createElement(s.t,null,"Bylaws"))),a.a.createElement(s.e,null,a.a.createElement(s.g,{collapse:"condense"},a.a.createElement(s.v,null,a.a.createElement(s.t,{size:"large"},"Bylaws"))),a.a.createElement("div",{className:"bylaws"},a.a.createElement("p",null,"Accurate as of 17 May 2020"),a.a.createElement("h1",null,"BYLAWS of \u03a6\u0391\u03a3 Phi Alpha Sigma"),a.a.createElement("p",null,"ARTICLE I \u2013 \u03a6\u0391\u03a3:"),a.a.createElement("p",null,"ARTICLE II \u2013 Leadership:"),a.a.createElement("p",null,"ARTICLE III \u2013 Meetings:"),a.a.createElement("p",null,"ARTICLE IV \u2013 Member Positions:"),a.a.createElement("p",null,"ARTICLE V \u2013 Little Brother Selection:"),a.a.createElement("p",null,"ARTICLE VI \u2013 Name Selection:"),a.a.createElement("p",null,"ARTICLE VII \u2013 \u03a6\u0391\u03a3 Events:"),a.a.createElement("p",null,"ARTICLE VIII \u2013 Records:"),a.a.createElement("p",null,"ARTICLE IX \u2013 Amendments:"),a.a.createElement("p",null,"ARTICLE X \u2013 Clarifaction of Terms:"),a.a.createElement("p",null,"ARTICLE XI \u2013 Attatchments:"),a.a.createElement("h2",null,"ARTICLE I \u2013 \u03a6\u0391\u03a3"),a.a.createElement("p",null,"The stiles of this brotherhood shall be \u03a6\u0391\u03a3 and Phi Alpha Sigma."),a.a.createElement("h2",null,"ARTICLE II \u2013 Leadership"),a.a.createElement("p",null,"The executive authority of \u03a6\u0391\u03a3 shall be vested in a person who:",a.a.createElement("br",null),"A) Is a current Piercing Arrow staff member,",a.a.createElement("br",null),"B) Is a Founder or Elder,",a.a.createElement("br",null),"C) Will be approved by a voting majority of the Founders and Elders currently serving on the Piercing Arrow staff."),a.a.createElement("p",null,"Because this leader does not enjoy any special status or privileges, this leader does not receive any special title. This document will refer to them as the \u03a6\u0391\u03a3 Leader from here on out for clarity's sake alone. This leader will be responsible for ensuring that all articles of these bylaws are carried out to the fullest extent. At any point during the summer this leader can be expelled and replaced by a three fifths majority of founders and elders currently serving on Piercing Arrow staff"),a.a.createElement("h3",null,"2.1 Other Offices:"),a.a.createElement("p",null,"The \u03a6\u0391\u03a3 Leader may deputize Founders, Elders, and Brothers to \u03a6\u0391\u03a3 responsibilities."),a.a.createElement("h2",null,"ARTICLE III \u2013 Meetings"),a.a.createElement("p",null,"There will be several meetings for Counselors and Directors to discuss \u03a6\u0391\u03a3 matters:"),a.a.createElement("p",null,"A) A meeting to assign Little Brothers to Big Brothers. This meeting should take place early in the summer. Refer to ARTICLE V \u2013 Little Brother Selection.",a.a.createElement("br",null),"B) A meeting to name new \u03a6\u0391\u03a3 members. This meeting should take place late in the summer. Refer to ARTICLE VI \u2013 Naming.",a.a.createElement("br",null),"C) Any other meetings as needed."),a.a.createElement("p",null,"All current Counselors and Directors must be notified of any official \u03a6\u0391\u03a3 meeting EXCEPT those who are serving their first year serving staff in Piercing Arrow."),a.a.createElement("h3",null,"3.1 Meeting Participation:"),a.a.createElement("p",null,"Counselors and Directors who are first year Piercing Arrow staff may be excluded at the \u03a6\u0391\u03a3 leader\u2019s discretion. Senior Instructors may be included in the two above mentioned meetings on a case by case basis at the leader\u2019s discretion. \u03a6\u0391\u03a3 members currently working on staff outside of Piercing Arrow are permitted to attend and participate in these meetings."),a.a.createElement("h3",null,"3.2 Special Meetings:"),a.a.createElement("p",null,"Meeting times will be determined per meeting per summer by the \u03a6\u0391\u03a3 leader."),a.a.createElement("h3",null,"3.3 Proxies:"),a.a.createElement("p",null,"Counselors and Directors who are unable to participate in a meeting are permitted to have other Counselors and Directors represent them. They may send Senior Instructors in their place at the Elder Counsel discrecion."),a.a.createElement("h2",null,"ARTICLE IV \u2013 Member Positions"),a.a.createElement("p",null,"There will be four designations of membership within \u03a6\u0391\u03a3. They will be:"),a.a.createElement("p",null,"A) Godfather - This title is reserved for Chris Constant. This title overrules all titles listed below.",a.a.createElement("br",null),"B) Founder or OG - These members were inducted in the first year of \u03a6\u0391\u03a3, 2004. This title overrules all titles listed below.",a.a.createElement("br",null),"C) Elder - These members have served five full summers on the Piercing Arrow Staff and/or have served or are serving as a Director at a lodge in Piercing Arrow. This title overrules all titles listed below.",a.a.createElement("br",null),"D) Brother - These members do not qualify for the aforementioned titles."),a.a.createElement("h3",null,"4.1 Honorable Mentions:"),a.a.createElement("p",null," Those selected to be little brothers may be considered as honorable mentions if they receive Big Brothers but are unable to attend \u03a6\u0391\u03a3 Day. These persons are not members of \u03a6\u0391\u03a3."),a.a.createElement("h3",null,"4.2 Membership Title Changes:"),a.a.createElement("p",null,"The upcoming staff should vote on updates to the above titles at the first \u03a6\u0391\u03a3 meeting. Options to debate should include:"),a.a.createElement("p",null,"Replacing Brother with a gender-neutral term. (Consider Retroactivity.) (sibling, active, member, disciple)",a.a.createElement("br",null),"Use Sister in place of Brother for female members.",a.a.createElement("br",null),"Continue using Brother regardless of sex or gender."),a.a.createElement("h2",null,"ARTICLE V \u2013 Little Brother Selection"),a.a.createElement("p",null,"Picks are given according to the following rules."),a.a.createElement("h3",null,"5.1 Foreword:"),a.a.createElement("p",null,"When a pick would be given to a first-year staffer, this pick is skipped. When a picker declines to pick a little brother, their pick is skipped. Picks are not transferable. If a staffer is not present at the picking meeting, They should either present a list of desired little brothers or send a returning staff representative in their place. All disputes are settled by the Program Director."),a.a.createElement("h3",null,"5.2 Failure to Show"),a.a.createElement("p",null,"If a Counselor or Director has an unexcused absence and fails to attend this meeting their choice will automatically default to the Phi Alpha Leader and they\u2019re prioritized to the bottom of their respective grouping."),a.a.createElement("h3",null,"5.3 Selection Rules:"),a.a.createElement("p",null,"The rules for the Little Brother Meeting are as follows:"),a.a.createElement("p",null,"1. The Program Director has the first pick.",a.a.createElement("br",null),"2. Camp Director has the next pick.",a.a.createElement("br",null),"3. Assistant Camp Director has the next pick.",a.a.createElement("br",null),"4. Mic-O-Say Advisor has the next pick.",a.a.createElement("br",null),"5. Other Directors have the next picks.",a.a.createElement("br",null),"6. Counselors have the next picks.",a.a.createElement("br",null),"7. Picks in the groups created by Rules 5) through 6) are ordered by experience on Piercing Arrow Staff with the most tenured staffers in the group picking first.",a.a.createElement("br",null),"8. When two pickers are tied after applying the above condition and both choose the same first year, preference is given to the picker working at the same lodge as the first year.",a.a.createElement("br",null),"9. When two pickers are tied after applying the above condition and both choose the same first year, the Program Director decides which picker receives their choice.",a.a.createElement("br",null),"10. If there are still remaining first years without big brothers after applying Rules 1 through 9, the Program Director decides whether Directors and Counselors receive a second little brother, or whether Senior Instructors receive little brothers. If Senior Instructors receive little brothers, which Senior Instructors receive them and in which order they pick is at the discretion of the Program Director."),a.a.createElement("h2",null,"ARTICLE VI \u2013 Name Selection"),a.a.createElement("p",null,"At the Naming Meeting any Counselors and Directors may propose names for any new member. Name options will be collected into a short list by the \u03a6\u0391\u03a3 leader and a voting majority will select the name. In the case of a tie, deference will be given to the new member\u2019s Big Brother."),a.a.createElement("h3",null,"6.1 Amending Names:"),a.a.createElement("p",null,"All names are final without serious cause for amendment. Changes can be made by a simple voting majority of Counselors and Directors if the name has not been presented in the Naming Ceremony and by a unanimous vote of Counselors and Directors if the name has already been presented. Any renaming of members who have received their name in ceremony must be done with their consent regardless of their station. Names may be amended for the following reasons:"),a.a.createElement("p",null,"A) The name is deemed poor in taste.",a.a.createElement("br",null),"B) The name is deemed irrelevant.",a.a.createElement("br",null),"C) The name is too similar to another name."),a.a.createElement("h3",null,"6.2 Deeming a New Name:"),a.a.createElement("p",null,"If a member has been approved to have their name changed. The naming process will follow the same guidelines as new initiates. The individual whose name is to be changed has no influence over what it can become."),a.a.createElement("h2",null,"ARTICLE VII \u2013 \u03a6\u0391\u03a3 Events"),a.a.createElement("p",null,"All events are subject to change a voting majority of Counselors and Directors."),a.a.createElement("h3",null,"7.1 \u03a6\u0391\u03a3 Big Brother Ceremony:"),a.a.createElement("p",null,"All Big Brothers for new members will arrive at Cedar Circle at least fifteen minutes before the ceremony begins. All new members will be gathered and led by two Senior Instructors or Counselors without new Little Brothers to Cedar Circle. The \u03a6\u0391\u03a3 leader or their representative will MC. They should speak briefly on brotherhood. New members will be instructed to step forward and close their eyes. Their Big Brothers will step forward. An Elder (normally the \u03a6\u0391\u03a3 leader) will place the right hand of each person on the shoulder of the others and state: \u201cBy the power vested in me as an Elder of \u03a6\u0391\u03a3, I name you Big Brother and Little Brother. You may now open your eyes.\u201d This assignment should be done with the \u03a6\u0391\u03a3 paddle laid across the Big Brother and Little Brother\u2019s arm. Question sheets are distributed to new members before adjournment."),a.a.createElement("h4",null,"7.1.1 Questions:"),a.a.createElement("p",null," The Question Slips will be distributed early in the summer. This should be done directly following Article VII Section 1 (or Article VII Section 1 Subsection 1). Refer to the attachment, which has self contained instructions."),a.a.createElement("h3",null,"7.2 \u03a6\u0391\u03a3 Day:"),a.a.createElement("p",null,"This event should take place on the final change day of the summer. The day will be planned and adjusted to work best for the size of the new group. All first year Piercing Arrow staff members should be wearing BSA Field Uniforms."),a.a.createElement("h4",null,"7.2.1 Lodge Activities:"),a.a.createElement("p",null,"Activities should happen at lodges. This article should be flushed out. All necessary attachments should be included. Plans should include: a) Campsites, Handicraft, MOS, Pool, Rifle, Scoutcraft, Ecology, Dining Hall."),a.a.createElement("h4",null,"7.2.2 Pre-Ceremony:"),a.a.createElement("p",null,"Assign Line Leaders to bring new members to the Piercing Arrow Staff Area in groups of about eight. Assign four speech givers and four painters. Attach speeches here. All \u03a6\u0391\u03a3 members participating in the \u03a6\u0391\u03a3 Ceremony should paint their right hands with the \u03a6\u0391\u03a3 symbol before the first speech begins and should line up in the entryway to the \u03a6\u0391\u03a3 Ring. All members in attendance should be wearing proper attire."),a.a.createElement("h3",null,"7.3 \u03a6\u0391\u03a3 Ceremony:"),a.a.createElement("p",null,"The \u03a6\u0391\u03a3 Leader wings it and freestyles his butt off. Name new members as Brothers or Elders if they qualify."),a.a.createElement("h4",null,"7.3.1 Optional Sections:"),a.a.createElement("p",null,"Acronym Speech, Remembrance Speech, anything you want. Do some speeching about Brotherhood. The \u03a6\u0391\u03a3 Leader should give some or all of these speeches and is responsible for any other speeches."),a.a.createElement("h2",null,"ARTICLE VIII \u2013 Records"),a.a.createElement("p",null,"The \u03a6\u0391\u03a3 leader of each year is responsible for holding accurate rosters of member names, member titles, and Big Brother - Little Brother relationships and passing these records to their successor. All \u03a6\u0391\u03a3 members will be permitted to view these records through the \u03a6\u0391\u03a3 leader."),a.a.createElement("h2",null,"ARTICLE IX \u2013 Amendments"),a.a.createElement("p",null,"These Bylaws may be changed in part or whole in the following ways:"),a.a.createElement("h3",null,"9.1 By Counselors and Directors:"),a.a.createElement("p",null,"These Bylaws may be altered, amended or repealed by the affirmative vote of a majority of the voting Counselors and Directors at any regular or special meeting."),a.a.createElement("h2",null,"ARTICLE X \u2013 Clarifaction of Terms"),a.a.createElement("p",null,"\u03a6\u0391\u03a3 and Phi Alpha Sigma - Both are acceptable terms for the name of this Brotherhood.",a.a.createElement("br",null),"\u03a6\u0391\u03a3 Leader - This is the person who is accountable for all parts of these bylaws and is selected per summer.",a.a.createElement("br",null),"Counselors and Directors - Includes all current Piercing Arrow staff members who are currently serving as Counselors or Directors in any lodge. Also includes all members of the Head Table (PD, CD, ACD, MOSA) regardless of their title.",a.a.createElement("br",null),"Voting Majority - Fifty percent plus one vote of any group which can vote. This is distinct from a true majority in that abstained votes are ignored.",a.a.createElement("br",null),"Change Day - The roughly 24 hour window between sessions during which virtually no non-staff members are on the Reservation.",a.a.createElement("br",null),"what are these?????",a.a.createElement("br",null),"Big Brother / Little Brother - All new members are assigned one mentor to ensure they thrive on Piercing Arrow staff. The new member is known as the Little Brother in this relationship and the mentor is known as the Big Brother.",a.a.createElement("br",null),"Line Leaders - Basically runners, but they're an active member of Phi Alpha.",a.a.createElement("br",null),"Speech Givers - Those who give speeches in the staff area on the way into the Phi Alpha Ceremony."),a.a.createElement("h2",null,"ARTICLE XI \u2013 Attatchments"),a.a.createElement("p",null,"Question Slip",a.a.createElement("br",null),a.a.createElement("a",{href:"https://docs.google.com/document/d/1ndPajchDmOOdBd4Deshvey2W5abOZhln0WxJZoSpf2g/edit#heading=h.m2rwp5jq32bq"},"Schedule for \u03a6\u0391\u03a3 day"),a.a.createElement("br",null),"Information for Campsites",a.a.createElement("br",null),"Information for Handicraft",a.a.createElement("br",null),"Information for Ecology"))))}),L=n(55),_=(n(95),function(e){Object(b.a)(n,e);var t=Object(y.a)(n);function n(){return Object(p.a)(this,n),t.apply(this,arguments)}return Object(f.a)(n,[{key:"render",value:function(){return a.a.createElement(s.m,null,a.a.createElement(s.g,null,a.a.createElement(s.v,null,a.a.createElement(s.t,null,"Update"))),a.a.createElement(s.e,null,a.a.createElement(s.g,{collapse:"condense"},a.a.createElement(s.v,null,a.a.createElement(s.t,{size:"large"},"Update"))),a.a.createElement(C,{clearYear:!1,buttonText:"Update",callback:j.updateExisting,additionalItemsTop:a.a.createElement(A,{id:"editedUserIdInput",list:"editedUserList",label:"Brother to Edit",onChange:n.setValues})})))}}],[{key:"setValues",value:function(){var e=Object(d.a)(h.a.mark((function e(){var t,n,r,a,l,o,i,s,c,u,m;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(l=document.getElementById("editedUserIdInput"),o=document.querySelector("option[value='".concat(l.value,"']")),i=null,null==o){e.next=7;break}i=parseInt(o.getAttribute("data-value"),10),e.next=8;break;case 7:return e.abrupt("return");case 8:return e.next=10,j.getBrother(i);case 10:if(0!==(s=e.sent).length){e.next=13;break}return e.abrupt("return");case 13:c=s,u=Object(L.a)(c,1),s=u[0],document.getElementById("nameInput").value=null===(t=s)||void 0===t?void 0:t.name,document.getElementById("staffNameInput").value=null===(n=s)||void 0===n?void 0:n.staffName,document.getElementById("yearSelect").value=null===(r=s)||void 0===r?void 0:r.year,document.getElementById("statusSelect").value=null===(a=s)||void 0===a?void 0:a.status,null!=s.bigBrother?(m=document.querySelector("option[data-value='".concat(s.bigBrother,"']")),document.getElementById("bigBrotherInput").value=m.value):document.getElementById("bigBrotherInput").value=null;case 21:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),n}(r.Component)),D=(n(96),n(97),n(98),n(99),n(100),n(101),n(102),n(103),n(104),n(105),n(106),function(){return a.a.createElement(s.b,null,a.a.createElement(c.a,null,a.a.createElement(s.s,null,a.a.createElement(s.n,null,a.a.createElement(i.c,{path:"/GenerationTree",component:I,exact:!0}),a.a.createElement(i.c,{path:"/YearTree",component:B,exact:!0}),a.a.createElement(i.c,{path:"/Insert",component:S,exact:!0}),a.a.createElement(i.c,{path:"/Bylaws",component:O,exact:!0}),a.a.createElement(i.c,{path:"/Update",component:_,exact:!0}),a.a.createElement(i.c,{path:"/*",render:function(){return a.a.createElement(i.b,{to:"/YearTree"})},exact:!0})),a.a.createElement(s.q,{slot:"bottom"},a.a.createElement(s.r,{tab:"Tree By Year",href:"/YearTree"},a.a.createElement(s.h,{icon:u.c}),a.a.createElement(s.k,null,"Tree By Year")),a.a.createElement(s.r,{tab:"Tree By Generation",href:"/GenerationTree"},a.a.createElement(s.h,{icon:u.j}),a.a.createElement(s.k,null,"Tree By Generation")),a.a.createElement(s.r,{tab:"Bylaws",href:"/Bylaws"},a.a.createElement(s.h,{icon:u.k}),a.a.createElement(s.k,null,"Bylaws")),a.a.createElement(s.r,{tab:"Insert",href:"/Insert"},a.a.createElement(s.h,{icon:u.a}),a.a.createElement(s.k,null,"Add")),a.a.createElement(s.r,{tab:"Update",href:"/Update"},a.a.createElement(s.h,{icon:u.n}),a.a.createElement(s.k,null,"Update"))))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},58:function(e,t,n){e.exports=n(107)},64:function(e,t,n){var r={"./ion-action-sheet-ios.entry.js":[111,11],"./ion-action-sheet-md.entry.js":[112,12],"./ion-alert-ios.entry.js":[113,13],"./ion-alert-md.entry.js":[114,14],"./ion-app_8-ios.entry.js":[115,15],"./ion-app_8-md.entry.js":[116,16],"./ion-avatar_3-ios.entry.js":[117,33],"./ion-avatar_3-md.entry.js":[118,34],"./ion-back-button-ios.entry.js":[119,35],"./ion-back-button-md.entry.js":[120,36],"./ion-backdrop-ios.entry.js":[121,77],"./ion-backdrop-md.entry.js":[122,78],"./ion-button_2-ios.entry.js":[123,37],"./ion-button_2-md.entry.js":[124,38],"./ion-card_5-ios.entry.js":[125,39],"./ion-card_5-md.entry.js":[126,40],"./ion-checkbox-ios.entry.js":[127,41],"./ion-checkbox-md.entry.js":[128,42],"./ion-chip-ios.entry.js":[129,43],"./ion-chip-md.entry.js":[130,44],"./ion-col_3.entry.js":[131,79],"./ion-datetime_3-ios.entry.js":[132,21],"./ion-datetime_3-md.entry.js":[133,22],"./ion-fab_3-ios.entry.js":[134,45],"./ion-fab_3-md.entry.js":[135,46],"./ion-img.entry.js":[136,80],"./ion-infinite-scroll_2-ios.entry.js":[137,81],"./ion-infinite-scroll_2-md.entry.js":[138,82],"./ion-input-ios.entry.js":[139,47],"./ion-input-md.entry.js":[140,48],"./ion-item-option_3-ios.entry.js":[141,49],"./ion-item-option_3-md.entry.js":[142,50],"./ion-item_8-ios.entry.js":[143,51],"./ion-item_8-md.entry.js":[144,52],"./ion-loading-ios.entry.js":[145,53],"./ion-loading-md.entry.js":[146,54],"./ion-menu_3-ios.entry.js":[147,55],"./ion-menu_3-md.entry.js":[148,56],"./ion-modal-ios.entry.js":[149,17],"./ion-modal-md.entry.js":[150,18],"./ion-nav_2.entry.js":[151,29],"./ion-popover-ios.entry.js":[152,19],"./ion-popover-md.entry.js":[153,20],"./ion-progress-bar-ios.entry.js":[154,57],"./ion-progress-bar-md.entry.js":[155,58],"./ion-radio_2-ios.entry.js":[156,59],"./ion-radio_2-md.entry.js":[157,60],"./ion-range-ios.entry.js":[158,61],"./ion-range-md.entry.js":[159,62],"./ion-refresher_2-ios.entry.js":[160,23],"./ion-refresher_2-md.entry.js":[161,24],"./ion-reorder_2-ios.entry.js":[162,31],"./ion-reorder_2-md.entry.js":[163,32],"./ion-ripple-effect.entry.js":[164,83],"./ion-route_4.entry.js":[165,63],"./ion-searchbar-ios.entry.js":[166,64],"./ion-searchbar-md.entry.js":[167,65],"./ion-segment_2-ios.entry.js":[168,66],"./ion-segment_2-md.entry.js":[169,67],"./ion-select_3-ios.entry.js":[170,68],"./ion-select_3-md.entry.js":[171,69],"./ion-slide_2-ios.entry.js":[172,84],"./ion-slide_2-md.entry.js":[173,85],"./ion-spinner.entry.js":[174,27],"./ion-split-pane-ios.entry.js":[175,86],"./ion-split-pane-md.entry.js":[176,87],"./ion-tab-bar_2-ios.entry.js":[177,70],"./ion-tab-bar_2-md.entry.js":[178,71],"./ion-tab_2.entry.js":[179,30],"./ion-text.entry.js":[180,72],"./ion-textarea-ios.entry.js":[181,73],"./ion-textarea-md.entry.js":[182,74],"./ion-toast-ios.entry.js":[183,75],"./ion-toast-md.entry.js":[184,76],"./ion-toggle-ios.entry.js":[185,25],"./ion-toggle-md.entry.js":[186,26],"./ion-virtual-scroll.entry.js":[187,88]};function a(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],a=t[0];return n.e(t[1]).then((function(){return n(a)}))}a.keys=function(){return Object.keys(r)},a.id=64,e.exports=a},66:function(e,t,n){var r={"./ion-icon.entry.js":[189,91]};function a(e){if(!n.o(r,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=r[e],a=t[0];return n.e(t[1]).then((function(){return n(a)}))}a.keys=function(){return Object.keys(r)},a.id=66,e.exports=a},71:function(e,t,n){},72:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){},92:function(e,t,n){},93:function(e,t,n){},94:function(e,t,n){},95:function(e,t,n){}},[[58,9,10]]]);
//# sourceMappingURL=main.ba756f4a.chunk.js.map