import{c as a,r as s,j as e,n as r,m as n}from"./index-856bde91.js";/**
 * @license lucide-react v0.485.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],d=a("chevron-up",c);function u(){const[i,o]=s.useState(!1);s.useEffect(()=>{const t=()=>{window.pageYOffset>500?o(!0):o(!1)};return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[]);const l=()=>{window.scrollTo({top:0,behavior:"smooth"})};return e.jsx(r,{children:i&&e.jsx(n.button,{onClick:l,className:"fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300",initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},whileHover:{scale:1.1},whileTap:{scale:.9},"aria-label":"Scroll to top",children:e.jsx(d,{className:"w-6 h-6"})})})}export{u as default};
