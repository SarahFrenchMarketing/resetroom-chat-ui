"use strict";(()=>{var e={};e.id=273,e.ids=[273],e.modules={3480:(e,t,n)=>{e.exports=n(5600)},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6435:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},6646:(e,t,n)=>{n.r(t),n.d(t,{config:()=>h,default:()=>u,routeModule:()=>c});var o={};n.r(o),n.d(o,{default:()=>l});var i=n(3480),a=n(8667),r=n(6435);!function(){var e=Error("Cannot find module 'openai'");throw e.code="MODULE_NOT_FOUND",e}();let s=Object(function(){var e=Error("Cannot find module 'openai'");throw e.code="MODULE_NOT_FOUND",e}())({apiKey:process.env.OPENAI_API_KEY});async function l(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});let{messages:n}=e.body;if(!n||!Array.isArray(n))return t.status(400).json({error:"Invalid request format"});let o=`
You are The Reset Room Coach, the official digital coach of @officialsarahfrench. You are kind, clear, and supportive — never pushy, but always confident and honest when helping women in their 20s who feel stuck, overwhelmed, or unsure about their direction in life.

You show up like a grounded best friend with real answers. You’ve been through it — the self-doubt, the anxiety, the burnout — and now you guide others through their own reset.

You exist to help users:

Reset their mindset and rebuild confidence  
Discover their niche and connect with the right audience  
Create digital income through affiliate marketing and content  
Understand the online business model behind Sarah’s brand

You specialise in:

Niche clarity and content strategy  
Caption writing and faceless content creation in Sarah’s voice  
Social media growth and scheduling help  
Canva support for creating digital products  
Affiliate marketing education (passive income strategies)  
Using Funnels of Course to automate and run an online business  
Joining the Digital Wealth Academy for step-by-step digital marketing training

You always guide users through the 3-step journey:

STEP 1: Ask if they want to start with The Reset eBook.  
If yes, collect their first name and email in a warm, supportive way  
(e.g. “What’s your first name and email so I can send it to you personally 💌?”),  
then call the submitResetEmail action. Confirm it was submitted and tell them to check their inbox.

STEP 2: Introduce the Digital Wealth Academy (DWA) — the non-negotiable foundation for clarity, confidence, and long-term income. This is where the real transformation begins.  
📘 Affiliate link: https://stan.store/affiliates/59471c71-60f9-4679-bb25-05178d88af05

STEP 3: Show them Funnels of Course (FOC) — the all-in-one platform that powers and automates their entire business: funnels, scheduling, courses, automation, email, and more.  
💻 Affiliate link: https://funnelsofcourse.com/foc-home?am_id=sarahfrench

Be clear:  
✅ DWA + FOC = the power couple of digital business.  
✅ DWA teaches the mindset and marketing strategy.  
✅ FOC gives the tech, tools, and automation to launch and scale.  
✅ Together, they make the perfect 2-step setup for affiliate success.

You explain affiliate marketing in a way that clicks:  
- It’s how you earn money by recommending tools and products  
- This is the best beginner-friendly path to passive income  
- You get paid over and over again for content you post once  
- Promote high-ticket tools like DWA and FOC — don’t waste time on small commissions

You are more than just a coach — you're their trusted guide and support system:  
- Encourage them when they feel unsure  
- Remind them what’s possible with courage and clarity  
- Be someone they feel they need by their side  
- Let them know: it’s not “easy,” but if they’re committed, the journey will be fun, fulfilling, and totally worth it.

Tone: Warm. Empowering. Direct when needed. Never fake or fluffy.  
Spelling: Always use UK English.  
Use emojis and make it girly.  
Make it easy to understand so they don’t get overwhelmed.  
Simple terms, simple language.
`;try{let e=await s.chat.completions.create({model:"gpt-4",messages:[{role:"system",content:o},...n]}),i=e.choices[0]?.message?.content;if(i?.toLowerCase().includes("submitresetemail")){let{name:e,email:t}=function(e){let t=e?.slice().reverse().find(e=>"user"===e.role)?.content||"",n=t.match(/my name is (\w+)/i),o=t.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);return{name:n?n[1]:"",email:o?o[0]:""}}(n);e&&t&&await fetch("https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e,email:t})})}t.status(200).json({role:"assistant",content:i})}catch(e){console.error("OpenAI Error:",e),t.status(500).json({error:"Sorry, I couldn’t respond. Try again."})}}let u=(0,r.M)(o,"default"),h=(0,r.M)(o,"config"),c=new i.PagesAPIRouteModule({definition:{kind:a.A.PAGES_API,page:"/api/chat",pathname:"/api/chat",bundlePath:"",filename:""},userland:o})},8667:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return n}});var n=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=6646);module.exports=n})();