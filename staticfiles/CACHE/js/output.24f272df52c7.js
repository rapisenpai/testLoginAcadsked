document.addEventListener("DOMContentLoaded",function(){const accordions=document.querySelectorAll('[data-hs-accordion-always-open]');accordions.forEach(accordion=>{const accordionContent=accordion.closest('.hs-accordion').querySelector('.hs-accordion-content');if(accordionContent.classList.contains('hidden')){accordionContent.classList.remove('hidden');accordionContent.style.height=`${accordionContent.scrollHeight}px`;accordion.querySelector('.hs-accordion-toggle').setAttribute('aria-expanded','true');}});});;